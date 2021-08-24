import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  ButtonSubmit,
  ButtonRegister,
} from "./styles";
import api from "./services/api";

export default class App extends Component {
  state = {
    login: true,
    name: "",
    nick: "",
    password: "",
    auth: false,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ auth: true });
    }
  }

  siginup = async (e) => {
    e.preventDefault();
    const { name, nick, password } = this.state;
    const objectUser = {
      name,
      nick,
      password,
    };

    await api
      .post("/create", objectUser)
      .then((response) => {
        alert("Cadastro realizado com sucesso, faça login para continuar.");
        this.setState({ login: true, name: "", nick: "", password: "" });
      })
      .catch((err) => {
        alert(err ? err.response.data.error : "Falha de conexão");
      });
  };

  sigin = async (e) => {
    e.preventDefault();

    const { nick, password } = this.state;
    await api
      .post("/session", {
        nick,
        password,
      })
      .then((resp) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: resp.data.user.id,
            nick: resp.data.user.nick,
            token: resp.data.token,
          })
        );
        this.setState({ auth: true });
      })
      .catch((err) => {
        console.log(err ? err.response.data : "Falha de conexão");
        window.alert(err ? err.response.data.error : "Falha de conexão");
      });
  };

  render() {
    const { login, name, nick, password, auth } = this.state;

    return (
      <Container>
        {auth && <Redirect to="/painel" />}
        <Row>
          <Col size={12}>
            <Form onSubmit={login ? this.sigin : this.siginup}>
              <h3>Login</h3>

              {!login && (
                <Input
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                  autoFocus
                />
              )}
              <Input
                placeholder="Nick"
                value={nick}
                onChange={(e) => {
                  this.setState({ nick: e.target.value });
                }}
                autoFocus
              />
              <Input
                placeholder="Senha"
                value={password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                autoFocus={false}
              />
              <ButtonSubmit>{login ? "Entrar" : "Registrar"}</ButtonSubmit>
              <ButtonRegister
                onClick={() => {
                  this.setState({ login: !login, nick: "", password: "" });
                }}
              >
                {!login ? "Voltar" : "Registrar-me"}
              </ButtonRegister>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
