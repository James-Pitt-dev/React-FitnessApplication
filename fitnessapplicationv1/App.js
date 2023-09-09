import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
// import WorkoutDetailsCard from './components/WorkoutDetailsCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutExercises from './components/WorkoutExercises';
import WorkoutExerciseList from './components/WorkoutExerciseList';
import PersonalList from './components/PersonalList';
import { PersonalListProvider } from './components/PersonalListContext';
import PersonalExerciseRow from './components/PersonalExerciseRow';
import Feature from './components/Feature';
import Location from './components/Location';

const Stack = createStackNavigator();

//display app menu for user to access
function Home(props) {
  
  return (
    <View style={styles.container}>
    <ImageBackground
        style={styles.backgroundImage}
        source={require('./assets/homeBG.jpg')}
      >
      <View style={styles.menuContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Workout Exercises');
        }}>
        <Text style={styles.menu}>Workout Exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Feature');
        }}>
        <Text style={styles.menu}>Feature</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Location');
        }}>
        <Text style={styles.menu}>Gym Location</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
}


export default function App() {
  return (
   <PersonalListProvider> 
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Fitness Tracker" 
      detachInactiveScreens
       screenOptions={{
              headerStyle: {
                backgroundColor: 'black', 
                borderBottomWidth: 12, 
                borderBottomColor: 'rgba(255, 165, 0, 0.3)',
              },
              headerTitleStyle: {
                color: 'white',
                fontSize: 24,
              },
            }}
      >
      <Stack.Screen name="Fitness Tracker" component={Home} />
        <Stack.Screen name="Workout Exercises" component={WorkoutExercises} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Feature" component={Feature} />
        <Stack.Screen name="Exercise List" component={WorkoutExerciseList} />
        <Stack.Screen name="Personal List" component={PersonalList} />
        <Stack.Screen name="Personal ExerciseRow" component={PersonalExerciseRow} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
    </PersonalListProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -250,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 4,
    borderColor: 'rgba(255, 165, 0, 0.5)',
  },
  menu: {
    margin: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
});
