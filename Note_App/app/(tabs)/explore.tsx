import { Alert, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExploreScreen() {


  useEffect(()=>{
    //quando inicializar o app, irá ler as tarefas salvas
    (async () => {
      try {
        const tarefas = await AsyncStorage.getItem('tarefas');
        if(tarefas == null) {
          setTarefa([]);
        }else{
          setTarefa(JSON.parse(tarefas));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },[])



  const image = require('../../assets/images/bg.jpg')
  const [tarefa, setTarefa] = useState<any[]>([
    {
      id: 1,
      nome: 'Estou usando o aplicativo de tarefas!',
    },

  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [novaTarefaNome, setNovaTarefaNome] = useState('');

  function deletarTarefa(id: number){
    let newTarefa = tarefa.filter(function(val){
      return val.id != id;
    });
    setTarefa(newTarefa);
    alert ('Tarefa deletada com sucesso!');
    
    (async () => {
      try {
        await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefa));
      } catch (error) {
        console.log(error);
      }
    })();
  }
    function adicionarTarefa(nome: string){
      let newId = tarefa.length + 1;
      let novaTarefa = {id: newId, nome: nome};
      setTarefa([...tarefa, novaTarefa]);
      setModalVisible(!modalVisible), 
      alert ('Tarefa adicionada com sucesso!');
    }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
    <ScrollView style={styles.container}>
      <StatusBar hidden={true}/>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput onChangeText={setNovaTarefaNome} autoFocus={true} style={{width: 150, marginBottom: 20,borderColor: '#7f7b7bff', borderWidth: 1, borderRadius: 25}}></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => adicionarTarefa(novaTarefaNome)}>
                <Text style={styles.textStyle}>Adicionar Tarefa</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      <ImageBackground source={image} style={styles.image}>
        <Text>Bem-vindo à tela de Tarefas!</Text>
      </ImageBackground>
      {
        tarefa.map(function(val){
          return(
          <View key={val.id} style={styles.tarefaSingle}>
            <View style={{flex: 1, width: '100%', paddingLeft: 10}}>
              <Text>{val.nome}</Text>
            </View>
            <View style={{alignItems: 'flex-end', flex:1, paddingRight: 10,}}>
              <TouchableOpacity onPress={() => deletarTarefa(val.id)}>
                <AntDesign name="minus-circle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

        );})
      }
    </ScrollView>
      <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)} style={styles.btnAnotacao}>
              <Text style={{fontSize: 30}}>+</Text>
              </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  image:{
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  tarefaSingle:{
    marginTop: 20,
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    paddingBottom: 10,
  },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});