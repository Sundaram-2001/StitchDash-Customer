import { Text, View } from "react-native";
import { useUser } from "../context/UserContext";

export function Home(){
    const {profile}=useUser()
    if(!profile){
        return(
            <Text>Profile not found</Text>
        )
    }
    return(
        <View>
            <Text>customer information</Text>
            <View>
                <Text>{profile.name}</Text>
            </View>
        </View>
    )
}