// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
// import { bindActionCreators } from "redux";
// import { Button, Input } from "antd";
// import { BundleLoader } from "../../../Components/Placeholder";
// import { MainWrapper } from "../../../Components/UI/Layout";
// import { TextInput } from "../../../Components/UI/Elements";
// import SingleDepartment from "./SingleDepartment";
// import {
//   getDepartments,
//   addingDeptModules,
//   addDepartments,
//   searchDepartmentName,
//   removeDepartments,
//   updateDepartments,
//   ClearReducerDataOfDepartment,
// } from "./DepartmentAction";
// import { getSectors } from "../Sectors/SectorsAction";
// import { Select } from "../../../Components/UI/Elements";
// import moment from "moment";

// const { Option } = Select;

// const Department = (props) => {
//   const [linkedDepartments, setLinkedDepartments] = useState([]);
//   const [isTextInputOpen, setIsTextInputOpen] = useState(false);
//   const [addingDepartment, setAddingDepartment] = useState(false);
//   const [departmentName, setDepartmentName] = useState("");
//   const [singleDepartment, setSingleDepartment] = useState("");
//   const [sectorId, setSectorId] = useState("");
//   const [editInd, setEditInd] = useState(true);
//   const [currentData, setCurrentData] = useState("");
//   const [rowdata, setrowData] = useState([]);

//   const handleRowData = (data) => {
//     setrowData(data);
//   };

//   useEffect(() => {
//     props.getDepartments();
//     props.getSectors();
//   }, []); // Empty dependency array to mimic componentDidMount


//   const { crmInd } = props.departments;
//   console.log(crmInd);
//   const [crmStatus, setCrmStatus] = useState(crmInd);
//   function handleCrmClick(checked) {
//     const { departments, addingDeptModules } = props;
//     // const departmentId = rowdata.departmentId;
//     console.log(crmInd);
//     if (crmInd) {
//       //disable url
//       addingDeptModules({
//         // ...props.departments,
//         orgId: props.orgId,
//         departmentId:props.departments.departmentId,
//         type:"crm",
//         crmInd: crmInd ? false : true,
//       },
//       // props.departments.departmentId
//       );
//       setCrmStatus(crmInd ? false : true);
//     } else {
//       addingDeptModules(
//         {
//           // ...props.departments,
//           orgId: props.orgId,
//           departmentId:props.departments.departmentId,
//           type:"crm",
//           crmInd: crmInd ? false : true,
//         },
//         // props.departments.departmentId
//       );
//       setCrmStatus(crmInd ? false : true);
//     }
//   }
//   function handleCrmCancel() {
//     if (crmInd) {
//       setCrmStatus(true);
//     } else {
//       setCrmStatus(false);
//     }
//   }

//    const { mandetoryInd } = props.departments;
//   console.log(mandetoryInd);
//   const [mandatoryStatus, setMandatoryStatus] = useState(mandetoryInd);
//   function handleMandatoryClick(checked) {
//     console.log(mandetoryInd);
//     if (mandetoryInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.departments,
//         orgId: props.orgId,
//         type:"mandatory",
//         mandetoryInd: mandetoryInd ? false : true,
//       });
//       setMandatoryStatus(mandetoryInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.departments,
//           orgId: props.orgId,
//           type:"mandatory",
//           mandetoryInd: mandetoryInd ? false : true,
//         },
//         props.orgId
//       );
//       setMandatoryStatus(mandetoryInd ? false : true);
//     }
//   }
//   function handleMandatoryCancel() {
//     if (mandetoryInd) {
//       setMandatoryStatus(true);
//     } else {
//       setMandatoryStatus(false);
//     }
//   }

//   const { erpInd } = props.departments;
//   console.log(erpInd);
//   const [erpStatus, setErpStatus] = useState(erpInd);
//   function handleErpClick(checked) {
//     console.log(erpInd);
//     if (erpInd) {
//       //disable url
//       props.addingDeptModules({
      
