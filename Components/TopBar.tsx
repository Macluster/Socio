import { StyleSheet, Text, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
function TopBar({ currentItem, setIsLoggedIn }: any) {

    const logout = async () => {

        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('dpLink');
        await AsyncStorage.clear()
        setIsLoggedIn(false)
    }

    return (
        <View style={styles.topbar}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: 'black' }}>{currentItem == 0 ? "Home" : currentItem == 1 ? "Add Post" : "Profile"}</Text>
            <Text onPress={() => { logout() }} style={{ fontSize: 17, fontWeight: "bold", color: 'red' }}>Logout</Text>
        </View>)
}

const styles = StyleSheet.create({
    topbar: {
        height: 50,
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
})


export default TopBar