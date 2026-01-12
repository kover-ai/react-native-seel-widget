import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { IQuotesRequestLineItem } from '../../../src/dto/IQuotesRequest';

interface SubtotalProps {
  lineItems: IQuotesRequestLineItem[];
  optedIn?: boolean;
  quotePrice?: number;
}

export default function Subtotal({
  lineItems,
  optedIn = false,
  quotePrice,
}: SubtotalProps) {
  const subtotal = useMemo(() => {
    if (!lineItems || lineItems.length === 0) return 0;

    const itemsTotal = lineItems.reduce((total, item) => {
      const price =
        typeof item.price === 'number'
          ? item.price
          : parseFloat(`${item.price}` || '0');
      const quantity = item.quantity || 0;
      const itemTotal = price * quantity;
      return total + itemTotal;
    }, 0);

    // Add quote price if opted in and quote price is available
    if (optedIn && quotePrice !== undefined) {
      return itemsTotal + quotePrice;
    }

    return itemsTotal;
  }, [lineItems, optedIn, quotePrice]);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.amount}>{formatPrice(subtotal)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
