import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../components/CustomHeader'
import { PUBLIC_URL } from '@env';
import ProductList from '../components/ProductList';

const ShowcaseScreen = () => {

  const [listings, setListings] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${PUBLIC_URL}/api/products?populate=*&&filters[showCase][$eq]=true`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setListings(data.data)

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    fetchProducts(); // Bileşen yüklendiğinde verileri çek
  }, []);
  return (
    <View className='flex-1 bg-gray-200'>
      <CustomHeader
        title='Showcase'
        logo={true}
      />

      <FlatList
         data={listings}
         renderItem={({item}) => <ProductList product={item} />}
         keyExtractor={(item) => item.id.toString()}
         numColumns={2}
         className='px-2'/>

    </View> 
  )
}

export default ShowcaseScreen