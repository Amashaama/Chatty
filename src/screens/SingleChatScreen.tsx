import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";
import { useTheme } from "../theme/ThemeProvider";
import { useChangeUserStatus } from "../socket/UseChangeFriendListStatus";

type Message = {
  id: number;
  text: string;
  sender: "me" | "friend";
  time: string;
  status?: "sent" | "delivered" | "read";
};

type SingleChatScreenProps = NativeStackScreenProps<
  RootStack,
  "SingleChatScreen"
>;

export default function SingleChatScreen({
  route,
  navigation,
}: SingleChatScreenProps) {
  const { chatId, friendName, lastSeenTime, profileImage } = route.params;
  const { applied } = useTheme();
  const isDark = applied === "dark";

  const singeChat = useSingleChat(chatId); // chatId == friendId;

  const messages = singeChat.messages;
  const friend = singeChat.friend;

  const sendMessage = useSendChat();

  const [input, setInput] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const changeFriendListStatus = useChangeUserStatus();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: isDark ? "#000000" : "#ffffff",
      },
      headerLeft: () => (
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="justify-center items-center"
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color={isDark ? "#fbbf24" : "#0f172a"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="h-14 w-14 rounded-full border-2 justify-center items-center"
            style={{ borderColor: isDark ? "#fbbf24" : "#fbbf24" }}
          >
            <Image
              source={{ uri: profileImage }}
              className="h-14 w-14 rounded-full"
            />
          </TouchableOpacity>
          <View className="space-y-1">
            <Text
              className="font-bold text-xl"
              style={{ color: isDark ? "#ffffff" : "#0f172a" }}
            >
              {friend ? friend.firstName + " " + friend.lastName : ""}
            </Text>
            <Text
              className="italic text-xs font-medium"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
            >
              {friend?.status === "ONLINE"
                ? "Online"
                : `Last Seen ${formatChatTime(friend?.updatedAt ?? "")}`}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity
            className="p-2 rounded-full mr-2"
            style={{ backgroundColor: isDark ? "#2c2c2e" : "#fef3c7" }}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={isDark ? "#fbbf24" : "#0f172a"}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, friend, isDark]);

    const handleFriendListStatus = () => {
     if(friend?.id){
      changeFriendListStatus(friend.id);
     }
    };

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.from.id !== chatId;

  

    return (
      <View
        className={`my-1 px-4 py-3 max-w-[75%] ${
          isMe
            ? `self-end rounded-tl-2xl rounded-bl-2xl rounded-br-2xl`
            : `rounded-tr-2xl rounded-bl-2xl rounded-br-2xl self-start`
        }`}
        style={{
          backgroundColor: isMe
            ? isDark
              ? "#fbbf24"
              : "#fbbf24"
            : isDark
            ? "#1c1c1e"
            : "#f3f4f6",
          borderWidth: 1,
          borderColor: isMe
            ? isDark
              ? "#f59e0b"
              : "#f59e0b"
            : isDark
            ? "#2c2c2e"
            : "#e5e7eb",
        }}
      >
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
                      borderBottomColor: isDark ? "#2c2c2e" : "#e5e7eb",
                    }}
                    onPress={() => {
                      handleFriendListStatus();
                      setModalVisible(false);
                    }}
                  >
                    <View className="flex-row items-center">
                      <MaterialIcons
                        name="block"
                        size={20}
                        color={isDark ? "#fbbf24" : "#f59e0b"}
                        style={{ marginRight: 12 }}
                      />
                      <Text
                        className="font-bold text-lg"
                        style={{ color: isDark ? "#ffffff" : "#0f172a" }}
                      >
                        Block User
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        <Text
          className="text-base leading-5"
          style={{ color: isMe ? "#0f172a" : isDark ? "#ffffff" : "#0f172a" }}
        >
          {item.message}
        </Text>
        <View className="flex-row justify-end items-center mt-1.5">
          <Text
            className="italic text-xs me-2"
            style={{ color: isMe ? "#78350f" : isDark ? "#9ca3af" : "#64748b" }}
          >
            {formatChatTime(item.createdAt)}
          </Text>
          {isMe && (
            <Ionicons
              name={
                item.status === "READ"
                  ? "checkmark-done-sharp"
                  : item.status === "DELIVERED"
                  ? "checkmark-done-sharp"
                  : "checkmark"
              }
              size={18}
              color={item.status === "READ" ? "#0284c7" : "#78350f"}
            />
          )}
        </View>
      </View>
    );
  };

  const handleSendChat = () => {
    if (!input.trim()) {
      return;
    }

    sendMessage(chatId, input);
    setInput("");
  };

  return (
    <SafeAreaView
      className="flex-1"
      edges={["right", "bottom", "left"]}
      style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000000" : "#ffffff"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 73 : 100}
        className="flex-1"
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          className="px-3 flex-1"
          inverted
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
          style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
        />
        <View
          className="flex-row items-end p-3 border-t"
          style={{
            backgroundColor: isDark ? "#000000" : "#ffffff",
            borderTopColor: isDark ? "#2c2c2e" : "#e5e7eb",
          }}
        >
          <View
            className="flex-1 mr-2 rounded-3xl border"
            style={{
              backgroundColor: isDark ? "#1c1c1e" : "#f3f4f6",
              borderColor: isDark ? "#2c2c2e" : "#e5e7eb",
            }}
          >
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              multiline
              placeholder="Type a message..."
              placeholderTextColor={isDark ? "#9ca3af" : "#64748b"}
              className="min-h-14 max-h-32 h-auto px-5 py-3 text-base"
              style={{ color: isDark ? "#ffffff" : "#0f172a" }}
            />
          </View>
          <TouchableOpacity
            className="bg-yellow-400 w-14 h-14 items-center justify-center rounded-full border-2 border-yellow-300"
            style={{
              shadowColor: "#f59e0b",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
            }}
            onPress={handleSendChat}
          >
            <Ionicons name="send" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
