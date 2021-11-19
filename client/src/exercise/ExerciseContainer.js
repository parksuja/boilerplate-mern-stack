import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import palette from "../lib/style/palette";
// import Webcam from "react-webcam";
import { useRef } from "react";
// relative여기서 태그의 위치를 살짝 변경하고 싶을 때 position: relative를 사용합니다
import "./ExerciseContainer.css";
import First from "./First";
import VideoPage2 from "../../src/VideoPage2";

const EC = styled.div`
position : relative;
}
`;
const Spacer = styled.div`
  height: 3.5rem;
`;

const StyledButton = styled(Button)`
  background: ${palette.gray[7]};
  &:hover {
    background: ${palette.gray[5]};
  }
  position: absolute;
  bottom: -3%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
let squatCount = 15;
let lungeCount = 15;
let shoulderCount = 15;
const setSquatCount = (squat) => {
  if (squat === "") squatCount = 15;
  else if (squat < 0) squatCount = parseInt(-squat);
  else squatCount = parseInt(squat);
};
const setLungeCount = (lunge) => {
  if (lunge === "") lungeCount = 15;
  else if (lunge < 0) lungeCount = parseInt(-lunge);
  else lungeCount = parseInt(lunge);
};
const setShoulderCount = (shoulder) => {
  if (shoulder === "") shoulderCount = 15;
  else if (shoulder < 0) shoulderCount = parseInt(-shoulder);
  else shoulderCount = parseInt(shoulder);
};
const ExerciseContainer = () => {
  const [first, setFirst] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const videoOn = () => {
    setShowResults(true);
    setFirst(false);
  };
  return (
    <>
      <EC>
        {first && (
          <div>
            <Spacer />
            <First
              setSquatCount={setSquatCount}
              setLungeCount={setLungeCount}
              setShoulderCount={setShoulderCount}
            />
            <Spacer />
            <StyledButton onClick={videoOn}>시작</StyledButton>
          </div>
        )}
        {showResults && (
          <div>
            <Spacer />
            <VideoPage2 />

            <Spacer />
          </div>
        )}
      </EC>
    </>
  );
};
export default ExerciseContainer;
