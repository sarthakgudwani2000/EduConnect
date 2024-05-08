import { View, Text, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import ContentItem from './ContentItem'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Content({content, onChapterFinish}) {
  const navigation = useNavigation();
  
  let contentReference; 
  const[activeIndex, setActiveIndex] = useState(0);

  const onNextButtonPress = (index) => {
    if (content?.length <= index + 1)
      {
        // navigation.goBack();
        onChapterFinish();
        return;
      }
      setActiveIndex(index + 1);
    contentReference.scrollToIndex({animted:true, index: index + 1});
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{padding:20, height:'100%'}}>
        <ProgressBar contentLength={content?.length} contentIndex={activeIndex}/>
        <FlatList horizontal={true} pagingEnabled showsHorizontalScrollIndicator={false} ref={(ref) => {
          contentReference = ref;
        }} data={content} renderItem={({item, index}) => (
            // Screen Width 
            <View style={{width:Dimensions.get('screen').width*0.905}}>
                <Text style={{fontFamily:'outfit-medium', fontSize:22, marginTop:15}}>{item.heading}</Text>
                <ContentItem description={item?.description?.html} output={item?.output?.html}/>
                <TouchableOpacity style={{marginTop:10}} onPress={() => onNextButtonPress(index)}>
                  <Text style={{fontFamily:'outfit', fontSize:17, marginBottom:20, padding:15, backgroundColor: Colors.PRIMARY, color:Colors.WHITE, borderRadius:10, textAlign:'center',  }}>
                    {
                      content?.length > index + 1 ? 'Next' : 'Finish'
                    }
                  </Text>
                </TouchableOpacity>
            </View>
        )}/>
    </ScrollView>
  )
}