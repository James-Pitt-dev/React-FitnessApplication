import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import toTitleCase from './TitleCase';

const WorkoutExercises = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f48c1ca000msh7e678439e98e9e8p1d06e1jsn3e8190340612',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Request failed');
        }
        return res.json();
      })
      .then((data) => {
        setWorkoutData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!workoutData || workoutData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleBodyPartPress = (bodyPart) => {
    navigation.navigate('Exercise List', { bodyPart });
  };

  return (
  
    <View style={styles.container}>
    <Text style={styles.title}>Select A Category</Text>
      {workoutData.map((bodyPart, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleBodyPartPress(bodyPart)}
          style={styles.bodyPartContainer}
        >
          <Text style={styles.workoutText}>{toTitleCase(bodyPart)}</Text>
        </TouchableOpacity>
      ))}
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'rgba(255, 165, 0, 0.5)',
     flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  workoutText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#ffffff',
  },
  bodyPartContainer: {
    marginBottom: 8,
    marginHorizontal: 75,
    padding: 8,
    backgroundColor: '#50,50,50',
    borderRadius: 6,
    borderColor: 'rgba(255, 165, 0, 0.3)',
    borderWidth: 3,
     justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkoutExercises;
