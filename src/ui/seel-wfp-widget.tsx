import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import SeelWFPTitleView from './seel-wfp-title-view';
import CoverageInfoFooter from './coverage-info-footer';
import { useEffect, useState } from 'react';
import { createQuote } from '../utils/http_util';
import SeelWFPInfoView from './seel-wfp-info-view';

export default function SeelWFPWidget() {
  const [modalVisible, setModalVisible] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState('');
  const [price, setPrice] = useState('');
  const [coverageDetailsText, setCoverageDetailsText] = useState<string[]>([]);

  useEffect(() => {
    (async function () {
      const response = await createQuote({
        session_id: '3b87ea2a6cecdb94bae186263feb9e7f',
        type: 'poshmark-wfp',
        cart_id: '3b87ea2a6cecdb94bae186263feb9e7f',
        device_category: 'mobile',
        device_id: '1737534673',
        device_platform: 'iOS',
        extra_info: {
          shipping_fee: 10,
        },
        merchant_id: '20251022203385298661',
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
      });
      const extraInfo = response.extra_info ?? {};
      setPrice(response.price.toString());
      setWidgetTitle(
        (extraInfo.widget_title && extraInfo.widget_title + '®') || ''
      );
      setCoverageDetailsText(extraInfo?.coverage_details_text ?? []);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <SeelWFPTitleView
          title={widgetTitle}
          price={price}
          onClickInfoIcon={() => {
            setModalVisible(true);
          }}
        />
        <CoverageInfoFooter />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SeelWFPInfoView
          title={widgetTitle}
          price={price}
          continent={'US'}
          coverageDetailsText={coverageDetailsText}
          onClickClose={() => {
            setModalVisible(false);
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
});
