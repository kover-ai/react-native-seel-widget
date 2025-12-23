import { useEffect, useRef, useState } from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { SeelWFPWidget } from '../../../src';
import type { Domain, IQuotesResponse } from '../../../src';

import CartCell from '../components/cart-cell';
import { mockQuoteEU as quoteEU, mockQuoteUS as quoteUS } from '../mocks';

export default function SettlementPage() {
  const [domain, setDomain] = useState<Domain>('EU');
  const [request, setRequest] = useState(domain === 'EU' ? quoteEU : quoteUS);
  const initialRef: any = null;
  const seelWidgetRef = useRef<any>(initialRef);
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
          onChangeValue={function ({
            optedIn,
            quotesResponse,
          }: {
            optedIn: boolean;
            quotesResponse?: IQuotesResponse;
          }): void {
            console.log(optedIn, quotesResponse);
          }}
        />
      </View>
      <View style={[defaultStyles.container, defaultStyles.columnContainer]}>
        <View style={[defaultStyles.rowContainer]} />
        <TouchableOpacity
          style={defaultStyles.button}
          onPress={() => {
            setDomain('EU');
            setRequest(quoteEU);
          }}
        >
          <Text>Setup EU</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.button}
          onPress={() => {
            setDomain('US');
            setRequest(quoteUS);
          }}
        >
          <Text>Setup US</Text>
        </TouchableOpacity>
      </View>
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
  columnContainer: {
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 300,
    height: 80,
  },
});
