import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


type RootStackParamList = {
    SplashScreen: undefined;
    Home: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

interface Props {
    navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 2000);
    }, [navigation]);

    return (
        <View className='flex-1 justify-center items-center bg-mycolor1'>
            <Image source={require('../../assets/logo.png')} className='w-96 h-96' />
            <Text className='mt-4 text-2xl font-bold'>Ferhat.com</Text>
        </View>
    );
};

export default SplashScreen;
