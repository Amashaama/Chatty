

export const validateFirstName= (name:string):string|null=>{
    if(!name || name.trim().length ===0){
        return "First name is required";
    }

    return null;
};

export const validateLastName= (name:string):string|null=>{
    if(!name || name.trim().length ===0){
        return "Last name is required";
    }
    return null;
};

export const validateCountryCode = (countryCode:string):string| null=>{

    const regex =  /^\+[1-9]\d{0,3}$/;

    if(!countryCode){

        return "Country code is required";

    }

    if(!regex.test(countryCode)){
        return "Enter a valid country code";
    }

    return null;
   
};

export const validatePhoneNo = (phoneNo:string):string|null=>{
    const regex = /^[1-9][0-9]{6,14}$/;

    if(!phoneNo){
        return "Contact number is required";
    }

    if(!regex.test(phoneNo)){
        return "Enter a valid contact number";
    }

    return null;
};

export const validateProfileImage = (image:{
    uri:string;
    type?:string;
    fileSize?:number;

}|null):string | null=>{

    if(!image){
        return "Profile image is required";
    }

    if(image.type && !["image/jpeg","image/jpg","image/png"].includes(image.type)){
        return "Select a valid image type (JPEG, JPG, PNG)";
    }

     if(image.fileSize && image.fileSize > 10 *1024 * 1024){ //10mb

        return "Profile Image size must be less than 5MB"

    }

    return null;

};


