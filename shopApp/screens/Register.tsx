import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Item, Input, Grid, Row, Form, Button, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';
import { ImageBackground } from 'react-native';
import  * as firebase from 'firebase';


interface RegisterProps {}

// type RegisterRouteProps = 
const Register = (props: RegisterProps) => {
  const [userName,setUserName] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [phone,setPhone] = React.useState('')
  const [address,setAddress] = React.useState('')
  const [pwd,setPWD] = React.useState('')
  const [conpwd, setCONPWD] = React.useState('')

  const register=()=>{

    // if(pwd !== conpwd) {
    //   return false;
    // }
    firebase.auth().createUserWithEmailAndPassword(email,pwd)
    // if createUserWithEmailAndPassword(email,pwd) correct
    .then(()=>{
      const user = firebase.auth().currentUser;
      const token = user?.uid;
      user?.updateProfile({
        displayName:userName,
        photoURL:''
      })
      // realtime database
      const ref = firebase.database();
      ref.ref('User/' + token+ '/').set({
        username: userName,
        phone: phone,
        address: address,
      }).catch(err=>alert(err));
    })
    .catch(err=>{
      console.log(err);
      alert(err);
    })
  }
  return (
    // <View style={styles.container}>
    //   <Text>Register</Text>
    // </View>
    <Container>
      <ImageBackground source={require('../assets/images/background.jpg')} style={styles.image}>
        {/* <Header /> */}
        <Content>
          <Grid>
            <Row style={{ height: Layout.window.height * 0.1 }}></Row>
            <Row style={{ height: Layout.window.height * 0.8 }}>
              <Form
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  marginHorizontal: 20,
                }}
              >
                <Item rounded style={styles.inputbox}>
                  <Input
                   placeholder="Username" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black" 
                   onChangeText={text=>setUserName(text)}
                   value={userName}
                   />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                   placeholder="Email" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black" 
                   onChangeText={text=>setEmail(text)}
                   value={email}
                  />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                   placeholder="Phone Number" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black" 
                   onChangeText={text=>setPhone(text)}
                  />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <TextInput
                    style={styles.textArea}
                    // underlineColorAndroid="transparent"
                    placeholder="Address"
                    placeholderTextColor="black"
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={text=>setAddress(text)}
                    value={address}
                  />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                   secureTextEntry
                   placeholder="Password" 
                   style={styles.TextInputStyle} 
                   placeholderTextColor="black"
                   onChangeText={text=>setPWD(text)}
                   value={pwd} 
                  />
                </Item>
                <Item rounded style={styles.inputbox}>
                  <Input
                    secureTextEntry
                    placeholder="Confirm Password"
                    style={styles.TextInputStyle}
                    placeholderTextColor="black"
                    onChangeText={text => setCONPWD(text)}
                    value={conpwd}
                  />
                </Item>
              </Form>
            </Row>
            <Row
              style={{
                height: Layout.window.height * 0.1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity style={styles.appButtonContainer}
                onPress={()=>register()}
              >
                <Text style={styles.appButtonText}>Register</Text>
              </TouchableOpacity>
            </Row>
          </Grid>
        </Content>
      </ImageBackground>
    </Container>
  );
};



export default Register;

const styles = StyleSheet.create({
  container: {},

  TextInputStyle: {
    textAlign: 'center',
    height: 50,
    // width: '93%',
  },
  inputbox: {
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: 'gray',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  textArea: {
    height: 80,
    justifyContent: "flex-start",
    borderRadius: 25,
    // paddingHorizontal: 90,
    width: '100%',
    marginVertical: 10,
    borderColor: 'gray',
    textAlign: 'center',
    // height: 50,
    fontSize: 17,
  },
});
