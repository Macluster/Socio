import { Image, Text, View } from "react-native";
import { bottomSheetContent, bottomSheetVisiblity, userdata } from '../Recoil/Atom';
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
function ProfileScreen() {


  const [profileData,setProfileData]=useState({})
  const [isFetched,setIsFetched]=useState(false)
  const getallMyPost=async()=>
  {
    const payload = {
      _id:curruserdata['id']

     };
     try{
       const response = await axios.post('http://192.168.1.41:3000/getProfileData', payload,{
         headers: {
        
           'Content-Type': 'application/json; charset=utf-8',
           
       
   
         
         },
       });

      if(response.status==201)
       {
            var dataString=JSON.stringify(response.data)
            setProfileData(JSON.parse(dataString))
            setIsFetched(true)

       }
     }
     catch(e)
     {
       console.log(e)
     }
  }

  useEffect(()=>{
    getallMyPost()
  },[])

  const [curruserdata, setuserData] = useRecoilState(userdata)
  return (
    isFetched?
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white', padding: 10 }}>
      <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
        {
          curruserdata['dpLink']!=""?    <Image source={{ uri: curruserdata['dpLink'] }} style={{ height: 120, width: 120, borderRadius: 60 }} />:
          <Image source={ require('../assets/user.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
        }
    
        <View style={{ display: "flex", flexDirection: 'column',flex:1, justifyContent:'center',alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{curruserdata['userName']}</Text>
          <View style={{height:30,width:100,backgroundColor:'blue',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:10,marginTop:5}}><Text style={{color:'white'}}>Edit Profile</Text></View>
        </View>
      </View>
      <View style={{display:'flex',flexDirection:'row',justifyContent:"center"}}>

        <View style={{display:"flex",flexDirection:"column",alignItems:'center',marginRight:50}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{profileData['followers'].length}</Text>
          <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>Followers</Text>
        </View>
        
        <View style={{display:"flex",flexDirection:"column",alignItems:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{profileData['following'].length}</Text>
          <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>Following</Text>
        </View>

      </View>
      <Text style={{fontSize:17,color:'black',fontWeight:"bold",marginBottom:10,marginTop:20}}>All Posts</Text>
      <FlatList style={{width:'100%'}} numColumns={3} initialNumToRender={2}  data={profileData['posts']} renderItem={({item, index, separators})=>(<View style={{height:120,width:"33%",padding:1}}><Image source={{uri:item['mediaLink']}}  style={{height:'100%',width:"100%"}} /></View>)}>
        
      </FlatList>
     

    </View>:<View/>
  );
}


export default ProfileScreen
