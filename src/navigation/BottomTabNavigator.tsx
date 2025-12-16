import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GetBookScreen from "../screens/GetBookScreen";
import BookScreen from "../screens/BookScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  // Стейт для відстеження, чи кнопка активована
  const [isGetBookActive, setIsGetBookActive] = useState(false);

  // Хендлер для активації після 5 кліків
  const handleActivateGetBook = () => {
    setIsGetBookActive(true);
  };

  function CustomTabBar({ state, descriptors, navigation }) {
    const activeRouteName = state.routes[state.index].name;

    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused =
            state.index === index ||
            (route.name === "GetDonorBook" && activeRouteName === "BookScreen");

          let iconSource;
          if (route.name === "Home") {
            iconSource = isFocused
              ? require("../images/home-active.png")
              : require("../images/home.png");
          } else if (route.name === "GetDonorBook") {
            iconSource = isFocused
              ? require("../images/bookIcon.png")
              : require("../images/whiteBookIcon.png");
          } else if (route.name === "Profile") {
            iconSource = isFocused
              ? require("../images/profile-active.png")
              : require("../images/profile.png");
          }

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!event.defaultPrevented) {
              if (route.name === "GetDonorBook") {
                // Якщо кнопка ще не активована, йдемо на GetBookScreen
                if (!isGetBookActive) {
                  navigation.navigate("GetDonorBook", {
                    activateCallback: handleActivateGetBook,
                  });
                } else {
                  // Якщо вже активована, перекидаємо на BookScreen
                  navigation.navigate("BookScreen");
                }
              } else if (route.name === "Profile" || route.name === "Home") {
                navigation.navigate(route.name);
              }
            }
          };

          // Не показувати кнопку BookScreen на таббарі
          if (route.name === "BookScreen") return null;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <Image source={iconSource} style={{ width: 28, height: 28 }} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="GetDonorBook">
        {(props) => <GetBookScreen {...props} activateCallback={handleActivateGetBook} />}
      </Tab.Screen>
      <Tab.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#2B2B2B",
    marginBottom: 20,
    borderRadius: 33,
    paddingVertical: 15,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});
