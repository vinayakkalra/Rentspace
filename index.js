/**
 * @format
 */
import 'react-native-polyfill-globals/auto';
import 'react-native-fetch-api';
import 'fast-text-encoding';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Main from './src/app/Main';
import BottomNav from './src/components/BottomNav';
import Profile from './src/app/Profile';
import  Store  from './src/redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['rentspace://'],
};

const RootComponent: React.FC = () => {
  return (
    <Provider store={Store}>
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen options={{headerShown:false}} name="Launch" component={Main} />
        <Stack.Screen options={{headerShown:false}} name='profile' component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
