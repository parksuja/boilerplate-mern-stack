import React from "react";
import styled from "styled-components";
import FooterContainer from "./components/common/FooterContainer";
import ExerciseContainer from "./exercise/ExerciseContainer";

const Background = styled.div`
  background: linear-gradient(120deg, #d8e2ed 50%, #f5f5f5 50%);
`;
function VideoPage1(props) {
  return (
    <Background>
      <ExerciseContainer />
      {/* <FooterContainer /> */}
    </Background>
  );
}

export default VideoPage1;
