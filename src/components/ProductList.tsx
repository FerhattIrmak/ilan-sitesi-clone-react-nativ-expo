import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PUBLIC_URL } from '@env';

const ProductList = ({ product }) => {
  const navigation = useNavigation();

  // Resim URL'sini oluştur
  const imageUrl = product.image?.url 
    ? `${PUBLIC_URL}${product.image.url}` 
    : null; // Eğer `image.url` yoksa null

  return (
    <TouchableOpacity className="flex-1 m-1 border-gray-300 overflow-hidden bg-white">
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-32"
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
        />
      ) : (
        <Text>Image not available</Text> // Resim yoksa kullanıcıya bilgi ver
      )}
      <Text className='p-2 text-sm font-semibold'>{product.title}</Text>
      <Text className='p-2 text-sm color-blue-700'>{product.price}$</Text>
    </TouchableOpacity>
  );
};

export default ProductList;
