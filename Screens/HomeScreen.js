import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Earn from '../assets/images/Earn.webp';
import Trade from '../assets/images/Trade.jpg';
import Illustration from '../assets/images/Illustration.png';
import Home from '../assets/images/Home.webp';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import {toggleTheme} from '../store/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';

export default function HomeSreen(props) {
  const navigation = useNavigation();
  const {user} = useSelector(store => store.user);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = useSelector((state) => state?.theme?.isDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDarkMode(!theme)
  }, [theme]);

  const themeHandler = () => {
    setIsDarkMode(!theme?.isDarkMode)
    dispatch(toggleTheme());
  };

  useEffect(()=>{
    const fun=async()=>{

      try{
        const key= await AsyncStorage.getItem("my-key")
        console.log("value from home",key)
        if(key!=null) navigation.navigate("Main")
      }catch(error){
          
      }
    }
    fun()
  },[])


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
          options,
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode ? 'black' : 'white',
        flex: 1,
        paddingBottom: 30,
      }}>
      <View style={{flex: 1, marginTop: 55, marginLeft: 10, marginBottom: 30}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Icon name="rocket" size={30} color="#900" />
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 7,
                  color: !isDarkMode ? 'black' : 'white',
                }}>
                Hii {user?.fullName},
              </Text>
            </View>
            <Pressable
              onPress={themeHandler}
              style={{
                backgroundColor: '#35434D',
                padding: 5,
                borderRadius: 25,
                marginRight: 20,
              }}>
              {!isDarkMode ? (
                <Icon2 name="moon" size={35} color="white" />
              ) : (
                <Icon2 name="sun" size={35} color="white" />
              )}
            </Pressable>
          </View>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 7,
              color: !isDarkMode ? 'black' : 'white',
              marginBottom: 30,
            }}>
            Welcome to Netflix GPT
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 42,
              paddingHorizontal: 16,
              textAlign: 'center',
              fontWeight: 600,
              lineHeight: 60,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Your personalized
          </Text>
          <Text
            style={{
              fontSize: 35,
              paddingHorizontal: 16,
              textAlign: 'center',
              fontWeight: 600,
              lineHeight: 50,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            movie and TV show
          </Text>
          <Text
            style={{
              fontSize: 35,
              paddingHorizontal: 16,
              textAlign: 'center',
              fontWeight: 600,
              lineHeight: 40,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            companion
          </Text>
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 30,
              textAlign: 'center',
              paddingTop: 20,
              lineHeight: 30,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Discover Your Next Favorite Movie or TV Show
          </Text>
        </View>
        <View></View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Pressable
            onPress={() => navigation.navigate('SignIn')}
            style={{justifyContent: 'center'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: 250,
                paddingVertical: 5,
                fontSize: 20,
                textAlign: 'center',
                borderRadius: 10,
                color: !isDarkMode ? 'black' : 'white',
              }}>
              Start Exploring
            </Text>
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginTop: 20,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            No Waitlist - available for download
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image style={{width: '100%', height: 250}} source={Trade} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              marginTop: 20,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Accessible to Anyone
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              lineHeight: 25,
              paddingTop: 15,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Stream and watch your favorite films
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              lineHeight: 25,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            with ease and convenience.
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              lineHeight: 25,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            {' '}
            Discover a world of cinematic magic at your fingertips.
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              lineHeight: 15,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            {' '}
            Start your movie adventure today with just a few clicks.
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image
            style={{width: '92%', height: 700, borderRadius: 60}}
            source={Home}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 30,
              paddingHorizontal: 20,
              textAlign: 'center',
              fontWeight: 600,
              marginTop: 30,
              lineHeight: 50,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Unlock Exclusive Content with Every Watch.
          </Text>
          <Text
            style={{
              fontSize: 21,
              paddingHorizontal: 30,
              textAlign: 'center',
              lineHeight: 28,
              marginTop: 20,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Enjoy bonus features and special access to premium content by
            streaming movies on our app — including many of your favorite
            titles!
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image
            style={{width: '95%', height: 450, justifyContent: 'center'}}
            source={Earn}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Pressable
            onPress={() => navigation.navigate('SignIn')}
            style={{justifyContent: 'center', width: '90%'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: '100%',
                paddingVertical: 5,
                fontSize: 20,
                textAlign: 'center',
                borderRadius: 10,
                color: !isDarkMode ? 'black' : 'white',
              }}>
              Start exploring
            </Text>
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 35,
              paddingHorizontal: 20,
              textAlign: 'center',
              fontWeight: 600,
              marginTop: 30,
              lineHeight: 50,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Join Our Team
          </Text>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 30,
              textAlign: 'center',
              fontWeight: 400,
              marginTop: 10,
              lineHeight: 20,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Each author receives dividends from Netflix GPT and subscribers
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 32,
              paddingHorizontal: 20,
              textAlign: 'center',
              fontWeight: 600,
              marginTop: 50,
              lineHeight: 45,
              color: !isDarkMode ? 'black' : 'white',
            }}>
            Our authors use all the Netflix GPT Tools for free
          </Text>
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              backgroundColor: 'black',
              width: '98%',
            }}>
            <Image source={Illustration} />
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Pressable
            onPress={() => navigation.navigate('SignIn')}
            style={{justifyContent: 'center', width: '90%'}}>
            <Text
              style={{
                borderColor: 'gray',
                borderWidth: 2,
                width: '100%',
                paddingVertical: 5,
                fontSize: 20,
                textAlign: 'center',
                borderRadius: 10,
                color: !isDarkMode ? 'black' : 'white',
              }}>
              Start exploring
            </Text>
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginTop: 25,
              color: !isDarkMode ? 'black' : 'white',
              marginBottom:40
            }}>
            Thanks for support
          </Text>
          <Footer/>
        </View>
      </View>
    </ScrollView>
  );
}
