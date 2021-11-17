import { Button, Descriptions } from "antd";

import React from "react";

function ProductInfo(props) {
  return (
    <div>
      <Descriptions title="상품 정보" bordered>
        <Descriptions.Item label="제목">{props.detail.title}</Descriptions.Item>
        <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
        <Descriptions.Item label="조회수">
          {props.detail.views}
        </Descriptions.Item>
        <Descriptions.Item label="설명">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick>
          장바구니 추가
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
