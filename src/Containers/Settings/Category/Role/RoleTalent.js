import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
 import { BundleLoader } from "../../../../Components/Placeholder";
import {
    getTalentRoles,
    addTalentRoles,
    updateTalentRoles,
    removeTalentRole
} from "./RoleAction";

import { Select } from "../../../../Components/UI/Elements";
import SingleRoleTalent from "./SingleRoleTalent";
const { Option } = Select;

class RoleTalent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedRoles: [],
      isTextInputOpen: false,
      addingDepartment: false,
      roleType: "",
      singleRole: "",
      userId:"",
      orgId:"",
      departmentId:"",
      departmentName:"",
      editInd:true,
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

    handleDepartment = (value) =>
    this.setState({ departmentId: value });  

    handleAddTalentRole = () => {
    const { addTalentRoles, roles,} = this.props;
    const { roleType,cb, addingTalentRoles, isTextInputOpen,editInd} = this.state;
    let role = { roleType,userId: this.props.userId, organizationId: this.props.organizationId,editInd };

    let exist =
    roles &&
    roles.some((element) => element.roleType == roleType);

    // if (exist) {
    //   message.error(
    //     "Can't create as same Role exists!"
    //   );
    // } else {
        addTalentRoles(role, () => console.log("add role callback"));
    // }

    this.setState({
      roleType: "",
      singleRole: "",
      departmentId:"",
      departmentName: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteDepartment = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleDeleteTalentRole = (roleTypeExternalId = { roleTypeExternalId }) => {
    this.props.removeTalentRole(roleTypeExternalId);
    this.setState({ roleType: "", singleRole: "" });
  };
  handleUpdateTalentRole = (roleType ,roleTypeExternalId, editInd,cb) => {
    this.props.updateTalentRoles( roleType,roleTypeExternalId,editInd, cb);
    this.setState({ roleType: "", singleRole: "",editInd:true});
  };

  componentDidMount() {
    this.props.getTalentRoles(this.props.orgId); 
    // this.props.getDepartments();
  }
  render() {
    const {
        fetchingTalentRoles,
        fetchingTalentRolesError,
        talentRoles,
      addingTalentRoles,
      updatingRoles,
    } = this.props;
    const {
      isTextInputOpen,
      roleType,
      orgId,
      userId,
      singleRole,
      linkedRoles
      // linkedRole,
    } = this.state;
    if (fetchingTalentRoles) return <BundleLoader/>;
    if (fetchingTalentRolesError) return <p>Error ...</p>;
    return (
      <>
        <div class =" flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <div class=" flex flex-col" >
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
             <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {talentRoles.length ? (
                  talentRoles.map((talentRole, i) => (
                    <SingleRoleTalent
                      key={i}
                       value={singleRole}
                      name="singleRole"
                       talentRole={talentRole}
                       linkedRoles={linkedRoles}
                       handleDeleteTalentRole={this.handleDeleteTalentRole}
                       updatinRoles={updatingRoles}
                       handleChange={this.handleChange}
                       handleUpdateTalentRole={this.handleUpdateTalentRole}
                      
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper> 
            </div>
            {isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Role"
                   name="roleType"
                  value={roleType}
                   onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
              
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!roleType}
                   loading={addingTalentRoles}
                  onClick={this.handleAddTalentRole}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                  loading={addingTalentRoles}
                    onClick={this.toggleInput}
                  >
                    Add Type
                  </Button>
                </div>
              </>
            )}
          </MainWrapper>
     
   
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ role ,auth,departments}) => ({
    addingTalentRoles:role.addingTalentRoles,
    addingTalentRolesError: role.addingTalentRolesError,
    talentRoles: role.talentRoles,
//   departments: departments.departments,
//    updatinRoles: role.updatingRoles,
//    userId: auth.userDetails.userId,
//      updatingRolesError: role.updatingRolesError,
fetchingTalentRoles: role.fetchingTalentRoles,
    fetchingRolesError:role.fetchingRolesError,
    orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTalentRoles,
        addTalentRoles,
        updateTalentRoles,
         removeTalentRole,
       
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RoleTalent);
