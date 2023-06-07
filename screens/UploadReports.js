import React, { useEffect } from 'react';
import { View,Text,SafeAreaView,TextInput,useState,Image,Button,ScrollView} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { COLORS, icons, SIZES, images, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {Home} from "./Index";
import {PracticeProvider,ContextP} from "../context";
import { useStateContext } from "../context";
import { useContext } from "react";
import {auth }from "../firebase";
import * as ImagePicker from "expo-image-picker";

export const UploadReports=()=>{
    const {imageUri, setImageUri} = useStateContext();
    useEffect(() => {
        (async () => {
          if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Sorry, we need camera roll permissions to make this work!");
            }
          }
        })();
      }, []);
      const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: false,
        });
      
        if (!result.canceled) {
          setImageUri(result.assets[0].uri);
        }
      };
    return(
        <SafeAreaView style={{flex:1,alignItems:'center',padding:20}}>
            <ScrollView style={{height:500,padding:20}}>
                <Text style={{lineHeight:24}}>
                Please note that all your information and reports will be securely saved in our system for future reference and analysis. We prioritize the privacy and confidentiality of your data.

By uploading your reports, you contribute to the improvement of our services and help us provide you with better insights and recommendations.

Rest assured that we have implemented robust security measures to protect your information from unauthorized access.

If you have any concerns or questions regarding the handling of your data, please feel free to reach out to our support team.

Thank you for your trust in our platform!
                </Text>
            </ScrollView>
            <View style={{height:'40%',width:'100%',padding:0,}}>
                <Text style={{padding:20,fontWeight:'bold',}}>Your selected file will be shown here!</Text>

                <View   style={{flexDirection:'row',height:'80%',width:'100%',flexDirection:'row',alignItems:'center',paddingLeft:20,}}>
                    <View style={{alignItems:'center',height:'100%',alignItems:'center',justifyContent:'center'}}>
                        <Icon  name='images-outline' size={25} color="grey"/>
                    </View>
                                        {imageUri ? (
                        <Image source={{ uri: imageUri }} style={{marginLeft:'3%', width: 210, height: 210 }} />
                        
                    )  : (
                    
                    
                    <Image source={images.reports} resizeMode='contain' style={{marginLeft:'3%', width: 250, height: 250 }}/>
                    )
                    
                    }
                    
                </View>

                
            </View>
            <View style={{height:"20%",width:'100%',paddingLeft:20,paddingRight:20,padding:20}}>
                <View style={{height:"50%"}}></View>
                <Pressable onPress={()=>pickImage()}  style={{height:'50%',width:'100%',backgroundColor:'teal',alignItems:'center',justifyContent:'center',borderRadius:25}}>
                    <Text style={{fontWeight:'bold',color:'white'}}>Select a File</Text>

                </Pressable>

            </View>
        </SafeAreaView>
    )
}
export default UploadReports;
