import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingScreen from "./src/screens/SettingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import "./global.css";
import ContactScreen from "./src/screens/ContactScreen";
import AvatarScreen from "./src/screens/AvatarScreen";


import { UserRegistrationProvider } from "./src/components/UserContext";
import { AlertNotificationRoot } from "react-native-alert-notification";
import HomeTabs from "./src/screens/HomeTabs";

export type RootStack = {
  SplashScreen: undefined;
  SignUpScreen: undefined;
  
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;

  HomeScreen: undefined;
 
  ProfileScreen: undefined;
  // SingleChatScreen:{
  //   chatId:number;
  //   friendName:string;
  //   lastSeenTime:string;
  //   profileImage:string;
  // };
};

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
  return (
    <AlertNotificationRoot>
      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="HomeScreen"
              screenOptions={{
                animation: "fade",
              }}
            >
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{ headerShown: false }}
              />

           

              <Stack.Screen
                name="AvatarScreen"
                component={AvatarScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeTabs}
                options={{headerShown:false}}
               
              />
             
              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
    </AlertNotificationRoot>
  );
}
