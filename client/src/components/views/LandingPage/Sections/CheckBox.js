import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    //누른 것의 Index를 구하고

    const currentIndex = Checked.indexOf(value);

    //전체 Checked 된 State에서 현재 누른 Checkbox가 이미 있다면

    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    //빼주고 State  넣어준다.
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      {" "}
      <Collapse defaultActiveKey={"0"}>
        <Panel header="카테고리" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
      ,
    </div>
  );
}

export default CheckBox;
