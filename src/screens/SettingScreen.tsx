import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeOption, useTheme } from "../theme/ThemeProvider";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const options: ThemeOption[] = ["light", "dark", "system"];
type SettingScreenProp = NativeStackNavigationProp<RootStack, "SettingScreen">;

export default function SettingScreen() {
  const { preference, applied, setPreference } = useTheme();
  const navigation = useNavigation<SettingScreenProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: applied === "dark" ? "#000000" : "#ffffff",
      },
      headerTintColor: applied === "dark" ? "#ffffff" : "#000000",
    });
  }, [navigation, applied]);

  const isDark = applied === "dark";

  return (
    <SafeAreaView 
      className="flex-1" 
      edges={["right", "bottom", "left"]}
      style={{ backgroundColor: isDark ? "#000000" : "#f9fafb" }}
    >
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000000" : "#ffffff"}
      />
      
      <ScrollView 
        className="flex-1" 
        style={{ backgroundColor: isDark ? "#000000" : "#f9fafb" }}
      >
        <View className="px-4 py-6">
        
          <View 
            className="rounded-2xl p-5 mb-4 border shadow-sm"
            style={{
              backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
              borderColor: isDark ? "#2c2c2e" : "#e5e7eb",
            }}
          >
            <View className="flex-row items-center mb-4">
              <View 
                className="rounded-full p-2.5 mr-3"
                style={{ backgroundColor: isDark ? "#2c2c2e" : "#fef3c7" }}
              >
                <MaterialIcons 
                  name="palette" 
                  size={20} 
                  color={isDark ? "#fbbf24" : "#f59e0b"} 
                />
              </View>
              <Text 
                className="font-bold text-lg"
                style={{ color: isDark ? "#ffffff" : "#0f172a" }}
              >
                App Theme
              </Text>
            </View>

            <Text 
              className="text-sm mb-4 ml-12"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
            >
              Choose how the app looks on your device
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {options.map((option) => {
                const isSelected = preference === option;
                return (
                  <TouchableOpacity
                    key={option}
                    className="py-3 px-6 rounded-xl flex-row items-center"
                    style={{
                      backgroundColor: isSelected 
                        ? (isDark ? "#fbbf24" : "#fbbf24")
                        : (isDark ? "#2c2c2e" : "#f3f4f6"),
                      borderWidth: 2,
                      borderColor: isSelected
                        ? (isDark ? "#fbbf24" : "#fbbf24")
                        : (isDark ? "#3c3c3e" : "#e5e7eb"),
                    }}
                    onPress={() => setPreference(option)}
                  >
                    {isSelected && (
                      <MaterialIcons 
                        name="check-circle" 
                        size={18} 
                        color="#0f172a" 
                        style={{ marginRight: 6 }}
                      />
                    )}
                    <Text
                      className="text-center font-bold text-base"
                      style={{
                        color: isSelected 
                          ? "#0f172a" 
                          : (isDark ? "#ffffff" : "#0f172a")
                      }}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

         
          <View 
            className="rounded-2xl p-5 border"
            style={{
              backgroundColor: isDark ? "#1c1c1e" : "#fef3c7",
              borderColor: isDark ? "#2c2c2e" : "#fde68a",
            }}
          >
            <View className="flex-row items-center">
              <View 
                className="rounded-full p-2 mr-3"
                style={{ backgroundColor: isDark ? "#fbbf24" : "#fbbf24" }}
              >
                <Feather name="info" size={18} color="#0f172a" />
              </View>
              <View className="flex-1">
                <Text 
                  className="font-bold text-base"
                  style={{ color: isDark ? "#ffffff" : "#0f172a" }}
                >
                  Current Theme: {applied.charAt(0).toUpperCase() + applied.slice(1)}
                </Text>
                <Text 
                  className="text-sm mt-1"
                  style={{ color: isDark ? "#9ca3af" : "#64748b" }}
                >
                  {preference === "system" 
                    ? "Following your device's system settings"
                    : `Using ${preference} mode`
                  }
                </Text>
              </View>
            </View>
          </View>

        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}