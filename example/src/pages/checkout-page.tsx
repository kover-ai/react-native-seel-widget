import { useEffect, useRef, useState } from 'react';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../types/navigation';
import { SeelWFPWidget } from '../../../src';
import { DomainEnum } from '../../../src';
import type { IQuotesResponse } from '../../../src';
import CartCell from '../components/cart-cell';
import Subtotal from '../components/subtotal';

type CheckoutPageRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

export default function CheckoutPage() {
  const route = useRoute<CheckoutPageRouteProp>();
  const lineItems = route.params?.lineItems || [];
  const request = route.params?.request;
  const domain = (route.params?.domain as DomainEnum) || DomainEnum.US;
  const defaultOptedIn = route.params?.defaultOptedIn ?? false;
  const [optedIn, setOptedIn] = useState(defaultOptedIn);
  const [quotePrice, setQuotePrice] = useState<number | undefined>(undefined);
  const seelWidgetRef = useRef<any>(null);

  useEffect(() => {
    if (seelWidgetRef.current && request) {
      seelWidgetRef.current.setup(request);
    }
  }, [request]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {lineItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items in cart</Text>
          </View>
        ) : (
          <>
            <View>
              {lineItems.map((item, index) => (
                <CartCell
                  key={item.product_id || `item-${index}`}
                  item={item}
                  index={index}
                  readonly={true}
                />
              ))}
            </View>
            <Subtotal
              lineItems={lineItems}
              optedIn={optedIn}
              quotePrice={quotePrice}
            />
            <View style={styles.box}>
              <SeelWFPWidget
                ref={seelWidgetRef}
                domain={domain}
                defaultOptedIn={defaultOptedIn}
                onChangeValue={async ({
                  optedIn: newOptedIn,
                  quotesResponse,
                }: {
                  optedIn: boolean;
                  quotesResponse?: IQuotesResponse;
                }) => {
                  console.debug(
                    'CheckoutPage optedIn:',
                    newOptedIn,
                    'quotesResponse.price:',
                    quotesResponse?.price
                  );
                  setOptedIn(newOptedIn);
                  setQuotePrice(quotesResponse?.price);
                }}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  box: {
    // Container for SeelWFPWidget
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
});
