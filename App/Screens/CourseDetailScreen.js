import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { enrollCourse, getUserEnrolledCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();
  const [userEnrollCourse, setUserEnrolledCourse] = useState([]);

  useEffect(() => {
    console.log("On Press: ", params.course)
    if (user && params.course) {
      GetUserEnrolledCourse();
    }
  }, [params.course, user])

  const UserEnrollCourse = () => {
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress)
      .then(response => {
        ToastAndroid.show('Course Enrolled Successfully!', ToastAndroid.LONG);
        GetUserEnrolledCourse();
      })
  }

  const GetUserEnrolledCourse = () => {
    getUserEnrolledCourse(params.course.id, user.primaryEmailAddress.emailAddress)
      .then(response => {
        console.log("GetUserEnrolledCourse Response: ", response.userEnrolledCourses);
        setUserEnrolledCourse(response.userEnrolledCourses);
      })
  }

  return params.course && (
    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <DetailSection course={params.course}
        userEnrollCourse={userEnrollCourse}
        enrollCourse={() => UserEnrollCourse()} />
      <ChapterSection chapterList={params.course.chapters} />
    </ScrollView>
  )
}