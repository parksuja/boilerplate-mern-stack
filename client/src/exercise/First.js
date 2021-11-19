import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
// 인덱스에 추가
import Responsive from "../components/common/Responsive";
import FirstExer from "../components/exercises/FirstExer";

import "./First.css";
import Button from "../../src/components/common/Button";
import palette from "../lib/style/palette";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Health4 from "../img/Health4.png";

const Hello = styled(Responsive)`
  text-align: center;
`;
const Wrapper1 = styled.div`
  font-size: 16px;
  margin: 0 auto;
  height: 600px;
  @media (max-width: 768px) {
    height: 750px;
  }
  @media (max-width: 500px) {
    height: 850px;
  } ;
`;
const Wrapper2 = styled.div`
  font-size: 16px;
  margin: 0 auto;
  height: 630px;
`;
const Spacer = styled.div`
  height: 4rem;
`;
const CountInfo = styled.span`
  color: #9c1432;
  font-size: 0.7em;
`;
const Order = styled.div`
  @media screen (max-width: 768px) {
    align-items: center;
  } ;
`;
const StyledButtonPre = styled(Button)`
  background: ${palette.gray[6]};
  &:hover {
    background: ${palette.gray[5]};
  }
  font-size: 0.8rem;
  margin-right: 24rem;
  display: inline-block;
  padding-left: 5px;
  @media (max-width: 1100px) {
    margin-right: 8rem;
  }
  @media (max-width: 500px) {
    margin-right: 1rem;
  } ;
`;
const StyledButtonNext = styled(Button)`
  background: ${palette.gray[6]};
  &:hover {
    background: ${palette.gray[5]};
  }
  font-size: 0.8rem;
  margin-left: 24rem;
  display: inline-block;
  padding-right: 5px;
  @media (max-width: 1100px) {
    margin-left: 8rem;
  }
  @media (max-width: 500px) {
    margin-left: 1rem;
  } ;
`;
const First = ({ setSquatCount, setLungeCount, setShoulderCount }) => {
  const [timeover, setTimeover] = useState(false);
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [exerciseEx, setExerciseEx] = useState(false);
  const [pose, setPose] = useState(0);
  const styleExplain = {
    fontSize: "1.5rem",
    textAlign: "center",
  };
  let time1 = 0;
  let menus = [
    "안녕하세요",
    "운동을 시작합니다,",
    "우리가 할 운동은 다음과 같습니다.",
  ];

  let menuList = menus.map((menu) => {
    return (
      <Animated
        animationIn="fadeIn"
        animationInDelay={1000}
        animationOut="fadeOut"
        animationOutDelay={1000}
        isVisible={visible1}
        style={styleExplain}
      >
        {menu}
      </Animated>
    );
  });

  // useEffect 함수는 리액트 컴포넌트가 렌더링 돌 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  useEffect(() => {
    setTimeout(function () {
      setVisible1(false);
    }, 4000);
    setTimeout(function () {
      setTimeover(true);
    }, 6000);
  }, []);

  const nextPose = () => {
    if (pose === 0) setPose(1);
    else if (pose === 1) setPose(2);
    else if (pose === 2) setPose(3);
    else setPose(0);
  };

  const prePose = () => {
    if (pose === 1) setPose(0);
    else if (pose === 2) setPose(1);
    else if (pose === 3) setPose(2);
    else setPose(3);
  };
  const showExer = () => {
    setVisible2(false);
    setTimeout(function () {
      setExerciseEx(true);
    }, 3000);
  };
  const setSCount = (e) => {
    setSquatCount(e.target.value);
  };
  const setLCount = (e) => {
    setLungeCount(e.target.value);
  };
  const setShCount = (e) => {
    setShoulderCount(e.target.value);
  };
  return (
    <>
      {!timeover && (
        <Wrapper1>
          <Spacer />
          <Spacer />
          <Hello>
            {menuList}
            <Spacer />
            <Animated
              animationIn="fadeIn"
              animationInDelay={2000}
              animationOut="fadeOut"
              animationOutDelay={1000}
              isVisible={visible1}
            >
              <FirstExer />
            </Animated>
          </Hello>
        </Wrapper1>
      )}
      {timeover && !exerciseEx && (
        <Wrapper2>
          <div id="hello">
            <Spacer />
            <Animated
              animationIn="fadeIn"
              animationInDelay={1000}
              animationOut="fadeOut"
              animationOutDelay={500}
              isVisible={visible2}
            >
              <div className="inputWrapper">
                <div id="setCount">
                  먼저 각 운동별 목표 개수를 입력해주세요.
                  <br />
                  운동 준비가 되었다면 시작버튼을,
                  <br />
                  운동 자세를 보시려면 운동자세 보기를 눌러주세요.
                  <br />
                  <CountInfo>* 생략하고 싶은 운동은 0을 입력하세요</CountInfo>
                </div>
                <table id="inputCount">
                  <tr id="squat">
                    <td>스쿼트</td>
                    <td>
                      <input
                        className="inputBox"
                        type="number"
                        // onChange={setSCount}
                        placeholder="15"
                      />
                    </td>
                    <div className="recomend" id="squEx">
                      스쿼트는 10~15회씩 3~5set를 기본으로 합니다. 처음이시라면
                      10회부터 시작하여 천천히 늘려보세요.
                    </div>
                  </tr>
                </table>
                <div id="showExer" onClick={showExer}>
                  운동자세 보기
                </div>
              </div>
            </Animated>
          </div>
        </Wrapper2>
      )}
      {exerciseEx && (
        <Animated animationIn="fadeIn" animationInDelay={500}>
          <Spacer />
          <div className="ex">
            {pose === 0 && (
              <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">준비운동</div>
                <img id="image" src={Health4} />
                <span id="posetext">
                  <ol>
                    <li>
                      카메라를 바라보는 방향을 기준으로 오른쪽으로 몸을 돌리고
                      섭니다.
                    </li>
                    <li>두 손은 모은 상태를 유지합니다.</li>
                    <li>
                      양발의 간격은 골반보다 조금 더 넓게 유지하고, 양발 끝은
                      바깥쪽으로 15도~20도 정도 벌려줍니다.
                    </li>
                    <li>
                      상체는 그대로 꼿꼿이 유지하면서 천천히 엉덩이를 뒤로 빼며
                      무릎을 굽혀 앉는 자세를 취합니다.
                    </li>
                    <li>
                      허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.
                    </li>
                  </ol>
                </span>
              </Animated>
            )}
            {pose === 1 && (
              <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">몸풀기</div>
                <img id="image" src={Health4} />
                <span id="posetext">
                  <ol>
                    <li>
                      카메라를 바라보는 방향을 기준으로 오른쪽으로 몸을 돌리고
                      섭니다.
                    </li>
                    <li>두 손은 모은 상태를 유지합니다.</li>
                    <li>
                      양발의 간격은 골반보다 조금 더 넓게 유지하고, 양발 끝은
                      바깥쪽으로 15도~20도 정도 벌려줍니다.
                    </li>
                    <li>
                      상체는 그대로 꼿꼿이 유지하면서 천천히 엉덩이를 뒤로 빼며
                      무릎을 굽혀 앉는 자세를 취합니다.
                    </li>
                    <li>
                      허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.
                    </li>
                  </ol>
                </span>
              </Animated>
            )}
            {pose === 2 && (
              <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">SQUAT</div>
                <img id="image" src={Health4} />
                <span id="posetext">
                  <ol>
                    <li>
                      카메라를 바라보는 방향을 기준으로 오른쪽으로 몸을 돌리고
                      섭니다.
                    </li>
                    <li>두 손은 모은 상태를 유지합니다.</li>
                    <li>
                      양발의 간격은 골반보다 조금 더 넓게 유지하고, 양발 끝은
                      바깥쪽으로 15도~20도 정도 벌려줍니다.
                    </li>
                    <li>
                      상체는 그대로 꼿꼿이 유지하면서 천천히 엉덩이를 뒤로 빼며
                      무릎을 굽혀 앉는 자세를 취합니다.
                    </li>
                    <li>
                      허벅지가 바닥과 평행이 되면 천천히 준비자세로 돌아옵니다.
                    </li>
                  </ol>
                </span>
              </Animated>
            )}
            {pose === 3 && (
              <Animated animationIn="fadeIn" animationInDelay={500}>
                <div id="pose">마무리</div>
                <img id="image" src={Health4} />
                <span id="posetext">
                  <ol>
                    <li>카메라를 바라보는 방향으로 섭니다.</li>
                    <li>오른쪽 다리를 구부려 들어올립니다.</li>
                    <li>구부린 다리를 옆으로 열어 골반을 열어줍니다.</li>
                    <li>
                      구부린 다리를 손으로 잡아 반대 쪽 다리의 허벅지 옆면에
                      붙여줍니다.
                    </li>
                    <li>
                      몸의 균형을 잡고 천천히 양 손을 가슴 앞에 모아주어 자세를
                      유지합니다.
                    </li>
                  </ol>
                </span>
              </Animated>
            )}
            <Order>
              {exerciseEx && (
                <StyledButtonPre onClick={prePose}>
                  <NavigateBeforeIcon />
                  이전 운동
                </StyledButtonPre>
              )}
              {exerciseEx && (
                <StyledButtonNext onClick={nextPose}>
                  다음 운동
                  <NavigateNextIcon />
                </StyledButtonNext>
              )}
            </Order>
          </div>
        </Animated>
      )}
    </>
  );
};

export default First;
