import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { GetAllProgressCourse } from '../Services';
import CourseProgressItem from '../Components/MyCourse/CourseProgressItem';

export default function MyCourse() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [progressCourseList, setProgressCourseList] = useState();

  useEffect(() => {
      user && GetAllProgressCourseList()
  }, [user]);

  const GetAllProgressCourseList = () => {
      GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then(response => setProgressCourseList(response.userEnrolledCourses))
  }
  return (
    <View>
      <View style={{ height: 160, backgroundColor: Colors.PRIMARY, padding: 30 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, color: Colors.WHITE, }}>My Course</Text>
      </View>
      <FlatList style={{marginTop:-50}} data={progressCourseList} showsHorizontalScrollIndicator={false} renderItem={({ item }) => (
                <TouchableOpacity style={{margin: 8, padding:5}} onPress={() => navigation.navigate('Course-Detail', {
                    course: item.course
                })}>
                    <CourseProgressItem item={item.course} completedChapter={item?.completedChapter?.length} />
                </TouchableOpacity>
            )} />
    </View>
  )
}