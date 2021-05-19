import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minsToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);

  const interval = React.useRef(null);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minsToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minsToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  const mins = Math.floor(millis / 1000 / 60) % 60;
  const secs = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(mins)}:{formatTime(secs)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
