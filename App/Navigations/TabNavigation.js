import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaderBoard from '../Screens/LeaderBoard';
import HomeScreen from '../Screens/HomeScreen';
import MyCourse from '../Screens/MyCourse';
import ProfileScreen from '../Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
            <Tab.Navigator screenOptions={{headerShown:false}}>
                <Tab.Screen name="home" component={HomeScreen} options={{tabBarIcon: ({color, size}) => (<Ionicons name="home" size={size} color={color} />)}}/>
                <Tab.Screen name="leaderboard" component={LeaderBoard} options={{tabBarIcon: ({color, size}) => (<MaterialIcons name="leaderboard" size={size} color={color} />)}}/>
                <Tab.Screen name="my-course" component={MyCourse} options={{tabBarIcon: ({color, size}) => (<Ionicons name="book" size={size} color={color} />)}}/>
                <Tab.Screen name="profile" component={ProfileScreen} options={{tabBarIcon: ({color, size}) => (<MaterialIcons name="supervised-user-circle" size={size} color={color} />)}}/>
            </Tab.Navigator>
    )
}