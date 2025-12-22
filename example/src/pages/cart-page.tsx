import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface CartItem {
  id: string;
  productId: string;
  productName?: string;
  price?: string;
  quantity?: number;
  imageUrl?: string;
}

interface CartListProps {
  items: CartItem[];
}

export default function CartPage({ items = [] }: CartListProps) {
  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <TouchableOpacity style={[defaultStyle.itemContainer]}>
        <Image source={{ uri: item.imageUrl ?? '' }} />
        <View>
          <Text>{item.productName || ''}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={defaultStyle.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={defaultStyle.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={defaultStyle.emptyContainer}>
            <Text style={defaultStyle.emptyText}>购物车是空的</Text>
          </View>
        }
      />
    </View>
  );
}

const defaultStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#333333',
  },
  listContent: {
    padding: 12,
    paddingBottom: 100,
  },
  itemContainer: {
    backgroundColor: 'white',
  },
});
