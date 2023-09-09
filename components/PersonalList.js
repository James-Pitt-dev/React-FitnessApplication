import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PersonalExerciseRow from './PersonalExerciseRow';

const PersonalList = ({ route }) => {
  const { personalList } = route.params;

  return (
    <View>
         {personalList.map((exercise) => (
        <PersonalExerciseRow key={exercise.id} exercise={exercise} />
      ))}
    </View>
  );
};

export default PersonalList;
