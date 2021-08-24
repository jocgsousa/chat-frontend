import styled from "styled-components";

export const Container = styled.div`
  background-color: #7159c1;
  height: 100vh;
`;

export const Row = styled.div`
  display: flex;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
  background-color: ${(props) => props.background};
  height: 100vh;
`;

export const Header = styled.div`
  width: 100%;
  background-color: #ddd;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: #333;
  text-transform: uppercase;
  padding: 10px;
  strong {
    font-size: 10px;
    padding-bottom: 5px;
  }
`;

export const ListUser = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  min-height: 60vh;
  overflow-y: auto;
`;

export const User = styled.div`
  height: 50px;
  border: none;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #7159c1;
  cursor: pointer;
  background-color: #7159c1;
  color: white;
  transition: 0.5s all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  &:hover {
    transition: 0.5s all;
    opacity: 0.8;
  }
`;

export const Name = styled.strong``;

export const Logout = styled.button.attrs({
  type: "button",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background: #7159c1;
  color: white;
  border: none;
  border-radius: 4px;
  border: 1px solid #7159c1;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    background-color: #513d96;
  }
  &:active {
    background-color: #5e47ac;
  }
`;

export const ContainerMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const HeaderMessage = styled.div`
  background-color: #ddd;
  border-left: 1px solid #fff;
  padding: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ViewMessage = styled.ul`
  width: 100%;
  height: 100%;
  max-height: 80%;
  overflow-y: auto;
  padding: 1px;
  background-color: #dede;
  list-style-type: none;
  scroll-behavior: smooth;
`;

export const MessageLoading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.li`
  width: 80%;
  min-height: 15%;
  background-color: ${(props) => (props.autor ? "#33cccc" : "#66cc99")};
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  float: ${(props) => (props.autor ? "left" : "right")};
  padding: 25px;
  color: white;
  text-align: justify;
  border-radius: ${(props) =>
    props.autor ? "20px 20px 20px 0px" : "20px 20px 0px 20px"};
`;

export const InputMessage = styled.textarea.attrs({
  placeholder: "Escreva aqui...",
})`
  width: 100%;
  height: 15%;
  min-width: 100%;
  min-height: 15%;
  max-width: 100%;
  max-height: 15%;
  outline: none;
  border: none;
  padding: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
`;

export const ButtonMessage = styled.button.attrs({
  type: "button",
})`
  width: 100%;
  height: 10%;
  border: none;
  background-color: #dede;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.2s;
  }
`;

export const ButtonClear = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  cursor: pointer;
  border: none;
`;
