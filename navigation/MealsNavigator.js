import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritiesScreen from '../screens/FavoritiesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import colors from '../constants/colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primaryColor : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primaryColor,
};

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: {
      headerTitle: 'Meal categories',
    },
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen,
}, {
  defaultNavigationOptions: defaultStackNavOptions,
});

const FavoritiesNavigator = createStackNavigator({
  Favorites: FavoritiesScreen,
  MealDetail: MealDetailScreen,
}, {
  defaultNavigationOptions: defaultStackNavOptions,
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: colors.primaryColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>Melas</Text> : 'Melas'
    },
  },
  
  Favorites: {
    screen: FavoritiesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: colors.accentColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>Favorities</Text> : 'Favorities'
    },
  },
};

const MealsFavTabNavigator = Platform.OS === 'android' 
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true,
    barStyle: {
      backgroundColor: colors.primaryColor,
    },
  })
  : createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-sans',
    },
    activeTintColor: 'white',
    shifting: false,
    barStyle: {
      backgroundColor: colors.primaryColor,
    },
  },
});

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
}, {
  navigationOptions: {
    drawerLabel: 'Filters'
  },
  defaultNavigationOptions: defaultStackNavOptions,
})

const MainNavigator = createDrawerNavigator({
  MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
    drawerLabel: 'Meals',  
  }},
  Filters: FiltersNavigator,
}, {
  contentOptions: {
    activeTintColor: colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans',
    },
  },
});

export default createAppContainer(MainNavigator);