import { useEffect, useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import PostCard from '../Components/PostCard';
import { ScrollView } from 'react-native-gesture-handler';
import { RecoilRoot, useRecoilState } from 'recoil';
import { bottomSheetContent, bottomSheetVisiblity, userdata } from '../Recoil/Atom';
import axios from 'axios';


function HomeScreen(props: any) {

  const [data, setdata] = useState([])
  const [isFetched, setisFetched] = useState(false)
  const [curruserdata, setuserData] = useRecoilState(userdata)
  useEffect(() => {

    get()

  }, [curruserdata])

  function get() {

    console.log("afs" + curruserdata['id'])

    fetch('http://192.168.1.41:3000/getPost', {
      method: "POST", headers: {
        'Content-Type': 'application/json' // Specify the content type
      }, body: JSON.stringify({ userId: curruserdata['id'] })
    })
      .then(response => {

        if (response.status == 201)

          return response.json();
        else
          return [];
      })
      .then(dataaa => {

        console.log("data:" + dataaa)

        setdata(dataaa)
        setisFetched(true)

      })
      .catch(error => {
        setdata([])
        //  console.error('Error fetching data:', error);
      });
  }

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

      <ScrollView>


        {isFetched ? data.length !== 0 ? data.map((e) => (<PostCard data={e} key={e['_id']} />)) : <NoPostAvailableCard /> : <View />}
      </ScrollView>

    </View>
  );
}



function NoPostAvailableCard() {

  const [people, setpeoples] = useState([])
  const [isfetched, setIsFetched] = useState(false)

  useEffect(() => {
    getPeoples()
  }, [])
  async function getPeoples() {


    const payload = {


    };
    try {
      const response = await axios.post('http://192.168.1.41:3000/getpeople', payload, {
        headers: {

          'Content-Type': 'application/json; charset=utf-8',




        },
      });

      if (response.status == 201) {
        var data = JSON.parse(JSON.stringify(response.data))

        setpeoples(data)
        setIsFetched(true)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={{ height: 500, width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20 }}>

      <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black',marginBottom:10 }}>People you may Know</Text>


      <ScrollView horizontal={true}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {isfetched ? people.map((e => (<UserCard data={e} key={e['_id']} />))) : <Text>No peoples found</Text>}
        </View>
      </ScrollView>

    </View>
  )
}


function UserCard(props: any) {
  const [curruserdata, setuserData] = useRecoilState(userdata)
  const follow=async()=>{
    const payload = {
      myuserId:curruserdata['id'],
     thieruserId:props.data['_id']

     };
     try{
       const response = await axios.post('http://192.168.1.41:3000/addFollow', payload,{
         headers: {
        
           'Content-Type': 'application/json; charset=utf-8',
           
       
   
         
         },
       });

      if(response.status==201)
       {
           console.log("login success")
           console.log(response.data)
           var data= JSON.parse( JSON.stringify(response.data))  
       

       }
     }
     catch(e)
     {
       console.log(e)
     }
  }
  return (
    <View style={{ height: 200, width: 150, backgroundColor: "#D1D8C5", marginRight: 5, borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {
        props.data['dpLink'] != "" ? <Image source={{ uri: props.data['dpLink'] }} style={{ height: 90, width: 90, borderRadius: 45 }} /> :
          <Image source={require('../assets/user.png')} style={{ height: 90, width: 90, borderRadius: 45 }} />
      }
      <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{props.data['username']}</Text>
      <TouchableOpacity onPress={()=>{follow()}}>
      <View style={{height:30,width:100,backgroundColor:'blue',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:10,marginTop:30}}><Text style={{color:'white'}}>Follow</Text></View>
      </TouchableOpacity>
    </View>
  )
}


export default HomeScreen;