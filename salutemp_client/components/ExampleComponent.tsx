// ExampleComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import useFirebaseAuth from '../services/authService';
import { useUser } from '../context/userContext';

const ExampleComponent: React.FC = () => {
  const firebaseUser = useFirebaseAuth();
  const { userId, updateUser } = useUser();

  // Access and use firebaseUser and userId as needed

  return (
    <View>
      <Text>{`Firebase User: ${firebaseUser?.uid}`}</Text>
      <Text>{`Context User: ${userId}`}</Text>
      {/* Component content */}
    </View>
  );
};

export default ExampleComponent;
