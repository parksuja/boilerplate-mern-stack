import { Button } from "antd";
import * as tmPose from "@teachablemachine/pose";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Video.css";
import $ from "jquery";
import React from "react";
import styled from "styled-components";
//1.Install dependencies
//2.Import  dependencies
//3.Setup webcam and canvas
//4 Define references to those
//5. Load bodypix
//6. Detect function
//7. Draw using drawMask
//8. Draw functions
//사전에 훈련된 모델을 활용 감지기능은 거의실시간 특정간격 반복
//실시간 웹캠 피드를 분할
const Background = styled.div`
  background: linear-gradient(120deg, #d8e2ed 50%, #f5f5f5 50%);
`;
function VideoPage() {
  const URL = "../model/";
  let model, webcam, ctx, labelContainer, maxPredictions;

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 500;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }
  var progress = 327;
  var status = "stand";
  var count = 0;
  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) > 0.9) {
      if (status == "squat") {
        count++;
        var audio = new Audio((count % 10) + ".mp3");
        audio.play();
        progress = progress - 32.7;
        if (progress <= 0) {
          progress = 327 - 32.7;
        }
        $(".progress").css("stroke-dashoffset", progress);
        $("#counter").html(count);
      }
      status = "stand";
    } else if (prediction[1].probability.toFixed(2) == 1.0) {
      status = "squat";
    } else if (prediction[2].probability.toFixed(2) == 1.0) {
      if (status == "squat" || status == "stand") {
        var audio = new Audio("bent.mp3");
        audio.play();
      }
      status = "bent";
    }
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }
  return (
    <>
      <Background>
        <div className="container mt-5">
          <div class="frame">
            <div class="center">
              <div class="headline">
                <div class="small">Squat</div>Counter
              </div>
              <div class="circle-big">
                <div class="text">
                  <span id="counter">0</span>
                  <div class="small">개</div>
                </div>
                <svg>
                  <circle class="bg" cx="57" cy="57" r="52" />
                  <circle class="progress" cx="57" cy="57" r="52" />
                </svg>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <h1>스쿼트</h1>
          <Button type="button" onClick={() => init()}>
            시작
          </Button>
          <div>
            <canvas id="canvas"></canvas>
          </div>
          <div id="label-container"></div>
        </div>
      </Background>
    </>
  );
}

export default VideoPage;
