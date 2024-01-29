/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet, Text, View

} from "react-native";


import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Devices from "./components/Devices";
import Connection from "./components/Connection";


const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {


  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide()
  }, []);



  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Devices" component={Devices}  options={{tabBarIconStyle: {display: 'none'}, tabBarLabelStyle: {color: 'black', fontWeight: 'bold', fontSize: 20,display: 'flex',flexDirection: 'row',flex: 1, justifyContent: 'center', padding: 10, alignItems: 'center', backgroundColor: '#d6d2d2', width: '100%', borderWidth: 1}}}/>
        <Tab.Screen name="Connection" component={Connection} options={{tabBarIconStyle: {display: 'none'}, tabBarLabelStyle: {color: 'black', fontWeight: 'bold', fontSize: 20,display: 'flex',flexDirection: 'row',flex: 1, justifyContent: 'center', padding: 10, alignItems: 'center', backgroundColor: '#d6d2d2', width: '100%', borderWidth: 1}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
