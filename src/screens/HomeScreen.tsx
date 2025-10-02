import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
  Text,
} from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

const chats = [
  {
    id: 1,
    name: "Sahan Perera",
    lastMessage: "Hello, Sahani",
    time: "9:46 a.m",
    unread: 2,
    profile: require("../../assets/avatar/avatar_1.png"),
  },
  {
    id: 2,
    name: "Kamal Perera",
    lastMessage: "Hello, Kamal",
    time: "yesterday",
    unread: 1,
    profile: require("../../assets/avatar/avatar_2.png"),
  },
  {
    id: 3,
    name: "Amandi Kawya",
    lastMessage: "Hello, Amandi",
    time: "10:46 p.m",
    unread: 2,
    profile: require("../../assets/avatar/avatar_3.png"),
  },
  {
    id: 4,
    name: "Kusum Ravidn",
    lastMessage: "Hello, kusum",
    time: "3:05 p.m",
    unread: 4,
    profile: require("../../assets/avatar/avatar_4.png"),
  },
  {
    id: 5,
    name: "Imasha Minoli",
    lastMessage: "Hello, mino",
    time: "2025/09/20",
    unread: 2,
    profile: require("../../assets/avatar/avatar_5.png"),
  },
  {
    id: 6,
    name: "Dinithi Sahanika",
    lastMessage: "Hello, dini",
    time: "9:46 a.m",
    unread: 0,
    profile: require("../../assets/avatar/avatar_6.png"),
  },
];

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chatty",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#0f172a",
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: "#ffffff",
      },
      headerTintColor: "#0f172a",
      headerRight: () => (
        <View className="flex-row mr-2 gap-2">
          <TouchableOpacity className="p-2 rounded-full bg-yellow-400/20">
            <AntDesign name="camera" size={22} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-full bg-yellow-400/20">
            <MaterialIcons name="more-vert" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const filteredChats = chats.filter((chat) => {
    return (
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
    );
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity className="mx-1 mb-3 bg-white rounded-2xl p-4 border border-yellow-400 shadow-lg">
      <View className="flex-row items-center">
        <View className="relative">
          <Image
            source={item.profile}
            className="h-16 w-16 rounded-full border-2 border-yellow-950"
          />
          <View className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white" />
        </View>

        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start mb-1">
            <Text
              className="font-bold text-lg text-slate-950"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>

            <Text className="font-medium text-xs text-slate-500">
              {item.time}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="text-slate-600 flex-1 text-sm"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.lastMessage}
            </Text>
            {item.unread > 0 && (
              <View className="bg-yellow-400 rounded-full px-2.5 py-1 ml-3 shadow-md">
                <Text className="font-bold text-xs text-slate-950">
                  {item.unread}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 p-0 bg-gray-50" edges={["right", "left"]}>
      <View className="mx-4 mt-4 mb-2">
        <View className="flex-row items-center mx-2 bg-white border border-yellow-400/50 px-3 rounded-xl shadow-md h-14">
          <Ionicons name="search" size={20} color="#f59e0b" />
          <TextInput
            className="flex-1 text-lg text-slate-950 font-bold ps-2"
            placeholder="Search Conversations..."
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearch("");
              }}
              className="p-1"
            >
              <AntDesign name="close-circle" size={20} color="#f59e0b" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-1 ">
        {filteredChats.length > 0 ? (
          <FlatList
            data={filteredChats}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30, paddingTop: 20 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <View className="bg-gray-100 rounded-full p-6 mb-4 border border-yellow-400">
              <Ionicons name="chatbubbles-outline" size={48} color="#f59e0b" />
            </View>
            <Text className="text-slate-500 text-base font-medium">
              No Conversations found
            </Text>
          </View>
        )}
     {filteredChats.length >0 && (

       <View className="absolute bottom-6 right-6">
          <TouchableOpacity
            className="bg-green-400 h-16 w-16 rounded-full justify-center items-center border-yellow-300"
            style={{
              shadowColor: "#f59e0b",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Ionicons name="add" size={28} color="#0f172a" />
          </TouchableOpacity>
        </View>
     )}
        
      </View>
    </SafeAreaView>
  );
}
