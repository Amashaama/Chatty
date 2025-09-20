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

export default function SplashScreen() {
  const opacity = useSharedValue(0);
 

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3000 });

  

    const timer = setTimeout(() => {
      console.log("finish");
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

  

  return (
    <View className="flex-1 justify-center items-center bg-black">
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
       
        />

        <CircleShape 

        width={130}
        height={130}
        className="bg-yellow-400"
        borderRadius={999}
        topValue={-25}
        leftValue={240}
        animateCircle={true}
        
        
        />
      

      <Animated.View style={animatedStyle}>
        <Image
          source={require("../../assets/chattyLogo.png")}
          style={{ height: 220, width: 220 }}
        />
      </Animated.View>

      <Animated.View className="absolute bottom-20" style={animatedStyle}>
        <View className="justify-center items-center">
          <Text className="text-xs font-bold text-amber-200">
            POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
          </Text>
          <Text className="text-xs font-bold text-amber-200">
            VERSION :{process.env.EXPO_PUBLIC_APP_VERSION}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
