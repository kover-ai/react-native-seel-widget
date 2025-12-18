import { useEffect, useRef, useState } from 'react';

import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';

import SeelWFPWidget from '../../../src/ui/seel-wfp-widget';
import type { IQuotesRequest } from '../../../src/dto/IQuotesRequest';
import type IQuotesResponse from '../../../src/dto/IQuotesResponse';
import type { Domain } from '../../../src/ui/seel-wfp-info-view';

export default function SettlementPage() {
  const [domain, setDomain] = useState<Domain>('');
  const initialRef: any = null;
  const seelWidgetRef = useRef<any>(initialRef);
  // const onClickSetup = () => {
  //   fetchNetworkData();
  // };
  useEffect(() => {
    const fetchNetworkData = () => {
      const quoteEU: IQuotesRequest = {
        session_id: '3b87ea2a6cecdb94bae186263feb9e7f',
        type: 'debenhams-wfp',
        cart_id: '3b87ea2a6cecdb94bae186263feb9e7f',
        device_category: 'mobile',
        device_id: '1737534673',
        device_platform: 'iOS',
        extra_info: {
          shipping_fee: 10,
        },
        merchant_id: '20251217201204133696',
        is_default_on: true,
        line_items: [
          {
            quantity: 3,
            variant_id: '10013-0000-319802',
            is_final_sale: true,
            product_id: '10013-0000-319802',
            category_2: 'Decor',
            requires_shipping: true,
            product_title:
              'Williams Brand Allegro 2 Model Digital Piano w\\/ Accessories',
            category_1: 'Household Goods',
            line_item_id: '11111',
            price: 50,
            sales_tax: 0,
            image_urls: [
              'https:/example.com/image1',
              'https:/example.com/image2',
            ],
            currency: 'USD',
            variant_title:
              'Williams Brand Allegro 2 Model Digital Piano w\\/ Accessories',
            allocated_discounts: 0,
            final_price: 50,
            shipping_origin: {
              country: 'US',
              city: '',
              state: '',
              zipcode: '',
            },
          },
          {
            allocated_discounts: 1,
            category_1: 'Household Goods',
            category_2: 'Decor',
            currency: 'USD',
            final_price: '15.00',
            image_urls: [
              'https:/example.com/image1',
              'https:/example.com/image2',
            ],
            is_final_sale: true,
            line_item_id: '22222',
            price: 10,
            product_id: '10013-0000-319803',
            product_title: 'Williams Brand Allegro 2',
            quantity: 3,
            requires_shipping: true,
            sales_tax: 6,
            shipping_origin: {
              country: 'US',
              city: '',
              state: '',
              zipcode: '',
            },
            variant_id: '10013-0000-319803',
            variant_title: 'Williams Brand Allegro 2',
          },
        ],
        customer: {
          customer_id: '1111',
          email: 'xie@seel.com',
        },
        shipping_address: {
          address_1: '7 Buswell Street',
          city: 'Boston',
          country: 'US',
          state: 'MA',
          zipcode: '02215',
        },
      };
      const quoteUS: IQuotesRequest = {
        session_id: '3b87ea2a6cecdb94bae186263feb9e7f',
        type: 'debenhams-wfp',
        cart_id: '3b87ea2a6cecdb94bae186263feb9e7f',
        device_category: 'mobile',
        device_id: '1737534673',
        device_platform: 'iOS',
        extra_info: {
          shipping_fee: 10,
        },
        merchant_id: '20251211204195299886',
        is_default_on: true,
        line_items: [
          {
            quantity: 3,
            variant_id: '10013-0000-319802',
            is_final_sale: true,
            product_id: '10013-0000-319802',
            category_2: 'Decor',
            requires_shipping: true,
            product_title:
              'Williams Brand Allegro 2 Model Digital Piano w\\/ Accessories',
            category_1: 'Household Goods',
            line_item_id: '11111',
            price: 50,
            sales_tax: 0,
            image_urls: [
              'https:/example.com/image1',
              'https:/example.com/image2',
            ],
            currency: 'USD',
            variant_title:
              'Williams Brand Allegro 2 Model Digital Piano w\\/ Accessories',
            allocated_discounts: 0,
            final_price: 50,
            shipping_origin: {
              country: 'US',
              city: '',
              state: '',
              zipcode: '',
            },
          },
          {
            allocated_discounts: 1,
            category_1: 'Household Goods',
            category_2: 'Decor',
            currency: 'USD',
            final_price: '15.00',
            image_urls: [
              'https:/example.com/image1',
              'https:/example.com/image2',
            ],
            is_final_sale: true,
            line_item_id: '22222',
            price: 10,
            product_id: '10013-0000-319803',
            product_title: 'Williams Brand Allegro 2',
            quantity: 3,
            requires_shipping: true,
            sales_tax: 6,
            shipping_origin: {
              country: 'US',
              city: '',
              state: '',
              zipcode: '',
            },
            variant_id: '10013-0000-319803',
            variant_title: 'Williams Brand Allegro 2',
          },
        ],
        customer: {
          customer_id: '1111',
          email: 'xie@seel.com',
        },
        shipping_address: {
          address_1: '7 Buswell Street',
          city: 'Boston',
          country: 'US',
          state: 'MA',
          zipcode: '02215',
        },
      };
      if (seelWidgetRef.current) {
        const quote = domain === 'EU' ? quoteEU : quoteUS;
        seelWidgetRef.current.setup(quote);
      }
    };
    fetchNetworkData();
  }, [domain]);

  return (
    <SafeAreaView style={[defaultStyles.safeAreaContainer]}>
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
          }}
        >
          <Text>Setup EU</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.button}
          onPress={() => {
            setDomain('US');
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
