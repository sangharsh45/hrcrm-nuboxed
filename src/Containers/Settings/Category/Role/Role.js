import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
import SingleRole from "./SingleRole";
import moment from "moment";
import {
  getRoles,
  addRoles,
  updateRoles,
  searchRoleName,removeRole
} from "./RoleAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import * as Yup from "yup";

import { getDepartments } from "../../Department/DepartmentAction";
import { Select } from "../../../../Components/UI/Elements";
const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  departmentName: Yup.string().required("Input needed!"),
});


class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedRoles: [],
      isTextInputOpen: false,
      addingDepartment: false,
      roleType: "",
      singleRole: "",
      userId: "",
      orgId: "",
      departmentId: "", // Add departmentId to state
      departmentName: "",
      editInd: true,
      currentData: "",
      error: "", // Add error field for validation error message
    };
  }
  
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleDepartment = (value) => this.setState({ departmentId: value });

  handleAddRole = () => {
 
    const { addRoles, roles } = this.props;
    const {
      roleType,
      cb,
      addingRoles,
      isTextInputOpen,
      departmentId, // Add departmentId to state
      editInd,
    } = this.state;
  
  
    if (!departmentId) {
      this.setState({ error: "Please select a department" });
      return;
    }
  
    let role = {
      roleType,
      userId: this.props.userId,
      organizationId: this.props.organizationId,
      departmentId,
      editInd,
    };
  
    // let exist = roles && roles.some((element) => element.roleType == roleType);
  
    // if (exist) {
    //   message.error("Can't create as same Role exists!");
    // } else {
      addRoles(role, () => console.log("add role callback"));
      this.setState({
        roleType: "",
        singleRole: "",
        departmentId: "",
        departmentName: "",
        isTextInputOpen: false,
        editInd: true,
        error: "", // Clear the error message when successfully adding a role
      });
    // }
  };
  

  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getRoles(this.props.organizationId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value });
  };
  handleDeleteRole = (roleTypeId={roleTypeId}) => {
    this.props.removeRole(roleTypeId);
    this.setState({ roleType: "", singleRole: "" });
  };
  handleUpdateRole = (
    roleType,
    roleTypeId,
    departmentId,
    departmentName,
    editInd,
    cb
  ) => {
    this.props.updateRoles(
      roleType,
      roleTypeId,
      departmentId,
      departmentName,
      editInd,
      cb
    );
    this.setState({
      roleType: "",
      singleRole: "",
      departmentId: "",
      departmentName: "",
      editInd: true,
    });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    this.props.getRoles(this.props.organizationId);
    this.props.getDepartments();
    // const { getRoles ,getDepartments} = this.props;
    // getDepartments(getDepartments);
    // console.log();
    // getRoles();
  }
  render() {
    console.log("departmentId",this.state.departmentId)
    const {
      fetchingRoles,
      fetchingRolesError,
      roles,
      addingRoles,
      updatingRoles,
    } = this.props;
    const {
      isTextInputOpen,
      roleType,
      orgId,
      userId,
      singleRole,
      linkedRoles,
      // linkedRole,
    } = this.state;
    if (fetchingRoles) return <BundleLoader/>;
    if (fetchingRolesError) return <p>Error ...</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <div style={{ width: "18vw", display: "flex" }}>
              <Input
                placeholder="Search by Name"
                width={"100%"}
                // onSearch={(value) => {
                //   props.inputCandidateDataSearch(value);
                //   props.setCurrentData(value);

                // }}
                onChange={(e) => this.handleSearchChange(e)}
                value={this.props.currentData}
              />
              <Button
                type={this.props.currentData ? "primary" : "danger"}
                onClick={() => {
                  this.props.searchRoleName(this.state.currentData);
                }}
              >
                Submit
              </Button>
              &nbsp;
              <Button
                type={this.props.currentData ? "primary" : "danger"}
                onClick={() => {
                  this.handleClear();
                }}
              >
                <FormattedMessage id="app.clear" defaultMessage="Clear" />
              </Button>
            </div>
            <FlexContainer flexDirection="column">
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {roles.length ? (
                  roles.map((role, i) => (
                    <SingleRole
                      key={i}
                      value={singleRole}
                      name="singleRole"
                      role={role}
                      linkedRoles={linkedRoles}
                      updatinRoles={updatingRoles}
                      handleChange={this.handleChange}
                      handleUpdateRole={this.handleUpdateRole}
                      departments={this.props.departments}
                      departmentId={this.state.departmentId}
                      handleDepartment={this.handleDepartment}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                      handleDeleteRole={this.handleDeleteRole}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </FlexContainer>
            {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Role"
                  name="roleType"
                  value={roleType}
                  onChange={this.handleChange}
                  width="30%"
                  style={{ marginRight: "0.125em" }}
                />
                
                <Select
                 isRequired
                  style={{ width: "40%" }}
                  placeholder="Select Department"
                  onChange={this.handleDepartment}
                >
                  {this.props.departments.map((item) => {
                    return (
                      <Option value={item.departmentId}>
                        {item.departmentName}{" "}
                      </Option>
                    );
                  })}
                
{this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}

                </Select>
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!roleType}
                  Loading={addingRoles}
                  onClick={this.handleAddRole}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  Cancel
                </Button>
              </FlexContainer>
            ) : (
              <>
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingRoles}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </FlexContainer>
               
              </>
            )}
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </FlexContainer>
        <h4>Updated on {moment(this.props.roles && this.props.roles.length && this.props.roles[0].updationDate).format("ll")} by {this.props.roles && this.props.roles.length && this.props.roles[0].name}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ role, auth, departments }) => ({
  addingRoles: role.addingRoles,
  addingRolesError: role.addingRolesError,
  roles: role.roles,
  departments: departments.departments,
  updatinRoles: role.updatingRoles,
  userId: auth.userDetails.userId,
  updatingRolesError: role.updatingRolesError,
  fetchingRoles: role.fetchingRoles,
  fetchingRolesError: role.fetchingRolesError,
  organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRoles,
      addRoles,
      updateRoles,
      getDepartments,
      searchRoleName,
      removeRole
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Department);
