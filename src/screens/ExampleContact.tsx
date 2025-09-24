import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function AvatarScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setSelectedAvatar(null); // Clear avatar selection when image is picked
    }
  };

  const avatars = [
    require("../../assets/avatar/avatar_1.png"),
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
  ];

  const selectAvatar = (item: any, index: number) => {
    setImage(Image.resolveAssetSource(item).uri);
    setSelectedAvatar(index);
  };

  return (
    <SafeAreaView className="bg-slate-950 flex-1">
      <StatusBar hidden={false} backgroundColor="#0f172a" barStyle="light-content" />
      
      <View className="flex-1 items-center px-6">
        {/* Logo Section */}
        <View className="mt-8 mb-8">
          <Image
            source={require("../../assets/chattyLogo.png")}
            className="h-36 w-32"
          />
        </View>

        {/* Header Text */}
        <View className="items-center mb-8">
          <Text className="font-bold text-xl text-amber-200 text-center mb-2">
            Complete Your Profile
          </Text>
          <Text className="text-slate-300 text-sm text-center px-4 leading-5">
            Choose a profile image or select from our avatar collection
          </Text>
        </View>

        {/* Profile Image Section */}
        <View className="items-center mb-6">
          <Pressable
            className="h-32 w-32 rounded-full bg-stone-900 justify-center items-center border-3 border-yellow-400 border-dashed shadow-lg relative"
            onPress={pickImage}
          >
            {image ? (
              <>
                <Image
                  source={{ uri: image }}
                  className="h-32 w-32 rounded-full"
                />
                {/* Edit overlay */}
                <View className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-2 border-2 border-slate-950">
                  <AntDesign name="edit" size={16} color="#0f172a" />
                </View>
              </>
            ) : (
              <View className="items-center">
                <View className="bg-yellow-400 rounded-full p-3 mb-2">
                  <AntDesign name="camera" size={24} color="#0f172a" />
                </View>
                <Text className="font-bold text-sm text-amber-200">
                  Add Photo
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Divider */}
        <View className="flex-row items-center w-full max-w-sm mb-6">
          <View className="flex-1 h-px bg-stone-700" />
          <Text className="text-slate-400 text-sm mx-4 font-medium">OR</Text>
          <View className="flex-1 h-px bg-stone-700" />
        </View>

        {/* Avatar Selection */}
        <View className="items-center mb-6">
          <Text className="text-lg mb-3 text-amber-200 font-bold">
            Select an Avatar
          </Text>
          
          <View className="bg-stone-900 rounded-3xl p-3 border border-yellow-400/30 shadow-lg w-full max-w-sm">
            <FlatList
              data={avatars}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => selectAvatar(item, index)}
                  className="mx-1"
                >
                  <View className={`rounded-full p-1 ${
                    selectedAvatar === index 
                      ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' 
                      : 'bg-transparent'
                  }`}>
                    <Image
                      source={item}
                      className="h-14 w-14 rounded-full"
                    />
                  </View>
                  {selectedAvatar === index && (
                    <View className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                      <AntDesign name="check" size={10} color="#0f172a" />
                    </View>
                  )}
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 4, justifyContent: 'center' }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Spacer */}
        <View className="flex-1 min-h-4" />

        {/* Create Account Button */}
        <View className="w-full max-w-sm mb-8">
          <Pressable 
            className={`h-14 rounded-full items-center justify-center shadow-lg ${
              image 
                ? 'bg-yellow-400 shadow-yellow-400/25' 
                : 'bg-stone-700'
            }`}
            disabled={!image}
          >
            <Text className={`font-bold text-lg ${
              image 
                ? 'text-stone-900' 
                : 'text-slate-500'
            }`}>
              Create Account
            </Text>
          </Pressable>
          
          {!image && (
            <Text className="text-slate-400 text-xs text-center mt-2">
              Please select a profile image to continue
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}