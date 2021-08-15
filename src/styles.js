import styled, { keyframes } from "styled-components";
import { darken } from "polished";
export const animations = {
  transitions: () => keyframes`
        0% {opacity: 0; margin-left: margin-right: -5px ; margin-left: -5px }
        25% {opacity: 1; margin-left: 0px; margin-right: 0px ; margin-left: 0px   }
        50% {opacity: 1; margin-left: 0px; margin-right: 0px ; margin-left: 0px }
        75% {opacity: 1; margin-left: 0px; margin-right: 0px;margin-left: 0px }
        100% { opacity: 1; margin-left: 0px; margin-right: 0px; margin-left: 0px }
       
    `,
  fadeOutBounce: () => keyframes`
      from { opacity: 1; transform: scale(1.0, 1.0)}
      to { opacity: 0; transform: scale(0.9, 0.9)}
    `,

  fadeInBounce: () => keyframes`
      from { opacity: 0; transform: scale(0.9, 0.9)}
      to { opacity: 1; transform: scale(1.0, 1.0)}
    `,

  showBounce: () => keyframes`
        0% {opacity: 0; margin-left: 5px; margin-right: -5px ; }
        25% {opacity: 1; margin-left: 10px; margin-right: -10px ;}
        50% {opacity: 1; margin-left: 0px; margin-right: 0px ;}
        75% {opacity: 1; margin-left: 0px; margin-right: 0px ;}
        100% { opacity: 1; margin-left: 0px; margin-right: 0px;}
    `,
};

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  background: #fff;
  width: 400px;
  min-height: 30%;
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  h2 {
    margin: 20px 0px 20px 0px;
  }

  animation-duration: ${(props) => props.duration};
  animation-timing-function: ${(props) => props.timingFunction};
  animation-delay: ${(props) => props.delay};
  animation-iteration-count: ${(props) => props.iterationCount};
  animation-direction: ${(props) => props.direction};
  animation-fill-mode: ${(props) => props.fillMode};
  animation-play-state: ${(props) => props.playState};
  /* Animation Name */
  animation-name: ${(props) => animations[props.animate]};
`;

export const DropContainer = styled.div``;

export const Header = styled.div.attrs({
  className: "handle",
})`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: #7159c1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 9999;
  cursor: -webkit-grabbing;
  color: white;
`;

export const View = styled.div`
  width: 100%;
  /* box-shadow: 2px 0px 20px 0px #ccc; */
  height: 300px;
  max-height: 300px;
  padding: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #7159c1;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${darken(0.2, "#7159c1")};
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 130px;
  background-color: #ddd;
  transition: 0.2s all;
  cursor: pointer;
`;

export const InputText = styled.textarea.attrs({
  className: "",
})`
  max-width: 100%;
  min-width: 100%;
  min-height: 90%;
  border: none;
  border-top: 1px solid #ddd;
  padding: 10px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
`;

export const MessageView = styled.ul`
  list-style-type: none;
`;

export const ButtonSubmit = styled.button`
  height: 40px;
  min-height: 35%;
  width: 100%;
  cursor: pointer;
  background-color: #7159c1;
  z-index: 9999;

  border: none;
  &:active {
    background-color: ${darken(0.2, "#7159c1")};
  }

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const ButtonSubmitText = styled.div``;

export const Msg = styled.div`
  width: 100%;
  background-color: ${(props) => props.autor ? '#7159c1' : '#dedede'};
  min-height: 50px;
  margin: 10px;
  animation-duration: ${(props) => props.duration};
  animation-timing-function: ${(props) => props.timingFunction};
  animation-delay: ${(props) => props.delay};
  animation-iteration-count: ${(props) => props.iterationCount};
  animation-direction: ${(props) => props.direction};
  animation-fill-mode: ${(props) => props.fillMode};
  animation-play-state: ${(props) => props.playState};
  /* Animation Name */
  animation-name: ${(props) => animations[props.animate]};
`;

Msg.defaultProps = {
  duration: "1s",
  timingFunction: "ease-in-out",
  delay: "0s",
  iterationCount: "1",
  direction: "linear",
  fillMode: "both",
  playState: "running",
  display: "",
};

Box.defaultProps = {
  duration: "1s",
  timingFunction: "ease-in-out",
  delay: "0s",
  iterationCount: "1",
  direction: "linear",
  fillMode: "both",
  playState: "running",
  display: "",
};
