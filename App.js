import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {useState, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  const [resultado, setResultado] = useState()
  const [userName, setUsername] = useState()

  async function saveItem(){
     try{
      await AsyncStorage.setItem('@app:user', userName)
      //Alert.alert(userName)
      setResultado(`Seja bem vindo, ${userName}`)
     }catch(err){
      console.log(err)
     }
  }

  useEffect(() =>{
    async function fetchData(){
      try{
        const user = await AsyncStorage.getItem('@app:user')
        if(user){
          setResultado(`Seja bem vindo, ${user}`)
        }else{
          setResultado("Nenhuma informação encontrada")
        }
      }catch(err){
        console.log(err)
      }
    }fetchData()
  },[])

  async function clear(){
    await AsyncStorage.clear()
    setResultado("Nenhuma informação encontrada")
  }

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.txtTitle}>Sistema de Login</Text>
        
        <View style={styles.subcontainer}>
          <TextInput
          placeholder='Nome' 
          style={styles.input}
          value={userName}
          onChangeText={(texto) => setUsername(texto)}
          />
          <TouchableOpacity style={styles.btnLogin} onPress={saveItem}>
            <Text style={styles.txtLogin}>Entrar</Text>
          </TouchableOpacity>        
        </View>
          <Text style={styles.txtUser}>{resultado}</Text>  
          <TouchableOpacity style={styles.btnLimpar} onPress={clear}>
            <Text style={styles.txtLogin}>Limpar</Text>
          </TouchableOpacity>   

      </SafeAreaView>   
  );
}

const styles = StyleSheet.create({
  subcontainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    
  },
  btnLogin:{
    backgroundColor: 'blue',
    height: 40,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtLogin:{
    color: 'white',
    fontSize: 20
  },
  btnLimpar:{
    backgroundColor: 'blue',
    height: 40,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  input:{
    width: '70%',
    height: 40,
    borderWidth: 2,
    marginBottom: 20,
    padding: 5,
    borderRadius: 5
  },
  txtTitle:{
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10
  },
  txtUser:{
    fontSize: 15,
    margin: 10
  }
});
