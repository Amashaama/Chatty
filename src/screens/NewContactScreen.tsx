import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, Text, TouchableOpacity, View, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { FloatingLabelInput } from "react-native-floating-label-input";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useSendNewContact } from "../socket/UseSendNewContact";
import {
  validateCountryCode,
  validateFirstName,
  validateLastName,
  validatePhoneNo,
} from "../util/Validations";
import { useTheme } from "../theme/ThemeProvider";

type NewContactScreenProp = NativeStackNavigationProp<
  RootStack,
  "NewContactScreen"
>;

export default function NewContactScreen() {
  const navigation = useNavigation<NewContactScreenProp>();
  const { applied } = useTheme();
  const isDark = applied === "dark";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: isDark ? "#000000" : "#ffffff",
      },
      headerLeft: () => (
        <View className="items-center flex-row gap-x-2">
          <TouchableOpacity
            className="justify-center items-center"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color={isDark ? "#fbbf24" : "#0f172a"}
            />
          </TouchableOpacity>
          <View className="flex-col">
            <Text
              className="text-lg font-bold"
              style={{ color: isDark ? "#ffffff" : "#0f172a" }}
            >
              Save New Contact
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation, isDark]);

  const [countryCode, setCountryCode] = useState<CountryCode>("LK");
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [callingCode, setCallingCode] = useState("+94");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const newContact = useSendNewContact();
  const sendNewContact = newContact.sendNewContact;
  const responseText = newContact.responseText;

  const sendData = () => {
    sendNewContact({
      id: 0,
      firstName: firstName,
      lastName: lastName,
      countryCode: callingCode,
      contactNo: phoneNo,
      createdAt: "",
      updatedAt: "",
      status: "",
    });
    setFirstName("");
    setLastName("");
    setCallingCode("+94");
    setPhoneNo("");
  };

  return (
     <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 73 : 100}
        className="flex-1"
      >
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000000" : "#ffffff"}
      />
      <View className="flex-1 px-5 py-6">
      
       

      
        <View
          className="flex-row items-center gap-x-3 h-16 px-4 rounded-xl mb-4 border"
          style={{
            backgroundColor: isDark ? "#1c1c1e" : "#f9fafb",
            borderColor: isDark ? "#2c2c2e" : "#e5e7eb",
          }}
        >
          <Feather
            name="user"
            size={22}
            color={isDark ? "#fbbf24" : "#f59e0b"}
          />
          <View className="flex-1 h-16">
            <FloatingLabelInput
              label="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              labelStyles={{
                color: isDark ? "#9ca3af" : "#64748b",
                fontSize: 14,
              }}
              inputStyles={{
                color: isDark ? "#ffffff" : "#0f172a",
                fontSize: 16,
                fontWeight: "600",
              }}
              containerStyles={{
                borderWidth: 0,
                paddingHorizontal: 0,
              }}
            />
          </View>
        </View>

       
        <View
          className="flex-row items-center gap-x-3 h-16 px-4 rounded-xl mb-4 border"
          style={{
            backgroundColor: isDark ? "#1c1c1e" : "#f9fafb",
            borderColor: isDark ? "#2c2c2e" : "#e5e7eb",
          }}
        >
          <Feather
            name="user"
            size={22}
            color={isDark ? "#fbbf24" : "#f59e0b"}
          />
          <View className="flex-1 h-16">
            <FloatingLabelInput
              label="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              labelStyles={{
                color: isDark ? "#9ca3af" : "#64748b",
                fontSize: 14,
              }}
              inputStyles={{
                color: isDark ? "#ffffff" : "#0f172a",
                fontSize: 16,
                fontWeight: "600",
              }}
              containerStyles={{
                borderWidth: 0,
                paddingHorizontal: 0,
              }}
            />
          </View>
        </View>

        
        <TouchableOpacity
          className="flex-row justify-between items-center h-16 px-4 rounded-xl mb-4 border"
          style={{
            backgroundColor: isDark ? "#1c1c1e" : "#f9fafb",
            borderColor: isDark ? "#2c2c2e" : "#e5e7eb",
          }}
          onPress={() => setShow(true)}
        >
          <View className="flex-row items-center gap-x-3">
            <Ionicons
              name="globe-outline"
              size={22}
              color={isDark ? "#fbbf24" : "#f59e0b"}
            />
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
                setCallingCode(`+${c.callingCode[0]}`);
                setShow(false);
              }}
              theme={
                isDark
                  ? {
                      backgroundColor: "#1c1c1e",
                      onBackgroundTextColor: "#ffffff",
                      fontSize: 16,
                      filterPlaceholderTextColor: "#9ca3af",
                    }
                  : undefined
              }
            />
          </View>
          <AntDesign
            name="caret-down"
            size={14}
            color={isDark ? "#9ca3af" : "#64748b"}
          />
        </TouchableOpacity>

        
        <View
          className="flex-row items-center gap-x-3 h-16 px-4 rounded-xl mb-6 border"
          style={{
            backgroundColor: isDark ? "#1c1c1e" : "#f9fafb",
            borderColor: isDark ? "#2c2c2e" : "#e5e7eb",
          }}
        >
          <Feather
            name="phone"
            size={22}
            color={isDark ? "#fbbf24" : "#f59e0b"}
          />
          <View className="items-center justify-center px-2 w-20">
            <Text
              className="font-bold text-base"
              style={{ color: isDark ? "#fbbf24" : "#f59e0b" }}
            >
              {country ? `+${country.callingCode}` : callingCode}
            </Text>
          </View>
          <View
            className="h-12 w-px"
            style={{ backgroundColor: isDark ? "#2c2c2e" : "#e5e7eb" }}
          />
          <View className="flex-1 h-16 ml-2">
            <FloatingLabelInput
              label="Phone Number"
              inputMode="tel"
              value={phoneNo}
              onChangeText={(text) => setPhoneNo(text)}
              labelStyles={{
                color: isDark ? "#9ca3af" : "#64748b",
                fontSize: 14,
              }}
              inputStyles={{
                color: isDark ? "#ffffff" : "#0f172a",
                fontSize: 16,
                fontWeight: "600",
              }}
              containerStyles={{
                borderWidth: 0,
                paddingHorizontal: 0,
              }}
            />
          </View>
        </View>

     
        <Pressable
          className="bg-yellow-400 h-16 items-center justify-center rounded-2xl mt-4 border-2 border-yellow-300"
          style={{
            shadowColor: "#f59e0b",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={() => {
            const firstNameValid = validateFirstName(firstName);
            const lastNameValid = validateLastName(lastName);
            const countryCodeValid = validateCountryCode(callingCode);
            const phoneNoValid = validatePhoneNo(phoneNo);

            if (firstNameValid) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: firstNameValid,
              });
            } else if (lastNameValid) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: lastNameValid,
              });
            } else if (countryCodeValid) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: countryCodeValid,
              });
            } else if (phoneNoValid) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: phoneNoValid,
              });
            } else {
              sendData();
            }
          }}
        >
          <View className="flex-row items-center gap-x-2">
            <Feather name="save" size={20} color="#0f172a" />
            <Text className="font-bold text-lg text-slate-950">
              Save Contact
            </Text>
          </View>
        </Pressable>

       
        <Text
          className="text-center text-sm mt-4"
          style={{ color: isDark ? "#6b7280" : "#9ca3af" }}
        >
          Make sure all information is correct before saving
        </Text>
      </View>
    </SafeAreaView>

    </KeyboardAvoidingView>
  );
}