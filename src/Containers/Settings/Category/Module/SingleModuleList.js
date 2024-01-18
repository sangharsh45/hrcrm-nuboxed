import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button, Popconfirm, Switch, } from "antd";
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
              <div class=" flex " >
             
           
              <h1>ERP</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleErpClick}
                        onCancel={this.props.handleErpCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.erpStatus || this.props.rowdata.erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
           {this.props.rowdata.erpInd === true && ( 
            <>  
              <h1>PRODUCTION</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleProductionClick}
                        onCancel={this.props.handleProductionCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.productionStatus || this.props.rowdata.productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Repair</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleRepairClick}
                        onCancel={this.props.handleRepairCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.repairStatus || this.props.rowdata.repairInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Inventory</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleInventoryClick}
                        onCancel={this.props.handleInventoryCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.inventoryStatus || this.props.rowdata.inventoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>OrderManagement</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleOrderManagementClick}
                        onCancel={this.props.handleOrderManagementCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.orderManagStatus || this.props.rowdata.orderManagementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Logistics</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleLogisticClick}
                        onCancel={this.props.handleLogisticCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.logisticsStatus || this.props.rowdata.logisticsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Procurement</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleProcurmentClick}
                        onCancel={this.props.handleProcurmentCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.procurmentStatus || this.props.rowdata.procurementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </>   
              
              )}  
                
                   
                
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
