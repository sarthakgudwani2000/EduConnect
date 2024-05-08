import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ChapterSection({ chapterList, userEnrolledCourse, onChapterComplete }) {

    const [completedChapters, setCompletedChapters] = useState([]);

    useEffect(() => {
        if (userEnrolledCourse.length > 0) {
            const completedChapterIds = userEnrolledCourse[0].completedChapter.map((chapter) => chapter.chapterId);
            setCompletedChapters(completedChapterIds);
        }
    }, [userEnrolledCourse]);

    const navigation = useNavigation();

    const OnChapterPress = (chapter) => {
        if (userEnrolledCourse.length === 0) {
            ToastAndroid.show('Please Enroll in the course to access the chapters', ToastAndroid.SHORT);
            return;
        } else {
            navigation.navigate('Chapter-Content', { content: chapter.content, chapterId: chapter.id, userCourseRecordId: userEnrolledCourse[0]?.id });
            onChapterComplete(chapter.id);
        }
    };

    const isChapterCompleted = (chapterId) => {
        return completedChapters.includes(chapterId);
    };

    return (
        chapterList && (
            <View style={{ padding: 10, backgroundColor: Colors.WHITE, marginTop: 20, borderRadius: 15, marginBottom: 40 }}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 22 }}>Chapters</Text>
                {chapterList.map((item, index) => (
                    <TouchableOpacity key={item.id} style={[isChapterCompleted(item.id) ? styles.CompleteChapter : styles.inCompleteChapter]} onPress={() => OnChapterPress(item)}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {isChapterCompleted(item.id) ?
                                <Ionicons name='checkmark-circle' size={30} color={Colors.GREEN} />
                                :
                                <Text style={{ fontFamily: 'outfit-medium', fontSize: 27, color: Colors.GRAY }}>{index + 1}</Text>
                            }
                            <Text style={{ fontFamily: 'outfit', fontSize: 21, color: Colors.GRAY }}>{item.title}</Text>
                        </View>
                        {userEnrolledCourse?.length === 0 ? (
                            <Ionicons name="lock-closed" size={25} color={Colors.GRAY} />
                        ) : (
                            <Ionicons name="play" size={25} color={isChapterCompleted(item.id) ? Colors.GREEN : Colors.GRAY} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        )
    );
}

const styles = StyleSheet.create({
    inCompleteChapter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: Colors.GRAY
    },
    CompleteChapter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: Colors.GREEN,
        backgroundColor: Colors.LIGHT_GREEN
    }
});
