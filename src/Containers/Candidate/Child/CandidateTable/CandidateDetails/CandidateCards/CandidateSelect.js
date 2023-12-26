import React, {  useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
  addTopicByCandidateId,
} from "../../../../CandidateAction";
import { getLibrarys } from "../../../../../Settings/Library/LibraryAction";
const { Option } = Select;
function CandidateSelect(props) {
  const [selectType, setSelectType] = useState("");
  // console.log("myProps",props.SkillList)
  // function handleChange(value) {
  //   setSelectType(value);
  //   const {
  //       candidateId,

  //       addTopicByCandidateId,
  //     } = props;
  //     // if (selectValue) {
  //       addTopicByCandidateId(
  //         {
  //           //candidateId: this.props.candidate.candidateId,
  //           skillName:selectType,
  //         },
  //       //   this.props.candidate.candidateId
  //       );
  // }
  // console.log("set1",selectType)
  function handleChange(selectType) {
    props.addTopicByCandidateId(
      {
        skillName: selectType,
        candidateId: props.candidateId,
      },
      props.candidateId
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
  // fetchingTopicsByCandidateId: candidate.fetchingTopicsByCandidateId,
  // fetchingTopicsByCandidateIdError: candidate.fetchingTopicsByCandidateIdError,
  // topicsByCandidateId: candidate.topicsByCandidateId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTopicByCandidateId,

      // getTopicsByCandidateId,
      // addTopicByCandidateId,
      // deleteTopicByCandidateId,
      getLibrarys,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateSelect);
