

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { useState } from "react";
import { TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";


type ContactProp = NativeStackNavigationProp<RootStack,"ContactScreen">;


export default function ContactScreen() {

    const navigation = useNavigation<ContactProp>();

    const [show,setShow] = useState(false);
    const [countryCode,setCountryCode] = useState<CountryItem | null>(null);


  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <View className="p-5 items-center">
          <Image
            source={require("../../assets/lightChattyLogo.png")}
            className="h-40 w-36"
          />

          <Text className="text-slate-600 font-bold mt-4 text-center">
            We use your contacts to help find friends who are already on the
            app. Your contacts stay private.
          </Text>

          <View className="mt-5 w-full">
            <Pressable
            className="w-full justify-center items-center flex-row h-16 border-b-2 border-b-green-600"

            >
                <Text className="font-bold text-lg">Select Country</Text>
               <AntDesign name="caret-down" size={20} color="black" style={{marginTop:5,marginLeft:5}} />

            </Pressable>

            <CountryPicker
            show={show}
             lang="en"
             pickerButtonOnPress={(item)=>{
                setCountryCode(item);
                setShow(true);
                
             }}
             onBackdropPress={()=>setShow(false)}
             style={{
                modal:{height:400},
             }}
            />

            <View className="mt-2 flex flex-row justify-center">
                <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-green-600 w-[18%]"
                placeholder="+94"
                 />
                <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-green-600 w-[80%] ml-2"
                placeholder="## ### ####"
                 />
            </View>
        </View>

        <View className="mt-20 w-full">
            <Pressable className="justify-center items-center bg-green-600 h-14 rounded-full"
            onPress={()=>{
            navigation.replace("AvatarScreen");
            }}
            >
                <Text className="text-xl font-bold text-slate-50">Next</Text>
            </Pressable>

        </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
