import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { useState } from "react";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validations";



type ContactProp = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {
  const navigation = useNavigation<ContactProp>();
  const { applied } = useTheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const {userData,setUserData} = useUserRegistration();

  const logo =
    applied === "dark"
      ? require("../../assets/chattyLogo.png")
      : require("../../assets/lightChattyLogo.png");

  return (
   
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        className="flex-1 justify-center items-center dark:bg-slate-950"
      >
        <SafeAreaView className="justify-center items-center p-5">
          <StatusBar />

          <Image source={logo} className="h-40 w-36" />
          <View className="w-full justify-start items-start">
            <Text className="font-bold text-slate-500 dark:text-slate-100">
              Create your account and start conversation today !
            </Text>
          </View>

          <View className="self-stretch">
            <View className="w-full my-3">
              <FloatingLabelInput
                style={{ borderWidth: 2, borderColor: "#fde68a" }}
                label={"Enter your first name"}
                value={userData.firstName}
                onChangeText={(text)=>{
                  setUserData((previous)=>({
                    ...previous,
                    firstName:text,
                  }));
                }}
                containerStyles={{
                  borderWidth: 3, borderColor: "#fccb05",
                  height:55,
                  borderRadius:8,
                  padding:6,
                }}
                inputStyles={{
                  color:"#000"
                }}
              />
            </View>
            <View className="w-full my-3">
              <FloatingLabelInput
                style={{ borderWidth: 2, borderColor: "#fde68a" }}
                label={"Enter your last name"}
                value={userData.lastName}
                onChangeText={(text)=>{
                  setUserData((previous)=>({
                    ...previous,
                    lastName:text,
                  }))
                }}
                containerStyles={{
                  borderWidth: 3, borderColor: "#fccb05",
                  height:55,
                  borderRadius:8,
                  padding:6,
                }}
                inputStyles={{
                  color:"#000"
                }}
              />
            </View>
          </View>
        </SafeAreaView>

        <View className="w-full p-5">
          <Pressable
            className="bg-yellow-400 h-14 justify-center items-center rounded-full"
            onPress={() => {
             let validFirstName = validateFirstName(userData.firstName);
             let validLastName = validateLastName(userData.lastName);
             if(validFirstName){
              Toast.show({
                type:ALERT_TYPE.WARNING,
                title:"Warning",
                textBody:validFirstName,
              })
             }else if(validLastName){
              Toast.show({
                type:ALERT_TYPE.WARNING,
                title:"Warning",
                textBody:validLastName,
              })
             }else{
              navigation.replace("ContactScreen");
             }
            }}
          >
            <Text className="text-slate-950 dark:text-slate-100 font-bold text-2xl">
              Next
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
   
  );
}
