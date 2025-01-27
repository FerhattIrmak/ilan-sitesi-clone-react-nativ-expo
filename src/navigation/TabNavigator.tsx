import { View, Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShowcaseScreen from '../screens/ShowcaseScreen';
import SearchScreen from '../screens/SearchScreen';
import ServicesScreen from '../screens/ServicesScreen';
import PersonelizedScreen from '../screens/PersonelizedScreen';
import PostAdScreen from '../screens/PostAdScreen';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import SubCategoryProductsScreen from '../screens/SubCategoryProductsScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;

          if (route.name === "Showcase") {
            IconComponent = <Ionicons name="grid-outline" size={size} color={color} />;
          } else if (route.name === 'Search') {
            IconComponent = <Ionicons name="search-outline" size={size} color={color} />;
          } else if (route.name === 'Post Ad') {
            IconComponent = (
              <View style={styles.floatingButton}>
                <MaterialCommunityIcons name="plus" size={30} color="#FFF" />
              </View>
            );
          } else if (route.name === 'Services') {
            IconComponent = <FontAwesome name="circle-o" size={size} color={color} />;
          } else if (route.name === 'Personalized' || route.name === 'Login') {
            IconComponent = <Ionicons name="person-outline" size={size} color={color} />;
          }
          return IconComponent;
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#A1A1A1',
        tabBarStyle: {
          height: 60,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      })}
    >
      <Tab.Screen name="Showcase" component={ShowcaseScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Post Ad"
        component={PostAdScreen}
        options={{
          tabBarButton: (props) => {
            // Props'u explicitly tipleyerek ve sadece gerekli özellikleri alarak düzeltme
            const touchableProps: TouchableOpacityProps = {
              onPress: props.onPress,
              style: styles.postAdButton,
            };

            return (
              <TouchableOpacity {...touchableProps}>
                <View style={styles.plusButton}>
                  <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
                </View>
                <Text style={styles.postAdText}>Post Ad</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Personalized" component={PersonelizedScreen} />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarButton: () => null,  
          tabBarItemStyle: { display: 'none' }, 
        }}
      />



      <Tab.Screen
        name="SubCategoryScreen"
        component={SubCategoryScreen}
        options={{
          tabBarItemStyle: { display: 'none' }
        }}
      />

      <Tab.Screen
        name="CategoryProductsScreen"
        component={CategoryProductsScreen}
        options={{
          tabBarItemStyle: { display: 'none' }
        }}
      />

      <Tab.Screen
        name="SubCategoryProductsScreen"
        component={SubCategoryProductsScreen}
        options={{
          tabBarItemStyle: { display: 'none' }
        }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: -5,
    width: 64,
    height: 64,
    backgroundColor: "#002f5e", // mycolor2 değerinizi buraya yazın
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  postAdButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  plusButton: {
    width: 48,
    height: 48,
    backgroundColor: "#002f5e", // mycolor2 değerinizi buraya yazın
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,

  },
  postAdText: {
    color: "#002f5e", // mycolor2 değerinizi buraya yazın
    marginTop: -1,

  },
});

export default TabNavigator;