import { AppBar, Button, Flex,  IconButton, TextInput, ListItem } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons'
import MainWindow from './src/MainWindow';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <MainWindow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:3
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
