import { Collapse, Radio } from "antd";
import React, { useState } from "react";

const { Panel } = Collapse;

function Radiobox(props) {
  const [Value, setValue] = useState(0);
  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  const handleChange = (e) => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={"0"}>
        <Panel header="가격" key="1" defaultActiveKey>
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default Radiobox;
