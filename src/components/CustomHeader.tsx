import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


interface CustomHeaderProps {
    title: string;
    onBackPress?: () => void;
    logo?: boolean;
    rightButtonText?: string;
    onRightPress?: () => void;
}

const CustomHeader = ({ title, logo, onBackPress, onRightPress, rightButtonText }: CustomHeaderProps) => {
    return (
        <View className='flex-row items-center flex justify-between px-4 pt-10 bg-mycolor2 h-28 show-md
        top-0 left-0 z-10' >
            <View>

                {logo ? (
                    <View className='bg-mycolor1 rounded-lg'>
                        <Image source={require('../../assets/logo.png')} className='w-12 h-12 p-3' />
                    </View>
                ) : onBackPress ? (
                    <TouchableOpacity onPress={onBackPress} className='mr-2'>
                        <Ionicons name="arrow-back" size={24} color='#fff' />
                    </TouchableOpacity>
                ) : null}

            </View>
            <View className='flex-1 items-center'>
                <Text className='text-lg font-bold text-center text-white'>{title}</Text>
            </View>
            {rightButtonText && (
                <TouchableOpacity onPress={onRightPress}>
                    <Text className="text-white">{rightButtonText}</Text>

                </TouchableOpacity>

            )}



        </View>
    )
}

export default CustomHeader