import { View, Text, ScrollView, safeAreaView } from "react-native";
import { Stack,useRouter } from "expo-router";
import { useState } from "react";
import { COLORS, icons, images,SIZES} from '../constants'
import {Nearbyjobs, Popularjobs, popularjobs, ScreenHeaderBtn,Welcome} from '../components'
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
     <Stack.Screen 
     options={{
      headerStyle: { backgroundColor:COLORS.lightWhite},
      headerShadowVisible: false,
      headerLeft: () => (
        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'/>
        ),
      headerRight: () => (
        <ScreenHeaderBtn iconUrl={images.profile} dimension='80%'/>
      ),
      headerTitle: ""
     }}
     />
     <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
        flex:1,
        padding: SIZES.medium
      }}>
       <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
        <Popularjobs/>
        <Nearbyjobs/>
      </View>
     </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
