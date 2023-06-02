import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const signUp = async () => {
        const after = await createUserWithEmailAndPassword(auth, email, password);
        console.log(after);
        alert('Check your email!');
    };

    const signIn = async () => {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Email"  onChangeText={(text: string) => setEmail(text)} value={email}></TextInput>
            <TextInput style={styles.input} placeholder="Password"  onChangeText={(text: string) => setPassword(text)} value={password}></TextInput>
            
            <Button onPress={signUp} title="Create account" />
            <Button onPress={signIn} title="Sign In" />
        </View>
    )
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flexDirection: 'column',
        paddingVertical: 20,
    },
    input: {
        marginVertical: 5,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
});