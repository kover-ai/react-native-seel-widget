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

interface SeelWFPWidgetProps {
  domain: Domain;
  onChangeValue: ({
    optedIn,
    price,
  }: {
    optedIn: boolean;
    price: string;
  }) => void;
}

const SeelWFPWidget = (
  {
    domain = '',
    onChangeValue = ({ optedIn, price }) => {
      console.log(optedIn, price);
    },
  }: SeelWFPWidgetProps,
  ref: any
) => {
  const [termsUrl, setTermsUrl] = useState('');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('');
  const [optedIn, setOptedIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState('');
  const [dictionary, setDictionary] = useState<any>({});
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [coverageDetailsText, setCoverageDetailsText] = useState<string[]>([]);

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
      const response = await createQuote(quote);
      setStatus(response.status ?? '');
      // setStatus('rejected');

      if (response.status === 'accepted') {
        const extraInfo = response.extra_info ?? {};
        const _title: string = extraInfo?.widget_title ?? '';
        const _price: string = response.price?.toString();
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
        setCoverageDetailsText(extraInfo?.coverage_details_text ?? []);
        setVisible(true);
      } else {
        setModalVisible(false);
        setVisible(false);
      }
    } catch (error) {
      console.warn(error);
      setModalVisible(false);
      setVisible(false);
    }
  }

  // useEffect(() => {
  //   fetchNetworkData();
  // }, [optedIn]);
  useEffect(() => {
    onChangeValue({ optedIn, price });
  }, [onChangeValue, optedIn, price]);

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
            title={widgetTitle}
            price={price}
            optedIn={optedIn}
            dictionary={dictionary}
            onClickInfoIcon={() => {
              setModalVisible(true);
            }}
            onChangeOptedInValue={async (value: boolean) => {
              if (status === 'accepted') {
                writeOptedIn(value);
                setOptedIn(value);
                onChangeValue({ optedIn, price });
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
              setModalVisible(!modalVisible);
            }}
          >
            {status === 'accepted' ? (
              <SeelWFPInfoView
                widgetTitle={widgetTitle}
                dictionary={dictionary}
                domain={domain}
                coverageDetailsText={coverageDetailsText}
                termsUrl={termsUrl}
                privacyPolicyUrl={privacyPolicyUrl}
                onClickClose={() => {
                  setModalVisible(false);
                }}
                onChangeOptedInValue={(value: boolean) => {
                  setModalVisible(false);
                  if (status === 'accepted') {
                    setOptedIn(value);
                    onChangeValue({ optedIn, price });
                  } else {
                    setOptedIn(false);
                    onChangeValue({ optedIn, price });
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

export default forwardRef(SeelWFPWidget);
