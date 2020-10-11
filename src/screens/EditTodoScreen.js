import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { editTodo } from '../redux/actions';

const EditTodoScreen = ({route, navigation}) => {
  const id = route.params.existing_todoID;
  const todo = useSelector(state => state.todos.todos_list.find(element => element.id === id))
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState(todo.task);

  handleEditTodo = (id, task, isDone) => {
    if(task.length > 0) {
      dispatch(editTodo(id, task, isDone));
      navigation.navigate('Home');
    } else {
      Alert.alert('No text entered in the Text Input', 
                  'You cannot add an empty todo.',
                  [
                    'Ok'
                  ])
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25}}>Enter the new todo:</Text>
      <TextInput
        placeholder={todo.task}
        style={styles.TextInputStyle}
        autoCapitalize={'sentences'}
        autoCorrect={false}
        value={todoText}
        onChangeText={(text) => setTodoText(text)}
      />
      <TouchableOpacity
        style={styles.updateTodoButton}
        onPress={() => handleEditTodo(id, todoText, todo.isDone)}
      >
        <Text style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>
          Update Todo
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
    justifyContent: 'center',
  },
  updateTodoButton: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#F0AD4E',
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

export default EditTodoScreen;
