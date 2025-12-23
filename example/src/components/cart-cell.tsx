import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { IQuotesRequestLineItem } from '../../../src/dto/IQuotesRequest';

interface CartCellProps {
  item: IQuotesRequestLineItem;
  index: number;
  onChangeQuantity?: ({
    item,
    index,
    quantity,
  }: {
    item?: IQuotesRequestLineItem;
    index: number;
    quantity: number;
  }) => void;
  onPress?: (item: IQuotesRequestLineItem) => void;
}

export default function CartCell({
  item,
  index,
  onChangeQuantity,
  onPress,
}: CartCellProps) {
  const { product_title, price, quantity = 0, image_urls = [] } = item;
  const imageUrl = image_urls[0];
  const [inputValue, setInputValue] = useState<string>(quantity.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      onChangeQuantity?.({ item, index, quantity: newQuantity });
      setInputValue(newQuantity.toString());
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    onChangeQuantity?.({ item, index, quantity: newQuantity });
    setInputValue(newQuantity.toString());
  };

  const handlePress = () => {
    onPress?.(item);
  };

  const handleQuantityInputChange = (text: string) => {
    // Allow empty string for better UX while typing
    if (text === '') {
      setInputValue('');
      return;
    }
    // Only allow numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue !== '') {
      setInputValue(numericValue);
    }
  };

  const handleQuantityInputBlur = () => {
    setIsEditing(false);
    const numValue = parseInt(inputValue, 10);

    // Validate and set quantity
    if (isNaN(numValue) || numValue < 1) {
      // Reset to current quantity if invalid
      setInputValue(quantity.toString());
    } else {
      // Update quantity if valid and different
      if (numValue !== quantity) {
        onChangeQuantity?.({ item, index, quantity: numValue });
      } else {
        setInputValue(quantity.toString());
      }
    }
  };

  const handleQuantityInputFocus = () => {
    setIsEditing(true);
  };

  // Update input value when quantity prop changes externally (when not editing)
  useEffect(() => {
    if (!isEditing) {
      setInputValue(quantity.toString());
    }
  }, [quantity, isEditing]);

  const formatPrice = (priceStr?: string) => {
    if (!priceStr) return '';
    const numPrice = parseFloat(priceStr);
    if (isNaN(numPrice)) return priceStr;
    return `$${numPrice.toFixed(2)}`;
  };

  const calculateItemTotal = () => {
    if (!price) return '';
    const numPrice = parseFloat(`${price}`);
    if (isNaN(numPrice)) return '';
    return `$${(numPrice * quantity).toFixed(2)}`;
  };

  return (
    <TouchableOpacity
      style={defaultStyles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={defaultStyles.rowContainer}>
        <View style={defaultStyles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={defaultStyles.image} />
          ) : (
            <View style={defaultStyles.placeholderImage}>
              <Text style={defaultStyles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>

        <View style={defaultStyles.contentContainer}>
          <View style={defaultStyles.infoContainer}>
            <Text style={defaultStyles.product_title} numberOfLines={2}>
              {product_title || 'Unnamed Product'}
            </Text>
            {price && (
              <Text style={defaultStyles.price}>{formatPrice(`${price}`)}</Text>
            )}
          </View>

          <View style={defaultStyles.actionsContainer}>
            <View style={defaultStyles.quantityContainer}>
              <TouchableOpacity
                style={[
                  defaultStyles.quantityButton,
                  quantity <= 1 && defaultStyles.quantityButtonDisabled,
                ]}
                onPress={handleDecrease}
                disabled={quantity <= 1}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    defaultStyles.quantityButtonText,
                    quantity <= 1 && defaultStyles.quantityButtonTextDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                style={defaultStyles.quantityInput}
                value={inputValue}
                onChangeText={handleQuantityInputChange}
                onBlur={handleQuantityInputBlur}
                onFocus={handleQuantityInputFocus}
                keyboardType="number-pad"
                selectTextOnFocus
                maxLength={4}
              />
              <TouchableOpacity
                style={defaultStyles.quantityButton}
                onPress={handleIncrease}
                activeOpacity={0.7}
              >
                <Text style={defaultStyles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {price && (
          <View style={defaultStyles.totalContainer}>
            <Text style={defaultStyles.totalText}>{calculateItemTotal()}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoContainer: {
    marginBottom: 8,
  },
  product_title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  quantityButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  quantityButtonTextDisabled: {
    color: '#cccccc',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    paddingHorizontal: 16,
    minWidth: 40,
    textAlign: 'center',
  },
  quantityInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    paddingHorizontal: 8,
    minWidth: 40,
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff4444',
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  totalContainer: {
    marginLeft: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
