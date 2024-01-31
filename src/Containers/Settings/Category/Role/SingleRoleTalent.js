import React, { Component } from "react";
import { Button ,Tooltip} from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";
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
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                  <div class=" font-semibold" >
                  {roleType}
                </div>
             
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
                
                  <Tooltip title="Delete">
                    <DeleteOutlined
                  
                        onClick={() => handleDeleteTalentRole(roleTypeExternalId)}
                    
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
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
             
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                     Cancel 
            
                </Button>
                </div>
                </div>
              )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default SingleRoleTalent;


