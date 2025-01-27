import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PUBLIC_URL } from '@env';
import ProductList from '../components/ProductList';
import CustomHeader from '../components/CustomHeader';

const SubCategoryProductsScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { subCategoryId, subCategoryName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductsByCategory = async () => {

    setLoading(true);
    const timestamp = new Date().getTime();

    try {
      const response = await fetch(`${PUBLIC_URL}/api/products?populate=*&filters[subcategory][name][$eq]=${subCategoryName}&=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      const data = await response.json();


      if (response.ok) {
        setProducts(data.data); //ürünleri state rest eder

      } else {
        console.error('Error:', data);
      }

    } catch (error) {
      console.error('Error:', error);

    }
    finally {
      setLoading(false);
    }

  }
  useEffect(() => {

    fetchProductsByCategory();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchProductsByCategory();
    })

  }, [subCategoryId, subCategoryName, navigation])


  const renderProduct = ({ item }) => (
    <ProductList product={item

    } />
  )


  return (
    <View className='flex-1'>
      <CustomHeader
        title={`${subCategoryName} Products`}
        logo={false}
        onBackPress={() => navigation.navigate('Search')}
      />
      <Text>CategoryProductsScreen</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />

      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          className='px-2' />
      )}


    </View>
  )
}

export default SubCategoryProductsScreen