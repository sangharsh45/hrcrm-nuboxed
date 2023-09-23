import React, { Component, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
    addOpportunitySkills,
  // getTopicsByCandidateId,
  // deleteTopicByCandidateId,
} from "../../OpportunityAction";
import { getLibrarys } from "../../../Settings/Library/LibraryAction";
const { Option } = Select;
function OpportunitySelect(props) {
  const [selectType, setSelectType] = useState("");
  function handleChange(selectType) {
    props.addOpportunitySkills(
      {
        skillName: selectType,
        //candidateId: props.candidateId,
      },
      //props.candidateId
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
const mapStateToProps = ({ candidate, auth, librarys }) => ({
  user: auth.userDetails,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addOpportunitySkills,
      getLibrarys,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunitySelect);
