import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

// Додаємо export default, щоб можна було імпортувати в екран Registration
export default function AnimatedBar({ value, isSelected, index }) {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
        
    Animated.timing(animatedHeight, {
      toValue: value,
      duration: 300,
      delay: index * 50,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.barColumn}>
      <Animated.View
        style={[
          styles.bar,
          {
            height: animatedHeight.interpolate({
              inputRange: [0, 5],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp',
            }),
            backgroundColor: isSelected 
              ? '#A784FF'
              : (index % 2 === 0 ? '#f07676' : '#ffabaa'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barColumn: { 
    flex: 1, 
    alignItems: 'center', 
    height: '100%', 
    justifyContent: 'flex-end' 
  },
  bar: { 
    width: '85%', 
    maxWidth: 30,
    borderTopLeftRadius: 6, 
    borderTopRightRadius: 6 
  },
});