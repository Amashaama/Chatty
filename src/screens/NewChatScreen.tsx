import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";
import { useUserList } from "../socket/UseUserList";
import { useTheme } from "../theme/ThemeProvider";

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">;

export default function NewChatScreen() {
  const navigation = useNavigation<NewChatScreenProp>();
  const [search, setSearch] = useState("");
  const users = useUserList();
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
              Select Contact
            </Text>
            <Text 
              className="text-sm font-medium"
              style={{ color: isDark ? "#9ca3af" : "#64748b" }}
            >
              {users.length} contacts
            </Text>
          </View>
        </View>
      ),
      headerRight: () => <View></View>,
    });
  }, [navigation, users, isDark]);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      className="justify-start items-center gap-x-3 mx-3 mb-3 px-4 py-3 flex-row rounded-2xl border"
      style={{
        backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
        borderColor: isDark ? "#2c2c2e" : "#fbbf24",
      }}
      onPress={() => {
        navigation.replace("SingleChatScreen", {
          chatId: item.id,
          friendName: `${item.firstName} ${item.lastName}`,
          lastSeenTime: item.updatedAt,
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
        });
      }}
    >
      <View className="relative">
        <View 
          className="h-14 w-14 rounded-full border-2 justify-center items-center overflow-hidden"
          style={{ borderColor: isDark ? "#fbbf24" : "#fbbf24" }}
        >
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              className="h-14 w-14 rounded-full"
            />
          ) : (
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
              }}
              className="h-14 w-14 rounded-full"
            />
          )}
        </View>
        {item.status === "ONLINE" && (
          <View 
            className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2"
            style={{ borderColor: isDark ? "#1c1c1e" : "#ffffff" }}
          />
        )}
      </View>
      <View className="flex-col gap-y-1 flex-1">
        <Text 
          className="font-bold text-lg"
          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
        >
          {item.firstName} {item.lastName}
        </Text>
        <Text 
          className="text-sm italic"
          style={{ color: isDark ? "#9ca3af" : "#64748b" }}
          numberOfLines={1}
        >
          {item.status === "ACTIVE"
            ? "Already in Friend List; Message Now"
            : "Hey there! I am using ChatApp"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filterdUsers = [...users]
    .filter((user) => {
      return (
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.contactNo.includes(search)
      );
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

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
      <View className="flex-1">
      
        <View 
          className="items-center flex-row mx-4 px-4 rounded-xl h-14 mt-4 border"
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
            className="flex-1 text-lg font-bold ps-3"
            style={{ color: isDark ? "#ffffff" : "#0f172a" }}
            placeholder="Search contacts..."
            placeholderTextColor={isDark ? "#9ca3af" : "#64748b"}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          {search.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearch("")}
              className="p-1"
            >
              <Ionicons 
                name="close-circle" 
                size={20} 
                color={isDark ? "#fbbf24" : "#f59e0b"} 
              />
            </TouchableOpacity>
          )}
        </View>

       
        <View 
          className="px-3 my-4 py-3 mx-3 rounded-2xl border"
          style={{
            backgroundColor: isDark ? "#1c1c1e" : "#fef3c7",
            borderColor: isDark ? "#2c2c2e" : "#fbbf24",
          }}
        >
          <TouchableOpacity
            className="justify-start gap-x-3 flex-row items-center"
            onPress={() => navigation.navigate("NewContactScreen")}
          >
            <View className="bg-yellow-400 items-center justify-center w-12 h-12 rounded-full">
              <Feather name="user-plus" size={22} color="#0f172a" />
            </View>
            <View className="flex-1">
              <Text 
                className="text-lg font-bold"
                style={{ color: isDark ? "#ffffff" : "#0f172a" }}
              >
                New Contact
              </Text>
              <Text 
                className="text-sm"
                style={{ color: isDark ? "#9ca3af" : "#78350f" }}
              >
                Add a new contact to your list
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={24} 
              color={isDark ? "#9ca3af" : "#64748b"} 
            />
          </TouchableOpacity>
        </View>
 
        <View className="flex-1 mt-2">
          {filterdUsers.length > 0 ? (
            <>
              <Text 
                className="px-4 mb-2 font-bold text-sm uppercase tracking-wide"
                style={{ color: isDark ? "#9ca3af" : "#64748b" }}
              >
                All Contacts ({filterdUsers.length})
              </Text>
              <FlatList
                data={filterdUsers}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </>
          ) : (
            <View className="flex-1 justify-center items-center">
              <View 
                className="rounded-full p-6 mb-4 border"
                style={{
                  backgroundColor: isDark ? "#1c1c1e" : "#f3f4f6",
                  borderColor: isDark ? "#2c2c2e" : "#fbbf24",
                }}
              >
                <Feather 
                  name="users" 
                  size={48} 
                  color={isDark ? "#fbbf24" : "#f59e0b"} 
                />
              </View>
              <Text 
                className="text-base font-medium"
                style={{ color: isDark ? "#9ca3af" : "#64748b" }}
              >
                No contacts found
              </Text>
              <Text 
                className="text-sm mt-2"
                style={{ color: isDark ? "#6b7280" : "#9ca3af" }}
              >
                Try adjusting your search
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}