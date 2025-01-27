import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PUBLIC_URL } from '@env';
import CustomHeader from '../components/CustomHeader';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { colorScheme } from 'nativewind';

const SubCategoryScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const { categoryId, categoryName } = route.params;
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubCategories = async () => {
        setLoading(true); //Veriyi çekmeden önce loading durumunu true yap
        try {
            const response = await fetch(
                `${PUBLIC_URL}/api/subcategories?populate=*&filters[category][name][$eq]=${encodeURIComponent(categoryName)}`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSubCategories(data.data)

        } catch (error) {
            console.error('Fetch error:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSubCategories()
    }, [categoryId, categoryName]);


    const handleSeeAllProducts = () => {
        navigation.navigate( 'CategoryProductsScreen', { categoryId, categoryName });
    }


const handleSubProductPress = (subCategory) => {
    navigation.navigate('SubCategoryProductsScreen', {
        subCategoryId:  subCategory.id,
        subCategoryName: subCategory.name
    })

}

const renderSubCategory = ({ item }) => (
    <TouchableOpacity
        onPress={() => handleSubProductPress(item)}
        className='flex-row items-center py-3 justify-between px-2 border-b border-gray-300'
    >

        <View className='p-3 mr-4'>
            <FontAwesome6 name='star-of-life' size={18} color="#ff7f00" />
        </View>

        <Text className='text-xl flex-1 font-bold' >{item.name} Listings</Text>
        <Ionicons name='chevron-forward' size={20} color="gray" />

    </TouchableOpacity>
)

return (
    <View className='flex-1 bg-white'>
        <CustomHeader title={categoryName}
            logo={false}
            onBackPress={() => navigation.navigate('Search')}
        />

        <TouchableOpacity
            onPress={handleSeeAllProducts}
            className='p-3 rounded-full flex-row justify-between py-5 border-b border-gray-300'
        >
            <Text className='text-xl font-bold'>{categoryName} Listings</Text>
            <Ionicons name='chevron-forward' size={20} color="gray" />

        </TouchableOpacity>

        {loading ? (
            <Text>Loading...</Text>
        ) : (
            <FlatList
                data={subCategories}
                renderItem={renderSubCategory}
                keyExtractor={(item) => item.id.toString()}
                className='px-2'
            />
        )}
    </View>
)
}

export default SubCategoryScreen