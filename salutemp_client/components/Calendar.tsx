import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment'; // Make sure moment is installed

interface CalendarComponentProps {
  onDateSelected: (date: Moment) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  const handleSelectDate = (date: Moment) => {
    setSelectedDate(date);
    onDateSelected(date);
  };

  const generateDateCards = () => {
    const dateCards = [];
    for (let i = 0; i < 5; i++) {
      const date = moment().add(i, 'days');
      dateCards.push(
        <TouchableOpacity 
          key={date.format('YYYY-MM-DD')} 
          style={[
            styles.dateCard, 
            { backgroundColor: selectedDate.isSame(date, 'day') ? '#76A3B2' : '#D3CEC5' }
          ]}
          onPress={() => handleSelectDate(date)}
        >
          <Text style={{ color: selectedDate.isSame(date, 'day') ? '#EFECE7' : 'black' }}>
            {date.format('D')}
          </Text>
          <Text style={{ color: selectedDate.isSame(date, 'day') ? '#EFECE7' : 'black' }}>
            {date.format('dd')}
          </Text>
        </TouchableOpacity>
      );
    }
    return dateCards;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {selectedDate.isSame(moment(), 'day') ? `Today, ${selectedDate.format('MMMM D')}` :
            selectedDate.isSame(moment().add(1, 'days'), 'day') ? `Tomorrow, ${selectedDate.format('MMMM D')}` :
            selectedDate.format('MMMM D')}
        </Text>
      </View>
      <View style={styles.dateCardsContainer}>
        {generateDateCards()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContainer: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  dateCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // This will help to decrease space between date cards
  },
  dateCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    // Reduced paddingHorizontal to decrease space between date cards
    paddingHorizontal: 5, 
    marginHorizontal: 5, // Adjust this to change the spacing between the cards
    width: 60,
    height: 60,
  },
});

export default CalendarComponent;
