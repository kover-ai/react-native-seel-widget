import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SeelWFPTitleView } from './seel-wfp-title-view';
import { SeelWFPInfoView, DomainEnum } from './seel-wfp-info-view';
import {
  KeyValue,
  NetworkRequestStatusEnum,
  ResponseStatusEnum,
} from '../constants';

import type { IQuotesRequest } from '../dto/IQuotesRequest';
import type { IQuotesResponse } from '../dto/IQuotesResponse';
import {
  createQuote,
  logger,
  moneyFormat,
  readOptedIn,
  readOptOutExpiredTime,
  writeOptedIn,
} from '../utils';

export interface SeelWFPWidgetRef {
  /** Manually trigger a quote request */
  setup(quote: IQuotesRequest): void;
  /** Refresh using the last request data (only works in auto mode) */
  refresh(): void;
  /** Cancel any pending request */
  cancel(): void;
}

interface SeelWFPWidgetProps {
  /** Domain/region for the widget */
  domain: DomainEnum;
  /** Default opt-in state */
  defaultOptedIn: boolean;
  /** Callback when opt-in status or quote response changes */
  onChangeValue: ({
    optedIn,
    quotesResponse,
  }: {
    optedIn: boolean;
    quotesResponse?: IQuotesResponse;
  }) => void;
  /** Request data for auto-fetch mode */
  request?: IQuotesRequest;
  /** Enable auto-fetch when request prop changes (default: false) */
  autoFetch?: boolean;
  /** Debounce delay in milliseconds for auto-fetch (default: 300) */
  debounceMs?: number;
}

