import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);
  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
      //어떠한 파일인지에 대한 content-type 정의
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data); //response.data를 저장해야한다.
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images, response.data.filePath]);
        console.log(Images);
      } else {
        alert("업로드 실패");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    console.log(currentIndex); //이미지 인덱스 불러옴
    let newImages = [...Images]; //let newImages =[1,2,3] newImages.splice(1,1) 인덱스 1번부터 1개 지운다.
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                //수직축으로 아이템을 정렬 (중간)
                justifyContent: "center", //메인축 방향으로 아이템을 정렬 (중간)
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div key={index} onClick={() => deleteHandler(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
