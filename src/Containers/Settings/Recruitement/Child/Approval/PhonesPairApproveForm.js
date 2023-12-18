import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { Spacer } from "../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
 import { addApprove, getApproveData } from "../../../../Settings/SettingsAction";
import {getDepartments} from "../../../Department/DepartmentAction"
import {
    getRoles,
  } from "../../../../Settings/Category/Role/RoleAction";
import { FormattedMessage } from "react-intl";
import PhonesPairLevelApproveForm from "./PhonesPairLevelApproveForm";class PhonesPairApproveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approve: false,
            type: true,
            amendment: true
        };
    }
    handleApproveToggle = (checked) => {
        console.log(checked);
        this.setState({
            approve: checked,
        });
    };

    handleApproveType = (checked) => {
        console.log(checked);
        this.setState({
            type: checked,
        });
    };


 componentDidMount() {
         this.props.getDepartments();
         this.props.getRoles(this.props.organizationId);
     this.props.getApproveData( "PhonePair");
 }



 getRoleOptions(filterOptionKey, filterOptionValue) {
    const roleOptions =
      this.props.roles.length &&
      this.props.roles
        .filter((option) => {
          if (
            option.departmentId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.roleType || "",
          value: option.roleTypeId,
        }));

    return roleOptions;
  };
    render() {
    
        const departmentNameOption = this.props.departments.map((item) => {
            return {
                label: `${item.departmentName || ""}`,
                value: item.departmentId,
            };
        });
        const roleNameOption = this.props.roles.map((item) => {
            return {
                label: `${item.roleType || ""}`,
                value: item.roleTypeId,
            };
        });
     

    
        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        // reportingTo: this.props.approvalData.reportingTo || "",
                        threshold: this.props.approvalData.threshold || "",
                        departmentId: this.props.approvalData.departmentId || "",
                        roleTypeId: this.props.approvalData.roleTypeId || "",
                        jobLevel: this.props.approvalData.jobLevel || 1,
                        // processName: "BOQ",
                        subProcessName: "PhonePair",
                        approvalType: this.props.approvalData.approvalType === "Standard" ? true : false,
                        approvalIndicator: this.props.approvalData.approvalIndicator ? true : false,
                    
                    }}


                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        // if (this.state.approveType) {
                        this.props.addApprove(
                            {
                                ...values,
                                approvalType: values.approvalType ? "Standard" : "Exception",
                                approvalIndicator: values.approvalIndicator ? true : false,
                               
                            },

                        );
                        resetForm();
                    }}
                >
                    {({
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        ...rest
                    }) => (
                        <Form >
                            <div
                                style={{
                                    minHeight: "40vh",
                                    width: "70%"
                                }}>

                                <div>
                                    <FlexContainer justifyContent="space-between">
                                        <div
                                            style={{
                                                // marginTop: "35px",
                                                width: "20%",
                                                display: "flex",
                                            }}
                                        >
                                            <StyledLabel>Approval Needed</StyledLabel>
                                            &nbsp;&nbsp;
                                        </div>

                                        <FlexContainer
                                            justifyContent="space-between"
                                            style={{ width: "30%" }}
                                        >
                                            <div style={{ width: "30%" }}>

                                                <Field
                                                    name="approvalIndicator"
                                                    component={SwitchComponent}
                                                     data={values.approvalIndicator}
                                                    checkedChildren={"Yes"}
                                                    unCheckedChildren={"No"}
                                                    width={"5em"}
                                                />
                                            </div>
                                        </FlexContainer>
                                    </FlexContainer>
                                </div>
                                {values.approvalIndicator ? (
                                    <div>
                                        <Spacer style={{ marginTop: "4%" }} />
                                     
                                        <div>
                                            <FlexContainer justifyContent="space-between">
                                                <div
                                                    style={{
                                                        marginBottom: "2%",
                                                        width: "20%",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <StyledLabel>Type</StyledLabel>

                                                </div>

                                                <FlexContainer
                                                    justifyContent="space-between"
                                                    style={{ width: "30%" }}
                                                >
                                                    <div style={{ width: "30%" }}>

                                                        <Field
                                                            name="approvalType"
                                                            component={SwitchComponent}
                                                             data={values.approvalType}
                                                            checkedChildren={"Standard"}
                                                            unCheckedChildren={"Exception"}
                                                            width={"6em"}
                                                        />

                                                    </div>
                                                </FlexContainer>
                                            </FlexContainer>
                                        </div>
                                        <Spacer />
                                        <div style={{ marginTop: "2%" }}>
                                            {values.approvalType ? (
                                                <PhonesPairLevelApproveForm
                                                  
                                                    approvalIndicator={values.approvalIndicator ? true : false}
                                                    approvalType={values.approvalType ? "Standard" : "Exception"}
                                                />
                                            ) : ( 
                                                <FlexContainer justifyContent="space-between">
                                                    <div style={{ width: "32%" }}>
                                                        <Field
                                                            name="departmentId"
                                                            label="Department"
                                                            options={Array.isArray(departmentNameOption) ? departmentNameOption : []}
                                                            component={SelectComponent}
                                                            value={values.departmentId}
                                                            placeholder
                                                            isColumn
                                                            inlineLabel
                                                            style={{ flexBasis: "80%", marginTop: "0px", width: "100%" }}
                                                        />
                                                    </div>

                                                    <div style={{ width: "32%" }}>
                                                    {/* <Field
                                                            name="roleTypeId"
                                                            label="Role"
                                                            options={Array.isArray(roleNameOption) ? roleNameOption : []}
                                                            component={SelectComponent}
                                                            value={values.roleTypeId}
                                                            placeholder
                                                            isColumn
                                                            inlineLabel
                                                            style={{ flexBasis: "80%", marginTop: "0px", width: "100%" }}
                                                        /> */}
                                                 <Field
                    name="roleTypeId"
                    label={<FormattedMessage
                      id="app.role"
                      defaultMessage="Role"
                    />}
                    isColumnWithoutNoCreate
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        this.getRoleOptions(
                          "departmentId",
                          values.departmentId
                        )
                      )
                        ? this.getRoleOptions(
                            "departmentId",
                            values.departmentId
                          )
                        : []
                    }
                    value={values.roleTypeId}
                    filterOption={{
                      filterType: "departmentId",
                      filterValue: values.departmentId,
                    }}
                    disabled={!values.departmentId}
                    isColumn
                    margintop={"0"}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                    // value={values.roleTypeId}
                    // width={"100%"}
                    // isColumn
                    // selectType="roleType"
                     /> 
                                                    </div>
                                                    <div style={{ width: "32%" }}>
                                                        <Field
                                                            name="jobLevel"
                                                            label="Job Level"
                                                            options={["1", "2", "3", "4", "5", "7", "8", "9", "10", "11", "12", "13", "14"]}
                                                            component={SelectComponent}
                                                            // placeholder
                                                            isColumn
                                                            inlineLabel
                                                            style={{ flexBasis: "80%", marginTop: "0px", width: "100%" }}
                                                        />
                                                    </div>
                                                </FlexContainer>
                                            )} 
                                        </div>

                                        <Spacer />
                                        <Spacer />
                                        {!values.approvalType ?
                                            <FlexContainer justifyContent="flex-end"
                                                style={{ marginLeft: "104%", marginTop: "52px" }}>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                     loading={this.props.addingApprove}
                                                    style={{
                                                        marginRight: "-230px",
                                                        marginTop: "52px",
                                                        marginBottom: "5px",
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            </FlexContainer>
                                           : null}
                                    </div>
                                 ) : (null)} 

                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ settings, departments,auth,role,designations }) => ({
     addingApprove: settings.addingApprove,
    departments:departments.departments,
    designations: designations.designations,
    approvalData: settings.approvalData,
    roles: role.roles,
    organizationId: auth.userDetails.organizationId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
         addApprove,
         getDepartments,
         getRoles,
        //  getDesignations,
        getApproveData,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PhonesPairApproveForm);
