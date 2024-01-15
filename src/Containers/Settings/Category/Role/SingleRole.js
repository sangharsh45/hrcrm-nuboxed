import React, { Component } from "react";
import styled from "styled-components";
import { Button,Tooltip } from "antd";
import {  TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
const { Option } = Select;

class SingleRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      roleType: "",
      departmentName: "",
      // departmentId: "",
      editInd: true,
    };
  }
  // handleDepartment = (value) =>
  // this.setState({ departmentId: value });
  render() {
    const {
      role: { roleType, roleTypeId, departmentName, departmentId },
      handleChange,
      name,
      value,
      handleDepartment,
      
      linkedRoles,
      updatingRoles,
      handleUpdateRole,
     handleDeleteRole,
    } = this.props;
    console.log(linkedRoles);
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <RoleWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <RoleType style={{ flexBasis: "43%" }}>{roleType}</RoleType>
                <RoleType style={{ flexBasis: "42%" }}>
                  {departmentName}
                </RoleType>
                <div>
                  {this.props.role.editInd ? (
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
                  
                        onClick={() => handleDeleteRole(roleTypeId)}
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
                  style={{ width: "40%" }}
                />
                <Select
                  defaultValue={departmentName}
                  style={{ width: "30%" }}
                  placeholder="Select Department"
                  onChange={handleDepartment}
                >
                  {this.props.departments.map((item) => {
                    return (
                      <Option value={item.departmentId}>
                        {item.departmentName}{" "}
                      </Option>
                    );
                  })}
                </Select>
             
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingRoles}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateRole(
                        roleTypeId,
                        value,
                        this.props.departmentId,
                        departmentName,
                        toggleViewType()
                      )
                    }
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

export default SingleRole;

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
