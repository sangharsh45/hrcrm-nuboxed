import React, { Component } from "react";
import styled from "styled-components";
import { Button ,Tooltip} from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
const { Option } = Select;

class SingleRoleTalent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      roleType: "",
      departmentName: "",
      departmentId:"",
      editInd:true,
    };
  }
  render() {
    const {
        talentRole: { roleType, roleTypeExternalId,departmentName,departmentId },
      handleChange,
      name,
      value,
      handleDepartment,
    linkedRoles,
    updatingTalentRoles,
      handleDeleteTalentRole,
      handleUpdateTalentRole,
    //   handleDeleteDepartment,
    } = this.props;
     console.log(linkedRoles);
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <RoleWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <RoleType style={{ flexBasis: "43%" }}>
                  {roleType}
                </RoleType>
             
                <div>
                  {this.props.talentRole.editInd ? (
                       <BorderColorIcon  
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      // size="0.75em"
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
                  &nbsp;
                  <Tooltip title="Delete">
                    <DeleteIcon
                  
                        onClick={() => handleDeleteTalentRole(roleTypeExternalId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div class=" flex">
                  <TextInput
                    name={name}
                    // value={value || departmentName}
                    defaultValue={roleType}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
             
             
                  <br />
                  <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingTalentRoles}
                    disabled={!value}
                  onClick={() => handleUpdateTalentRole(roleTypeExternalId, value, toggleViewType())}
                  >
                    Update
            
                </Button> 
                &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                     Cancel 
            
                </Button>
                </div>
                </div>
              )
          }
        </ViewEditCard>
      </RoleWrapper>
    );
  }
}

export default SingleRoleTalent;

const RoleWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const RoleType = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DepartmentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
