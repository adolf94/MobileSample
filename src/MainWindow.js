import { AppBar, Button, Flex,  IconButton, TextInput, ListItem } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ToastAndroid} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons'
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { decryptString, encryptString } from './util/EncryptString';
encryptString
const {StorageAccessFramework} = FileSystem

const MainWindow = ()=>{
    const [files, setFiles] = useState([])
    useEffect(()=>{
      (async ()=>{
        console.log(FileSystem.documentDirectory)
        let perm = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync("content://com.android.externalstorage.documents/tree/primary%3ADownload%2FSm%2FSS");
        FileSystem.StorageAccessFramework.readDirectoryAsync(perm.directoryUri).then((res)=>{
            return Promise.all(res.map(async e=>{
              return {
                isDirectory: (await FileSystem.getInfoAsync(e)).isDirectory,
                fileName: getFileName(e),
                isEncrypt: false,
                fileEncrypted: await encryptString(getFileName(e),'1234')
              }
            }))
        }).then(res=>{
          setFiles(res)
        })
      })()
    },[])

    const getFileName =  (uri) => {
      const parts = uri.split('/');
      return (parts[parts.length - 1]);
    };


    return  <View style={styles.container}>
    {/* <StatusBar style="auto" /> */}
    <AppBar title="Screen Title" />
    <Flex direction='row'> 
      <View style={{width:'65%'}} >
        <TextInput placeholder='Path' />
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}} >
        <IconButton icon={(props)=><Icon name="drive-folder-upload" {...props} size={30}/>} />
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}} >
        <IconButton icon={(props)=><Icon name="drive-folder-upload" {...props} size={30}/>} />
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}} >
        <IconButton icon={(props)=><Icon name="more-horiz" {...props} size={30}/>} />
      </View>
    </Flex>
    <View>
    { 
      files.map((file)=><ListItem
        title={file.fileName}
        secondaryText={file.fileEncrypted}
        leading={<Icon name="inbox" size={24} />}
        trailing={props =><Icon name="chevron-right" {...props} />}
        onPress={ async ()=> console.log( await decryptString(file.fileEncrypted))}

      /> 
    )}
    <ListItem
      title="Inbox"
      leading={<Icon name="inbox" size={24} />}
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <ListItem
      title="Inbox"
      leading={<Icon name="inbox" size={24} />}
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <ListItem
      title="Inbox" 
      leading={<Icon name="inbox" size={24} />}
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    <ListItem
      title="Inbox"
      leading={<Icon name="inbox" size={24} />}
      trailing={props => <Icon name="chevron-right" {...props} />}
    />
    </View>
  </View>
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

export default MainWindow