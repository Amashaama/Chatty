import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  requireNativeComponent,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

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
      setSelectedAvatar(null);
    }
  };

  const avatars = [
    require("../../assets/avatar/avatar_1.png"),
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
    require("../../assets/avatar/avatar_7.png"),
    require("../../assets/avatar/avatar_8.png"),
    require("../../assets/avatar/avatar_9.png"),
    require("../../assets/avatar/avatar_10.png"),
    require("../../assets/avatar/avatar_11.png"),
    require("../../assets/avatar/avatar_12.png"),
    require("../../assets/avatar/avatar_13.png"),
    require("../../assets/avatar/avatar_14.png"),
    require("../../assets/avatar/avatar_15.png"),
  ];

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar hidden={true} />
      <View className="flex-1 items-center px-6">
        <View className="mt-8 mb-8">
          <Image
            source={require("../../assets/lightChattyLogo.png")}
            className="h-36 w-32"
          />
        </View>
        <View className="items-center mb-8">
          <Text className="font-bold text-xl text-slate-950 text-center mb-2 leading-6">
            Complete Your Profile
          </Text>
          <Text className="text-slate-600 text-sm text-center px-4 leading-5">
            Choose a profile image or select from our avatar collection
          </Text>
        </View>

        <View className="items-center mb-6">
          <Pressable
            className="h-32 w-32 rounded-full bg-stone-900 justify-center items-center border-2 border-yellow-400 border-dashed shadow-lg relative"
            onPress={pickImage}
          >
            {image ? (
              <>
                <Image
                  source={{ uri: image }}
                  className="h-32 w-32 rounded-full"
                />
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
        <View className="flex-row items-center w-full max-w-sm mb-2">
          <View className="flex-1 h-px bg-stone-700" />
          <Text className="text-slate-500 text-sm mx-4 font-medium">OR</Text>
          <View className="flex-1 h-px bg-stone-700" />
        </View>

        <View className="items-center mb-6">
          <Text className="text-lg mb-3 text-amber-950 font-bold">
            Select an Avatar
          </Text>

          <View className="bg-stone-900 rounded-3xl p-3 border-2 border-yellow-400/30 w-full max-w-sm">
            <FlatList
              data={avatars}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setImage(Image.resolveAssetSource(item).uri)}
                  className="mx-1"
                >
                  <Image
                    source={item}
                    className="h-20 w-20 rounded-full mx-1"
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 4,justifyContent:"center" }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        

        <View className="w-full px-5 mt-5">
            <Pressable
            className="h-14 bg-yellow-400 items-center justify-center rounded-full">
            <Text className="font-bold text-lg text-slate-950">Create Account</Text>

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
