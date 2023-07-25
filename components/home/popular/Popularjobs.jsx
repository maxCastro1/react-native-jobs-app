import React, {useState,useEffect} from 'react'
import { View, Text,TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS,SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFect from '../../../hook/useFetch'
import popularData from '../../../data/data'
const Popularjobs = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  // const { data, isLoading, error } = useFect({
  //   endpoint: 'search', 
  //   query: {
  //     query: 'react developer',
  //     num_pages: 1,
  //   },
  // });
  const [selectedJob, setSelectedJob] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };
  useEffect(()=>{
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  },[])

  return (
    <View style={styles.container}>
     <View style={styles.header}>
     <Text style={styles.headerTitle}>Popular jobs</Text>
     <TouchableOpacity>
      <Text>Show all</Text>
     </TouchableOpacity>
     </View>
     <View style={styles.cardsContainer}>
      {isLoading ? (
        <ActivityIndicator size='large' colors={COLORS.primary} />
      ) : ( error ? 
        <Text>Something went wrong</Text>  : 
       (<FlatList 
       data={popularData.data.slice(0, 5)}
       renderItem={({ item })=>(
        <PopularJobCard 
        item = {item}
        selectedJob={selectedJob}
        handleCardPress={handleCardPress}
        />
       )}
       keyExtractor={item => item?.job_id}
       contentContainerStyle={{ columnGap: SIZES.medium}}
       horizontal
       />)
      )}
     </View>
    </View>
  )
}

export default Popularjobs