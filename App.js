/**
 * React Native Todo App with Redux
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import EditTodoScreen from './src/screens/EditTodoScreen';

import { Provider } from 'react-redux'
import configureStore from './src/redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{ todo: "" }}
              options={{
              title: 'TODO App',
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
              
            />
            <Stack.Screen
              name="AddTodo"
              component={AddTodoScreen}
              options={{
              title: 'Add Todo',
              headerBackTitle: '',
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            />
            <Stack.Screen
              name="EditTodo"
              component={EditTodoScreen}
              options={{
              title: 'Edit Todo',
              headerBackTitle: '',
              headerStyle: {
                backgroundColor: '#2196F3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
