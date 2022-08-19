import { useEffect, useState } from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: whitesmoke;
`;

const Watch = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Outer = styled.div`
  position: relative;
  display: flex;
  height: 330px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 330px;
`;

const Inner = styled.div`
  font-size: 50px;
`;

const Span = styled.span`
  :nth-child(1) {
    color: red;
  }
  :nth-child(2) {
    color: green;
  }
  :nth-child(3) {
    color: blue;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: inherit;
`;

const Button = styled.button`
  max-width: 100px;
  width: 100%;
  min-height: 30px;
  border-radius: 5px;
  border: 1px solid #8822aa;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 16px;
  padding: 10px;

  &.start {
    background-color: #8822aa;
    color: white;
    :hover {
      background-color: whitesmoke;
      color: #8822aa;
    }
  }
  &.pause {
    background-color: #8822aa;
    color: white;
    :hover {
      background-color: whitesmoke;
      color: #8822aa;
    }
  }
  &.reset {
    background-color: #8822aa;
    color: white;
    :hover {
      background-color: whitesmoke;
      color: #8822aa;
    }
  }
`;

const Load = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 300px;
  height: 300px;
  border: solid 10px #8822aa;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  -webkit-transition: all 0.5s ease-in;
  -webkit-animation-name: rotate;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;

  animation-play-state: paused;

  transition: all 0.5s ease-in;
  animation-name: rotate;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  &.disabled {
    animation-play-state: paused;
  }

  &.active {
    animation-play-state: running;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime(time + 10);
      }, 10);
    } else if (isPaused) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <Container>
      <Watch>
        <Outer>
          <Load
            className={isPaused === false && isActive ? "active" : "disabled"}
          />
          <Inner>
            <Span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Span>
            <Span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</Span>
            <Span>{("0" + ((time / 10) % 100)).slice(-2)}</Span>
          </Inner>
        </Outer>
        <Buttons>
          <Button className="start" onClick={() => handleStart()}>
            Start
          </Button>
          <Button className="pause" onClick={() => handlePause()}>
            Pause
          </Button>
          <Button className="reset" onClick={() => handleReset()}>
            Reset
          </Button>
        </Buttons>
      </Watch>
    </Container>
  );
}

export default App;