//         orgId: props.orgId,
//         type:"erp",
//         erpInd: erpInd ? false : true,
//       });
//       setErpStatus(erpInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
         
//           orgId: props.orgId,
//           type:"erp",
//           erpInd: erpInd ? false : true,
//         },
//         props.orgId
//       );
//       setErpStatus(erpInd ? false : true);
//     }
//   }
//   function handleErpCancel() {
//     if (erpInd) {
//       setErpStatus(true);
//     } else {
//       setErpStatus(false);
//     }
//   }

//   const { imInd } = props.departments;
//   console.log(imInd);
//   const [imStatus, setImStatus] = useState(imInd);
//   function handleImClick(checked) {
//     console.log(imInd);
//     if (imInd) {
//       //disable url
//       props.addingDeptModules({
     
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"im",
//         imInd: imInd ? false : true,
//       });
//       setImStatus(imInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"im",
//           imInd: imInd ? false : true,
//         },
//         props.orgId
//       );
//       setImStatus(imInd ? false : true);
//     }
//   }
//   function handleImCancel() {
//     if (imInd) {
//       setImStatus(true);
//     } else {
//       setImStatus(false);
//     }
//   }

//   const { accountInd } = props.departments;
//   console.log(accountInd);
//   const [accountStatus, setAccountStatus] = useState(accountInd);
//   function handleAccountClick(checked) {
//     console.log(accountInd);
//     if (accountInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"account",
//         accountInd: accountInd ? false : true,
//       });
//       setAccountStatus(accountInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"account",
//           accountInd: accountInd ? false : true,
//         },
//         props.orgId
//       );
//       setAccountStatus(accountInd ? false : true);
//     }
//   }
//   function handleAccountCancel() {
//     if (accountInd) {
//       setAccountStatus(true);
//     } else {
//       setAccountStatus(false);
//     }
//   }

//   const { recruitOppsInd } = props.departments;
//   console.log(recruitOppsInd);
//   const [recruitStatus, setRecruitStatus] = useState(recruitOppsInd);
//   function handleRecruitClick(checked) {
//     console.log(recruitOppsInd);
//     if (recruitOppsInd) {
//       //disable url
//       props.addingModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"recruitopps",
//         recruitOppsInd: recruitOppsInd ? false : true,
//       });
//       setRecruitStatus(recruitOppsInd ? false : true);
//     } else {
//       props.addingModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"recruitopps",
//           recruitOppsInd: recruitOppsInd ? false : true,
//         },
//         props.orgId
//       );
//       setRecruitStatus(recruitOppsInd ? false : true);
//     }
//   }
//   function handleRecruitCancel() {
//     if (recruitOppsInd) {
//       setRecruitStatus(true);
//     } else {
//       setRecruitStatus(false);
//     }
//   }

//   const { hrInd } = props.departments;
//   console.log(hrInd);
//   const [hrStatus, setHrStatus] = useState(hrInd);
//   function handleHrClick(checked) {
//     console.log(hrInd);
//     if (hrInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"hr",
//         hrInd: hrInd ? false : true,
//       });
//       setHrStatus(hrInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"hr",
//           hrInd: hrInd ? false : true,
//         },
//         props.orgId
//       );
//       setHrStatus(hrInd ? false : true);
//     }
//   }
//   function handleHrCancel() {
//     if (hrInd) {
//       setHrStatus(true);
//     } else {
//       setHrStatus(false);
//     }
//   }

//   const { productionInd } = props.departments;
//   console.log(productionInd);
//   const [productionStatus, setProductionStatus] = useState(productionInd);
//   function handleProductionClick(checked) {
//     console.log(productionInd);
//     if (productionInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"production",
//         productionInd: productionInd ? false : true,
//       });
//       setProductionStatus(productionInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"production",
//           productionInd: productionInd ? false : true,
//         },
//         props.orgId
//       );
//       setProductionStatus(productionInd ? false : true);
//     }
//   }
//   function handleProductionCancel() {
//     if (productionInd) {
//       setProductionStatus(true);
//     } else {
//       setProductionStatus(false);
//     }
//   }

