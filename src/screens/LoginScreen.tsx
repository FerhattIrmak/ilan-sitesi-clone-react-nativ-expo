import { View, Text, Keyboard, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { login } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const LoginScreen = () => {

  const [email, setEmail] = useState('ferhat321@gmail.com');
  const [password, setPassword] = useState('ferhat123')
  const navigation = useNavigation();

  const handleRegisterNavigate = async () => {
    navigation.navigate("Register");
  }


  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      await AsyncStorage.setItem('token', result.token);
      Toast.show({
        type: 'success',
        text1: 'Login success',
        text2: 'Auth okey'
      })

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Showcase" }],
        })

      }, 1500);
    }
    else {

      Toast.show({
        type: 'error',
        text1: 'Login error',
        text2: 'E-posta veya şifre hatalı.',
      })


    }

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View className='flex flex-1 justify-center items-center p-8 bg-mycolor1'>
        <Image resizeMode='contain'
          className='w-48 h-48'
          source={require('../../assets/logo.png')}
        />

        <Text className='text-black text-2xl font-semibold'>
          Login
        </Text>

        <TouchableOpacity
          onPress={handleRegisterNavigate}
          className='p-2 mb-8'
        >
          <Text>Do you have an account ?</Text>
        </TouchableOpacity>

        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          className='w-full px-4 py-3 bg-white border-2 mb-2 rounded-lg '
        />

        <TextInput
          placeholder='Password'
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          className='w-full px-4 py-3 bg-white border-2 mb-2 rounded-lg '
        />

        <TouchableOpacity
          onPress={handleLogin}
          className='w-full border p-5 bg-mycolor2' >
          <Text className='text-mycolor1 text-xl text-center'>Login</Text>
        </TouchableOpacity>

      </View>

    </TouchableWithoutFeedback>
  )
}

export default LoginScreen