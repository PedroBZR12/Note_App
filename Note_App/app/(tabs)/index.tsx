import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View, Text, Button, TouchableOpacity, TextInput, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function HomeScreen() {

  const [estado, setEstado] = useState('leitura');
  const [anotacao, setAnotacao] = useState('');

  useEffect(()=>{
    //quando inicializar o app, irá ler a anotação salva
    (async () => {
      try {
        const anotacaoValue = await AsyncStorage.getItem('anotacao');
        if(anotacaoValue !== null) {
          setAnotacao(anotacaoValue);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },[])

  const setData = async () => {
    try {
      await AsyncStorage.setItem('anotacao', anotacao);
    } catch (error) {
      console.log(error);
    }
    alert('Anotação salva com sucesso!');
  }

  function atualizarTexto(){
    setEstado("leitura");
    setData();
  }

  if(estado === "leitura"){
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Aplicativo de Anotação</Text>
      </View>
      <Text>Modo de Leitura</Text>
      {
        (anotacao != '') ?
          <View style={{padding: 15}}>
              <Text style={styles.anotacao}>{anotacao}</Text> 
          </View>
          :
          <View>
            <Text style={{fontSize: 16, fontStyle: 'italic', opacity: 0.4}}>Nenhuma anotação disponível. Clique no botão "+" para adicionar uma nova anotação.</Text>
          </View>

      }
      <TouchableOpacity onPress={()=> setEstado("escrita")} style={styles.btnAnotacao}>
        <Text style={{fontSize: 30}}>+</Text>
        </TouchableOpacity>
    </View>
  );
}
  else if(estado === "escrita"){
    return(  
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Aplicativo de Anotação</Text>
        </View>
        <Text>Modo de Escrita</Text>
        {
          (anotacao != '') ?
          <TextInput style={{height: 200, borderColor: 'gray', borderWidth: 1, textAlignVertical: "top", padding: 10,}} onChangeText={(text)=>setAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao} autoFocus={true}></TextInput>
          :
          <TextInput style={{height: 200, borderColor: 'gray', borderWidth: 1, textAlignVertical: "top", padding: 10,}} onChangeText={(text)=>setAnotacao(text)} multiline={true} numberOfLines={5} placeholder="Digite sua anotação aqui..." autoFocus={true}></TextInput>
        }
        <TouchableOpacity onPress={()=> atualizarTexto()} style={styles.btnSalvar}>
          <Text style={{fontSize: 25}}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header:{
    marginTop: Platform.OS === 'android' ? 25 : 15,
    width: '100%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  anotacao:{
    fontSize: 16,

  },
  btnAnotacao:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#a0a6acff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  btnSalvar:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#cfd2d5ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  }
});