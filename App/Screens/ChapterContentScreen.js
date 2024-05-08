import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function ChapterContentScreen() {
  const navigation = useNavigation();
  const param = useRoute().params;
  const {isChapterComplete, setIsChapterComplete} = useContext(CompleteChapterContext);

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