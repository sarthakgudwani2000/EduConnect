import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';

export default function ChapterContentScreen() {
  const navigation = useNavigation();
  const param = useRoute().params;

  useEffect(() => {
    console.log("Chapter Id: ", param.chapterId);
    console.log("Record Id: ", param.userCourseRecordId);
  }, [param])

  const onChapterFinish = () => {
    // navigation.goBack()
    MarkChapterCompleted(param.chapterId, param.userCourseRecordId)
      .then(response => {
        // console.log(response)
        if (response)
          {
            ToastAndroid.show("Chapter Completed", ToastAndroid.SHORT);
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