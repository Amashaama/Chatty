import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { useState } from "react";
import { TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type ContactProp = NativeStackNavigationProp<RootStack, "ContactScreen">;


export default function ContactScreen() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<ContactProp>();

  const [countryCode, setCountryCode] = useState<CountryCode>("LK");
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <StatusBar hidden={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <View className="p-5 items-center">
          <View className="mt-5">
          <Image
            source={require("../../assets/lightChattyLogo.png")}
            className="h-40 w-36"
          />
          </View>

          <View className="mb-8 px-4">
            <Text className="text-slate-950 font-bold mt-4 text-center text-lg leading-6">
              Connect with Friends
            </Text>
            <Text className="text-slate-600 text-sm mt-2  text-center leading-5">
              We use your contacts to help find friends who are already on the
              app. Your contacts stay private and secure.
            </Text>
          </View>

          <View className="mt-5 w-full max-w-sm">
            <View className="bg-stone-700 rounded-2xl border-2 border-yellow-400 shadow-lg mb-4">
              <Pressable
                className="flex-row justify-center items-center px-4 py-4"
                onPress={() => setShow(true)}
              >
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCountryNameButton
                  withCallingCode
                 
                  visible={show}
                  onClose={() => {
                    setShow(false);
                  }}
                  onSelect={(c) => {
                    setCountryCode(c.cca2);
                    setCountry(c);
                    setShow(false);
                  }}
                  theme={{
                    onBackgroundTextColor:"#fde68a",
                    primaryColor:"#000000",
                     primaryColorVariant: "#000000", 
                      backgroundColor: "#1c1917",
                    
                  }

                  }
                />

                <AntDesign
                  name="caret-down"
                  size={20}
                  color="#fde68a"
                  style={{ marginTop: 5 }}
                  onPress={()=>{
                    setShow(true);
                  }}
                />
              </Pressable>
            </View>

            <View className="mt-2 w-full max-w-sm flex-row">
              <View className="bg-stone-700 rounded-2xl border-2 border-yellow-400 shadow-lg w-[20%]">
                <TextInput
                  inputMode="tel"
                  className="h-16 font-bold text-lg  text-center"
                  editable={false}
                  value={country ? `+${country.callingCode}`:`+94` }
                  
                  style={{color:"#fde68a"}}
                />
              </View>
              <View className="bg-stone-700 rounded-2xl border-2 border-yellow-400 shadow-lg w-[80%] ml-1">
                <TextInput
                  inputMode="tel"
                  className="h-16 font-bold text-lg ml-2"
                  placeholder="## ### ####"
                  placeholderTextColor="#fde68a"
                  style={{color:"#fde68a"}}
                />
              </View>
            </View>
          </View>

          <View className="mt-20 w-full">
            <Pressable
              className="justify-center items-center bg-yellow-400 h-14 rounded-full"
              onPress={() => {
                navigation.replace("AvatarScreen");
              }}
            >
              <Text className="text-xl font-bold text-slate-950">Next</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
