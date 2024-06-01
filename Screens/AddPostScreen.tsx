import axios from "axios";
import { useState } from "react";
import { Text, View,Image, Button, TouchableOpacity } from "react-native";
import DocumentPicker from "react-native-document-picker";
import { TextInput } from "react-native-gesture-handler";
import RNFS from 'react-native-fs';
import { bottomSheetContent, bottomSheetVisiblity,userdata } from '../Recoil/Atom';
import { useRecoilState } from "recoil";
function AddPostScreen() {

  const [location,setLocation]=useState("")
  const [desc,setDesc]=useState("")
  const [mediaUri,setMediaUri]=useState("https://cdn-icons-png.freepik.com/256/1829/1829586.png?semt=ais_hybrid")
  const [userData, setUserData] = useRecoilState(userdata);
  const addData=async()=>{

 

    
 
    const base64Data = await RNFS.readFile(mediaUri, 'base64');
    var pathsplit=mediaUri.split("/")

   console.log(mediaUri)
    const payload = {
      filename: pathsplit[pathsplit.length-1]+".png",
      filetype: "image",
    
      data: base64Data,
      userId:userData['id'],
      location:location,
      description:desc
    };
    try{
      const response = await axios.post('http://192.168.1.41:3000/addPost', payload,{
        headers: {
       
          'Content-Type': 'application/json',
  
        
        },
      });
    }
    catch(e)
    {
      console.log(e)
    }

   

  }

  const pickFile=async()=>{

    DocumentPicker.pick
    const [result] = await DocumentPicker.pick({
      type:DocumentPicker.types.images
    })

    
    setMediaUri(result.uri)


    
  }

    return (
      <View style={{height: '100%', width: '100%', backgroundColor: 'white',display:"flex",flexDirection:'column',alignItems:'center'}}>
      
      
      <TouchableOpacity onPress={()=>{pickFile()}}  style={{height:300,width:'90%'}}>
      <Image source={{uri:mediaUri}}  style={{height:300,width:'100%'}}/>

      </TouchableOpacity>
      <TextInput onChangeText={(text)=>{setLocation(text)}} placeholder="Location" style={{width:'90%',height:50,backgroundColor:"#F1F1F1",padding:10,borderRadius:10,marginTop:10}}/>
   
      <TextInput onChangeText={(text)=>{setDesc(text)}} multiline={true} numberOfLines={5} placeholder="Description" style={{width:'90%',marginTop:10,backgroundColor:"#F1F1F1",padding:10,borderRadius:10,textAlignVertical:"top"}}/>
      <View style={{flex:1}}></View>
      <TouchableOpacity onPress={()=>{addData()}} style={{width:'90%',marginBottom:10}}>
          <View style={{height:40,width:'100%',backgroundColor:'blue',display:"flex",alignItems:"center",justifyContent:"center"}}><Text style={{color:'white',fontWeight:'bold'}}>Add Post</Text></View>
      </TouchableOpacity>
  
    </View>
    );
  }


  export default AddPostScreen;
  