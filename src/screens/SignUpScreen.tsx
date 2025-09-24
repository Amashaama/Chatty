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
import { AlertNotificationRoot } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type ContactProp = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {
  const navigation = useNavigation<ContactProp>();
  const { applied } = useTheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const logo =
    applied === "dark"
      ? require("../../assets/chattyLogo.png")
      : require("../../assets/lightChattyLogo.png");

  return (
    <AlertNotificationRoot>
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
                value={firstName}
                onChangeText={setFirstName}
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
                value={lastName}
                onChangeText={setLastName}
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
              navigation.replace("ContactScreen");
            }}
          >
            <Text className="text-slate-950 dark:text-slate-100 font-bold text-2xl">
              Next
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
}
