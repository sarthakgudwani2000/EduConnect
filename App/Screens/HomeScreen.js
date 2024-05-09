import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomeScreen/CourseList'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services'
import { UserPointsContext } from '../Context/UserPointsContext'
import CourseProgress from '../Components/HomeScreen/CourseProgress'

export default function HomeScreen() {
    const { isLoaded, signOut } = useAuth();
    const { user } = useUser();
    const { userPoints, setUserPoints } = useContext(UserPointsContext);

    useEffect(() => {
        user && createUser();
    }, [user])

    const createUser = () => {
        if (user) {
            createNewUser(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl, getUserDetail)
                .then(response => {
                    if (response) {
                        GetUser()
                    }
                })
        }
    }

    const GetUser = () => {
        getUserDetail(user.primaryEmailAddress.emailAddress)
            .then(response => {
                console.log("Get User Detail : ", response.userDetail?.point);
                setUserPoints(response.userDetail?.point)
            })
    }
    return (
        <ScrollView>
            <View style={{ backgroundColor: Colors.PRIMARY, height: 250, padding: 20 }}>
                <UserPointsContext.Provider value={{ userPoints, setUserPoints }}>
                    <Header />
                </UserPointsContext.Provider>
            </View>
            <View style={{ padding: 20 }}>
                <View style={{ marginTop: -90 }}>
                    <CourseProgress />
                    <CourseList level={"Basic"} />
                </View>
                <CourseList level={"Advance"} />
            </View>
        </ScrollView>
    )
}