

import axios from "axios";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userdata} from '../Recoil/Atom';
function SignupScreen() {

    const [curruserdata,setuserData]=useRecoilState(userdata)
    const [userName, setuserName] = useState("")
    const [userEmail, setuserEmail] = useState("")
    const [password, setpassword] = useState("")
  

    const signup=async()=>{
        const payload = {
           email:userEmail,
           userName:userName,
           password:password

          };
          try{
            const response = await axios.post('http://192.168.1.41:3000/signUp', payload,{
              headers: {
             
                'Content-Type': 'application/json; charset=utf-8',
                
            
        
              
              },
            });

           if(response.status==201)
            {
                console.log("sign up success")
                console.log(response.data)
                var data= JSON.parse( JSON.stringify(response.data))  
             
                await AsyncStorage.setItem('id', data['id']);
                await AsyncStorage.setItem('userName', data['userName']);
                await AsyncStorage.setItem('dpLink', data['dpLink']);

                setuserData(data)
            }
          }
          catch(e)
          {
            console.log(e)
          }
    }


    return (
        <View style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 50 }}>Signup</Text>
            <TextInput onChangeText={(text) => { setuserName(text) }} placeholder="User Name" style={{ width: '90%', height: 50, backgroundColor: "#F1F1F1", padding: 10, borderRadius: 10, marginTop: 10 }} />
            <TextInput onChangeText={(text) => { setuserEmail(text) }} placeholder="Email" style={{ width: '90%', height: 50, backgroundColor: "#F1F1F1", padding: 10, borderRadius: 10, marginTop: 10 }} />
            <TextInput onChangeText={(text) => { setpassword(text) }} placeholder="Password" style={{ width: '90%', height: 50, backgroundColor: "#F1F1F1", padding: 10, borderRadius: 10, marginTop: 10 }} />
           
            <TouchableOpacity onPress={() => { signup() }} style={{ width: '90%', marginBottom: 10 }}>
                <View style={{ height: 40, width: '100%', backgroundColor: 'blue', display: "flex", alignItems: "center", justifyContent: "center",marginTop:20,borderRadius:10 }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Log In</Text></View>
            </TouchableOpacity>
        
          
        </View>
    )
}

export default SignupScreen