import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PhotoScreen } from './ActivityIndicatorApp';

export default function MovieCard({poster_path,title,isDarkMode,movieId,isMovie}) {
  const navigation=useNavigation()
  return (
    <Pressable onPress={()=>navigation.navigate("Video",{"movieId":movieId,"isMovie":isMovie})}>
      {poster_path?<Image
        style={{
          width: 160,
          height: 220,
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        source={{
          uri: `https://image.tmdb.org/t/p/w185${poster_path}`,
        }}
      />:<PhotoScreen/>}
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: !isDarkMode ? 'black' : 'white',
          fontSize: 17,
          width: 160,
          fontWeight: 500,
          paddingTop: 5,
          marginHorizontal: 5,
        }}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
