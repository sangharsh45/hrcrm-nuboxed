import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button,Tooltip } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../Components/UI/Elements";
import { EditOutlined } from "@ant-design/icons";
import DepartmentStatusToggle from "./DepartmentStatusToggle";
import ERPStatusToggle from "./ERPStatusToggle";
import CRMStatusToggle from "./CRMStatusToggle";
import IMStatusToggle from "./IMStatusToggle";
const { Option } = Select;

class SingleDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      departmentName: "",
      sectorId:"",
      sectorName:"",
      editInd:true,
    };
  }

  handleSectorId = (value) =>
    this.setState({ sectorId: value });
  render() {
    const {
       department: { departmentName, departmentId,sectorId,mandetoryInd,sectorName,crmInd,erpInd },
      handleChange,
      name,
      value,
      linkedDepartments,
      updatingDepartments,
      handleUpdateDepartment,
      handleDeleteDepartment,

    } = this.props;
    console.log(linkedDepartments);

    console.log("35l",this.props)
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <DepartmentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-11/12 flex-row">
              <FlexContainer justifyContent="space-between">
                {/* <div class=" flex w-1/2"> */}
               <div class=" w-28">
                <DepartmentName >
                  {departmentName}
                </DepartmentName>
                </div>
                {/* <div class="w-20">
                <DepartmentName >
                  {sectorName}
                </DepartmentName>
                </div> */}
                {/* </div> */}
                <div style={{width:"20%"}}>
                    <DepartmentStatusToggle
                      mandetoryInd={mandetoryInd}
                      departmentName={departmentName}
                      departmentId={departmentId}
                    />  
                    </div>
                    <h1 class="ml-4">ERP</h1>
                    <div style={{width:"20%"}}>
                    
                    <ERPStatusToggle
                      erpInd={erpInd}
                      departmentName={departmentName}
                      departmentId={departmentId}
                    />  
                    </div>
                    <h1>CRM</h1>
                    <div style={{width:"20%"}}>
                    <CRMStatusToggle
                      crmInd={crmInd}
                      departmentName={departmentName}
                      departmentId={departmentId}
                    />  
                    </div>
                    <h1>IM</h1>
                    <div style={{width:"20%"}}>
                    <IMStatusToggle
                      crmInd={crmInd}
                      departmentName={departmentName}
                      departmentId={departmentId}
                    />  
                    </div>
                
              </FlexContainer>
              </div>
              <div>
                
                  {this.props.department.mandetoryInd !== true &&(
                  <BorderColorIcon 
                    tooltipTitle="Edit"
                    iconType="edit"
                    onClick={toggleViewType}
                   style={{fontSize:"1rem"}}
                  />
             
             
 
                  
                 
                  )}
                   {this.props.department.mandetoryInd !== true &&(
                  
  <DeleteIcon
                    
                    onClick={() => handleDeleteDepartment(departmentId)}
                   size="14px"
                   style={{
                     verticalAlign: "center",
                     marginLeft: "5px",
                     color: "red",
                   }}
                 />
                 )}
                 
                </div> 
              </div>
              
            ) : (
                <FlexContainer>
                  <TextInput
                    name={name}
                    // value={value || departmentName}
                    defaultValue={departmentName}
                    onChange={handleChange}
                    style={{ width: "60%" }}
                  />
                  <Select 
              defaultValue={sectorName}
               style={{width:"40%"}}
               placeholder="Select Sectors"
               onChange={this.handleSectorId}
               >
                            {this.props.sectors.map((item) => {
                                return <Option value={item.sectorId}>{item.sectorName} </Option>;
                            })}
               </Select>
                  <br />
                  <br />
                  <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDepartments}
                    disabled={!value}
                  onClick={() => handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType())}
                  >
                    {/* Save */}
                    <FormattedMessage
              id="app.update"
              defaultMessage="Update"
            />
                </Button>
                &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
                </Button>
                </FlexContainer>
                </FlexContainer>
              )
          }
        </ViewEditCard>
      </DepartmentWrapper>
    );
  }
}

export default SingleDepartment;

const DepartmentWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DepartmentName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DepartmentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
