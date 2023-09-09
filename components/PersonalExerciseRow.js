import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import toTitleCase from './TitleCase';

const PersonalExerciseRow = ({ exercise }) => {
  const [isRepComplete, setIsRepComplete] = useState(false);
  const [lbs, setLbs] = useState('');
  const [reps, setReps] = useState('');
  const [setNum, setSetNum] = useState(1);

  const handleRepPress = () => {
    setIsRepComplete((prev) => !prev);
  };

  const setIncrementor = () => {
    setSetNum((prevNum) => prevNum + 1);
  };

  const setDecrementor = () => {
    setSetNum((prevNum) => Math.max(prevNum - 1, 1));
  };

  // Determine if the device is in portrait orientation
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  // Update the state when the orientation changes
  const [isPortraitMode, setIsPortraitMode] = useState(isPortrait());
  useEffect(() => {
    const onChange = () => {
      setIsPortraitMode(isPortrait());
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
    <View style={styles.exerciseRowContainer}>
      <View style={styles.nameAndButtonsContainer}>
        <View style={styles.exerciseNameContainer}>
          <Text style={styles.exerciseName}>{toTitleCase(exercise.name)}</Text>
        </View>
        <View style={[styles.buttonsContainer, isPortraitMode ? styles.column : styles.row]}>
          <TouchableOpacity style={styles.addSetButton} onPress={setIncrementor}>
            <Text>Add Set</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeSetButton} onPress={setDecrementor}>
            <Text>Remove Set</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Set</Text>
        <Text style={styles.label}>Lbs</Text>
        <Text style={styles.label}>Reps</Text>
      </View>
      {[...Array(setNum)].map((_, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.input, isRepComplete && styles.inputComplete]}>{index + 1}</Text>
          <TextInput
            style={[styles.input, isRepComplete && styles.inputComplete]}
            value={lbs}
            onChangeText={setLbs}
            placeholder="Enter Weight"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, isRepComplete && styles.inputComplete]}
            value={reps}
            onChangeText={setReps}
            placeholder="Enter Reps"
            keyboardType="numeric"
          />
        </View>
      ))}
      <View style={styles.checkmarkContainer}>
        <TouchableOpacity
          style={[styles.checkmark, isRepComplete && styles.checkmarkComplete]}
          onPress={handleRepPress}
        />
      </View>
    </View>  
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: 'rgba(255, 165, 0, 0.5)',
  },
  exerciseRowContainer: {
    backgroundColor: '#363636',
    borderRadius: 8,
    padding: 16,
    paddingBottom: 40,
    marginBottom: 12,
    borderColor: 'black',
    borderWidth: 1,
  },
    scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  exerciseNameContainer: {
    flex: 1,
    maxWidth: '80%',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  nameAndButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addSetButton: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#609966',
    borderRadius: 4,
    alignItems: 'center',
    padding: 8,
    margin: 4,
    color: 'white',
    
  },
  removeSetButton: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#D71313',
    borderRadius: 4,
    alignItems: 'center',
    padding: 8,
    margin: 4,
    color: 'white',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.5)',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  inputComplete: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#40b24e',
  },
  checkmarkContainer: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  checkmark: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 15,
    position: 'absolute',
    margin: 10,
    right: 5,
    bottom: -10,
  },
  checkmarkComplete: {
    backgroundColor: 'lightgreen',
    borderColor: 'black',
  },
});

export default PersonalExerciseRow;
