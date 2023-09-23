import React, { Component, useMemo, useState,useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
    addCertificationByUserId,

} from "../../../../EmployeeAction";
//import { getCertification } from "../../../../../Settings/Recruitement/Child/Certification/CertificationAction";
import { StyledSelect } from "../../../../../../Components/UI/Antd";
const { Option } = Select;
function EmployeeCertificationSelect(props) {
  const [selectType, setSelectType] = useState("");
  
  function handleChange(selectType) {
    // useEffect(() => {
    //   props.getCertification(props.organizationId);
    
    // }, []);
    props.addCertificationByUserId(
      {
        employeeCertificationName: selectType,
        employeeId: props.employeeId,
      },
      props.employeeId
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
        addCertificationByUserId,
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCertificationSelect);
