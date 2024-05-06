import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../../Services'
import SubHeading from '../SubHeading';
import Colors from '../../Utils/Colors';
import CourseItem from './CourseItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function CourseList({ level }) {
    const [courseList, setCourseList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        getCourseList(level).then(response => {
            console.log(response)
            setCourseList(response?.courses)
        })
    }
    return (
        <View>
            <SubHeading text={level+' Courses'} color={level=='Basic' && Colors.WHITE}/>
            <FlatList data={courseList} key={courseList.id} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Course-Detail')}>
                    <CourseItem item={item} />
                </TouchableOpacity>
            )} />
        </View>
    )
}