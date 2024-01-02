import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button, } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
import DepartmentStatusToggle from "../../Department/DepartmentStatusToggle";
import ERPStatusToggle from "../../Department/ERPStatusToggle";
import CRMStatusToggle from "../../Department/CRMStatusToggle";
import IMStatusToggle from "../../Department/IMStatusToggle";
import AccountingStatusToggle from "../../Department/AccountingStatusToggle";
import RecruitProStatusToggle from "../../Department/RecruitProStatusToggle";
import HrStatusToggle from "../../Department/HrStatusToggle";
const { Option } = Select;

class SingleModuleList extends Component {
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


    console.log("35l",this.props)
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <DepartmentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex justify-between" >
             
           
           
                    {/* <h1 class="ml-4">ERP</h1>
                    <div class=" w-[7%] ml-2"   >
                    
                    <ERPStatusToggle
                    //   erpInd={erpInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div> */}
                    <h1>CRM</h1>
                    <div   class=" w-[7%] ml-2">
                    <CRMStatusToggle
                    //   crmInd={crmInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                    <h1>IM</h1>
                    <div class=" w-[7%] ml-2">
                    <IMStatusToggle
                    //   imInd={imInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                    <h1>HR</h1>
                    <div 
                   class=" w-[8%] ml-2"
                    >
                    <HrStatusToggle
                    //   hrInd={hrInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                    <h1>Accounting</h1>
                    <div 
                   class=" w-[8%] ml-2"
                    >
                    <AccountingStatusToggle
                    //   accountInd={accountInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>

                    <h1>RecruitPro</h1>
                    <div 
                  class=" w-[8%] ml-2"
                    >
                    <RecruitProStatusToggle
                    //   recruitOppsInd={recruitOppsInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                   
                
              </div>
              </div>
              <div>
                
              
                 
                </div> 
              </div>
              
            ) : (
                <FlexContainer>
                  {/* <TextInput
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
               </Select> */}
                  <br />
                  <br />
              
                </FlexContainer>
              )
          }
        </ViewEditCard>
      </DepartmentWrapper>
    );
  }
}

export default SingleModuleList;

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
