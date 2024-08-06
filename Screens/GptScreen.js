import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  FlatList,
} from 'react-native';
import TypeWriterEffect from 'react-native-typewriter-effect';
import {useWindowDimensions} from 'react-native';
import {REACT_APP_OPENAI_KEY} from '@env';
import MovieCard from '../components/movieCard';
import { useDispatch, useSelector } from 'react-redux';

export default function ChatGPT() {
  const windowHeight = useWindowDimensions().height;
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movieData,setMovieData]=useState([])
  const [text, setText] = useState(
    'Ask anything related to your movie choice we will respond you...',
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDarkMode(!theme)
  }, [theme]);

  const themeHandler = () => {
    setIsDarkMode(!theme)
    dispatch(toggleTheme());
  };

  const fetchMoviesFromTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
        {
          headers: {
            accept: 'application/json',
            Authorization:
              `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
          },
        },
    );
    const json = await data.json();
    return json;
  };

  async function EventHandler() {
    if (!searchText.trim()) {
      Alert.alert('Please enter a query');
      return;
    }
    setIsLoading(true);
    try {
      const gptQuery =
        'Act as a movie recommendation system and suggest some movies for the query ' +
        searchText +
        ' only give me the name of 5 movies, commas separated like example given ahead. Example Result : gadar2, sholay, golmal, koi mil gaya, kaho na pyar hai';
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            messages: [{role: 'user', content: gptQuery}],
            model: 'gpt-3.5-turbo',
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const moviesArray = data.choices[0].message.content.split(',')
      const promiseArray = moviesArray.map((movies) =>
        fetchMoviesFromTMDB(movies)
      );
  
      const moviesDetails = await Promise.all(promiseArray);
      setMovieData(moviesDetails[0]?.results)

    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = text => {
    setSearchText(text);
  };

  return (
    <View style={{flex: 1,backgroundColor: isDarkMode ? 'black' : 'white'}}>
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <TextInput
          style={{
            borderColor: !isDarkMode ? 'black' : 'white',
            borderWidth: 1,
            marginHorizontal: 4,
            paddingHorizontal: 10,
            color: !isDarkMode ? 'black' : 'white',
            fontSize: 20,
          }}
          onChangeText={handleChange}
          value={searchText}
          placeholder="Enter your query..."
          placeholderTextColor={!isDarkMode ? 'black' : 'white'}
        />
        <Pressable
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}
          onPress={EventHandler}
          disabled={isLoading}>
          <Text
            style={{
              width: 200,
              backgroundColor: isLoading ? 'gray' : 'red',
              paddingVertical: 10,
              fontSize: 18,
              fontWeight: '600',
              textAlign: 'center',
              borderRadius: 5,
              marginTop: 10,
            }}>
            {isLoading ? 'Loading...' : 'Search'}
          </Text>
        </Pressable>
        {movieData?.length==0 && <TypeWriterEffect
            delay={1}
            style={{color: !isDarkMode ? 'black' : 'white', fontSize: 20, lineHeight: 30}}
            content={text}
          />}
        {movieData?.length>0 && <ScrollView
          style={{
            height: windowHeight - 200,
            paddingTop: 10,
            paddingBottom: 20,
          }}>
          <FlatList
          style={{marginLeft: 5}}
          horizontal
          data={movieData}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            item?.poster_path ? ( 
              <MovieCard
                title={item?.title}
                poster_path={item?.poster_path}
                // isDarkMode={isDarkMode}
                movieId={item?.id}
              />
            ) : null
          }
        />
        </ScrollView>}
      </View>
    </View>
  );
}
