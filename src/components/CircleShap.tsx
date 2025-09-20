import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

interface Circle{
    width:number;
    height:number;
    
    borderRadius : number;
    fillColor?:string;
    className?:String;
    topValue?:number; 
    rightValue?:number;
     bottomValue?:number;
    leftValue?:number;
    animateCircle?:boolean;

}

export default function CircleShape(c:Circle){

    const translateX = useSharedValue(0);

    useEffect(()=>{
        if(c.animateCircle){
            translateX.value = withRepeat(
                withTiming(25,{duration:2000}),
                -1,
                true
            );
        }
    },[c.animateCircle]);

    const animatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[{translateX:translateX.value}],
        }
    });

    return(
        <Animated.View 
         className ={`${c.className ?? ""}`}
         
        style={[{
           
            width:c.width,
            height:c.height,
          
            borderRadius:c.borderRadius,
            position:"absolute",
            ...(c.fillColor !== undefined &&{backgroundColor:c.fillColor}),
            ...(c.topValue !== undefined && {top:c.topValue}),
            ...(c.rightValue !== undefined && {right:c.rightValue}),
            ...(c.bottomValue !== undefined && {bottom:c.bottomValue}),
            ...(c.leftValue !== undefined && {left:c.leftValue}),
            zIndex:0,
        },

        c.animateCircle ? animatedStyle:{},

    ]
}></Animated.View>
    );
}