//   const { recruitProInd } = props.departments;
//   console.log(recruitProInd);
//   const [recruitProStatus, setRecruitProStatus] = useState(recruitProInd);
//   function handleRecruitProClick(checked) {
//     console.log(recruitProInd);
//     if (recruitProInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"recruitPro",
//         recruitProInd: recruitProInd ? false : true,
//       });
//       setRecruitProStatus(recruitProInd ? false : true);
//     } else {
//       props.addingModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"recruitPro",
//           recruitProInd: recruitProInd ? false : true,
//         },
//         props.orgId
//       );
//       setRecruitProStatus(recruitProInd ? false : true);
//     }
//   }
//   function handleRecruitProCancel() {
//     if (recruitProInd) {
//       setRecruitProStatus(true);
//     } else {
//       setRecruitProStatus(false);
//     }
//   }

//   const { repairInd } = props.departments;
//   console.log(repairInd);
//   const [repairStatus, setRepairStatus] = useState(repairInd);
//   function handleRepairClick(checked) {
//     console.log(repairInd);
//     if (repairInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"repair",
//         repairInd: repairInd ? false : true,
//       });
//       setRepairStatus(repairInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"repair",
//           repairInd: repairInd ? false : true,
//         },
//         props.orgId
//       );
//       setRepairStatus(repairInd ? false : true);
//     }
//   }
//   function handleRepairCancel() {
//     if (repairInd) {
//       setRepairStatus(true);
//     } else {
//       setRepairStatus(false);
//     }
//   }

//   const { inventoryInd } = props.departments;
//   console.log(inventoryInd);
//   const [inventoryStatus, setInventoryStatus] = useState(inventoryInd);
//   function handleInventoryClick(checked) {
//     console.log(inventoryInd);
//     if (inventoryInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"inventory",
//         inventoryInd: inventoryInd ? false : true,
//       });
//       setInventoryStatus(inventoryInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"inventory",
//           inventoryInd: inventoryInd ? false : true,
//         },
//         props.orgId
//       );
//       setInventoryStatus(inventoryInd ? false : true);
//     }
//   }
//   function handleInventoryCancel() {
//     if (inventoryInd) {
//       setInventoryStatus(true);
//     } else {
//       setInventoryStatus(false);
//     }
//   }

//   const { orderManagementInd } = props.departments;
//   console.log(orderManagementInd);
//   const [orderManagStatus, setOrderManagStatus] = useState(orderManagementInd);
//   function handleOrderManagementClick(checked) {
//     console.log(orderManagementInd);
//     if (orderManagementInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"orderManagement",
//         orderManagementInd: orderManagementInd ? false : true,
//       });
//       setOrderManagStatus(orderManagementInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"orderManagement",
//           orderManagementInd: orderManagementInd ? false : true,
//         },
//         props.orgId
//       );
//       setOrderManagStatus(orderManagementInd ? false : true);
//     }
//   }
//   function handleOrderManagementCancel() {
//     if (orderManagementInd) {
//       setOrderManagStatus(true);
//     } else {
//       setOrderManagStatus(false);
//     }
//   }

//   const { logisticsInd } = props.departments;
//   console.log(logisticsInd);
//   const [logisticsStatus, setLogisticsStatus] = useState(logisticsInd);
//   function handleLogisticClick(checked) {
//     console.log(logisticsInd);
//     if (logisticsInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"logistics",
//         logisticsInd: logisticsInd ? false : true,
//       });
//       setLogisticsStatus(logisticsInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"logistics",
//           logisticsInd: logisticsInd ? false : true,
//         },
//         props.orgId
//       );
//       setLogisticsStatus(logisticsInd ? false : true);
//     }
//   }
//   function handleLogisticCancel() {
//     if (logisticsInd) {
//       setLogisticsStatus(true);
//     } else {
//       setLogisticsStatus(false);
//     }
//   }