const SeelWFPWidget = (
  {
    domain = DomainEnum.Idle,
    defaultOptedIn = false,
    onChangeValue = ({ optedIn, quotesResponse }) => {
      logger.info(optedIn, quotesResponse);
    },
    request,
    autoFetch = false,
    debounceMs = 300,
  }: SeelWFPWidgetProps,
  ref: React.ForwardedRef<SeelWFPWidgetRef>
) => {
  const [quotesResponse, setQuotesResponse] = useState<IQuotesResponse>();
  const [termsUrl, setTermsUrl] = useState('');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('');
  const [optedIn, setOptedIn] = useState(defaultOptedIn);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState('');
  const [dictionary, setDictionary] = useState<any>({});
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [loadingStatus, setLoadingStatus] = useState<NetworkRequestStatusEnum>(
    NetworkRequestStatusEnum.Idle
  );

  // Request tracking for race condition handling
  const requestIdRef = useRef(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRequestRef = useRef<IQuotesRequest | null>(null);
  const isCancelledRef = useRef(false);

  // Cancel pending requests
  const cancelPendingRequest = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    isCancelledRef.current = true;
    // Increment requestId to invalidate any in-flight requests
    requestIdRef.current += 1;
  }, []);

  const fetchNetworkData = useCallback(async (quote: IQuotesRequest) => {
    // Store the request for potential refresh
    lastRequestRef.current = quote;
    // Reset cancelled flag
    isCancelledRef.current = false;
    // Generate unique request ID for this request
    const currentRequestId = ++requestIdRef.current;

    try {
      setLoadingStatus(NetworkRequestStatusEnum.Loading);
      const response = await createQuote(quote);

      // Check if this request is still valid (not cancelled or superseded)
      if (isCancelledRef.current || currentRequestId !== requestIdRef.current) {
        logger.debug('Request cancelled or superseded, ignoring response');
        return;
      }

      logger.info('response quote:', quote);
      setLoadingStatus(NetworkRequestStatusEnum.Success);
      setQuotesResponse(response);
      let _status = response.status ?? '';
      setStatus(_status);

      setOptedIn(
        _status === ResponseStatusEnum.Accepted && response.is_default_on
      );

      if (response.status === ResponseStatusEnum.Accepted) {
        const extraInfo = response.extra_info ?? {};
        const currency: string = response.currency;
        const _title: string = extraInfo?.widget_title ?? '';
        const _price: string = moneyFormat(
          response.price?.toString(),
          currency,
          {}
        );
        const dict: any = {};
        try {
          (response.extra_info?.i18n?.texts ?? []).forEach((kv: any) => {
            if (kv.key === KeyValue.wfp_title) {
              dict[kv.key] = kv.value
                .toString()
                .replace('{{title}}', _title)
                .replace('{{price}}', _price);
            } else if (kv.key === KeyValue.powered_by) {
              dict[kv.key] = kv.value.toString().replace('{{seel}}', '');
            } else if (kv.key === KeyValue.pricing_message) {
              dict[kv.key] = kv.value.toString().replace('{{price}}', _price);
            } else {
              dict[kv.key] = kv.value;
            }
          });
        } catch (error) {
          logger.warn('error:', error);
        }
        setDictionary(dict);
        setPrice(_price);
        setTermsUrl(response.extra_info?.terms_url ?? '');
        setPrivacyPolicyUrl(response.extra_info?.privacy_policy_url ?? '');
        setWidgetTitle(
          (extraInfo.widget_title && extraInfo.widget_title) || ''
        );
        setVisible(true);
      } else {
        setModalVisible(false);
      }
    } catch (error) {
      // Check if request was cancelled
      if (isCancelledRef.current || currentRequestId !== requestIdRef.current) {
        logger.debug('Request cancelled, ignoring error');
        return;
      }
      logger.warn(error);
      setLoadingStatus(NetworkRequestStatusEnum.Failed);
      setModalVisible(false);
      setVisible(false);
    }
  }, []); // setState functions are stable, no dependencies needed

  // Internal setup function with debounce support
  const internalSetup = useCallback(
    async (quote: IQuotesRequest, useDebounce: boolean = false) => {
      const executeSetup = async () => {
        const optOutExpiredTime = await readOptOutExpiredTime();
        const is_default_on =
          new Date().getTime() < optOutExpiredTime
            ? (await readOptedIn()) === false
              ? false
              : optedIn
            : optedIn;
        fetchNetworkData({ ...quote, is_default_on: is_default_on });
      };

      if (useDebounce && debounceMs > 0) {
        // Cancel any pending debounced request
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          debounceTimerRef.current = null;
          executeSetup();
        }, debounceMs);
      } else {
        executeSetup();
      }
    },
    [fetchNetworkData, optedIn, debounceMs]
  );

  useImperativeHandle(
    ref,
    () => ({
      setup(quote: IQuotesRequest) {
        // Manual setup: no debounce
        internalSetup(quote, false);
      },
      refresh() {
        // Refresh using last request data
        if (lastRequestRef.current) {
          internalSetup(lastRequestRef.current, false);
        } else if (request) {
          internalSetup(request, false);
        } else {
          logger.warn('No request data available for refresh');
        }
      },
      cancel() {
        cancelPendingRequest();
        setLoadingStatus(NetworkRequestStatusEnum.Idle);
      },
    }),
    [internalSetup, request, cancelPendingRequest]
  );

  // Auto-fetch when request prop changes (if autoFetch is enabled)
  useEffect(() => {
    if (autoFetch && request) {
      // Use debounce for auto-fetch to prevent rapid requests
      internalSetup(request, true);
    }
  }, [autoFetch, request, internalSetup]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelPendingRequest();
    };
  }, [cancelPendingRequest]);

  // Notify parent of changes
  useEffect(() => {
    onChangeValue({ optedIn, quotesResponse });
  }, [onChangeValue, optedIn, quotesResponse]);

  const onChangeOptedInValue = useCallback(
    async (value: boolean) => {
      logger.debug('SeelWFPWidget onChangeOptedInValue');
      setModalVisible(false);
      if (status === ResponseStatusEnum.Accepted) {
        await writeOptedIn(value);
        setOptedIn(value);
        onChangeValue({ optedIn: value, quotesResponse });
      } else {
        setOptedIn(false);
        onChangeValue({ optedIn: false, quotesResponse });
      }
    },
    [status, quotesResponse, onChangeValue]
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const renderEligibleModalView = useCallback(() => {
    return (
      <SeelWFPInfoView
        widgetTitle={widgetTitle}
        dictionary={dictionary}
        domain={domain}
        termsUrl={termsUrl}
        privacyPolicyUrl={privacyPolicyUrl}
        onClickClose={handleCloseModal}
        onChangeOptedInValue={onChangeOptedInValue}
      />
    );
  }, [
    widgetTitle,
    dictionary,
    domain,
    termsUrl,
    privacyPolicyUrl,
    handleCloseModal,
    onChangeOptedInValue,
  ]);

  const renderIneligibleModalView = useCallback(() => {
    const margin = 12;
    return (
      <TouchableOpacity
        style={[defaultStyles.ineligibleModalViewContainer]}
        onPress={handleCloseModal}
      >
        <View style={[defaultStyles.ineligibleModalView]}>
          <Text
            style={[defaultStyles.ineligibleText, { marginBottom: margin }]}
          >
            {dictionary[KeyValue.ineligible_main_message] || ''}
          </Text>
          <Text style={[defaultStyles.ineligibleText]}>
            {dictionary[KeyValue.ineligible_reason_shipping] && ' • '}
            {dictionary[KeyValue.ineligible_reason_shipping] || ''}
          </Text>
          <Text style={[defaultStyles.ineligibleText]}>
            {dictionary[KeyValue.ineligible_reason_currency] && ' • '}
            {dictionary[KeyValue.ineligible_reason_currency] || ''}
          </Text>
          <Text style={[defaultStyles.ineligibleText]}>
            {dictionary[KeyValue.ineligible_reason_value] && ' • '}
            {dictionary[KeyValue.ineligible_reason_value] || ''}
          </Text>
          <Text style={[defaultStyles.ineligibleText]}>
            {dictionary[KeyValue.ineligible_reason_items] && ' • '}
            {dictionary[KeyValue.ineligible_reason_items] || ''}
          </Text>
          <Text style={[defaultStyles.ineligibleText]}>
            {dictionary[KeyValue.ineligible_reason_system] && ' • '}
            {dictionary[KeyValue.ineligible_reason_system] || ''}
          </Text>
          <Text style={[defaultStyles.ineligibleText, { marginTop: margin }]}>
            {dictionary[KeyValue.ineligible_support_message] || ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, [dictionary, handleCloseModal]);

  const ineligibleStyle = useMemo(
    () => ({
      opacity: 0.6,
    }),
    []
  );
  return (
    <View
      style={[
        defaultStyles.container,
        status === ResponseStatusEnum.Accepted ? null : ineligibleStyle,
      ]}
    >
      {visible ? (
        <View>
          <SeelWFPTitleView
            status={status}
            title={widgetTitle}
            price={price}
            optedIn={optedIn}
            dictionary={dictionary}
            loadingStatus={loadingStatus}
            onClickInfoIcon={handleOpenModal}
            onChangeOptedInValue={onChangeOptedInValue}
          />
          <Modal
            animationType={
              status === ResponseStatusEnum.Accepted ? 'slide' : 'fade'
            }
            transparent={status === ResponseStatusEnum.Accepted ? false : true}
            visible={visible && modalVisible}
            onRequestClose={handleCloseModal}
          >
            {status === ResponseStatusEnum.Accepted
              ? renderEligibleModalView()
              : null}
            {status === ResponseStatusEnum.Rejected
              ? renderIneligibleModalView()
              : null}
          </Modal>
        </View>
      ) : null}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  ineligibleModalViewContainer: {
    // width: '100%',
    height: '100%',
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // backgroundColor: 'white',
  },
  ineligibleModalView: {
    padding: 12,
    backgroundColor: 'white',
  },
  ineligibleText: {
    color: '#202223',
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 16,
  },
});

export default forwardRef<SeelWFPWidgetRef, SeelWFPWidgetProps>(SeelWFPWidget);
