import { StyleSheet, Text, View } from "react-native";



export default function Profile(){
    return(
        <View style={styles.mainContainer}>
            <View style={styles.childContainer}>
                <Text>Welcome to the profile page</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#ffffff"
    }
})