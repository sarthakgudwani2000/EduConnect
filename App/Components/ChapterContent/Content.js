import { View, Text, FlatList, Dimensions } from 'react-native'
import React from 'react'
import ProgressBar from './ProgressBar'

export default function Content({content}) {
  return (
    <View style={{padding:20}}>
        <ProgressBar contentLength={content?.length} contentIndex={1}/>
        <FlatList horizontal={true} pagingEnabled showsHorizontalScrollIndicator={false} data={content} renderItem={({item}) => (
            // Screen Width 
            <View style={{width:Dimensions.get('screen').width*0.89}}>
                <Text style={{fontFamily:'outfit-medium', fontSize:22, marginTop:15}}>{item.heading}</Text>
            </View>
        )}/>
    </View>
  )
}