
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePersonalListContext } from './PersonalListContext';
import toTitleCase from './TitleCase';

const WorkoutExerciseList = ({ route }) => {
  const { bodyPart } = route.params;

  // Fetch the exercises for the selected body part and display them here
  const [workoutData, setWorkoutData] = useState([]);
  const { personalList, setPersonalList } = usePersonalListContext();
  const navigation = useNavigation();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0aa2cf9366msh2c6aed5cd281d20p16269cjsnb4f19c47bdf3',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, options)
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
  }, [bodyPart]);

 const addToList = useCallback(() => {
   if(personalList.length === 0){
     // some sort of indicator that its empty, return is a placeholder
     return;
   } else
  navigation.navigate('Personal List', { personalList: personalList });
}, [navigation, personalList]);

 useEffect(() => {
  // Set the header options
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={styles.goToList} onPress={addToList}>
        <Text style={styles.addButtonText}>Your List: {personalList.length}</Text>
      </TouchableOpacity>
    ),
  });
}, [personalList, navigation]);

  if (!workoutData || workoutData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleAddToListPress = ( exercise ) => {
    // Check if the exercise is already in the personalList
    const isExerciseInList = personalList.some( (item) =>
    item.id ===exercise.id
     );
    // If it isnt, then add to list
    if(!isExerciseInList){
      setPersonalList((prevList) => [...prevList, exercise]);
    }   
  };

 const removeFromList = ( exercise ) => {
   setPersonalList((prevList) => prevList.filter((item) => item.id !== exercise.id));
 }


// Limiting the workoutData list to just 10 entries printed for speed
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{toTitleCase(bodyPart)} Exercises</Text>
        {workoutData.slice(0, 10).map((exercise) => (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <Text style={styles.title}>{toTitleCase(exercise.name)}</Text>
            <Text style={styles.exerciseText}>Target: {toTitleCase(exercise.target)}</Text>
            <Text style={styles.exerciseText}>Equipment: {toTitleCase(exercise.equipment)}</Text>
            <Image source={{ uri: exercise.gifUrl }} style={styles.gifImage} Loading="lazy" />
            {
              personalList.some((item) => item.id === exercise.id ) ?
                 (<TouchableOpacity style={styles.removeButton} onPress={() => removeFromList(exercise)}>
              <Text style={styles.addButtonText}>Remove From List</Text>
            </TouchableOpacity>)
            :
             (<TouchableOpacity style={styles.addButton} onPress={() => handleAddToListPress(exercise)}>
              <Text style={styles.addButtonText}>Add to List</Text>
            </TouchableOpacity>)
            }
           
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
       borderWidth: 2,
    borderColor: 'rgba(255, 165, 0, 0.5)',
  },
  exerciseContainer: {
    backgroundColor: '#363636',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
     borderColor: 'rgba(255, 165, 0, 0.5)',
    borderWidth: 1,
  },
   gifImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 4,
    color: 'white',
  },
  exerciseText: {
    fontSize: 18,
    marginBottom: 4,
    color: 'white',
  },
    scrollContainer: {
    flexGrow: 1,
  },
    addButton: {
    backgroundColor: 'green',
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
  },
   removeButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
     borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
  },
   goToList: {
    backgroundColor: '#262626',
    borderRadius: 4,
    borderColor: 'orange',
    borderWidth: 3,
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'absolute',
    top: 5, 
    right: 5, 
    alignItems: 'center',
    zIndex: 1,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default WorkoutExerciseList;