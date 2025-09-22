import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingScreen from "./src/screens/SettingScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import "./global.css";

export type RootStack = {
  SplashScreen :undefined;
  SignInScreen:undefined;
  SignUpScreen: undefined;
  HomeScreen:undefined;
  SettingScreen:undefined;
  ProfileScreen:undefined;
}


const Stack = createNativeStackNavigator<RootStack>();

export default function App(){
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          animation:"fade"
        }}
        >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown:false}} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SettingScreen" component={SettingScreen} options={{headerShown:false}} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>





  );
}