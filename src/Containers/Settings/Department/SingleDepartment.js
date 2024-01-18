import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Popconfirm, Switch } from "antd";
import {addingDeptModules} from "../Department/DepartmentAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../Components/UI/Elements";
const { Option } = Select;

const SingleDepartment = (props) => {

  const [viewType, setViewType] = useState("view");

  const toggleViewType = () => {
    setViewType((prevViewType) => (prevViewType === "view" ? "edit" : "view"));
  };
  const {
    department: { departmentName,crmInd,procurementInd,recruitOppsInd,hrInd,orderManagementInd,logisticsInd, departmentId,repairInd,inventoryInd,recruitProInd,sectorId,productionInd,eLearningInd,mandetoryInd,sectorName,erpInd,imInd ,accountInd},
   handleChange,
   name,
   value,
   linkedDepartments,
   updatingDepartments,
   handleUpdateDepartment,
   handleDeleteDepartment,

 } = props;

  // const { crmInd } = department;
  console.log(crmInd);
  const [crmStatus, setCrmStatus] = useState(crmInd);
  function handleCrmClick(checked) {
    const { departments, addingDeptModules } = props;
    // const departmentId = rowdata.departmentId;
    console.log(crmInd);
    if (crmInd) {
      //disable url
      addingDeptModules({
        // ...props.departments,
        orgId: props.orgId,
        departmentId:departmentId,
        type:"crm",
        crmInd: crmInd ? false : true,
      },
      departmentId
      );
      setCrmStatus(crmInd ? false : true);
    } else {
      addingDeptModules(
        {
          // ...props.departments,
          orgId: props.orgId,
          departmentId:departmentId,
          type:"crm",
          crmInd: crmInd ? false : true,
        },
         departmentId
      );
      setCrmStatus(crmInd ? false : true);
    }
  }
  function handleCrmCancel() {
    if (crmInd) {
      setCrmStatus(true);
    } else {
      setCrmStatus(false);
    }
  }

  const [mandatoryStatus, setMandatoryStatus] = useState(mandetoryInd);
  function handleMandatoryClick(checked) {
    console.log(mandetoryInd);
    if (mandetoryInd) {
      //disable url
      props.addingDeptModules({
        // ...props.departments,
        orgId: props.orgId,
        departmentId:departmentId,
        type:"mandatory",
        mandetoryInd: mandetoryInd ? false : true,
      },departmentId);
      setMandatoryStatus(mandetoryInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          // ...props.departments,
          orgId: props.orgId,
          departmentId:departmentId,
          type:"mandatory",
          mandetoryInd: mandetoryInd ? false : true,
        },
        departmentId
      );
      setMandatoryStatus(mandetoryInd ? false : true);
    }
  }
  function handleMandatoryCancel() {
    if (mandetoryInd) {
      setMandatoryStatus(true);
    } else {
      setMandatoryStatus(false);
    }
  }

  const [erpStatus, setErpStatus] = useState(erpInd);
  function handleErpClick(checked) {
    console.log(erpInd);
    if (erpInd) {
      //disable url
      props.addingDeptModules({
      
        orgId: props.orgId,
        departmentId:departmentId,
        type:"erp",
        erpInd: erpInd ? false : true,
      },departmentId);
      setErpStatus(erpInd ? false : true);
    } else {
      props.addingDeptModules(
        {
         
          orgId: props.orgId,
          departmentId:departmentId,
          type:"erp",
          erpInd: erpInd ? false : true,
        },
        departmentId
      );
      setErpStatus(erpInd ? false : true);
    }
  }
  function handleErpCancel() {
    if (erpInd) {
      setErpStatus(true);
    } else {
      setErpStatus(false);
    }
  }
  const [imStatus, setImStatus] = useState(imInd);
  function handleImClick(checked) {
    console.log(imInd);
    if (imInd) {
      //disable url
      props.addingDeptModules({
     
        departmentId:departmentId,
        orgId: props.orgId,
        type:"im",
        imInd: imInd ? false : true,
      },departmentId);
      setImStatus(imInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"im",
          imInd: imInd ? false : true,
        },
        departmentId
      );
      setImStatus(imInd ? false : true);
    }
  }
  function handleImCancel() {
    if (imInd) {
      setImStatus(true);
    } else {
      setImStatus(false);
    }
  }


  console.log(accountInd);
  const [accountStatus, setAccountStatus] = useState(accountInd);
  function handleAccountClick(checked) {
    console.log(accountInd);
    if (accountInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"account",
        accountInd: accountInd ? false : true,
      },departmentId);
      setAccountStatus(accountInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"account",
          accountInd: accountInd ? false : true,
        },
        departmentId
      );
      setAccountStatus(accountInd ? false : true);
    }
  }
  function handleAccountCancel() {
    if (accountInd) {
      setAccountStatus(true);
    } else {
      setAccountStatus(false);
    }
  }

  const [recruitStatus, setRecruitStatus] = useState(recruitOppsInd);
  function handleRecruitClick(checked) {
    console.log(recruitOppsInd);
    if (recruitOppsInd) {
      //disable url
      props.addingModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"recruitopps",
        recruitOppsInd: recruitOppsInd ? false : true,
      },departmentId);
      setRecruitStatus(recruitOppsInd ? false : true);
    } else {
      props.addingModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"recruitopps",
          recruitOppsInd: recruitOppsInd ? false : true,
        },
        departmentId
      );
      setRecruitStatus(recruitOppsInd ? false : true);
    }
  }
  function handleRecruitCancel() {
    if (recruitOppsInd) {
      setRecruitStatus(true);
    } else {
      setRecruitStatus(false);
    }
  }
  const [hrStatus, setHrStatus] = useState(hrInd);
  function handleHrClick(checked) {
    console.log(hrInd);
    if (hrInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"hr",
        hrInd: hrInd ? false : true,
      },departmentId);
      setHrStatus(hrInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"hr",
          hrInd: hrInd ? false : true,
        },
        departmentId
      );
      setHrStatus(hrInd ? false : true);
    }
  }
  function handleHrCancel() {
    if (hrInd) {
      setHrStatus(true);
    } else {
      setHrStatus(false);
    }
  }

  const [productionStatus, setProductionStatus] = useState(productionInd);
  function handleProductionClick(checked) {
    console.log(productionInd);
    if (productionInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"production",
        productionInd: productionInd ? false : true,
      },departmentId);
      setProductionStatus(productionInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"production",
          productionInd: productionInd ? false : true,
        },
        departmentId
      );
      setProductionStatus(productionInd ? false : true);
    }
  }
  function handleProductionCancel() {
    if (productionInd) {
      setProductionStatus(true);
    } else {
      setProductionStatus(false);
    }
  }

  const [recruitProStatus, setRecruitProStatus] = useState(recruitProInd);
  function handleRecruitProClick(checked) {
    console.log(recruitProInd);
    if (recruitProInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"recruitPro",
        recruitProInd: recruitProInd ? false : true,
      },departmentId);
      setRecruitProStatus(recruitProInd ? false : true);
    } else {
      props.addingModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"recruitPro",
          recruitProInd: recruitProInd ? false : true,
        },
        departmentId
      );
      setRecruitProStatus(recruitProInd ? false : true);
    }
  }
  function handleRecruitProCancel() {
    if (recruitProInd) {
      setRecruitProStatus(true);
    } else {
      setRecruitProStatus(false);
    }
  }

  const [repairStatus, setRepairStatus] = useState(repairInd);
  function handleRepairClick(checked) {
    console.log(repairInd);
    if (repairInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"repair",
        repairInd: repairInd ? false : true,
      },departmentId);
      setRepairStatus(repairInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"repair",
          repairInd: repairInd ? false : true,
        },
        departmentId
      );
      setRepairStatus(repairInd ? false : true);
    }
  }
  function handleRepairCancel() {
    if (repairInd) {
      setRepairStatus(true);
    } else {
      setRepairStatus(false);
    }
  }
  const [inventoryStatus, setInventoryStatus] = useState(inventoryInd);
  function handleInventoryClick(checked) {
    console.log(inventoryInd);
    if (inventoryInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"inventory",
        inventoryInd: inventoryInd ? false : true,
      },departmentId);
      setInventoryStatus(inventoryInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"inventory",
          inventoryInd: inventoryInd ? false : true,
        },
        departmentId
      );
      setInventoryStatus(inventoryInd ? false : true);
    }
  }
  function handleInventoryCancel() {
    if (inventoryInd) {
      setInventoryStatus(true);
    } else {
      setInventoryStatus(false);
    }
  }
  const [orderManagStatus, setOrderManagStatus] = useState(orderManagementInd);
  function handleOrderManagementClick(checked) {
    console.log(orderManagementInd);
    if (orderManagementInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"orderManagement",
        orderManagementInd: orderManagementInd ? false : true,
      },departmentId);
      setOrderManagStatus(orderManagementInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"orderManagement",
          orderManagementInd: orderManagementInd ? false : true,
        },
        departmentId
      );
      setOrderManagStatus(orderManagementInd ? false : true);
    }
  }
  function handleOrderManagementCancel() {
    if (orderManagementInd) {
      setOrderManagStatus(true);
    } else {
      setOrderManagStatus(false);
    }
  }

  const [logisticsStatus, setLogisticsStatus] = useState(logisticsInd);
  function handleLogisticClick(checked) {
    console.log(logisticsInd);
    if (logisticsInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"logistics",
        logisticsInd: logisticsInd ? false : true,
      },departmentId);
      setLogisticsStatus(logisticsInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"logistics",
          logisticsInd: logisticsInd ? false : true,
        },
        departmentId
      );
      setLogisticsStatus(logisticsInd ? false : true);
    }
  }
  function handleLogisticCancel() {
    if (logisticsInd) {
      setLogisticsStatus(true);
    } else {
      setLogisticsStatus(false);
    }
  }

  const [procurmentStatus, setProcurmentStatus] = useState(procurementInd);
  function handleProcurmentClick(checked) {
    console.log(procurementInd);
    if (procurementInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"procurement",
        procurementInd: procurementInd ? false : true,
      },departmentId);
      setProcurmentStatus(procurementInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"procurement",
          procurementInd: procurementInd ? false : true,
        },
        departmentId
      );
      setProcurmentStatus(procurementInd ? false : true);
    }
  }
  function handleProcurmentCancel() {
    if (procurementInd) {
      setProcurmentStatus(true);
    } else {
      setProcurmentStatus(false);
    }
  }
  const [elearningStatus, setElearningStatus] = useState(eLearningInd);
  function handleElearningClick(checked) {
    console.log(eLearningInd);
    if (eLearningInd) {
      //disable url
      props.addingDeptModules({
        departmentId:departmentId,
        orgId: props.orgId,
        type:"elearning",
        eLearningInd: eLearningInd ? false : true,
      },departmentId);
      setElearningStatus(eLearningInd ? false : true);
    } else {
      props.addingDeptModules(
        {
          departmentId:departmentId,
          orgId: props.orgId,
          type:"elearning",
          eLearningInd: eLearningInd ? false : true,
        },
        departmentId
      );
      setElearningStatus(eLearningInd ? false : true);
    }
  }
  function handleElearningCancel() {
    if (eLearningInd) {
      setElearningStatus(true);
    } else {
      setElearningStatus(false);
    }
  }



  return (
    <DepartmentWrapper>
      <ViewEditCard>
        {({ viewType: cardViewType }, toggleCardViewType) =>
          cardViewType === "view" ? (
            <div className="flex">
              <div className="w-full flex-row">
                <div className="flex justify-between">
                  <div className="w-[9rem]">
                    <DepartmentName>{departmentName}</DepartmentName>
                  </div>

                  <h1>CRM</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleCrmClick}
                        onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Mandatory</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleMandatoryClick}
                        onCancel={handleMandatoryCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={mandatoryStatus || mandetoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>ERP</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleErpClick}
                        onCancel={handleErpCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={erpStatus || erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>IM</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleImClick}
                        onCancel={handleImCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={imStatus || imInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Account</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAccountClick}
                        onCancel={handleAccountCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>RecruitOpps</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitClick}
                        onCancel={handleRecruitCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>HR</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleHrClick}
                        onCancel={handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={hrStatus || hrInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>PRODUCTION</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleProductionClick}
                        onCancel={handleProductionCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={productionStatus || productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>Rcruitpro</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitProClick}
                        onCancel={handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={recruitProStatus || recruitProInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Repair</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRepairClick}
                        onCancel={handleRepairCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={repairStatus || repairInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>Inventory</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleInventoryClick}
                        onCancel={handleInventoryCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={inventoryStatus || inventoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>OrderManagement</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleOrderManagementClick}
                        onCancel={handleOrderManagementCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={orderManagStatus || orderManagementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>Logistics</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleLogisticClick}
                        onCancel={handleLogisticCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={logisticsStatus || logisticsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>Procurement</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleProcurmentClick}
                        onCancel={handleProcurmentCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={procurmentStatus || procurementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    <h1>Elearning</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleElearningClick}
                        onCancel={handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={elearningStatus || eLearningInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                  <div class="ml-2">
                    {mandetoryInd !== true && (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        style={{ fontSize: "1rem" }}
                      />
                    )}

                    {mandetoryInd !== true && (
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
              </div>
            </div>
          ) : (
            <FlexContainer>
              <TextInput
                name={props.name}
                defaultValue={departmentName}
                onChange={props.handleChange}
                style={{ width: "60%" }}
              />
            <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDepartments}
                    disabled={!value}
                    onClick={() => {
                      console.log(value); // Log the 'value' before calling handleUpdateSector
                      handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType());
                    }}
                  // onClick={() => handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType())}
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
};

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingDeptModules,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleDepartment);


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
