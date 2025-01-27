import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../components/CustomHeader'
import { PUBLIC_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const SearchScreen = () => {

  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${PUBLIC_URL}/api/categories`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCategories(data.data)

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    fetchCategories(); // Bileşen yüklendiğinde verileri çek
  }, []);

  const handleCategoryPress = (categoryName, categoryId) => {
    navigation.navigate('SubCategoryScreen', { categoryName, categoryId });

  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item.name, item.id)}
      className='flex-row items-center py-3 px-2 border-b border-gray-300'
    >

      <View className='rounded-full p-3 mr-2' style={{ backgroundColor: item.color }}>
        <Ionicons name={item.icon} size={20} color="white" />

      </View>
      <Text className='text-lg flex-1'>{item.name}</Text>

      <Ionicons name='chevron-forward' size={20} color="gray" />

    </TouchableOpacity>
  )

  return (
    <View className='flex-1 bg-gray-100'>
      <CustomHeader
        title='Search'
        logo={true}
      />
      <TextInput
        placeholder="Search...."
        className="h-12 border border-gray-300 px-3 my-4 mx-4 rounded-md bg-gray-200"
      />

      <Text>SearchScreen</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        className='px-2' />
    </View>
  )
}

export default SearchScreen