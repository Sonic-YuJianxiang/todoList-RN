import React, { useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FIREBASE_DB } from '../../firbaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Entypo} from '@expo/vector-icons';

export interface Todo {
    title: string;
    done: boolean;
    id: string;
}
const List = ({navigation} : any) => {
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [todo, setTodo] = React.useState<any>({});

    useEffect(() => {
        const todoRef = collection(FIREBASE_DB, 'todos');
        
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: Todo[] = [];
                snapshot.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    } as Todo);
                });
                setTodos(todos);
            }
        });

        return () => subscriber();
    }, []);

    const addTodo = async () => {
        const doc = await addDoc(collection(FIREBASE_DB, 'todos'), { title: todo, completed: false });
        setTodo('');
    };

    const renderTodo = ({item } : any) => {
        const ref = doc(FIREBASE_DB, `todo/${item.id}`)
        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done });
        }

        const deleteItem = async () => {
            deleteDoc(ref);
        }

        return (
            <View style={styes.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styes.todo}>
                    {item.done && <Ionicons name="md-checkmark-circle" size={32} color="green" />}
                    {!item.done && <Entypo name='circle' size={32} color="black" />}

                    <Text style={styes.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name='trash-bin-outline' size={24} color="red" onPress={deleteItem} />
            </View>
        );
    };

    return (
        <View style={styes.container}>
            <View style={styes.form}>
                <TextInput style={styes.input} placeholder='Add new todo' onChangeText={(text: string) => setTodo(text)} value={todo} />
                <Button onPress={() => addTodo()} title='Add Todo' disabled={todo === ''}/>
            </View>
            { todos.length > 0 && (
            <View>
                <FlatList
                    data={todos}
                    renderItem = {(item) => renderTodo(item)}
                    keyExtractor = {(todo: Todo) => todo.id}
                />  
            </View>
            )}
        </View>
    ); 
};

export default List;

const styes = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        marginvertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff00ff',
        padding: 10,
        marginVertical: 5,
    },
    todoText: {
        flex: 1,
        paddingHorizontal: 4,
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    }
});