//   const { procurementInd } = props.departments;
//   console.log(procurementInd);
//   const [procurmentStatus, setProcurmentStatus] = useState(procurementInd);
//   function handleProcurmentClick(checked) {
//     console.log(procurementInd);
//     if (procurementInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"procurement",
//         procurementInd: procurementInd ? false : true,
//       });
//       setProcurmentStatus(procurementInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"procurement",
//           procurementInd: procurementInd ? false : true,
//         },
//         props.orgId
//       );
//       setProcurmentStatus(procurementInd ? false : true);
//     }
//   }
//   function handleProcurmentCancel() {
//     if (procurementInd) {
//       setProcurmentStatus(true);
//     } else {
//       setProcurmentStatus(false);
//     }
//   }

//   const { eLearningInd } = props.departments;
//   console.log(eLearningInd);
//   const [elearningStatus, setElearningStatus] = useState(eLearningInd);
//   function handleElearningClick(checked) {
//     console.log(eLearningInd);
//     if (eLearningInd) {
//       //disable url
//       props.addingDeptModules({
//         // ...props.moduleList,
//         orgId: props.orgId,
//         type:"elearning",
//         eLearningInd: eLearningInd ? false : true,
//       });
//       setElearningStatus(eLearningInd ? false : true);
//     } else {
//       props.addingDeptModules(
//         {
//           // ...props.moduleList,
//           orgId: props.orgId,
//           type:"elearning",
//           eLearningInd: eLearningInd ? false : true,
//         },
//         props.orgId
//       );
//       setElearningStatus(eLearningInd ? false : true);
//     }
//   }
//   function handleElearningCancel() {
//     if (eLearningInd) {
//       setElearningStatus(true);
//     } else {
//       setElearningStatus(false);
//     }
//   }

//   const handleChangeDes = (e) => {
//     setCurrentData(e.target.value);

//     if (e.target.value.trim() === "") {
//       props.getDepartments();
//       props.ClearReducerDataOfDepartment();
//     }
//   };

//   const handleSearch = () => {
//     if (currentData.trim() !== "") {
//       props.searchDepartmentName(currentData);
//     } else {
//       console.error("Input is empty. Please provide a value.");
//     }
//   };

//   const handleClear = () => {
//     setCurrentData("");
//     props.getDepartments();
//   };

//   const handleSearchChange = (e) => {
//     setCurrentData(e.target.value);
//   };

//   const toggleInput = () => setIsTextInputOpen(!isTextInputOpen);

//   const handleChange = ({ target: { name, value } }) => {
//     switch (name) {
//       case "departmentName":
//         setDepartmentName(value);
//         break;
//       // Add cases for other state variables if needed
//       default:
//         break;
//     }
//   };

//   const handleSectorId = (value) => setSectorId(value);

//   const handleAddDepartment = () => {
//     const { addDepartments, departments } = props;
//     let department = { departmentName, sectorId, editInd };

//     let exist =
//       departments &&
//       departments.some(
//         (element) => element.departmentName === departmentName
//       );

//     addDepartments(department, () => console.log("add department callback"));

//     setDepartmentName("");
//     setSingleDepartment("");
//     setSectorId("");
//     setIsTextInputOpen(false);
//     setEditInd(true);
//   };

//   const handleDeleteDepartment = (departmentId) => {
//     props.removeDepartments(departmentId);
//     setDepartmentName("");
//     setSingleDepartment("");
//   };

//   const handleUpdateDepartment = (
//     departmentId,
//     departmentName,
//     sectorId,
//     sectorName,
//     editInd,
//     cb
//   ) => {
//     props.updateDepartments(
//       departmentId,
//       departmentName,
//       sectorId,
//       sectorName,
//       (editInd = true),
//       cb
//     );
//     setDepartmentName("");
//     setSingleDepartment("");
//     setSectorId("");
//     setEditInd(true);
//   };

