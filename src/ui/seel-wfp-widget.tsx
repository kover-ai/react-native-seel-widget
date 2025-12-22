import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SeelWFPTitleView from './seel-wfp-title-view';
import SeelWFPInfoView, { type Domain } from './seel-wfp-info-view';
import { createQuote } from '../utils/http_util';
import { writeOptedIn } from '../utils/storage_util';
import type { IQuotesRequest } from '../dto/IQuotesRequest';
import KeyValue from '../constants/key_value';
import type IQuotesResponse from '../dto/IQuotesResponse';
import { moneyFormat } from '../utils/format_util';
import { NetworkRequestStatueEnum } from '../constants/network_request_statue_enum';

export interface SeelWFPWidgetRef {
  setup(quote: IQuotesRequest): void;
}

interface SeelWFPWidgetProps {
  domain: Domain;
  onChangeValue: ({
    optedIn,
    quotesResponse,
  }: {
    optedIn: boolean;
    quotesResponse?: IQuotesResponse;
  }) => void;
}

const SeelWFPWidget = (
  {
    domain = '',
    onChangeValue = ({ optedIn, quotesResponse }) => {
      console.log(optedIn, quotesResponse);
    },
  }: SeelWFPWidgetProps,
  ref: any
) => {
  const [quotesResponse, setQuotesResponse] = useState<IQuotesResponse>();
  const [termsUrl, setTermsUrl] = useState('');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('');
  const [optedIn, setOptedIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState('');
  const [dictionary, setDictionary] = useState<any>({});
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [loadingStatue, setLoadingStatus] = useState<NetworkRequestStatueEnum>(
    NetworkRequestStatueEnum.Idle
  );

  useImperativeHandle(
    ref,
    () => ({
      setup(quote: IQuotesRequest) {
        fetchNetworkData(quote);
      },
    }),
    []
  );
  async function fetchNetworkData(quote: IQuotesRequest) {
    try {
      setLoadingStatus(NetworkRequestStatueEnum.Loading);
      const response = await createQuote(quote);
      console.log('response quote:', quote);
      setLoadingStatus(NetworkRequestStatueEnum.Success);
      setQuotesResponse(response);
      let _status = response.status ?? '';
      // _status = 'rejected';
      setStatus(_status);

      setOptedIn(_status === 'accepted' && response.is_default_on);

      if (response.status === 'accepted') {
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
          console.warn('error:', error);
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
        setVisible(false);
      }
    } catch (error) {
      console.warn(error);
      setLoadingStatus(NetworkRequestStatueEnum.Failed);
      setModalVisible(false);
      setVisible(false);
    }
  }

  // useEffect(() => {
  //   fetchNetworkData();
  // }, [optedIn]);
  useEffect(() => {
    onChangeValue({ optedIn, quotesResponse });
  }, [onChangeValue, optedIn, quotesResponse]);

  const renderIneligibleModalView = () => {
    const margin = 12;
    return (
      <TouchableOpacity
        style={[defaultStyles.ineligibleModalViewContainer]}
        onPress={() => {
          setModalVisible(false);
        }}
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
  };

  return (
    <View style={[defaultStyles.container]}>
      {visible ? (
        <View>
          <SeelWFPTitleView
            status={status}
            title={widgetTitle}
            price={price}
            optedIn={optedIn}
            dictionary={dictionary}
            loadingStatue={loadingStatue}
            onClickInfoIcon={() => {
              setModalVisible(true);
            }}
            onChangeOptedInValue={async (value: boolean) => {
              if (status === 'accepted') {
                writeOptedIn(value);
                setOptedIn(value);
                onChangeValue({ optedIn, quotesResponse });
              } else {
                setModalVisible(true);
              }
            }}
          />
          <Modal
            animationType={status === 'accepted' ? 'slide' : 'fade'}
            transparent={status === 'accepted' ? false : true}
            visible={visible && modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            {status === 'accepted' ? (
              <SeelWFPInfoView
                widgetTitle={widgetTitle}
                dictionary={dictionary}
                domain={domain}
                termsUrl={termsUrl}
                privacyPolicyUrl={privacyPolicyUrl}
                onClickClose={() => {
                  setModalVisible(false);
                }}
                onChangeOptedInValue={(value: boolean) => {
                  setModalVisible(false);
                  if (status === 'accepted') {
                    setOptedIn(value);
                    onChangeValue({ optedIn, quotesResponse });
                  } else {
                    setOptedIn(false);
                    onChangeValue({ optedIn, quotesResponse });
                  }
                }}
              />
            ) : null}
            {status === 'rejected' ? renderIneligibleModalView() : null}
          </Modal>
        </View>
      ) : (
        <View />
      )}
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
