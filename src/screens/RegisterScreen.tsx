import React, { useState } from 'react'
import { 
  View, 
  Text, 
  Keyboard, 
  Image, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { login, register } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LoginScreen from './LoginScreen';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation();

  const validateInputs = () => {
    if (!username.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Username is required'
      });
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter a valid email'
      });
      return false;
    }
    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Password must be at least 6 characters'
      });
      return false;
    }
    return true;
  }

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const result = await register(email, password, username);
      if (result.success) {   
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'You can now log in'
        });
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: result.message || 'Something went wrong'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network or server error'
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoginNavigate = () => {
    navigation.navigate("Login");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View className='flex flex-1 justify-center items-center p-8 bg-mycolor1'>
          <Image 
            resizeMode='contain'
            className='w-48 h-48 mb-4'
            source={require('../../assets/logo.png')}
          />
          <Text className='text-black text-2xl font-semibold mb-4'>
            Register
          </Text>
          <TouchableOpacity
            onPress={handleLoginNavigate}
            className='p-2 mb-4'
          >
            <Text className='text-blue-600'>Already have an account?</Text>
          </TouchableOpacity>
          
          <TextInput
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
            autoCapitalize='none'
            className='w-full px-4 py-3 bg-white border-2 mb-2 rounded-lg'
          />
          <TextInput
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            className='w-full px-4 py-3 bg-white border-2 mb-2 rounded-lg'
          />
          <TextInput
            placeholder='Password'
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            className='w-full px-4 py-3 bg-white border-2 mb-2 rounded-lg'
          />
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className={`w-full border p-5 ${isLoading ? 'bg-gray-400' : 'bg-mycolor2'}`}
          >
            <Text className='text-mycolor1 text-xl text-center'>
              {isLoading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen