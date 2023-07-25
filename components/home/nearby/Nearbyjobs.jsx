import React, {useState,useEffect} from 'react'
import { View, Text,TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS,SIZES } from '../../../constants'
import popularData from '../../../data/data'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

const  Nearbyjobs = () => {
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
useEffect(()=>{
  setTimeout(() => {
    setIsloading(false);
  }, 2300);
},[])
  
  return (
    <View style={styles.container}>
     <View style={styles.header}>
     <Text style={styles.headerTitle}>Nearby jobs</Text>
     <TouchableOpacity>
      <Text>Show all</Text>
     </TouchableOpacity>
     </View>
     <View style={styles.cardsContainer}>
      {isLoading ? (
        <ActivityIndicator size='large' colors={COLORS.primary} />
      ) : ( error ? 
        <Text>Something went wrong</Text>  : 
       (popularData.data.slice(5,15).map((job)=>(
        <NearbyJobCard 
        job={job}
        key={`nearby-job-${job.job_id}`}
        handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
        />
      
       ) ))
      )}
     </View>
    </View>
  )
}

export default Nearbyjobs;