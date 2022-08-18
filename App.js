import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {useState, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  const [result, setresult] = useState()
  const [user, setuser] = useState()

  async function saveItem(){
     try{
      await AsyncStorage.setItem('@userApp:nome', user)
      //Alert.alert(user)
      setresult(`Seja bem vindo, ${user}`)
     }catch(err){
      console.log(err)
     }
  }

  useEffect(() =>{
    async function fetchData(){
      try{
        const user = await AsyncStorage.getItem('@userApp:nome')
        if(user){
          setresult(`Seja bem vindo/a, ${user}`)
        }else{
          setresult("Nenhuma informação foi encontrada")
        }
      }catch(err){
        console.log(err)
      }
    }fetchData()
  },[])

  async function clear(){
    await AsyncStorage.clear()
    setresult("Nenhuma informação foi encontrada")
  }

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.txtTitle}>Sistema de Login</Text>
        
        <View style={styles.subcontainer}>
          <TextInput
          placeholder='Nome' 
          style={styles.input}
          value={user}
          onChangeText={(texto) => setuser(texto)}
          />
          <TouchableOpacity style={styles.btnLogin} onPress={saveItem}>
            <Text style={styles.txtLogin}>Entrar</Text>
          </TouchableOpacity>        
        </View>
          <Text style={styles.txtUser}>{result}</Text>  
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
    justifyContent: 'space-around',
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
    fontSize: 18
  },
  btnLimpar:{
    backgroundColor: 'blue',
    height: 30,
    width: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  input:{
    width: '60%',
    height: 40,
    borderWidth: 2,
    marginBottom: 20,
    padding: 5,
    borderRadius: 5
  },
  txtTitle:{
    fontSize: 25,
    fontWeight: '800',
    margin: 15
  },
  txtUser:{
    fontSize: 15,
    margin: 15
  }
});
