import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View, useColorScheme } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import HtoGo from "../components/HtoGo";
import { signOut } from "../lib/appwrite";
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const clearSession = async () => {
    await signOut();
  };
  return (
    <SafeAreaView className="bg-slate-200 dark:bg-slate-900">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <View className="relative mt-2 mx-2">
            <HtoGo position="center" width="10px" height="10px" />
            <Text className="font-psemibold text-center text-lg text-slate-900 dark:text-slate-200">
              Descopera o noua cale de a achizitiona apa prin{" "}
              <Text className="text-blue-400">H2GO</Text>
            </Text>
          </View>
          <Text className="mt-4 text-sm text-center font-pregular text-slate-700 dark:text-slate-400">
            Unde venim cu o inovatie in comercializarea apei potabile
          </Text>
          <CustomButton
            title="Creaza un cont"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full mt-7 bg-blue-400 "
            textStyles="text-slate-200"
          />
          <CustomButton
            title="Logheaza-te"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7 bg-blue-400 "
            textStyles="text-slate-200"
          />
          <Text className="mt-7 text-center text-slate-500 dark:text-slate-400">
            SAU
          </Text>
          <CustomButton
            title={<AntDesign name="google" size={24} color="red" />}
            handlePress={clearSession}
            containerStyles="w-full mt-7 bg-white border-2 border-red-400 "
            textStyles="text-slate-800"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
