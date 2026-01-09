import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { SeelWFPWidget, SeelWidgetSDK } from '../../../src';
import { DomainEnum } from '../../../src';
import { type IQuotesResponse } from '../../../src';

import CartCell from '../components/cart-cell';
import { mockQuoteEU as quoteEU, mockQuoteUS as quoteUS } from '../mocks';
import { readOptOutExpiredTime } from '../../../src/utils/storage_util';
import SettingsPage, {
  OptOutExpiredTimeEnum,
  type OptOutExpiredTime,
} from './settings-page';

export default function SettlementPage() {
  const navigation = useNavigation();
  const [domain, setDomain] = useState<DomainEnum>(DomainEnum.EU);
  const [request, setRequest] = useState(domain === 'EU' ? quoteEU : quoteUS);
  const [defaultOptedIn, setDefaultOptedIn] = useState(true);
  const [optOutExpiredTime, setOptOutExpiredTime] = useState<OptOutExpiredTime>(
    OptOutExpiredTimeEnum.Default
  );
  const [optedValidTime, setOptedValidTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef: any = null;
  const seelWidgetRef = useRef<any>(initialRef);

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity
        style={defaultStyles.settingButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={defaultStyles.settingButtonText}>⚙️</Text>
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation]);

  useEffect(() => {
    console.warn('useEffect request:\n', request);
    const setup = () => {
      if (seelWidgetRef.current) {
        seelWidgetRef.current.setup(request);
      }
    };
    setup();
  }, [request]);
  return (
    <SafeAreaView
      style={[defaultStyles.safeAreaContainer]}
      edges={['right', 'bottom', 'left']}
    >
      <View>
        {request.line_items.map((obj, idx) => {
          return (
            <CartCell
              key={obj.product_id}
              item={obj}
              index={idx}
              onChangeQuantity={({ item, index, quantity }) => {
                let line_items = request.line_items || [];
                line_items[index] = Object.assign({}, item, {
                  quantity,
                });
                setRequest(Object.assign({}, request, { line_items }));
              }}
            />
          );
        })}
      </View>
      <View style={[defaultStyles.box]}>
        <SeelWFPWidget
          ref={seelWidgetRef}
          domain={domain}
          defaultOptedIn={defaultOptedIn}
          onChangeValue={async ({
            optedIn,
            quotesResponse,
          }: {
            optedIn: boolean;
            quotesResponse?: IQuotesResponse;
          }) => {
            console.debug(
              'optedIn:\n\n',
              optedIn,
              'quotesResponse.is_default_on:',
              quotesResponse?.is_default_on
            );
            if (optedIn === false) {
              const _optedValidTime = await readOptOutExpiredTime();
              setOptedValidTime(_optedValidTime.toString());
              console.warn('optedValidTime:\n\n', _optedValidTime);
            }
          }}
        />
      </View>
      <View style={[defaultStyles.container, defaultStyles.columnContainer]}>
        {/* <View style={[defaultStyles.rowContainer]}>
          <TouchableOpacity
            style={[defaultStyles.button, defaultStyles.centerContainer]}
            onPress={() => {
              setDomain(DomainEnum.EU);
              setRequest(quoteEU);
            }}
          >
            <Text>Setup EU</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.button, defaultStyles.centerContainer]}
            onPress={() => {
              setDomain(DomainEnum.US);
              setRequest(quoteUS);
            }}
          >
            <Text>Setup US</Text>
          </TouchableOpacity>
        </View> */}
        <View style={[defaultStyles.rowContainer]}>
          <TouchableOpacity
            style={[defaultStyles.button, defaultStyles.centerContainer]}
            onPress={async () => {
              SeelWidgetSDK.shared.optOutExpiredTime = 10 * 1000;
            }}
          >
            <Text>Setup Opt-out 10s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.button, defaultStyles.centerContainer]}
            onPress={() => {
              setDefaultOptedIn((prev) => !prev);
            }}
          >
            <Text>
              Setup DefaultOptedIn to {!defaultOptedIn ? 'true' : 'false'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[defaultStyles.rowContainer, defaultStyles.p24]}>
          <Text>optedValidTime: {optedValidTime}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={defaultStyles.modalOverlay}>
          <View style={defaultStyles.modalContent}>
            <View style={defaultStyles.modalHeader}>
              <Text style={defaultStyles.modalTitle}>Settings</Text>
              <TouchableOpacity
                style={defaultStyles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={defaultStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <SettingsPage
              defaultOptedIn={defaultOptedIn}
              domain={domain}
              optOutExpiredTime={optOutExpiredTime}
              onChangeConfig={(config) => {
                console.warn('defaultOptedIn', config.defaultOptedIn);
                console.warn('domain:', config.domain);
                setDefaultOptedIn(config.defaultOptedIn);
                setDomain(config.domain);
                setRequest(config.domain === 'EU' ? quoteEU : quoteUS);
                setOptOutExpiredTime(
                  config?.optOutExpiredTime ?? OptOutExpiredTimeEnum.OneMinute
                );
                if (config?.optOutExpiredTime) {
                  SeelWidgetSDK.shared.optOutExpiredTime =
                    config?.optOutExpiredTime;
                }
              }}
              onSave={() => {
                console.log('Settings saved');
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const defaultStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  box: {
    // width: 370,
    // height: 80,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  p24: {
    padding: 24,
  },
  button: {
    flex: 1,
    height: 48,
  },
  settingButton: {
    marginRight: 16,
    padding: 8,
  },
  settingButtonText: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 0,
    width: '90%',
    height: '80%',
    maxWidth: 500,
    maxHeight: 600,
    overflow: 'hidden',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666666',
    fontWeight: '300',
  },
});
