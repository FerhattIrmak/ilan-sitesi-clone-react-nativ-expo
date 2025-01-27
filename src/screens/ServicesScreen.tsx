import { View, Text, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { PUBLIC_URL } from '@env';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const ServicesScreen = () => {

  const [services, setServices] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${PUBLIC_URL}/api/services `);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServices(data.data)
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    fetchArticles(); // Bileşen yüklendiğinde verileri çek
  }, []);

  const tuncateDescription = (description: string) => {
    const maxLength = 100;
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}`
    }
    return description;
  }

  return (
    <View className='flex-1 bg-gray-100'>
      <CustomHeader
        title='Services'
        logo={true}
      />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {services.length > 0 ? (
          services.map((service) => (
            <View key={service.id}
              className='bg-white p-4 mb-4 rounded-xl flex-row items-center '
            >
              <MaterialIcons
                name="design-services" //İkon ismi isteğe göre (değiştirilebilir)
                size={24}
                className='mr-6'
              />
              <View className='flex-1'>
                <Text className='text-xl font-bold text-mycolor2'>{service.name}</Text>
                <Text className='text-gray-600 mt-2'>
                  {tuncateDescription(service.description)}


                </Text>


              </View>

            </View>
          ))
        ) : (
          <Text className='text-center text-gray-500'>Loading Services...</Text>
        )}

      </ScrollView>
    </View>
  )
}
export default ServicesScreen;
