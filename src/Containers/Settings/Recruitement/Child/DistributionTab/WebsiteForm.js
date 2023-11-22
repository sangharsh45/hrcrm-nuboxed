import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  TextInput,
  Select,
  StyledLabel,
} from "../../../../../Components/UI/Elements";
import { MainWrapper, Spacer } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button, Popconfirm, Switch } from "antd";
import {
    websiteSingleMultiple,
    getDistributionAutomation,
    getDepartmentwiserUser,
} from "../../../../Settings/SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import {getDepartments} from "../../../Department/DepartmentAction"
import moment from "moment";
const { Option } = Select;
function WebsiteForm(props) {

    const [single, setSingle] = useState(false);
    const [selectedDept, setSelectedDept] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
console.log("single",single)
    const handleSingleMultiple = (checked) =>{
        setSingle(checked)
    }
  useEffect(() => {
    props.getDistributionAutomation(props.orgId,"lead");
    props.getDepartments();
    
  }, []);

  const departmentNameOption = props.departments.map((item) => {
    return {
        label: `${item.departmentName || ""}`,
        value: item.departmentId,
    };
});
const handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    setSelectedDept(selectedDept);
    setSelectedUser("");
    props.getDepartmentwiserUser(selectedDept) // Assuming you want to pass the selected department and filtered roles to a parent component
  };
  const handleUserChange = (event) => {
    const selectedUser = event.target.value;
    setSelectedUser(selectedUser);
  };
  const filteredUser = props.departmentwiseUser.filter((item) => item.departmentId === selectedDept);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
        //   timePeriod: props.distributionAutomation.timePeriod === 0 ? "Not Applicable" :props.distributionAutomation.timePeriod|| "",
        //   orderTimePeriod: props.distributionAutomation.orderTimePeriod === 0 ? "Not Applicable" :props.distributionAutomation.orderTimePeriod || "",
          userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values) => {
          console.log(values)
       
          props.websiteSingleMultiple(
            {
              ...values,
            
              type: single ? "Multiple" : "Single",
            },
            props.orgId
          );
        }}
      >
        {({ values }) => (
        <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
        <Form className="form-background">
          <FlexContainer
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <div
              style={{
                width: "44%",

                marginTop: "0.625em",
                marginLeft: "1em",
              }}
            >
            
        
             
              <div
                style={{
                  width: "74%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
              
                <div>
                      {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        // onConfirm={handleAppClick}
                        // onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleSingleMultiple}
                          checked={single}
                          checkedChildren="Multiple"
                          unCheckedChildren="Single"
                        />
                      {/* </Popconfirm> */}
                    </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="space-between">
                                                    <div style={{ width: "35%" }}>
                                                    <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Department</label>
                      <select 
                        style={{ border: "0.06em solid #aaa" }}
                      onChange={handleDeptChange}>
          <option value="">Select Department</option>
          {props.departments.map((item, index) => (
            <option 
           
            key={index} value={item.departmentId}>
              {item.departmentName}
            </option>
          ))}
        </select>
                                                    </div>

                  <div style={{ width: "35%" }}>
                  <select
                 style={{ border: "0.06em solid #aaa" }}
                       onChange={handleUserChange}
                    >
          <option value="">select</option>
          {filteredUser.map((item, index) => (
            <option key={index}
            // disabled
            // disabled={!values.country_name}
             value={item.taskChecklistId}>
              {item.taskChecklistName}
            </option>
          ))}
        </select>
        </div>                              
                                                   
                                                </FlexContainer>
             
            </div>
          </FlexContainer>
       
              <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateRequirement}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </FlexContainer>
  
        </Form>
      </MainWrapper>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, departments, auth }) => ({
  userId: auth.userDetails.userId,
  departmentwiseUser:settings.departmentwiseUser,
  distributionAutomation: settings.distributionAutomation,
  orgId: auth.userDetails.organizationId,
  departments:departments.departments,
  updateWebsiteSingle: settings.updateWebsiteSingle,
  updateWebsiteSingleError: settings.updateWebsiteSingleError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        websiteSingleMultiple,
        getDepartments,
        getDepartmentwiserUser,
        getDistributionAutomation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteForm);
