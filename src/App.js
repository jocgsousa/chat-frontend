import React, { Component } from "react";
// import { uniqueId } from "lodash";
import Draggable from "react-draggable";

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

// import api from "./services/api";

class App extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    // setInterval(() => {
    //   this.handleMessage();
    // }, 1000);

    document.getElementById("text").focus();
  }

  componentDidUpdate() {
    const x = document.getElementById("view");
    x.scrollTop = x.scrollHeight;
    console.log(x);
  }

  // handleMessage = () => {
  //   const { messages } = this.state;

  //   const id = uniqueId();
  //   const newMsg = {
  //     id: id,
  //     title: `msg: ${id}`,
  //     message: `Nova mensagem do id: ${id} `,
  //   };
  //   const newState = [...messages, newMsg];

  //   this.setState({ messages: newState });
  // };

  render() {
    const { messages } = this.state;

    return (
      <Container>
        <Draggable
          handle=".handle"
          scale={1}
          defaultPosition={{ x: 480, y: 40 }}
        >
          <Box animate="transitions">
            <Header>Message</Header>
            <View id="view">
              <MessageView>
                {messages.map((msg) => (
                  <>
                    <Msg animate="transitions">
                      <strong>{msg.title}</strong>
                      <li>{msg.message}</li>
                    </Msg>
                  </>
                ))}
              </MessageView>
            </View>
            <Footer>
              <InputText id="text" />
              <ButtonSubmit>
                <ButtonSubmitText>Enviar</ButtonSubmitText>
              </ButtonSubmit>
            </Footer>
          </Box>
        </Draggable>
      </Container>
    );
  }
}

export default App;
