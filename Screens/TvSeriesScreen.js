import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import axios from 'axios';
  import MovieCard from '../components/movieCard';
  import VideoBackground from '../components/VideoPlayer';
  import {useDispatch, useSelector} from 'react-redux';
  import {FullScreen} from '../components/ActivityIndicatorApp';
  import Footer from '../components/Footer';
import TvSeriesVideo from '../components/TvSeriesVideo';
  
  export default function TvSeriesScreen() {
    const [popularData, setPopularData] = useState([]);
    const [airingTodayData, setAiringTodayData] = useState([]);
    const [topRatedData, setTopRatedData] = useState([]);
    const [onTheAirData, setOnTheAirData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [movieId, setMovieId] = useState(null);
    const theme = useSelector((state) => state?.theme?.isDarkMode);
    const dispatch = useDispatch();
  
    useEffect(() => {
      setIsDarkMode(!theme);
    }, [theme]);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('my-key');
          console.log("value from all",value)
          if (value == null) {
            navigation.navigate('Authenticate');
          }
          if(value=="") navigation.navigate('Authenticate');
          if(value==undefined) navigation.navigate('Authenticate');
        } catch {}
      };
      getData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
            {
              headers: {
                accept: 'application/json',
                Authorization:
                  `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
              },
            },
          );
          setOnTheAirData(response.data.results);
          setMovieId(response.data.results[0]?.id);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
            {
              headers: {
                accept: 'application/json',
                Authorization:
                  `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
              },
            },
          );
          setAiringTodayData(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
            {
              headers: {
                accept: 'application/json',
                Authorization:
                  `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
              },
            },
          );
          setPopularData(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
            {
              headers: {
                accept: 'application/json',
                Authorization:
                  `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
              },
            },
          );
          setTopRatedData(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    if (popularData.length==0 || topRatedData.length==0 || onTheAirData.length==0 || airingTodayData.length==0) {
      return <FullScreen />;
    }
  
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: isDarkMode ? 'black' : 'white'}}>
        <View style={{width: '100%', height: 230}}>
          {movieId && <TvSeriesVideo movieId={movieId} />}
        </View>
        <View>
          <View>
            <Text
              style={{
                color: !isDarkMode ? 'black' : 'white',
                fontSize: 28,
                fontWeight: 600,
                marginLeft: 10,
                marginBottom: 10,
              }}>
              Airing Today
            </Text>
          </View>
          <FlatList
            style={{marginLeft: 5}}
            horizontal
            data={airingTodayData}
            keyExtractor={item => item?.poster_path}
            renderItem={({item}) =>
              item?.poster_path ? ( // Use a conditional statement without curly braces
                <MovieCard
                  title={item?.title}
                  poster_path={item?.poster_path}
                  isDarkMode={isDarkMode}
                  movieId={item?.id}
                  isMovie={false}
                />
              ) : null
            }
          />
        </View>
        <View>
          <View>
            <Text
              style={{
                color: !isDarkMode ? 'black' : 'white',
                fontSize: 28,
                fontWeight: 600,
                marginLeft: 10,
                marginBottom: 5,
                marginTop: 15,
              }}>
              On The Air
            </Text>
          </View>
          <FlatList
            style={{marginLeft: 5}}
            horizontal
            data={onTheAirData}
            keyExtractor={item => item?.poster_path}
            renderItem={({item}) =>
              item?.poster_path ? ( // Use a conditional statement without curly braces
                <MovieCard
                  title={item?.title}
                  poster_path={item?.poster_path}
                  isDarkMode={isDarkMode}
                  movieId={item?.id}
                  isMovie={false}
                />
              ) : null
            }
          />
        </View>
        <View>
          <View>
            <Text
              style={{
                color: !isDarkMode ? 'black' : 'white',
                fontSize: 28,
                fontWeight: 600,
                marginLeft: 10,
                marginBottom: 10,
                marginTop: 15,
              }}>
              Top Rated
            </Text>
          </View>
          <FlatList
            style={{marginLeft: 5}}
            horizontal
            data={topRatedData}
            keyExtractor={item => item?.poster_path}
            renderItem={({item}) =>
              item?.poster_path ? ( // Use a conditional statement without curly braces
                <MovieCard
                  title={item?.title}
                  poster_path={item?.poster_path}
                  isDarkMode={isDarkMode}
                  movieId={item?.id}
                  isMovie={false}
                />
              ) : null
            }
          />
        </View>
        <View>
          <View>
            <Text
              style={{
                color: !isDarkMode ? 'black' : 'white',
                fontSize: 28,
                fontWeight: 600,
                marginLeft: 10,
                marginBottom: 10,
                marginTop: 15,
              }}>
              Popular
            </Text>
          </View>
          <FlatList
            style={{marginLeft: 5}}
            horizontal
            data={popularData}
            keyExtractor={item => item?.poster_path}
            renderItem={({item}) =>
              item?.poster_path ? ( // Use a conditional statement without curly braces
                <MovieCard
                  title={item?.title}
                  poster_path={item?.poster_path}
                  isDarkMode={isDarkMode}
                  movieId={item?.id}
                  isMovie={false}
                />
              ) : null
            }
          />
        </View>
        <View style={{paddingTop:20}}>
          <Footer />
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({});
  