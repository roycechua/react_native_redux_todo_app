import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect, useDispatch } from "react-redux";

const AddTodoScreen = ({navigation, mapDispatchToProps}) => {
  const [todoText, setTodoText] = useState('');

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25}}>Task to do:</Text>
      <TextInput
        placeholder={'Write a todo...'}
        style={styles.TextInputStyle}
        autoCapitalize={'sentences'}
        autoCorrect={false}
        value={todoText}
        onChangeText={(text) => setTodoText(text)}
      />
      <TouchableOpacity
        style={styles.addTodoButton}
        onPress={() => {
          dispatch({ type: 'ADD_TODO', payload: { task: todoText } })
          navigation.navigate('Home')
        }}
      >
        <Text style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>
          Add Todo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'stretch',
    justifyContent:'center'
  },
  addTodoButton: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#5CB85C',
    borderRadius: 10,
  },
  TextInputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 5,
    fontSize: 25,
  },
});

export default AddTodoScreen;
