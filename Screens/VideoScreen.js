import axios from 'axios';
import React, {useState, useCallback, useEffect} from 'react';
import {View, Alert} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { FullScreen } from '../components/ActivityIndicatorApp';

export default function VideoScreen(props) {
  const [playing, setPlaying] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const {movieId} = props.route.params;
  const {isMovie} = props.route.params;

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        let type = isMovie ? 'movie' : 'tv';
        console.log("params", movieId)
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${movieId}/videos?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization:
                `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
            },
          },
        );

        const json = response.data;
        const filterData = json.results.filter(
          video => video.type === 'Trailer',
        );
        const trailer = filterData.length ? filterData[0] : json.results[0];

        setYoutubeId(trailer?.key);
      } catch (error) {
        console.error('Error fetching trailer video:', error);
      }
    };

    if (movieId) {
      getMovieVideos();
    }
  }, [movieId]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  if(!youtubeId){
    return <FullScreen/>
  }

  return (
    <View>
      <YoutubePlayer
        height={220}
        play={playing}
        videoId={youtubeId}
        onChangeState={onStateChange}
      />
    </View>
  );
}
export function TvVideoScreen(props) {
  const [playing, setPlaying] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const {movieId} = props.route.params;

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization:
                `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
            },
          },
        );

        const json = response.data;
        const filterData = json.results.filter(
          video => video.type === 'Trailer',
        );
        const trailer = filterData.length ? filterData[0] : json.results[0];

        setYoutubeId(trailer?.key);
      } catch (error) {
        console.error('Error fetching trailer video:', error);
      }
    };

    if (movieId) {
      getMovieVideos();
    }
  }, [movieId]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={220}
        play={playing}
        videoId={youtubeId}
        onChangeState={onStateChange}
      />
    </View>
  );
}
