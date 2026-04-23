import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// import 'leaflet/dist/leaflet.css'; // ВАЖЛИВО: Імпорт стилів
import { View, StyleSheet, Platform } from 'react-native';


// динамічно підключаємо CSS для Leaflet в Web-версії, 
// щоб обійти баг компіляції в Expo/Metro
if (typeof window !== 'undefined') {
  const link = window.document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
  link.crossOrigin = '';
  window.document.head.appendChild(link);
}
// Виправляємо баг з іконками Leaflet у Webpack/Metro
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

// Компонент-помічник для центрування карти на вебі
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

// Створюємо кастомну іконку для вибраного маркера
const selectedIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', 
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'selected-marker-icon'
});

const UniversalMap = forwardRef<any, UniversalMapProps>(({ points, selectedLocation, onSelectPoint, style }, ref) => {
  // Визначаємо центр карти (або дефолтний, або перша точка)
  const defaultCenter: [number, number] = [49.8397, 24.0297]; // Наприклад, Львів
  const center: [number, number] = points.length > 0 
    ? [points[0].coords.latitude, points[0].coords.longitude] 
    : defaultCenter;

  // useImperativeHandle дозволяє нам імітувати методи react-native-maps (напр. fitToCoordinates)
  useImperativeHandle(ref, () => ({
    fitToCoordinates: (coords: any, options: any) => {
      console.log("fitToCoordinates (web implementation - placeholder)");
      // Тут можна додати логіку fitBounds через L.latLngBounds
    },
  }));

  if (Platform.OS !== 'web') return null; // Подвійна перевірка

  return (
    <View style={[styles.mapContainer, style]}>
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={center} />
        
        {/* Використовуємо безкоштовні тайли OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point) => (
          <Marker 
            key={point.id} 
            position={[point.coords.latitude, point.coords.longitude]}
            icon={point.title === selectedLocation ? selectedIcon : new L.Icon.Default()}
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