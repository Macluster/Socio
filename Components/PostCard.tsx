import { createRef, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Image, Text } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import { useRecoilState } from 'recoil';
import { bottomSheetContent, bottomSheetVisiblity,userdata } from '../Recoil/Atom';
function PostCard(props: any) {
    const [BottomSheetView, setBottomSheetView] = useRecoilState(bottomSheetContent);
    const [BottomSheetVisiblity, setBottomSheetVisibility] = useRecoilState(bottomSheetVisiblity);
    const [userData, setUserData] = useRecoilState(userdata);
    const viewComment = () => {

        setBottomSheetView(<CommentSheet postId={props.data['_id']} comments={props.data['comments']} />)
        setBottomSheetVisibility(true)

    }
    const addLike = async (myoption: any) => {

        console.log(props.data['_id'])

        const payload = {
            userId:userData['id'],
            postId: props.data['_id'],
            option: myoption

        };
        try {
            const response = await axios.post('http://192.168.1.41:3000/addLike', payload, {
                headers: {

                    'Content-Type': 'application/json',


                },
            });
        }
        catch (e) {
            console.log(e)
        }



    }
    useEffect(() => {

        setTotalLikes(props.data['likes'].length)
        if (props.data['likes'].includes("664975ed1ec2bba998e45327")) {
            setisLiked(true)
        }
        else {
            setisLiked(false)
        }



    }, [])

    const [isLiked, setisLiked] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)

    return (
        <View style={style.card}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <Image source={{ uri: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202303/dq_0-sixteen_nine.jpg?VersionId=WuO.1k7Zh.d5vEbJwDEhuULjAxujhhPn" }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}></Image>
                <View>
                    <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>{props.data['userName']}</Text>
                    <Text style={{ fontSize: 15, color: 'black' }}>{props.data['location'].length>40?props.data['location'].slice(0,35)+"...":props.data['location']}</Text>
                </View>


            </View>

            <Image source={{ uri: props.data['mediaLink'] }} style={{ height: 400, width: "100%", marginTop: 5 }}></Image>
           
            <View style={{ display: "flex", flexDirection: "row", marginTop: 5, padding: 10 }}>
                <TouchableOpacity onPress={() => {

                    if (isLiked) {
                        addLike("dislike")
                        setTotalLikes(totalLikes - 1)

                    }

                    else {
                        addLike("like")
                        setTotalLikes(totalLikes + 1)
                    }


                    setisLiked(!isLiked)
                }}>
                    <Image source={isLiked ? require("../assets/redheart.png") : require("../assets/heart.png")} style={{ height: 25, width: 25, marginRight: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { viewComment() }}>
                    <Image source={require("../assets/message.png")} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 17, fontWeight: "bold", color: 'blue', marginTop: 5, marginLeft: 10 }}>{totalLikes} Likes</Text>
            <Text style={{fontWeight:'bold',color:'black',fontSize:17,marginTop:2,marginLeft:10}}>{props.data['description']}</Text>

        </View>)
}


function CommentSheet(props: any) {


    const [BottomSheetVisiblity, setBottomSheetVisibility] = useRecoilState(bottomSheetVisiblity);
    const [comment,setComment]=useState("")
    const [userData, setUserData] = useRecoilState(userdata);
    const addComment=async()=>{
        var data={comment:comment,userName:userData['userName'],_id:"saf",dpLink:""}
        props.comments.push(data)
        const payload = {
            userName:userData['userName'],
            dpLink:"",
            postId:props.postId,
            comment:comment
          };
          try{
            const response = await axios.post('http://192.168.1.41:3000/addComment', payload,{
              headers: {
             
                'Content-Type': 'application/json',
        
              
              },
            });
          }
          catch(e)
          {
            console.log(e)
          }
          setBottomSheetVisibility(false)
    }


    return (
        <View style={{ height: '100%', width: '100%', display: "flex", flexDirection: 'column', padding: 10 }}>
            <View style={{ display: "flex", flexDirection: 'row', width: '100%', justifyContent: 'flex-start', marginBottom: 20 }}>
            <TouchableOpacity onPress={()=>{setBottomSheetVisibility(false)}}>
            <Image  source={require('../assets/close.png')} style={{height:30,width:30}}/>
            </TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22, marginLeft: 20 }}>Comments</Text>

            </View>
            <ScrollView>
            {props.comments.map((e: any) => (
                <View style={{ display: "flex", flexDirection: 'row', marginTop: 10 }} id={e['_id']}>
                  {
          e['dpLink']!=""?    <Image source={{ uri: e['dpLink'] }} style={{ height: 25, width: 25, borderRadius: 12.5 }} />:
          <Image source={ require('../assets/user.png')} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
        }
                    <View style={{ display: "flex", flexDirection: 'column', marginLeft: 10 }} >

                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>{e['userName']}</Text>
                        <Text>{e['comment']}</Text>
                    </View>




                </View>))}
                </ScrollView>
                <View style={{display:"flex",flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                <TextInput onChangeText={(text)=>{setComment(text)}} placeholder="Enter Comment" style={{width:'75%',height:50,backgroundColor:"#EEEEEE",padding:10,borderRadius:10}}/>
                <TouchableOpacity onPress={()=>{addComment()}}>
                <View  style={{display:"flex",justifyContent:'center',alignItems:'center',backgroundColor:'blue',width:70,height:50,borderRadius:10}}>
                    <Text style={{color:'white',fontWeight:'bold'}}>Add</Text>
                </View>
                </TouchableOpacity>
                </View>

        </View>
    )
}


const style = StyleSheet.create({
    card: {
        height: 580,
        width: '100%',
        padding: 10

    }
})


export default PostCard;