import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { firebase } from '../../src/firebase/config';
import { useScreens } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

export default function NewQuestionScreen(props) {
  
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correctAnswer, getCorrectAnswer] = useState('')
  const navigation = useNavigation();
  const questionRef = firebase.firestore().collection('questions');
  // const roomMemberJunctionRef = firebase
  //   .firestore()
  //   .colltection('RoomMemberJunction');
  const userID = props.extraData.id;
  const gameRoomId = props.route.params.myGameRoom.id

  // console.log(gameRoomId)
  const onCreateQuestion = () => {
    
    if (question && question.length <= 0) {
      alert('Enter a Question');
      return;
    }
    const data = {
      question: question,
      type: questionType,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      creator: userID,
    };
    questionRef
      .add(data)
      .then((response) => {
        firebase.firestore().collection('questions').doc(response.id).update({
          id: response.id,
        });
        firebase
          .firestore()
          .collection('QuestionRoomJunction')
          .add({ questionId: response.id, gameRoomId: gameRoomId })
          .then((res) => {
            firebase
              .firestore()
              .collection('QuestionRoomJunction')
              .doc(res.id)
              .update({
                id: res.id,
              });
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
    <View style={styles.formContainer}>
    <View style={styles.container}>
    <Text>Question type</Text>
    <RNPickerSelect
            onValueChange={(text) => setQuestionType(text)}
            label="start"
            items={[
              {label: 'open Question', value: 'open Question'},
              {label: 'multiple choice', value: 'multiple choice'},
              {label: 'closed Question', value: 'closed Question'}
            ]}
            /></View></View>
      <View style={styles.formContainer}>
      <View style={styles.container}>
    <Text>Question type</Text>
        <TextInput
        multiline
          style={styles.input}
          placeholder="Your Question"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setQuestion(text)}
          value={question}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /></View>
      </View>
      <View style={styles.formContainer}><View style={styles.container}>
          <Text>Answer 1</Text><TextInput
        multiline
          style={styles.input}
          placeholder="Answer 1"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAnswer1(text)}
          value={answer1}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /></View><View style={styles.container}>
          <Text>Answer 2</Text><TextInput
        multiline
          style={styles.input}
          placeholder="Answer 2"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAnswer2(text)}
          value={answer2}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /></View><View style={styles.container}>
          <Text>Answer 3</Text><TextInput
        multiline
          style={styles.input}
          placeholder="Answer 3"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAnswer3(text)}
          value={answer3}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /></View><View style={styles.container}>
          <Text>Answer 4</Text><TextInput
        multiline
          style={styles.input}
          placeholder="Answer 4"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAnswer4(text)}
          value={answer4}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /></View></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('GameRoom');
          onCreateQuestion();
        }}
      >
        <Text style={styles.buttonText}>create question</Text>
      </TouchableOpacity>
    </View>
    // {/* <View>
    //   <TouchableOpacity onPress={() => logOutPress()}>
    //     <Text>Logout</Text>
    //   </TouchableOpacity>
    // </View> */}
    // {/* {entities && (
    //   <View style={styles.listContainer}>
    //     <FlatList
    //       data={entities}
    //       renderItem={renderEntity}
    //       keyExtractor={(item) => item.id}
    //       removeClippedSubviews={true}
    //     /> */}
    // {/* </View> */}
    // {/* )} */}
    // </View>
  );
}

/// styles ///
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
  },
  firstBox: {
    flexDirection: 'column',
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#788eec',
    alignSelf: 'stretch',
  },
  logOutButton: { flex: 1, backgroundColor: 'black' },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: '#333333',
  },
});