import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { PUBLIC_URL } from '@env';

const SearchScreen = () => {
  const fetchArticles = async () => {
    try {
      const response = await fetch(`${PUBLIC_URL}/api/authors`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Gelen veriyi kontrol et
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchArticles(); // Bileşen yüklendiğinde verileri çek
  }, []);

  return (
    <View>
      <CustomHeader title='Search' logo={true} />
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
