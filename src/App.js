import React, { Component } from "react";
// import { uniqueId } from "lodash";
import Draggable from "react-draggable";
import {RiCheckboxBlankCircleFill} from 'react-icons/ri';
import { io } from "socket.io-client";
import {
  Container,
  Box,
  Header,
  View,
  Footer,
  InputText,
  ButtonSubmit,
  ButtonSubmitText,
  MessageView,
  Msg,
} from "./styles";

import api from "./services/api";

const socket =  io("http://localhost:3333");


class App extends Component {
  state = {
    user: false,
    text: '',
    userName: '',
    messages: [],
  };

  componentDidMount() {
   const {user} = this.state;
   if(user){
       document.getElementById("text").focus();
   }
    const { messages } = this.state;

   socket.on('receivedMessage', data => {
     const msg = {
      title: data.title,
      message: data.text
     };
      const newState = messages;
      newState.push(msg);
      this.setState({messages: newState });
   })
  
  }

  componentDidUpdate() {
    const {user} = this.state;
    if(user){
      const x = document.getElementById("view");
      x.scrollTop = x.scrollHeight;
    }
    
  
  }

  handleMessage = async () => {
   const { text, userName } = this.state;
  
    if(text.length <= 0){
      alert('Por favor escreva algo.');
     
    }else {
          await api.post('/post', {
               title: userName,
               text
         }).then((response) => {
          const emitObject = {
            title: response.data.title,
            text: response.data.text,
          };
          const { messages } = this.state;
          const newState = messages;
          newState.push({
            title: userName,
            message: text
          });
          this.setState({messages: newState });
          socket.emit('sendMessage', emitObject);

      }).catch((err) => {
        console.log(err.response.data);
      });
    }
  };

  handleUser = () => {
    const {userName} = this.state;
    if(userName.length <= 0){
      alert('Por favor informe o seu nome para entrar no chat!')
    }else{
      this.setState({user: true});
      const socketObject = {
        user: userName
      }
      socket.emit('addUser', socketObject);
    }
  } 

  render() {
    
    const { messages,user,  text, userName } = this.state;

    return (
      <Container>

        {
          user ? (
            <>
             <Draggable
              handle=".handle"
              scale={1}
              defaultPosition={{ x: 40, y: 40 }}
               >
          <Box animate="transitions">
            <Header>{userName}&nbsp;&nbsp;<RiCheckboxBlankCircleFill color="#00FF00" /></Header>
            <View id="view">
              <MessageView>
                {messages.map((msg) => (
                  <>
                    <Msg animate="transitions" autor={msg.title !== userName}>
                      <strong>{msg.title}</strong>
                      <li>{msg.message}</li>
                    </Msg>
                  </>
                ))}
              </MessageView>
            </View>
            <Footer>
              <InputText value={text} id="text" onChange={(e) => {this.setState({text: e.target.value })}} />
              <ButtonSubmit onClick={() => this.handleMessage()}>
                <ButtonSubmitText>Enviar</ButtonSubmitText>
              </ButtonSubmit>
            </Footer>
          </Box>
        </Draggable>  

            </>
          ): (
            <>
              <input type="text" onChange={(e) => {this.setState({userName: e.target.value })}} value={userName} />
              <button type="button" onClick={() => this.handleUser()}>Entrar</button>
            </>
          )
        }
       
      </Container>
    );
  }
}

export default App;
