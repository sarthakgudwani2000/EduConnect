import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';
import { UserPointsContext } from '../Context/UserPointsContext';
import { useUser } from '@clerk/clerk-expo';

export default function ChapterContentScreen() {
  const navigation = useNavigation();
  const param = useRoute().params;
  const {isChapterComplete, setIsChapterComplete} = useContext(CompleteChapterContext);
  const {userPoints, setUserPoints} = useContext(UserPointsContext);
  const {user} = useUser();
  
  useEffect(() => {
    console.log("Chapter Id: ", param.chapterId);
    console.log("Record Id: ", param.userCourseRecordId);
  }, [param])

  const onChapterFinish = () => {
    // navigation.goBack()
    const totalPoints =Number(userPoints) + param.content?.length * 10;
    MarkChapterCompleted(param.chapterId, param.userCourseRecordId, user.primaryEmailAddress.emailAddress, totalPoints)
      .then(response => {
        // console.log(response)
        if (response)
          {
            ToastAndroid.show("Chapter Completed", ToastAndroid.SHORT);
            setIsChapterComplete(true);
            navigation.goBack();
          }
      })
  }
  return param.content && (
    <View>
      <Content content={param.content} onChapterFinish={() => onChapterFinish()} />
    </View>
  )
}