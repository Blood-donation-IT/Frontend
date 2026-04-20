import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { View, StyleSheet, Platform } from 'react-native';

// Виправляємо іконки
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Point {
  id: string;
  coords: { latitude: number; longitude: number };
  title: string;
}

interface UniversalMapProps {
  points: Point[];
  selectedLocation: string;
  onSelectPoint: (point: Point) => void;
  style?: any;
}

const UniversalMap = forwardRef<any, UniversalMapProps>(({ points, selectedLocation, onSelectPoint, style }, ref) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  const defaultCenter: [number, number] = [49.8397, 24.0297];
  const initialCenter: [number, number] = points.length > 0 
    ? [points[0].coords.latitude, points[0].coords.longitude] 
    : defaultCenter;

  // ОСЬ ТУТ МАГІЯ: Прописуємо метод, який ти викликаєш у handleSelectPoint
  useImperativeHandle(ref, () => ({
    animateToRegion: (coords: any) => {
      if (mapInstance) {
        // Leaflet використовує flyTo для плавного переміщення
        mapInstance.flyTo([coords.latitude, coords.longitude], 15, {
          animate: true,
          duration: 1.5
        });
      }
    },
    fitToCoordinates: (coords: any) => {
      if (mapInstance && coords.length > 0) {
        const bounds = L.latLngBounds(coords.map((c: any) => [c.latitude, c.longitude]));
        mapInstance.fitBounds(bounds, { padding: [50, 50] });
      }
    },
  }));

  if (Platform.OS !== 'web') return null;

  return (
    <View style={[styles.mapContainer, style]}>
      <MapContainer 
        center={initialCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        // Зберігаємо екземпляр карти, щоб керувати ним
        ref={setMapInstance}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point) => (
          <Marker 
            key={point.id} 
            position={[point.coords.latitude, point.coords.longitude]}
            eventHandlers={{
              click: () => onSelectPoint(point),
            }}
          >
            <Popup>{point.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default UniversalMap;