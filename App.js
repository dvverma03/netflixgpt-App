import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {enableScreens} from 'react-native-screens';
enableScreens();
import {Provider, useDispatch, useSelector} from 'react-redux';
import appStore from './store/appStore';
import AllVideoScreen from './Screens/AllVideoScreen';
import ChatGPT from './Screens/GptScreen';
import VideoScreen from './Screens/VideoScreen';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import 'react-native-gesture-handler';
import HomeSreen from './Screens/HomeScreen';
import OtpVerificationLogin from './Screens/OtpVerificationLogin';
import OtpVerification from './Screens/OtpVerification';
import { toggleTheme } from './store/themeSlice';
import { Pressable } from 'react-native';
import Icon2 from 'react-native-vector-icons/Feather';
import CustomDrawerContent from './components/CustomDrawer';
import TvSeriesScreen from './Screens/TvSeriesScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const themeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#E50914',
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
        drawerActiveBackgroundColor: 'red',
      }}>
      <Drawer.Screen
        options={{
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: 'white',
          headerTitle: '',
          headerRight: () => (
            <Pressable
              onPress={themeHandler}
              style={{
                backgroundColor: '#35434D',
                padding: 5,
                borderRadius: 25,
                marginRight: 20,
              }}>
              {isDarkMode ? (
                <Icon2 name="moon" size={35} color="white" />
              ) : (
                <Icon2 name="sun" size={35} color="white" />
              )}
            </Pressable>
          ),
        }}
        name="Movie"
        component={AllVideoScreen}
      />
      <Drawer.Screen
        options={{
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: 'white',
          headerTitle: '',
          headerRight: () => (
            <Pressable
              onPress={themeHandler}
              style={{
                backgroundColor: '#35434D',
                padding: 5,
                borderRadius: 25,
                marginRight: 20,
              }}>
              {isDarkMode ? (
                <Icon2 name="moon" size={35} color="white" />
              ) : (
                <Icon2 name="sun" size={35} color="white" />
              )}
            </Pressable>
          ),
        }}
        name="TV Series"
        component={TvSeriesScreen}
      />
      <Drawer.Screen
        options={{
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: 'white',
          headerTitle: '',
          headerRight: () => (
            <Pressable
              onPress={themeHandler}
              style={{
                backgroundColor: '#35434D',
                padding: 5,
                borderRadius: 25,
                marginRight: 20,
              }}>
              {isDarkMode ? (
                <Icon2 name="moon" size={35} color="white" />
              ) : (
                <Icon2 name="sun" size={35} color="white" />
              )}
            </Pressable>
          ),
        }}
        name="Ask GPT"
        component={ChatGPT}
      />
    </Drawer.Navigator>
  );
}

function Authenticate() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeSreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="OtpVerificationLogin"
        component={OtpVerificationLogin}
        options={{
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{
          headerStyle: {
            backgroundColor: '#E50914',
          },
          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Authenticate'}>
          <Stack.Screen
            name="Authenticate"
            options={{
              headerShown: false,
            }}
            component={Authenticate}
          />
          <Stack.Screen
            name="Main"
            component={MyDrawer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Video"
            component={VideoScreen}
            options={{
              headerStyle: {
                backgroundColor: '#E50914',
              },
              headerTintColor: 'white',
              headerTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
