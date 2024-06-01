import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Text, Image, StyleSheet } from 'react-native';
import { ReactNode, useEffect, useState } from 'react';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import HomeScreen from './Screens/HomeScreen';
import AddPostScreen from './Screens/AddPostScreen';
import ProfileScreen from './Screens/ProfileScreen';
import TopBar from './Components/TopBar';

import { RecoilRoot, useRecoilState } from 'recoil';
import { bottomSheetContent, bottomSheetVisiblity, userdata } from './Recoil/Atom';
import LoginScreen from './Screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './Screens/SignUpScreen';

const Stack = createStackNavigator();

//https://cdn-icons-png.flaticon.com/128/2198/2198321.png
//https://cdn-icons-png.flaticon.com/128/3161/3161837.png

//https://cdn-icons-png.flaticon.com/128/747/747376.png

function App() {

  return (
    <RecoilRoot>
      <MainPage />

    </RecoilRoot>
  );
}

function MainPage() {
  const [currentPage, setcurrentPage] = useState(0);

  const [BottomSheetView, setBottomSheetView] = useRecoilState(bottomSheetContent);
  const [BottomSheetVisiblity, setBottomSheetVisibility] = useRecoilState(bottomSheetVisiblity);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [curruserdata, setuserData] = useRecoilState(userdata)


  useEffect(() => {
    getdata()

  }, [])

  const getdata = async () => {
    var id = await AsyncStorage.getItem('id');
    var username = await AsyncStorage.getItem('userName');
    var dplink = await AsyncStorage.getItem('dpLink');

    if (id != null) {
      console.log("not null")
      setIsLoggedIn(true)

    setuserData({ id: id, userName: username == null ? "" : username, dpLink: dplink == null ? "" : dplink })
    }
    else {
      console.log("safasf")
    }
  }



  const screens = [<HomeScreen />, <AddPostScreen />, <ProfileScreen />];
  return <GestureHandlerRootView>

    {isLoggedIn ? <View style={styles.myapp}>
      <TopBar currentItem={currentPage} setIsLoggedIn={setIsLoggedIn} />
      <View style={styles.content}>{screens[currentPage]}</View>

      <View style={styles.bottombar}>
        <TouchableOpacity
          onPress={() => {
            setcurrentPage(0);
          }}>
          <View>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2198/2198321.png',
              }}
              style={{ height: 20, width: 20 }}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setcurrentPage(1);
          }}>
          <View>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3161/3161837.png',
              }}
              style={{ height: 20, width: 20 }}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setcurrentPage(2);
          }}>
          <View>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/747/747376.png',
              }}
              style={{ height: 20, width: 20 }}></Image>
          </View>
        </TouchableOpacity>
      </View>
      {
        BottomSheetVisiblity ? <View style={{ height: '100%', width: "100%", backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 10 }}>
          <View style={{ height: 400, width: '100%', backgroundColor: 'white', borderRadius: 10 }}>
            {BottomSheetView}
          </View>
        </View> :
          <View />
      }

    </View> :

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    }

  </GestureHandlerRootView>
}

const styles = StyleSheet.create({
  myapp: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topbar: {
    height: 50,
    width: '100%',
    backgroundColor: 'red',
  },
  bottombar: {
    flex: 1,
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 50,
    paddingTop: 10,
  },
  content: {
    height: '85%',
    width: '100%',

  },
});





export default App;
