





import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button, Popconfirm, Switch, } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../Components/UI/Elements";
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
       department: { departmentName,procurementInd,recruitOppsInd,hrInd,orderManagementInd,logisticsInd, departmentId,repairInd,inventoryInd,recruitProInd,sectorId,productionInd,eLearningInd,mandetoryInd,sectorName,crmInd,erpInd,imInd ,accountInd},
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
                <div class="w-full flex-row">
              <div class=" flex justify-between" >
                {/* <div class=" flex w-1/2"> */}
               <div class=" w-[9rem]">
                <DepartmentName >
                  {departmentName}
                </DepartmentName>
                </div>
                <h1>CRM</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleCrmClick}
                        onCancel={this.props.handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                        <h1>Mandatory</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleMandatoryClick}
                        onCancel={this.props.handleMandatoryCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.mandatoryStatus || mandetoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

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
                          checked={this.props.erpStatus || erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>IM</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleImClick}
                        onCancel={this.props.handleImCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.imStatus || imInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                       <h1>Account</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleAccountClick}
                        onCancel={this.props.handleAccountCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                        <h1>RecruitOpps</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleRecruitClick}
                        onCancel={this.props.handleRecruitCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                     <h1>HR</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleHrClick}
                        onCancel={this.props.handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.hrStatus || hrInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>  
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
                          checked={this.props.productionStatus || productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Rcruitpro</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleRecruitProClick}
                        onCancel={this.props.handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.recruitProStatus || recruitProInd}
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
                          checked={this.props.repairStatus || repairInd}
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
                          checked={this.props.inventoryStatus || inventoryInd}
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
                          checked={this.props.orderManagStatus || orderManagementInd}
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
                          checked={this.props.logisticsStatus || logisticsInd}
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
                          checked={this.props.procurmentStatus || procurementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Elearning</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={this.props.handleElearningClick}
                        onCancel={this.props.handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={this.props.elearningStatus || eLearningInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                
                 
                

          
                   
                
              </div>
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
                  {/* <Select 
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
                  <div class=" flex justify-end" >
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
                </div>
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