//   const { fetchingDepartments, fetchingDepartmentsError, sectors } = props;

//   if (fetchingDepartments) return <BundleLoader />;
//   if (fetchingDepartmentsError) return <p>Error ...</p>;
//   console.log("rowdata",rowdata);
//   return (
   
//     <>
//       <div flexWrap="nowrap">
//         <MainWrapper
//           style={{
//             flexBasis: "100%",
//             overflow: "auto",
//             color: "#FFFAFA",
//           }}
//         >
//           <div className="flex w-[18vw]">
//             <Input
//               placeholder="Search by Name"
//               style={{ width: "100%", marginLeft: "0.5rem" }}
//               onPressEnter={handleSearch}
//               onChange={handleChangeDes}
//             />
//           </div>
//           <div className="flex flex-col">
//             <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
//               {props.departments.length ? (
//                 props.departments.map((department, i) => (
//                   <SingleDepartment
//                     key={i}
//                     value={singleDepartment}
//                     name="singleDepartment"
//                     handleProcurmentClick={handleProcurmentClick}
//                     handleProcurmentCancel={handleProcurmentCancel}
//                     procurmentStatus={procurmentStatus}
//                     handleElearningClick={handleElearningClick}
//                     handleElearningCancel={handleElearningCancel}
//                     elearningStatus={elearningStatus}

//                     handleLogisticClick={handleLogisticClick}
//                     handleLogisticCancel={handleLogisticCancel}
//                     logisticsStatus={logisticsStatus}
//                     handleOrderManagementClick={handleOrderManagementClick}
//                     handleOrderManagementCancel={handleOrderManagementCancel}
//                     orderManagStatus={orderManagStatus}
//                     handleInventoryClick={handleInventoryClick}
//                     handleInventoryCancel={handleInventoryCancel}
//                     inventoryStatus={inventoryStatus}
//                     handleRepairClick={handleRepairClick}
//                     handleRepairCancel={handleRepairCancel}
//                     repairStatus={repairStatus}
//                     handleProductionClick={handleProductionClick}
//                     handleProductionCancel={handleProductionCancel}
//                     productionStatus={productionStatus}
//                     handleHrClick={handleHrClick}
//                     handleHrCancel={handleHrCancel}
//                     hrStatus={hrStatus}
//                     handleAccountClick={handleAccountClick}
//                     handleAccountCancel={handleAccountCancel}
//                     accountStatus={accountStatus}
//                     handleRecruitClick={handleRecruitClick}
//                     handleRecruitCancel={handleRecruitCancel}
//                     recruitStatus={recruitStatus}
//                     handleRecruitProClick={handleRecruitProClick}
//                     handleRecruitProCancel={handleRecruitProCancel}
//                     recruitProStatus={recruitProStatus}
                  
