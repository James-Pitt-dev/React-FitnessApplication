import React from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';

export default function WorkoutExerciseList() {
  return (
    <ScrollView>
    <View style={styles.page}>
     <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/bgOther.jpg')}
      >
      <Text style={styles.categoryTitle}>Back</Text>
      <Text style={styles.categoryDescription}>
        Strengthen your back muscles with a variety of exercises, including Alternate Lateral Pulldown, Archer Pull Up, Assisted Parallel Close Grip Pull Up, Assisted Pull-up, Assisted Standing Chin-up, Assisted Standing Pull-up,Back Extension On Exercise Ball, Back Lever, Back Pec Stretch, Band Assissted Pull-up. A strong back contributes to better posture and overall stability.
      </Text>

      <Text style={styles.categoryTitle}>Cardio</Text>
      <Text style={styles.categoryDescription}>
        Boost your cardiovascular endurance and burn calories with dynamic cardio workouts. Choose from activities like Astride Jumps, Burpee, Cycle Cross Dumbbell and Half Knee Bends
      </Text>

      <Text style={styles.categoryTitle}>Chest</Text>
      <Text style={styles.categoryDescription}>
        Sculpt and define your chest muscles with effective exercises such as Band Bench Press, Push UP, Kneeling and Barbell Decline Pullover. A well-developed chest enhances upper body strength and aesthetics.
      </Text>

      <Text style={styles.categoryTitle}>Lower Arms</Text>
      <Text style={styles.categoryDescription}>
        Target your lower arm muscles, including forearms and wrists, with exercises like Band Reverse Wrist Curl, Barbell Standing Back Wrist Curl, Barbell Wrist Curl. Strong lower arms are essential for various daily activities and sports.
      </Text>

      <Text style={styles.categoryTitle}>Lower Legs</Text>
      <Text style={styles.categoryDescription}>
        Strengthen your lower leg muscles (calves) with Assisted Lying Calves Stretch, Barbell Seated Calf Raise and other Lower Legs exercises. Well-developed calves support overall leg stability and athletic performance.
      </Text>

      <Text style={styles.categoryTitle}>Neck</Text>
      <Text style={styles.categoryDescription}>
        Pay attention to your neck muscles with exercises like Neck Side Stretch and Side Push Neck Stretch. A strong neck can help reduce the risk of neck-related injuries and promote better head posture.
      </Text>

      <Text style={styles.categoryTitle}>Shoulders</Text>
      <Text style={styles.categoryDescription}>
        Build well-rounded shoulders with workouts such as Band Front Raise, Band Reverse Fly, Band Shoulder Press snd other Shoulders workout exercises. Strong shoulders enhance upper body aesthetics and support various upper body movements.
      </Text>

      <Text style={styles.categoryTitle}>Upper Arms</Text>
      <Text style={styles.categoryDescription}>
        Target your upper arms with Triceps Extension, Triceps Dip, Biceps Curl, Close-grip Push-up, Side Tricep Extension and other Upper Arms WorkoutExercises. Well-developed upper arms contribute to arm strength and definition.
      </Text>


      <Text style={styles.categoryTitle}>Upper Legs</Text>
      <Text style={styles.categoryDescription}>
        Strengthen your quadriceps, hamstrings, and glutes with exercises like Squad Stretch, Glutes Stretch, Prone Hamstring and Upper Legs WorkoutExercises. A strong lower body is crucial for overall mobility and functional movement.
      </Text>


      <Text style={styles.categoryTitle}>Waist</Text>
      <Text style={styles.categoryDescription}>
        Focus on your core and oblique muscles with exercises like Sit-Up, Side Bend, Knee Raise and other Waist WorkoutExercises. A strong core provides stability and supports various daily activities and sports.
      </Text>
      </ImageBackground>
    </View>
    </ScrollView>
  );
}

const styles = {
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
   backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
    color: '#ffffff',
    padding: 20,
    borderColor: 'rgba(255, 165, 0, 0.2)',
    borderWidth: 4,
  },
  page: {
    borderColor: 'rgba(255, 165, 0, 0.5)',
    backgroundColor: 'black',
    padding: 35,
    borderWidth: 2,
  }
};
