import { View, Text, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  const [userEnrolledCourse, setUserEnrolledCourse] = useState([]);

  useEffect(() => {
    console.log('On Press: ', params.course);
    if (user && params.course) {
      GetUserEnrolledCourse();
    }
  }, [params.course, user]);

  const UserEnrollCourse = () => {
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress)
      .then((response) => {
        ToastAndroid.show('Course Enrolled Successfully!', ToastAndroid.LONG);
        GetUserEnrolledCourse();
      });
  };

  const GetUserEnrolledCourse = () => {
    getUserEnrolledCourse(params.course.id, user.primaryEmailAddress.emailAddress)
      .then((response) => {
        console.log('GetUserEnrolledCourse Response: ', response.userEnrolledCourses);
        setUserEnrolledCourse(response.userEnrolledCourses);
      });
  };

  const handleChapterCompletion = (chapterId) => {
    // Update userEnrolledCourse in state (assuming it gets updated after completion)
    const updatedEnrolledCourse = [...userEnrolledCourse];
    const completedChapterIndex = updatedEnrolledCourse[0].completedChapter.findIndex(
      (chapter) => chapter.chapterId === chapterId
    );
    if (completedChapterIndex === -1) {
      updatedEnrolledCourse[0].completedChapter.push({ chapterId });
    }
    setUserEnrolledCourse(updatedEnrolledCourse);
  };

  return params.course && (
    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <DetailSection course={params.course} userEnrolledCourse={userEnrolledCourse} enrollCourse={() => UserEnrollCourse()} />
      <ChapterSection userEnrolledCourse={userEnrolledCourse} chapterList={params.course.chapters} onChapterComplete={handleChapterCompletion} />
    </ScrollView>
  );
}