//                     handleImClick={handleImClick}
//                     handleImCancel={handleImCancel}
//                     imStatus={imStatus}
//                     handleErpClick={handleErpClick}
//                     handleErpCancel={handleErpCancel}
//                     erpStatus={erpStatus}
//                     handleMandatoryClick={handleMandatoryClick}
//                     handleMandatoryCancel={handleMandatoryCancel}
//                     mandatoryStatus={mandatoryStatus}
//                     handleCrmClick={handleCrmClick}
//                     handleCrmCancel={handleCrmCancel}
//                     crmStatus={crmStatus}
//                     handleRowData={handleRowData}
//                     rowdata={rowdata}
//                     department={department}
//                     linkedDepartments={linkedDepartments}
//                     updatingDepartments={props.updatingDepartments}
//                     handleChange={handleChange}
//                     handleSectorId={handleSectorId}
//                     handleUpdateDepartment={handleUpdateDepartment}
//                     sectors={sectors}
//                     handleClear={handleClear}
//                     handleSearchChange={handleSearchChange}
//                     currentData={currentData}
//                     setCurrentData={setCurrentData}
//                     handleDeleteDepartment={handleDeleteDepartment}
//                   />
//                 ))
//               ) : (
//                 <p>No Data Available</p>
//               )}
//             </MainWrapper>
//           </div>
//           {isTextInputOpen ? (
//             <div className="flex items-center ml-[0.3125em] mt-[0.3125em]">
//               <TextInput
//                 placeholder="Add Department"
//                 name="departmentName"
//                 value={departmentName}
//                 onChange={handleChange}
//                 width={"45%"}
//                 style={{ marginRight: "0.125em" }}
//               />
//               {/* <Select
//                 style={{ width: "30%" }}
//                 placeholder="Select Sectors"
//                 onChange={handleSectorId}
//               >
//                 {sectors.map((item) => (
//                   <Option key={item.sectorId} value={item.sectorId}>
//                     {item.sectorName}
//                   </Option>
//                 ))}
//               </Select> */}
//               &nbsp;
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 disabled={!departmentName}
//                 loading={addingDepartment}
//                 onClick={handleAddDepartment}
//               >
//                 Save
//               </Button>
//               &nbsp;
//               <Button type="primary" ghost onClick={toggleInput}>
//                 Cancel
//               </Button>
//             </div>
//           ) : (
//             <>
//               <br />
//               <div className="flex justify-end">
//                 <Button
//                   type="primary"
//                   ghost
//                   htmlType="button"
//                   loading={addingDepartment}
//                   onClick={toggleInput}
//                 >
//                   Add More
//                 </Button>
//               </div>
//             </>
//           )}
//         </MainWrapper>
//       </div>
//       <h4>
//         Updated on{" "}
//         {moment(
//           props.departments &&
//             props.departments.length &&
//             props.departments[0].updationDate
//         ).format("ll")}{" "}
//         by{" "}
//         {props.departments &&
//           props.departments.length &&
//           props.departments[0].name}
//       </h4>
//     </>
//   );
// };

// const mapStateToProps = ({ departments, sector }) => ({
//   addingDepartments: departments.addingDepartments,
//   addingDepartmentsError: departments.addingDepartmentsError,
//   departments: departments.departments,

//   // removingDepartments: departments.removingDepartments,
//   // removingDepartmentsError: departments.removingDepartmentsError,
//   updatinDepartments: departments.updatingDepartments,
//   updatingDepartmentsError: departments.updatingDepartmentsError,
//   fetchingDepartments: departments.fetchingDepartments,
//   fetchingDepartmentsError: departments.fetchingDepartmentsError,
//   sectors: sector.sectors,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getDepartments,
//       addingDeptModules,
//       addDepartments,
//        removeDepartments,
//       updateDepartments,
//       getSectors,
//       ClearReducerDataOfDepartment,
//       searchDepartmentName
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Department);








import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput,  } from "../../../Components/UI/Elements";
import SingleDepartment from "./SingleDepartment";
import {
  getDepartments,
  addDepartments,
  searchDepartmentName,
  removeDepartments,
  updateDepartments,
  ClearReducerDataOfDepartment
} from "./DepartmentAction";
import {
  getSectors,
} from "../Sectors/SectorsAction";
import { Select } from "../../../Components/UI/Elements";
import moment from "moment";

