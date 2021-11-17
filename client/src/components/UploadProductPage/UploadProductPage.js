import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import { privateDecrypt } from "crypto";
import FileUpload from "../Utils/FileUpload";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
const Continents1 = [
  { key: 1, value: "운동1" },
  { key: 2, value: "운동2" },
  { key: 3, value: "운동3" },
  { key: 4, value: "운동4" },
  { key: 5, value: "운동5" },
  { key: 6, value: "운동6" },
  { key: 7, value: "운동7" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continents, setContinents] = useState(1);
  const [Images, setImages] = useState([]);

  const onChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const descriptionChagneHandler = (e) => {
    setDescription(e.currentTarget.value);
  };

  const priceChangeHandler = (e) => {
    setPrice(e.currentTarget.value);
  };

  const continentChangeHanlder = (e) => {
    setContinents(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!Title || !Description || !Price || !Continents || !Images) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }

    const body = {
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continents,
    };

    //서버에 채운 값들을 request로 보낸다. , post request body 포함
    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("업로드 성공");
        props.history.push("/");
      } else {
        alert("업로드 실패");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>패키지 업로드</h2>
      </div>
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={onChange} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChagneHandler} value={Description} />
        <br />
        <br />
        <label>가격</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHanlder} value={Continents}>
          {Continents1.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
