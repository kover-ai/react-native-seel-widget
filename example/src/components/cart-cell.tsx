import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CartCellProps {
  productName: string;
  imageUrl?: string;
  quantity?: number;
}

export default function CartCell({
  productName = '',
  imageUrl = '',
  quantity = 0,
}: CartCellProps) {
  return (
    <TouchableOpacity style={[defaultStyles.container]}>
      <View style={[defaultStyles.rowContainer]}>
        <Image source={{ uri: imageUrl }} style={[defaultStyles.image]} />
        <View style={[defaultStyles.columnContainer]}>
          <Text>{productName}</Text>
          <View style={[defaultStyles.rowContainer]}>
            <View style={[{ flex: 1 }, defaultStyles.rowContainer]} />
            <View style={[defaultStyles.rowContainer]}>
              <TouchableOpacity style={[defaultStyles.decreaseButton]}>
                <Text style={[defaultStyles.decreaseText]}>-</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity style={[defaultStyles.increaseButton]}>
                <Text style={[defaultStyles.increaseText]}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#d3d3d3',
  },
  decreaseButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  decreaseText: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
    height: 20,
  },
  increaseButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  increaseText: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
    height: 20,
  },
});
