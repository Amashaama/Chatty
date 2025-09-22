import { Text, View, StyleSheet, StatusBar, Image } from "react-native";
import CircleShape from "../components/CircleShap";
import "../../global.css";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {
  const navigation = useNavigation<Props>();

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3000 });

    const timer = setTimeout(() => {
      navigation.navigate("SignUpScreen");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const {applied} =useTheme();

  const logo = applied === "dark"?require("../../assets/chattyLogo.png") : require("../../assets/lightChattyLogo.png");

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-950">
      <StatusBar hidden />

     
        <CircleShape
          width={200}
          height={200}
          className="bg-yellow-400"
          borderRadius={999}
          topValue={-25}
          leftValue={-50}
          animateCircle={true}
         
        />
      

      
        <CircleShape
          width={160}
          height={160}
          className="bg-stone-900"
          borderRadius={999}
          topValue={-13}
          leftValue={-40}
          animateCircle={true}
           text="Stay Connected"
           textColor="text-yellow-400"
        
        />
      

    
        <CircleShape
          width={130}
          height={130}
          className="bg-yellow-400"
          borderRadius={999}
          topValue={-25}
          leftValue={240}
          animateCircle={true}
           text="Let's Chat"
           textColor="text-black"
          
        />
      
        <CircleShape
          width={130}
          height={130}
          className="bg-yellow-400"
          borderRadius={999}
          topValue={500}
          leftValue={-20}
          animateCircle={true}
          swingDirection="y"
          text="Chatty Vibes!"
          textColor="text-black"
        />
     

      <Animated.View style={animatedStyle}>
        <Image
          source={logo}
          style={{ height: 220, width: 220 }}
        />
      </Animated.View>

      <Animated.View className="absolute bottom-20" style={animatedStyle}>
        <View className="justify-center items-center">
          <Text className="text-xs font-bold text-slate-600 dark:text-amber-200">
            POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
          </Text>
          <Text className="text-xs font-bold text-slate-600 dark:text-amber-200">
            VERSION :{process.env.EXPO_PUBLIC_APP_VERSION}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
