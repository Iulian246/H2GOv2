import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import BurgerButton from "../../components/BurgerButton";
import { Link, Redirect, useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

const Explore = () => {
  const { user } = useGlobalContext();

  if (user == null) return <Redirect href="/" />;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = 256; // Define the width of the sidebar
  const sidebarAnimation = useRef(new Animated.Value(-sidebarWidth)).current; // Start sidebar off-screen

  const [initialRegion, setInitialRegion] = useState(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const clearSession = async () => {
    // console.log(user);
    await signOut();
    router.replace("/");
  };

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.timing(sidebarAnimation, {
      toValue: 0, // Animate to visible on screen
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnimation, {
      toValue: -sidebarWidth, // Animate back to off-screen
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSidebarOpen(false));
  };

  return (
    <SafeAreaView className="bg-slate-200 dark:bg-slate-900 flex-1">
      {isSidebarOpen && (
        <TouchableOpacity
          className="absolute w-full h-full z-10"
          onPress={closeSidebar}
          activeOpacity={1}
        >
          <View className="absolute w-full h-full bg-transparent" />
        </TouchableOpacity>
      )}
      <View className="flex-1">
        {initialRegion ? (
          <MapView
            className="flex-1"
            initialRegion={initialRegion}
            showsUserLocation
          >
            <Marker coordinate={initialRegion} />
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
        <View className="absolute top-2 left-2 z-20">
          <BurgerButton handlePress={toggleSidebar} />
        </View>
      </View>
      <Animated.View
        style={{
          transform: [{ translateX: sidebarAnimation }],
        }}
        className="absolute left-0 top-0 bottom-0 w-64 bg-[#134A71] rounded-tr-lg rounded-br-lg p-5 z-20"
      >
        {/* Sidebar content */}
        <View className="flex-row justify-between top-10">
          <View className="flex-col">
            <Text className="text-white font-pmedium text-xl">
              {user.firstName}
            </Text>
            <Link
              href="/profile"
              className="text-blue-500 underline font-pmedium text-sm"
            >
              Edit profile
            </Link>
          </View>
          <View className="w-10 h-10 rounded-full flex justify-center items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="w-[90%] h-[90%] rounded-full"
              resizeMode="cover"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => { router.push('/purchases') }}
          activeOpacity={0.7}
          className="flex-row mt-16 items-center"
        >
          <Octicons name="checklist" size={24} color="white" />
          <Text className="text-white text-lg font-pregular ml-2">
            Comenzile mele
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push('/support') }}
          activeOpacity={0.7}
          className="flex-row mt-6 items-center"
        >
          <AntDesign name="customerservice" size={24} color="white" />
          <Text className="text-white text-lg font-pregular ml-2">
            Suport
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { router.push('/about') }}
          activeOpacity={0.7}
          className="flex-row mt-6 items-center"
        >
          <Feather name="info" size={24} color="white" />
          <Text className="text-white text-lg font-pregular ml-2">
            Despre
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Explore;
