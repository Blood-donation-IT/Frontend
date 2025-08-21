import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity
        // onPress={() => handleSignUp()}
      >
        <Image 
          source={require('../images/notification.png')}
          style={styles.notificationImg}  
        />
      </TouchableOpacity>
      

      <View style={styles.calendarWrapper}>
        <Calendar
          current={'2024-08-01'}
          monthFormat={'MMMM'}
          enableSwipeMonths={true}
          hideExtraDays={true}
          markedDates={{
            '2024-08-05': { selected: true, selectedColor: '#E53935' },
            '2024-08-06': { selected: true, selectedColor: '#E53935' },
            '2024-08-07': { selected: true, selectedColor: '#E53935' },
            '2024-08-08': { selected: true, selectedColor: '#E53935' },
            '2024-08-09': { selected: true, selectedColor: '#E53935' },
            '2024-08-10': { selected: true, selectedColor: '#E53935' },
            '2024-08-11': { selected: true, selectedColor: '#E53935' },
            '2024-08-14': { selected: true, selectedColor: '#E53935' },
            '2024-08-19': { selected: true, selectedColor: '#E53935' },
            '2024-08-20': { selected: true, selectedColor: '#E53935' },
            '2024-08-21': { selected: true, selectedColor: '#E53935' },
            '2024-08-22': { selected: true, selectedColor: '#E53935' },
            '2024-08-23': { selected: true, selectedColor: '#E53935' },
            '2024-08-24': { selected: true, selectedColor: '#E53935' },
            '2024-08-29': { selected: true, selectedColor: '#E53935' },
          }}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#000',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            monthTextColor: '#000',
            selectedDayBackgroundColor: '#E53935',
            selectedDayTextColor: '#fff',
            todayTextColor: '#E53935',
            arrowColor: '#000',
          }}
        />
      </View>

      <Text style={styles.paragraph}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. In expedita illum assumenda placeat possimus fuga eos nulla labore ea pariatur porro eum quasi a praesentium necessitatibus maxime numquam aut, ipsa aspernatur nemo? Quisquam vel accusantium praesentium dolor voluptate architecto! Rem, vel fuga sunt harum iusto voluptate culpa illo assumenda veniam mollitia, totam itaque nemo ex hic? Atque nihil error dicta eveniet voluptate, cupiditate quis. Corporis iusto laboriosam accusamus! Sapiente magnam odio at delectus corporis, error alias aperiam iusto hic sunt omnis eaque, impedit nam totam quaerat tenetur quas voluptas rem eveniet voluptatem consectetur! Veniam id quod doloribus fugit aut quia.
      </Text>

      <View>
        <Text style={styles.heading}>
          Яка кров зараз найбільш потрібна?
        </Text>

        {Array(4).fill(0).map((_, index) => (
          <View style={styles.listItem} key={index}>
            <Image 
              source={require('../images/drop.png')}
              style={{ width: 18, height: 28, marginRight: 8, resizeMode: 'contain' }}  
            />
            <Text style={styles.listText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
          </View>
        ))}
      </View>

      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight:"100%",
    paddingHorizontal: "5%",
    paddingVertical: 48,
    backgroundColor: '#fff',
    gap:20,
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    borderWidth:1,
    borderColor:"#A1A1A1",
    marginBottom: 20,
    marginTop: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },

  paragraph: {
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 18, 
    letterSpacing: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  listText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 18, 
    letterSpacing: 0,
  },

  notificationImg: {
    alignSelf:'flex-end',
    width: 28, 
    height: 28, 
    resizeMode: 'contain',
  },
  
});
