import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionItem from './OptionItem'
import { ScrollView } from 'react-native-gesture-handler'


export default function DetailSection({ course, enrollCourse }) {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ padding: 10, borderRadius: 15, backgroundColor: Colors.WHITE }}>
            <Image source={{ uri: course?.banner?.url }} style={{ width: Dimensions.get('screen').width * 0.83, height: 190, borderRadius: 15 }} />

            <View style={{padding:10}}>
                <Text style={{ fontSize: 22, fontFamily: 'outfit-medium', marginTop: 10 }}>{course.name}</Text>
                <View>
                    <View style={styles.rowStyle}>
                        <OptionItem icon={'book-outline'} value={course.chapters?.length + " Chapters"} />
                        <OptionItem icon={'time-outline'} value={course.time} />
                    </View>

                    <View style={styles.rowStyle}>
                        <OptionItem icon={'person-circle-outline'} value={course?.author} />
                        <OptionItem icon={'cellular-outline'} value={course.level} />
                    </View>
                </View>
                <View>
                    <Text style={{fontFamily:'outfit-medium', fontSize:20, marginTop:10, }}>Description</Text>
                    <Text style={{fontFamily:'outfit', color:Colors.GRAY, lineHeight:23, marginTop:10,}}>{course.description?.markdown}</Text>
                </View>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', gap:10}}>
                    <TouchableOpacity 
                    onPress={() => enrollCourse()}
                    style={{padding:15, borderRadius:15, backgroundColor:Colors.PRIMARY}}>
                        <Text style={{ fontFamily: 'outfit', fontSize: 13, color: Colors.WHITE, textAlign:'center' }}>Enroll for Free</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:15, borderRadius:15, backgroundColor:Colors.LIGHT_PRIMARY}}>
                        <Text style={{ fontFamily: 'outfit', fontSize: 13, color: Colors.WHITE, textAlign:'center' }}>Membership $2.99/month</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    }
})