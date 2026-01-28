import 'dotenv/config';

export default {
  "expo": {
    "name": "MyApp",
    "slug": "MyApp",
    "scheme": "myapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.dmytro228.MyApp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.dmytro228.MyApp",
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_API_KEY
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-localization",
      "expo-web-browser",
      "expo-secure-store"
    ],
    "extra": {
      webClientId: process.env.WEB_CLIENT_ID,
      "eas": {
        "projectId": "e2a65ec1-6d13-4dcc-b092-146d38800bcd"
      }
    }
  }
}
