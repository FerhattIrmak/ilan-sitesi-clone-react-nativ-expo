import { View, Text, FlatList, TouchableOpacity, TextInput, Button, ActivityIndicator, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PUBLIC_URL } from '@env';

const PostAdScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [title, setTitle] = useState('bir product');
  const [price, setPrice] = useState(72);
  const [description, setDescription] = useState('lorem morem ipsum');
  const [city, setCity] = useState('Istanbul');
  const [district, setDistrict] = useState('Kanlıca');
  const [condition, setCondition] = useState('');
  const [address, setAddress] = useState('Merkez');
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const checkUserAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsUserAuthenticated(!!token);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkUserAuthentication();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${PUBLIC_URL}/api/categories?populate=*`);
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUserAuthenticated !== null) {
      fetchCategories();
    }
  }, [isUserAuthenticated]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setSelectedSubCategory(null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const handleSubmit = () => {
    console.log('İlan gönderildi:', {
      title,
      price,
      description,
      address,
      selectedCategory,
      selectedSubCategory,
      image,
      city,
      district,
      condition
    });
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled) {
      console.log("Cancel Image");
      return;
    }

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      console.log("Cancel Image Uri");
    }
  };

  const renderCategories = () => (
    <View>
      <Text className="text-lg font-bold mb-2">Kategori Seçin</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCategorySelect(item)}
            className={`p-2 mb-2 font-bold ${selectedCategory === item.name ? 'bg-gray-300' : 'bg-gray-100'}`}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderSubCategories = () => {
    const selectedCategoryObject = categories.find(
      (cat) => cat.name === selectedCategory
    );

    if (!selectedCategoryObject?.subcategories) {
      return <Text>Alt kategori bulunamadı</Text>;
    }

    return (
      <View>
        {/* DÜZELTİLMİŞ GERİ DÖN BUTONU */}
        <TouchableOpacity 
          onPress={handleBackToCategories} 
          className="mb-4 p-2 bg-gray-200 rounded"
        >
          <Text className="text-blue-500 font-bold">Back</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold mb-2">Alt Kategoriler</Text>
        <FlatList
          data={selectedCategoryObject.subcategories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedSubCategory(item.name)}
              className={`p-2 mb-2 font-bold ${selectedSubCategory === item.name ? 'bg-gray-300' : 'bg-white'}`}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      {!isUserAuthenticated ? (
        <View className="flex-1 bg-white items-center justify-center">
          <Text>Giriş Gerekli</Text>
        </View>
      ) : (
        <View className="flex-1 bg-white">
          <CustomHeader title="İlan Ver" logo={true} />
          <FlatList
            data={[{}]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
              <View className="p-4">
                {!selectedCategory ? (
                  renderCategories()
                ) : (
                  <>
                    {renderSubCategories()}
                    {selectedCategory && (
                      <>
                        <TextInput
                          className="h-12 border border-gray-300 rounded-md mx-0 my-2 px-3"
                          placeholder="Başlık"
                          value={title}
                          onChangeText={setTitle}
                        />
                        <TextInput
                          className="h-24 border border-gray-300 rounded-md mx-0 my-2 px-3"
                          placeholder="Açıklama"
                          value={description}
                          onChangeText={setDescription}
                          multiline
                        />
                        <TextInput
                          className="h-12 border border-gray-300 rounded-md mx-0 my-2 px-3"
                          placeholder="Fiyat"
                          value={price.toString()}
                          onChangeText={(text) => setPrice(parseFloat(text))}
                          keyboardType="numeric"
                        />
                        <TextInput
                          className="h-12 border border-gray-300 rounded-md mx-0 my-2 px-3"
                          placeholder="Adres"
                          value={address}
                          onChangeText={setAddress}
                        />
                        <TextInput
                          className="h-12 border border-gray-300 rounded-md mx-0 my-2 px-3"
                          placeholder="Şehir"
                          value={city}
                          onChangeText={setCity}
                        />
                        <TextInput
                          className="h-12 border border-gray-300 rounded-md mx-0 my-2 px-3"
                          placeholder="Semt"
                          value={district}
                          onChangeText={setDistrict}
                        />
                        
                        <View className="my-2">
                          <Text className="text-lg font-bold mb-2">Ürün Durumu</Text>
                          <TouchableOpacity 
                            onPress={() => setCondition('New')}
                            className={`p-2 mb-2 ${condition === 'New' ? 'bg-gray-300' : 'bg-gray-100'}`}
                          >
                            <Text>Yeni</Text>
                          </TouchableOpacity>
                          <TouchableOpacity 
                            onPress={() => setCondition('Used')}
                            className={`p-2 mb-2 ${condition === 'Used' ? 'bg-gray-300' : 'bg-gray-100'}`}
                          >
                            <Text>Kullanılmış</Text>
                          </TouchableOpacity>
                        </View>

                        <View className="my-4">
                          <Button title="Görsel Seç" onPress={handleImagePicker} />
                          {image && (
                            <Image
                              source={{ uri: image }}
                              className="w-48 h-48 self-center mt-4"
                            />
                          )}
                        </View>

                        <View className="my-4">
                          <Button title="İlanı Gönder" onPress={handleSubmit} />
                        </View>
                      </>
                    )}
                  </>
                )}
              </View>
            )}
          />
        </View>
      )}
    </>
  );
};

export default PostAdScreen;