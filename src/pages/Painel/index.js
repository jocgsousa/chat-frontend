import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MdFiberManualRecord, MdLastPage } from "react-icons/md";
import { RiDeleteBin6Line, RiQuestionAnswerLine } from "react-icons/ri";
import { io } from "socket.io-client";
import { FireworkSpinner } from "react-spinners-kit";
import {
  Container,
  Row,
  Col,
  Header,
  ListUser,
  User,
  Name,
  Logout,
  ContainerMessage,
  HeaderMessage,
  ViewMessage,
  Message,
  InputMessage,
  MessageLoading,
  NoMessage,
  ButtonMessage,
  ButtonClear,
} from "./styles";
import api from "../../services/api";

const socket = io("http://10.3.0.58:3333");

class Painel extends Component {
  state = {
    socketState: "",
    socketId: "",
    auth: true,
    user: "",
    users: [],
    userMessage: null,
    messageLoading: false,
    messages: [],
    message: "",
  };

  async componentDidMount() {
    const profile = JSON.parse(localStorage.getItem("user"));
    this.setState({ socketState: socket });
    setTimeout(() => {
      socket.emit("reconnected", profile);
    }, 1500);
    if (!profile) {
      this.setState({ auth: false });
    } else {
      this.setState({ user: profile });
    }

    socket.emit("req-users");

    socket.on("users", (data) => {
      for (let i = 0; i < data.length; i++) {
        const user = data[i];
        this.statusUser(user);
      }
    });

    socket.on("user", () => {
      socket.emit("user", {
        id: profile.id,
        nick: profile.nick,
      });
    });

    socket.on("disconnect", () => {
      const { users } = this.state;
      this.setState({
        users: users.map((user) =>
          user.online === true ? { ...user, online: false } : user
        ),
      });
      // alert("Servidor desconectado, aguarde a conexão retornar!");
    });

    // Handle of messages
    socket.on("message", (data) => {
      const { userMessage } = this.state;

      if (data.to === profile.id) {
        const messages = JSON.parse(
          localStorage.getItem(`${data.to}&${data.from}`)
        );
        if (messages) {
          const cacheMessages = messages;
          cacheMessages.push(data);
          localStorage.setItem(
            `${data.to}&${data.from}`,
            JSON.stringify(cacheMessages)
          );

          if (userMessage) {
            if (userMessage.id === data.from) {
              this.setState({ messages: cacheMessages });
            }
          }
        } else {
          const cacheMessages = [];
          cacheMessages.push(data);
          localStorage.setItem(
            `${data.to}&${data.from}`,
            JSON.stringify(cacheMessages)
          );
          if (userMessage) {
            if (userMessage.id === data.from) {
              this.setState({ messages: cacheMessages });
            }
          }
        }
      }
    });

    socket.on("new-user", (data) => {
      const { users } = this.state;
      const newState = users;
      newState.push(data);
      this.setState({
        users: newState,
      });
    });

    const { token } = profile;

    await api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          users: response.data.map((user) => ({
            ...user,
            online: false,
          })),
        });
      })
      .catch((err) => {
        alert("Falha ao buscar lista de usuários");
        // console.log(err.response.data.error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages, userMessage } = this.state;
    if (userMessage) {
      if (prevState.messages !== messages) {
        this.downScrollView();
      } else {
        this.downScrollView();
      }
    }
  }

  downScrollView = () => {
    const x = document.getElementById("view");
    console.log(x.scrollHeight);

    x.scrollTop = x.scrollHeight;
  };

  statusUser = (data) => {
    const { users } = this.state;
    this.setState({
      users: users.map((user) => (user.id === data.id ? { ...data } : user)),
    });
    // console.log(data);
  };

  logout = () => {
    const { socketState } = this.state;
    localStorage.removeItem("user");
    socketState.emit("logout", socketState.id);
    this.setState({ auth: false });
  };

  handleChatMessages = (data) => {
    const { user } = this.state;
    const messagesCache = JSON.parse(
      localStorage.getItem(`${user.id}&${data.id}`)
    );

    const messageschat = messagesCache
      ? messagesCache.filter(
          (msg) =>
            (msg.from === user.id && msg.to === data.id) ||
            (msg.from === data.id && msg.to === user.id)
        )
      : [];

    this.setState({
      userMessage: data,
      messages: messageschat,
    });
  };

  handleSendMessage = () => {
    const { userMessage, user, message, socketState, messages } = this.state;

    if (message === "") {
      return false;
    }
    const objectMessage = {
      nick: userMessage.nick,
      from: user.id,
      to: userMessage.id,
      message,
    };

    const messagesState = messages ? messages : [];
    messagesState.push(objectMessage);

    localStorage.setItem(
      `${user.id}&${userMessage.id}`,
      JSON.stringify(messagesState)
    );

    this.setState({
      messages: messagesState ? messagesState : [],
      message: "",
    });

    socketState.emit(`message`, objectMessage);

    document.getElementById("inputMessage").focus();

    this.downScrollView();
  };

  handleClearMessage = () => {
    const { user, userMessage } = this.state;
    const localMessages = JSON.parse(
      localStorage.getItem(`${user.id}&${userMessage.id}`)
    );
    const mapMessages = localMessages.filter(
      (msg) =>
        msg.from === user.id &&
        msg.to === userMessage.id &&
        msg.from === userMessage.id &&
        msg.to === user.id
    );

    localStorage.setItem(
      `${user.id}&${userMessage.id}`,
      JSON.stringify(mapMessages)
    );

    this.setState({ messages: null });
  };

  render() {
    const {
      auth,
      users,
      user,
      socketId,
      userMessage,
      messages,
      messageLoading,
      message,
    } = this.state;
    return (
      <>
        {!auth && <Redirect to="/" />}
        <Container>
          <Row>
            <Col size={2}>
              <Header>
                <h2>{user.nick}</h2>
                <span>{socketId}</span>

                <Logout onClick={() => this.logout()}>
                  <span>sair</span>
                  <MdLastPage size={15} />
                </Logout>
              </Header>
              <ListUser>
                {users.map((user) => (
                  <User
                    key={user.id}
                    onClick={() => this.handleChatMessages(user)}
                  >
                    <Name>{user.nick}</Name>
                    <MdFiberManualRecord
                      color={user.online ? "#33ff33" : "#999999"}
                    />
                    {user.message ? <span>{user.message.length}</span> : ""}
                  </User>
                ))}
              </ListUser>
            </Col>
            <Col size={10} background="#fff">
              {userMessage && (
                <ContainerMessage>
                  <HeaderMessage>
                    <h1>{userMessage.nick}</h1>

                    {messages && messages.length > 0 && (
                      <ButtonClear onClick={() => this.handleClearMessage()}>
                        <RiDeleteBin6Line size={20} />
                      </ButtonClear>
                    )}
                  </HeaderMessage>
                  {messageLoading ? (
                    <MessageLoading>
                      <FireworkSpinner color="#7159c1" size={50} />
                    </MessageLoading>
                  ) : (
                    <ViewMessage id="view">
                      {messages && (
                        <>
                          {messages.map((msg) => (
                            <>
                              <Message
                                autor={Number(msg.from) === Number(user.id)}
                              >
                                {msg.message}
                              </Message>
                            </>
                          ))}
                        </>
                      )}
                      {!messages && (
                        <NoMessage>
                          <RiQuestionAnswerLine size={30} color="#aaa" />
                          <span style={{ color: "#aaa" }}>Sem mensagens</span>
                        </NoMessage>
                      )}
                    </ViewMessage>
                  )}

                  <InputMessage
                    id="inputMessage"
                    autoFocus
                    onChange={(e) => {
                      this.setState({ message: e.target.value });
                    }}
                    value={message}
                  />
                  <ButtonMessage onClick={() => this.handleSendMessage()}>
                    Enviar
                  </ButtonMessage>
                </ContainerMessage>
              )}

              {!userMessage && (
                <NoMessage>
                  <RiQuestionAnswerLine size={45} color="#aaa" />
                  <h2 style={{ color: "#aaa" }}>
                    Selecione um perfil para conversar!
                  </h2>
                </NoMessage>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Painel;
