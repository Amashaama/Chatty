import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useLayoutEffect, useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";
import { AuthContext } from "../components/AuthProvider";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useTheme } from "../theme/ThemeProvider";

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");
  const chatList = useChatList();
  const [isModalVisible, setModalVisible] = useState(false);
  const { signOut, isLoading } = useContext(AuthContext)!;
  const { applied } = useTheme();
  const isDark = applied === "dark";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chatty",
      headerTitleStyle: {
        fontWeight: "bold",
        color: isDark ? "#fbbf24" : "#0f172a",
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: isDark ? "#000000" : "#ffffff",
      },
      headerTintColor: isDark ? "#fbbf24" : "#0f172a",
      headerRight: () => (
        <View className="flex-row mr-2 gap-2">
          <TouchableOpacity 
            className="p-2 rounded-full"
            style={{ backgroundColor: isDark ? "#2c2c2e" : "#fef3c7" }}
          >
            <AntDesign 
              name="camera" 
              size={22} 
              color={isDark ? "#fbbf24" : "#0f172a"} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 rounded-full"
            style={{ backgroundColor: isDark ? "#2c2c2e" : "#fef3c7" }}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons 
              name="more-vert" 
              size={22} 
              color={isDark ? "#fbbf24" : "#0f172a"} 
            />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            visible={isModalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              className="flex-1"
             
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                }}
              >
                <View
                  className="justify-end items-end p-5"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <View 
                    className="rounded-2xl w-72 p-3 border-2"
                    style={{
                      backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
                      borderColor: isDark ? "#fbbf24" : "#fbbf24",
                    }}
                  >
                    <TouchableOpacity
                      className="h-14 my-2 justify-center items-start"
                      style={{ 
                        borderBottomWidth: 1,
                        borderBottomColor: isDark ? "#2c2c2e" : "#e5e7eb"
                      }}
                      onPress={() => {
                        navigation.navigate("SettingScreen");
                        setModalVisible(false);
                      }}
                    >
                      <View className="flex-row items-center">
                        <MaterialIcons 
                          name="settings" 
                          size={20} 
                          color={isDark ? "#fbbf24" : "#f59e0b"} 
                          style={{ marginRight: 12 }}
                        />
                        <Text 
                          className="font-bold text-lg"
                          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
                        >
                          Settings
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="h-14 my-2 justify-center items-start"
                      style={{ 
                        borderBottomWidth: 1,
                        borderBottomColor: isDark ? "#2c2c2e" : "#e5e7eb"
                      }}
                      onPress={() => {
                        navigation.navigate("ProfileScreen");
                        setModalVisible(false);
                      }}
                    >
                      <View className="flex-row items-center">
                        <MaterialIcons 
                          name="person" 
                          size={20} 
                          color={isDark ? "#fbbf24" : "#f59e0b"} 
                          style={{ marginRight: 12 }}
                        />
                        <Text 
                          className="font-bold text-lg"
                          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
                        >
                          My Profile
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="h-14 my-2 justify-center items-start"
                      onPress={async () => {
                        await signOut();
                        setModalVisible(false);
                      }}
                    >
                      <View className="flex-row items-center">
                        <MaterialIcons 
                          name="logout" 
                          size={20} 
                          color={isDark ? "#ef4444" : "#dc2626"} 
                          style={{ marginRight: 12 }}
                        />
                        <Text 
                          className="font-bold text-lg"
                          style={{ color: isDark ? "#ef4444" : "#dc2626" }}
                        >
                          Sign Out
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
      ),
    });
  }, [navigation, isModalVisible, isDark]);

  const filteredChats = [...chatList]
    .filter((chat) => {
      return (
        chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort(
      (a, b) =>
        new Date(b.lastTimeStamp).getTime() -
        new Date(a.lastTimeStamp).getTime()
    );

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      className="mx-1 mb-3 rounded-2xl p-4 border shadow-lg"
      style={{
        backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
        borderColor: isDark ? "#2c2c2e" : "#fbbf24",
      }}
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: item.friendId,
          friendName: item.friendName,
          lastSeenTime: formatChatTime(item.lastTimeStamp),
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.friendName.replace(
                " ",
                "+"
              )}&background=random`,
        });
      }}
    >
      <View className="flex-row items-center">
        <View className="relative">
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              className="h-16 w-16 rounded-full border-2"
              style={{ borderColor: isDark ? "#fbbf24" : "#fbbf24" }}
            />
          ) : (
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(
                  " ",
                  "+"
                )}&background=random`,
              }}
              className="h-16 w-16 rounded-full border-2"
              style={{ borderColor: isDark ? "#fbbf24" : "#fbbf24" }}
            />
          )}
          {item.status ? (
            item.status == "ONLINE" && (
              <View 
                className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2"
                style={{ borderColor: isDark ? "#1c1c1e" : "#ffffff" }}
              />
            )
          ) : (
            <View 
              className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 border-2"
              style={{ borderColor: isDark ? "#1c1c1e" : "#ffffff" }}
            />
          )}
        </View>

        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start mb-1">
            <Text
              className="font-bold text-lg"
              style={{ color: isDark ? "#ffffff" : "#0f172a" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.friendName}
            </Text>

            <Text 
              className="font-medium text-xs"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
            >
              {formatChatTime(item.lastTimeStamp)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text
              className="flex-1 text-sm"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.lastMessage}
            </Text>
            {item.unreadCount > 0 && (
              <View className="bg-yellow-400 rounded-full px-2.5 py-1 ml-3 shadow-md">
                <Text className="font-bold text-xs text-slate-950">
                  {item.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView 
      className="flex-1 p-0" 
      edges={["right", "left"]}
      style={{ backgroundColor: isDark ? "#000000" : "#f9fafb" }}
    >
      <View className="mx-4 mt-4 mb-2">
        <View 
          className="flex-row items-center mx-2 px-3 rounded-xl shadow-md h-14 border"
          style={{
            backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
            borderColor: isDark ? "#2c2c2e" : "#fbbf24",
          }}
        >
          <Ionicons 
            name="search" 
            size={20} 
            color={isDark ? "#fbbf24" : "#f59e0b"} 
          />
          <TextInput
            className="flex-1 text-lg font-bold ps-2"
            style={{ color: isDark ? "#ffffff" : "#0f172a" }}
            placeholder="Search Conversations..."
            placeholderTextColor={isDark ? "#9ca3af" : "#64748b"}
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
              <AntDesign 
                name="close-circle" 
                size={20} 
                color={isDark ? "#fbbf24" : "#f59e0b"} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-1">
        {filteredChats.length > 0 ? (
          <FlatList
            data={filteredChats}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30, paddingTop: 20 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <View 
              className="rounded-full p-6 mb-4 border"
              style={{
                backgroundColor: isDark ? "#1c1c1e" : "#f3f4f6",
                borderColor: isDark ? "#2c2c2e" : "#fbbf24",
              }}
            >
              <Ionicons 
                name="chatbubbles-outline" 
                size={48} 
                color={isDark ? "#fbbf24" : "#f59e0b"} 
              />
            </View>
            <Text 
              className="text-base font-medium"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
            >
              No Conversations found
            </Text>
          </View>
        )}

        <View className="absolute bottom-6 right-6">
          <TouchableOpacity
            className="bg-yellow-400 h-16 w-16 rounded-full justify-center items-center border-2 border-yellow-300"
            style={{
              shadowColor: "#f59e0b",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
            onPress={() => navigation.navigate("NewChatScreen")}
          >
            <Ionicons name="add" size={28} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}