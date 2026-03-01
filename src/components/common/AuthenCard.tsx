import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { authTheme } from '../../theme/authTheme';
interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
      <View style={authTheme.cardWrapper}>
        <Card 
          style={authTheme.card} 
          mode="contained"
        >
          <Card.Content style={authTheme.cardContent}>
            {children}
          </Card.Content>
        </Card>
      </View>
  );
};

export default AuthCard;
