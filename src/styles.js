import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #7159c1;
`;

export const Row = styled.div`
  display: flex;
  height: 100%;
`;

export const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: ${(props) => props.size};
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  border-radius: 4px;
  flex-direction: column;
  border: 1px solid #7159c1;
  width: 400px;
  height: 400px;
  background: #fff;

  h3 {
    margin: 10px 0px 10px 0px;
  }
`;

export const Input = styled.input`
  width: 80%;
  margin: 10px 0px 10px 0px;
  height: 30px;
`;

export const ButtonSubmit = styled.button.attrs({
  type: "submit",
})`
  width: 80%;
  height: 30px;
  margin: 10px 0px 10px 0px;
  cursor: pointer;
`;

export const ButtonRegister = styled.button.attrs({
  type: "button",
})`
  width: 80%;
  height: 30px;
  margin: 10px 0px 10px 0px;
  cursor: pointer;
`;
