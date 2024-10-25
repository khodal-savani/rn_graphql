/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/ApolloClient';
import HomeScreen from './src/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView>
      <ApolloProvider client={client}>
        <HomeScreen />
      </ApolloProvider>
    </SafeAreaView>
  );
};

export default App;
