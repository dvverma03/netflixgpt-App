import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function TvSeriesVideo({ movieId }) {
  const [playing, setPlaying] = useState(false);
  const [youtubeId, setYoutubeId] = useState("");

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
            },
          }
        );

        const json = response.data;
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        
        setYoutubeId(trailer?.key);
      } catch (error) {
        console.error("Error fetching trailer video:", error);
      }
    };

    if (movieId) {
      getMovieVideos();
    }
  }, [movieId]);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
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