const { Option } = Select;

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDepartments: [],
      isTextInputOpen: false,
      addingDepartment: false,
      departmentName: "",
      singleDepartment: "",
      sectorId: "",
      editInd: true,
      currentData: "",

    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getDepartments();
      this.props.ClearReducerDataOfDepartment();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchDepartmentName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getDepartments();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSectorId = (value) =>
    this.setState({ sectorId: value });

  handleAddDepartment = () => {
    const { addDepartments, departments } = this.props;
    const { departmentName, addingDepartments, isTextInputOpen, sectorId, editInd } = this.state;
    let department = { departmentName, sectorId, editInd };

    let exist =
      departments &&
      departments.some((element) => element.departmentName == departmentName);

    // if (exist) {
    //   message.error(
    //     "Can't create as another departmentName exists with same name!"
    //   );
    // } else {
      addDepartments(department, () => console.log("add department callback"));
    // }

    this.setState({
      departmentName: "",
      singleDepartment: "",
      sectorId: "",
      sectorName: "",
      isTextInputOpen: false,
      editInd: true,
    });
  };
  handleDeleteDepartment = (departmentId={departmentId}) => {
    this.props.removeDepartments(departmentId);
    this.setState({ departmentName: "", singleDepartment: "" });
  };
  handleUpdateDepartment = (departmentId, departmentName, sectorId, sectorName, editInd, cb) => {
    this.props.updateDepartments(departmentId, departmentName, sectorId, sectorName, editInd = true, cb);
    this.setState({ departmentName: "", singleDepartment: "", sectorId: "", sectorName: "", editInd: true });
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
    const { getDepartments, getSectors } = this.props;
    console.log();
    getDepartments(getDepartments);
    getSectors();
  }
  render() {
    const {
      fetchingDepartments,
      fetchingDepartmentsError,
      departments,
      addingDepartments,
      updatingDepartments,
      values,

    } = this.props;
    const {
      isTextInputOpen,
      departmentName,
      singleDepartment,
      linkedDepartments,
      sectorId
    } = this.state;
    if (fetchingDepartments) return <BundleLoader/>;
    if (fetchingDepartmentsError) return <p>Error ...</p>;

    return (
      <>
        <div flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
                       <div class=" flex w-[18vw]" >
                       <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
        </div>
            <div class=" flex flex-col" >
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {departments.length ? (
                  departments.map((department, i) => (
                    <SingleDepartment
                      key={i}
                      value={singleDepartment}
                      name="singleDepartment"
                      department={department}
                      linkedDepartments={linkedDepartments}
                      updatinDepartments={updatingDepartments}
                      handleChange={this.handleChange}
                      handleSectorId={this.handleSectorId}
                      handleUpdateDepartment={this.handleUpdateDepartment}
                      sectors={this.props.sectors}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                     handleDeleteDepartment={this.handleDeleteDepartment}
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
                    placeholder="Add Department"
                    name="departmentName"
                    value={departmentName}
                    onChange={this.handleChange}
                    width={"45%"}
                    style={{ marginRight: "0.125em" }}
                  />
            
                  {/* <Select
                    style={{ width: "30%" }}
                    placeholder="Select Sectors"
                    onChange={this.handleSectorId}
                  >
                    {this.props.sectors.map((item) => {
                      return <Option value={item.sectorId}>{item.sectorName} </Option>;
                    })}
                  </Select> */}
                  &nbsp;
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!departmentName}
                    Loading={addingDepartments}
                    onClick={this.handleAddDepartment}
                  // style={{ marginRight: "0.125em" }}
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
                    Loading={addingDepartments}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </div>
               
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
        </div>
        <h4>Updated on {moment(this.props.departments && this.props.departments.length && this.props.departments[0].updationDate).format("ll")} by {this.props.departments && this.props.departments.length && this.props.departments[0].name}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ departments, sector }) => ({
  addingDepartments: departments.addingDepartments,
  addingDepartmentsError: departments.addingDepartmentsError,
  departments: departments.departments,

  // removingDepartments: departments.removingDepartments,
  // removingDepartmentsError: departments.removingDepartmentsError,
  updatinDepartments: departments.updatingDepartments,
  updatingDepartmentsError: departments.updatingDepartmentsError,
  fetchingDepartments: departments.fetchingDepartments,
  fetchingDepartmentsError: departments.fetchingDepartmentsError,
  sectors: sector.sectors,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      addDepartments,
       removeDepartments,
      updateDepartments,
      getSectors,
      ClearReducerDataOfDepartment,
      searchDepartmentName
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Department);