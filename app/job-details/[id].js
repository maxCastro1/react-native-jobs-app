import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import data from "../../data/data"
const tabs = ["About", "Qualifications", "Responsibilities"];
const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
//  const [job,setJob] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = () => {
    setIsloading(true)
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  }
  // useEffect(()=>{
  //  setIsloading(true)
  // const details = data.data.find((item) => item.job_id === params.id)
  //  setJob(details)
  //  console.log(details)
  //  console.log(job)
  //  if(job) setIsloading(false)
  
  // },[])
  const job = data.data.find((item) => item.job_id === params.id)

    const displayTabContent = () => {
      switch (activeTab) {
        case "Qualifications":
          return (
            <Specifics
              title='Qualifications'
              points={job.job_highlights?.Qualifications ?? ["N/A"]}
            />
          );
  
        case "About":
          return (
            <JobAbout info={job.job_description ?? "No data provided"} />
          );
  
        case "Responsibilities":
          return (
            <Specifics
              title='Responsibilities'
              points={job.job_highlights?.Responsibilities ?? ["N/A"]}
            />
          );
  
        default:
          return null;
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite, paddingLeft:'5px' },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension='60%'
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
            ),
            headerTitle: "",
          }}
        />
  
        <>
          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {isLoading ? (
              <ActivityIndicator size='large' color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : !job ? (
              <Text>No data available</Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={job.employer_logo}
                  jobTitle={job.job_title}
                  companyName={job.employer_name}
                  location={job.job_country}
                />
  
                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
  
                {displayTabContent()}
              </View>
            )}
          </ScrollView>
  
          <JobFooter url={job?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
        </>
      </SafeAreaView>
    );
    
}

export default JobDetails