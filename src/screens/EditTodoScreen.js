import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

const EditTodoScreen = ({route, navigation}) => {
  const id = route.params.existing_todoID;
  const todo = useSelector(state => state.todos.todos_list.find(element => element.id === id))
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState(todo.task);

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
        onPress={() => {
          dispatch({ type: 'EDIT_TODO', payload: { id: id, task: todoText, isDone: todo.isDone } })
          navigation.navigate('Home')
        }}
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
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 15,
  },
});

export default EditTodoScreen;
