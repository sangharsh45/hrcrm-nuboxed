import React, {  useState, } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
    addCertificationByCandidateId,
} from "../../../../CandidateAction";
const { Option } = Select;
function CertificationSelect(props) {
  const [selectType, setSelectType] = useState("");
  
  function handleChange(selectType) {
    // useEffect(() => {
    //   props.getCertification(props.organizationId);
    
    // }, []);
    props.addCertificationByCandidateId(
      {
        candidateCertificationName: selectType,
        candidateId: props.candidateId,
      },
      props.candidateId
    );
  }

  return (
    <div>
      <Select style={{ width: "14rem" }} onChange={(e) => handleChange(e)}>
        {/* <Option value={"item"}>"item" </Option>; */}
        {props.certifications.map((item, i) => {
          return <Option value={item.name}>{item.name}</Option>;
        })}
      </Select>
    </div>
  );
}
const mapStateToProps = ({ candidate, auth, certifications }) => ({
  user: auth.userDetails,
  //certifications:certifications.certifications,
  organizationId: auth.userDetails.organizationId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addCertificationByCandidateId,
        // getCertification,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CertificationSelect);
