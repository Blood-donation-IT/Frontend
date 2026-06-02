import React, { forwardRef } from 'react';
import MapView, { Marker, MapViewProps } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface Point {
  id: string;
  coords: { latitude: number; longitude: number };
  title: string;
}

interface UniversalMapProps extends MapViewProps {
  points: Point[];
  selectedLocation: string;
  onSelectPoint: (point: Point) => void;
}

const UniversalMap = forwardRef<MapView, UniversalMapProps>(({ points, selectedLocation, onSelectPoint, style, ...props }, ref) => {
  return (
    <MapView
      ref={ref}
      style={[styles.map, style]}
      scrollEnabled
      zoomEnabled
      rotateEnabled={false}
      pitchEnabled={false}
      {...props}
    >
      {points.map((point) => (
        <Marker
          key={point.id}
          coordinate={point.coords}
          title={point.title}
          onPress={() => onSelectPoint(point)}
          pinColor={point.title === selectedLocation ? "#E66A6A" : "#E66A6A80"}
        />
      ))}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: { flex: 1 },
});

export default UniversalMap;