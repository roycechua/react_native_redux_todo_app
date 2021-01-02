import React, {useEffect,useLayoutEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { setTodo, toggleTodo, deleteTodo } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const todos_list = useSelector((state) => state.todos.todos_list);
  const dispatch = useDispatch();

  console.log(todos_list);

  useEffect(() => {
    axios.get('http://308d23ae3a13.ngrok.io/todos')
    .then((res)=>{dispatch(
      setTodo(res.data))
      showMessage({
        message: "Todos Successfully Synced",
        type: "success",
        icon: "success",
      });
    })
    .catch((err) => {
      dispatch(setTodo([]));
      if(err.message.includes('404')) {
        showMessage({
          message: "Server Unavailable for Todos Sync",
          description: "Server is not available at this moment.",
          type: "danger",
          icon: "danger",
        });
      } else {
        showMessage({
          message: "Todo Sync Failed",
          type: "danger",
        });
      }
    });
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('AddTodo')}>
          <Icon name="plus" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {todos_list.length > 0 ? (
            <FlatList
              style={styles.todoListStyle}
              data={todos_list}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => {
                return (
                  <View style={styles.todoListItemStyle}>
                    <TouchableOpacity
                      style={{flex: 1, margin: 10}}
                      onPress={() =>
                        navigation.navigate('EditTodo', {
                          existing_todoID: item.id,
                        })
                      }>
                      {item.isDone ? (
                        <Text
                          style={{
                            fontSize: 18,
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                          }}>
                          {item.task}
                        </Text>
                      ) : (
                        <Text style={{fontSize: 18}}>{item.task}</Text>
                      )}
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{margin: 10}}
                        onPress={() =>
                          dispatch(toggleTodo(item.id))
                        }>
                        {item.isDone ? (
                          <Icon
                            style={{color: '#5CB85C'}}
                            name={'check'}
                            size={20}
                          />
                        ) : (
                          <Icon
                            style={{color: 'gray'}}
                            name={'check'}
                            size={20}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{margin: 10}}
                        onPress={() =>
                          dispatch(deleteTodo(item.id))
                        }>
                        <Icon
                          style={{color: '#DC3545'}}
                          name={'times'}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <Text>You have no todos right now..</Text>
          )}
          <TouchableOpacity
            style={styles.FloatingActionButton}
            onPress={() => navigation.navigate('AddTodo')}>
            <Icon name="plus" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <FlashMessage position="top" />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  todoListStyle: {
    flex: 1,
    padding: 5,
  },
  todoListItemStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 3,
    padding: 5,
  },
  FloatingActionButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
  },
});

export default HomeScreen;
