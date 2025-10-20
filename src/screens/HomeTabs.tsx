import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScren from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import { useTheme } from "../theme/ThemeProvider";

const Tabs = createBottomTabNavigator();


export default function HomeTabs() {
  const { applied } = useTheme();
  const isDark = applied === "dark";
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = "chatbubble-ellipses";
          if (route.name === "Chats") iconName = "chatbubble-ellipses";
          else if (route.name === "Status") iconName = "time";
          else if (route.name === "Calls") iconName = "call";
          return <Ionicons name={iconName as any} size={28} color={color} />;
        },
       tabBarLabelStyle:{fontSize:16,fontWeight:"800"},
         tabBarActiveTintColor:"#fbbf24",
        tabBarInactiveTintColor:"#9ca3af",
        tabBarStyle:{
          height:100,
            backgroundColor: isDark ? "#000000" : "#ffffff",
          paddingTop:0
        }
      })}
    >
      <Tabs.Screen
        name="Chats"
        component={ChatsScren}
        options={{ headerShown: false }}
      />
      <Tabs.Screen name="Status" component={StatusScreen} />
      <Tabs.Screen name="Calls" component={CallsScreen} />
    </Tabs.Navigator>
  );
}
