import React, { Component, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
  addInitiativeByCustomerId,
} from "../../../CustomerAction";
import { getLibrarys } from "../../../../Settings/Library/LibraryAction";
import { StyledSelect } from "../../../../../Components/UI/Antd";
const { Option } = Select;
function CustomerSelect(props) {
  const [selectType, setSelectType] = useState("");
  
  function handleChange(selectType) {
    props.addInitiativeByCustomerId(
      {
        skillName: selectType,
        customerId: props.customerId,
      },
      props.customerId
    );
  }

  return (
    <div>
      <Select style={{ width: "14rem" }} onChange={(e) => handleChange(e)}>
        {/* <Option value={"item"}>"item" </Option>; */}
        {props.librarys.map((item, i) => {
          return <Option value={item.name}>{item.name}</Option>;
        })}
      </Select>
    </div>
  );
}
const mapStateToProps = ({  auth, librarys }) => ({
  user: auth.userDetails,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addInitiativeByCustomerId,
      getLibrarys,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelect);
