import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ShopListScreen from '../screens/ShopListScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import MyShopList from '../screens/MyShopList';
import createShop from '../screens/CreateShop';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator initialRouteName="TabOne" tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-cart" color={color} />,
          title: 'Shops',
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-grid" color={color} />,
          title: 'My Shops',
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="ShopList"
        component={ShopListScreen}
        options={{ headerTitle: 'Shops', headerTitleContainerStyle: { alignItems: 'center' } }}
      />
      {/* <TabOneStack.Screen
        name="shopView"
        component={ShopView}
        options={({ route }) => ({ headerTitle: route.params.title })}
      /> */}
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="MyShopList"
        component={MyShopList}
        options={{ headerTitle: 'My Shops', headerTitleContainerStyle: { alignItems: 'center' } }}
      />
      <TabTwoStack.Screen name="CreateShop" component={createShop} options={{ headerTitle: 'Make a Shop' }} />
      {/* <TabTwoStack.Screen
        name="ShopView"
        component={ShopView}
        options={({ route }) => ({ headerTitle: route.params.title })}
      />
      <TabTwoStack.Screen name="AddProducts" component={AddProducts} options={{ headerTitle: 'Add Products' }} /> */}
    </TabTwoStack.Navigator>
  );
}
