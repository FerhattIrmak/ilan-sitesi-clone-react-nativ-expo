import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { getCurrentUser, logout } from '../utils/auth';
import LoginScreen from './LoginScreen';

const PersonalizedScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('Token');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please Login.',
        });
        navigation.navigate("Login");
        setLoading(false);
        return;
      }
      const data = await getCurrentUser(token);
      if (data) {
        setUser(data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Could not retrieve user information.',
        });
        navigation.navigate("Login");
      }
      setLoading(false);
    }

    fetchUser();
  }, [navigation]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
        text2: 'You have successfully logged out.',
      });
      setUser(null);
      navigation.navigate("Login");
    } else {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: result.error,

      });
    }
  };

  return (
    <>
      <CustomHeader
        title="Personalized"
        logo={true} />

      <View className="flex flex-1 justify-center items-center p-8">
        {loading ? (
          <Text className="text-black text-lg">Loading...</Text>
        ) : user ? (
          <>
            <Text className="text-2xl font-medium">Profile Details</Text>
            <Text className="text-black text-lg">Username: {user.username}</Text>
            <Text className="text-black text-lg">Email: {user.email}</Text>

            <TouchableOpacity
              onPress={handleLogout}
              className="bg-mycolor2 p-3 rounded-xl mt-8"
            >
              <Text className="text-lg text-mycolor1">Logout</Text>
            </TouchableOpacity>
          </>
        ) : (

      <LoginScreen/>

      )}

      </View>
    </>
  )
}

export default PersonalizedScreen;
