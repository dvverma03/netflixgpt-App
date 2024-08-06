import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// Adjust the path as needed

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation=useNavigation()

  const handleLogout = async() => {
    try {
        await AsyncStorage.removeItem('my-key');
        navigation.navigate("Authenticate")
      } catch (e) {
        Alert.alert("unable to logout")
        console.log(e)
      }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View>
        <Pressable
          onPress={handleLogout}
          style={{
            padding: 10,
            flexDirection:'row'
          }}>
          <Text style={{ color: 'white', fontSize:16, paddingLeft:8 }}>Logout</Text>
          <Icon name="logout" style={{padding:5}} size={15} color="white" />
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
