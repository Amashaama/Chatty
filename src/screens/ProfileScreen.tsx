import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { ThemeOption, useTheme } from "../theme/ThemeProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useUserProfile } from "../socket/UseUserProfile";
import { uploadProfileImage } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";

const options: ThemeOption[] = ["light", "dark", "system"];
type ProfileScreenProp = NativeStackNavigationProp<RootStack, "ProfileScreen">;

export default function ProfileScreen() {
  const { applied } = useTheme();
  const navigation = useNavigation<ProfileScreenProp>();
  const userProfile = useUserProfile();
  const auth = useContext(AuthContext);

  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: applied === "dark" ? "black" : "white",
      },
      headerTintColor: applied === "dark" ? "white" : "black",
    });
  }, [navigation, applied]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUploading(true);
      try {
        await uploadProfileImage(
          String(auth ? auth.userId : 0),
          result.assets[0].uri
        );
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="items-center py-8 bg-white border-b border-gray-200">
        <View className="relative">
          <View className="relative">
            {image ? (
              <Image
                className="w-32 h-32 rounded-full border-4 border-yellow-400"
                source={{ uri: image }}
              />
            ) : (
              <Image
                className="w-32 h-32 rounded-full border-4 border-yellow-400"
                source={{
                  uri: userProfile?.profileImage
                    ? `${userProfile.profileImage}?t=${Date.now()}`
                    : undefined,
                }}
              />
            )}

            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-2.5 border-3 border-white shadow-lg"
              onPress={pickImage}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color="#0f172a" />
              ) : (
                <Feather name="camera" size={18} color="#0f172a" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="mt-4 px-6 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/30"
          onPress={pickImage}
          disabled={uploading}
        >
          <Text className="font-bold text-yellow-600 text-base">
            {uploading ? "Uploading..." : "Change Profile Picture"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-4 py-6">
        <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-200 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="bg-yellow-400/20 rounded-full p-2.5 mr-3">
              <Feather name="user" size={20} color="#f59e0b" />
            </View>
            <Text className="font-bold text-slate-500 text-sm uppercase tracking-wide">
              Full Name
            </Text>
          </View>
          <Text className="font-bold text-slate-950 text-xl ml-12">
            {userProfile?.firstName} {userProfile?.lastName}
          </Text>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-200 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="bg-yellow-400/20 rounded-full p-2.5 mr-3">
              <Feather name="phone" size={20} color="#f59e0b" />
            </View>
            <Text className="font-bold text-slate-500 text-sm uppercase tracking-wide">
              Phone Number
            </Text>
          </View>
          <Text className="font-bold text-slate-950 text-xl ml-12">
            {userProfile?.countryCode} {userProfile?.contactNo}
          </Text>
        </View>
        {userProfile?.status === "ACTIVE" && (
          <View className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200 shadow-sm">
            <View className="flex-row items-center">
              <View className="bg-yellow-400 rounded-full p-2 mr-3">
                <AntDesign name="check-circle" size={18} color="#0f172a" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-950 text-base">
                  Account Active
                </Text>
                <Text className="text-slate-600 text-sm mt-0.5">
                  Your profile is complete
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
