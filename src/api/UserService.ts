
import { UserRegistrationData } from "../components/UserContext";

const API =process.env.EXPO_PUBLIC_APP_URL +"/Chatty";

export const createNewAccount = async(
    
    userRegistrationData:UserRegistrationData

)=>{
    let formData = new FormData();
    formData.append("firstName",userRegistrationData.firstName);
    formData.append("lastName",userRegistrationData.lastName);
    formData.append("countryCode",userRegistrationData.countryCode);
    formData.append("contactNo",userRegistrationData.contactNo);
    formData.append("profileImage",{
        uri:userRegistrationData.profileImage,
        name:"profile.png",
        type:"image/png",
    } as any);

    const response = await fetch(API+"/UserController",{
      method:"POST",
      body:formData,
    });
    if(response.ok){
        const json = await response.json();
        return json;
    }else{
        return "User Account creation failed";
    }

};