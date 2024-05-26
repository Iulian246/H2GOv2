import React, { useState, useRef } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Link, Redirect, useRouter } from "expo-router";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import HtoGo from "../../components/HtoGo";

const Purchases = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const router = useRouter();
  if (user == null) return <Redirect href="/" />;
  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-slate-200 dark:bg-slate-900 flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="min-h-[93vh] w-full flex flex-col justify-between px-4 mt-10">
          <View className="flex flex-col">
            <Text className="text-2xl font-pregular">Comenzile mele</Text>
            <View className="mt-10">
              <HtoGo />
            </View>
            {user.ordersList.length > 0 ? (
              user.ordersList.map((order, index) => (
                <Text key={index}>{order}</Text>
              ))
            ) : (
              <Text className="text-lg font-pmedium italic text-center mt-10">
                Nu aveti nici o comanda plasata.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Purchases;
