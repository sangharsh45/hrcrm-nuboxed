import { Button, Checkbox, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { bindActionCreators } from 'redux';
import { Spacer } from '../../../../../Components/UI/Elements';
import { FlexContainer, TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentAccess, addDepartmentAccess } from "../../../SettingsAction"

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Access', 'Create', 'Update', 'Delete','Full List'];
 const defaultCheckedList=['Full List'];
 const dashboardCheckedList=['Access','Full List'];
 const settingsCheckedList=['Access'];
 const junkCheckedList=['Access',"Transfer"];
// const defaultCheckedList = ['Apple', 'Orange'];

const AccessForm = (props) => {

  useEffect(() => {
    console.log(props.roleTypeId)
    props.getDepartmentAccess(props.roleTypeId)
  }, [props.roleTypeId])
  useEffect(() => {
    setCheckedVendorList(props.departmentAcces.vendor)
    setCheckedCustomerList(props.departmentAcces.customer)
    setCheckedOpportunityList(props.departmentAcces.opportunity)
    setCheckedTalentList(props.departmentAcces.talent)
    setCheckedContactList(props.departmentAcces.contact)
    setCheckedRequirementList(props.departmentAcces.requirement)
    setCheckedPublishList(props.departmentAcces.publish)
    setCheckedPulseList(props.departmentAcces.pulse)
    setCheckedAccessmentList(props.departmentAcces.assessment)
    setCheckedLeadsList(props.departmentAcces.leads)
    // setCheckedTaskList(props.departmentAcces.task)
    setCheckedCustomerCommercialsList(props.departmentAcces.comercial)
    setCheckedProgramList(props.departmentAcces.program)
    setCheckedTestList(props.departmentAcces.test)
    setCheckedCourseList(props.departmentAcces.course)
    setCheckedTestList(props.departmentAcces.hours)
    setCheckedLocationList(props.departmentAcces.location)
    setCheckedMileageList(props.departmentAcces.mileage)
    setCheckedExpenseList(props.departmentAcces.expense)
    setCheckedLeavesList(props.departmentAcces.leave)
    setCheckedUserList(props.departmentAcces.user)
    setCheckedOrderList(props.departmentAcces.order)
    setCheckedMaterialsList(props.departmentAcces.material)
    setCheckedSupplierList(props.departmentAcces.supplier)
    setCheckedInventoryList(props.departmentAcces.inventory)
    setCheckedRefurbishList(props.departmentAcces.refurbish)
    setCheckedAccountList(props.departmentAcces.account)
    setCheckedDashboardList(props.departmentAcces.dashboard)
    setCheckedSettingsList(props.departmentAcces.settings)
    setCheckedTasksList(props.departmentAcces.task)
    setCheckedJunkList(props.departmentAcces.junk)
    setCheckedInvestorList(props.departmentAcces.investor)
    setCheckedInvestorContactList(props.departmentAcces.investorContact)
    
  }, [props.departmentAcces.vendor,
  props.departmentAcces.customer,
  props.departmentAcces.opportunity,
  props.departmentAcces.contact,
  props.departmentAcces.requirement,
  props.departmentAcces.publish,
  props.departmentAcces.pulse,
  props.departmentAcces.talent,
  props.departmentAcces.assessment,
  props.departmentAcces.leads,
  // props.departmentAcces.task,
  props.departmentAcces.comercial,
  props.departmentAcces.program,
  props.departmentAcces.test,
  props.departmentAcces.course,
  props.departmentAcces.hours,
  props.departmentAcces.location,
  props.departmentAcces.mileage,
  props.departmentAcces.expense,
  props.departmentAcces.leave,
  props.departmentAcces.user,
  props.departmentAcces.order,
  props.departmentAcces.material,
  props.departmentAcces.supplier,
  props.departmentAcces.inventory,
  props.departmentAcces.refurbish,
  props.departmentAcces.account,
  props.departmentAcces.dashboard,
  props.departmentAcces.settings,
  props.departmentAcces.task,
  props.departmentAcces.junk,
  props.departmentAcces.investor,
  props.departmentAcces.investorContact,
  
])
  //Vendor
  const [checkedVendorList, setCheckedVendorList] = useState(props.departmentAcces.vendor);
  const [indeterminateVendor, setIndeterminateVendor] = useState(true);
  const [checkAllVendor, setCheckAllVendor] = useState(false);

  const onVendorChange = (list) => {
    setCheckedVendorList(list);
    setIndeterminateVendor(!!list.length && list.length < plainOptions.length);
    setCheckAllVendor(list.length === plainOptions.length);
  };

  const onCheckAllVendorChange = (e) => {
    setCheckedVendorList(e.target.checked ? plainOptions : []);
    setIndeterminateVendor(false);
    setCheckAllVendor(e.target.checked);
  };

  //Customer
  const [checkedCustomerList, setCheckedCustomerList] = useState(props.departmentAcces.customer);
  const [indeterminateCustomer, setIndeterminateCustomer] = useState(true);
  const [checkAllCustomer, setCheckAllCustomer] = useState(false);

  const onCustomerChange = (list) => {
    setCheckedCustomerList(list);
    setIndeterminateCustomer(!!list.length && list.length < plainOptions.length);
    setCheckAllCustomer(list.length === plainOptions.length);
  };

  const onCheckAllCustomerChange = (e) => {
    setCheckedCustomerList(e.target.checked ? plainOptions : []);
    setIndeterminateCustomer(false);
    setCheckAllCustomer(e.target.checked);
  };

  //Opportunity
  const [checkedOpportunityList, setCheckedOpportunityList] = useState(props.departmentAcces.opportunity);
  const [indeterminateOpportunity, setIndeterminateOpportunity] = useState(true);
  const [checkAllOpportunity, setCheckAllOpportunity] = useState(false);

  const onOpportunityChange = (list) => {
    setCheckedOpportunityList(list);
    setIndeterminateOpportunity(!!list.length && list.length < plainOptions.length);
    setCheckAllOpportunity(list.length === plainOptions.length);
  };

  const onCheckAllOpportunityChange = (e) => {
    setCheckedOpportunityList(e.target.checked ? plainOptions : []);
    setIndeterminateOpportunity(false);
    setCheckAllOpportunity(e.target.checked);
  };

  //Talent
  const [checkedTalentList, setCheckedTalentList] = useState(props.departmentAcces.talent);
  const [indeterminateTalent, setIndeterminateTalent] = useState(true);
  const [checkAllTalent, setCheckAllTalent] = useState(false);

  const onTalentChange = (list) => {
    setCheckedTalentList(list);
    setIndeterminateTalent(!!list.length && list.length < plainOptions.length);
    setCheckAllTalent(list.length === plainOptions.length);
  };

  const onCheckAllTalentChange = (e) => {
    setCheckedTalentList(e.target.checked ? plainOptions : []);
    setIndeterminateTalent(false);
    setCheckAllTalent(e.target.checked);
  };

  // Contact

  const [checkedContactList, setCheckedContactList] = useState(props.departmentAcces.contact);
  const [indeterminateContact, setIndeterminateContact] = useState(true);
  const [checkAllContact, setCheckAllContact] = useState(false);

  const onContactChange = (list) => {
    setCheckedContactList(list);
    setIndeterminateContact(!!list.length && list.length < plainOptions.length);
    setCheckAllContact(list.length === plainOptions.length);
  };

  const onCheckAllContactChange = (e) => {
    setCheckedContactList(e.target.checked ? plainOptions : []);
    setIndeterminateContact(false);
    setCheckAllContact(e.target.checked);
  };

  // Requirement

  const [checkedRequirementList, setCheckedRequirementList] = useState(props.departmentAcces.requirement);
  const [indeterminateRequirement, setIndeterminateRequirement] = useState(true);
  const [checkAllRequirement, setCheckAllRequirement] = useState(false);

  const onRequirementChange = (list) => {
    setCheckedRequirementList(list);
    setIndeterminateRequirement(!!list.length && list.length < plainOptions.length);
    setCheckAllRequirement(list.length === plainOptions.length);
  };

  const onCheckAllRequirementChange = (e) => {
    setCheckedRequirementList(e.target.checked ? plainOptions : []);
    setIndeterminateRequirement(false);
    setCheckAllRequirement(e.target.checked);
  };

  // Publish

  const [checkedPublishList, setCheckedPublishList] = useState(props.departmentAcces.publish);
  const [indeterminatePublish, setIndeterminatePublish] = useState(true);
  const [checkAllPublish, setCheckAllPublish] = useState(false);

  const onPublishChange = (list) => {
    setCheckedPublishList(list);
    setIndeterminatePublish(!!list.length && list.length < plainOptions.length);
    setCheckAllPublish(list.length === plainOptions.length);
  };

  const onCheckAllPublishChange = (e) => {
    setCheckedPublishList(e.target.checked ? plainOptions : []);
    setIndeterminatePublish(false);
    setCheckAllPublish(e.target.checked);
  };

  // Pulse

  const [checkedPulseList, setCheckedPulseList] = useState(props.departmentAcces.pulse);
  const [indeterminatePulse, setIndeterminatePulse] = useState(true);
  const [checkAllPulse, setCheckAllPulse] = useState(false);

  const onPulseChange = (list) => {
    setCheckedPulseList(list);
    setIndeterminatePulse(!!list.length && list.length < plainOptions.length);
    setCheckAllPulse(list.length === plainOptions.length);
  };

  const onCheckAllPulseChange = (e) => {
    setCheckedPulseList(e.target.checked ? plainOptions : []);
    setIndeterminatePulse(false);
    setCheckAllPulse(e.target.checked);
  };


   // Accessment

   const [checkedAccessmentList, setCheckedAccessmentList] = useState(props.departmentAcces.assessment);
   const [indeterminateAccessment, setIndeterminateAccessment] = useState(true);
   const [checkAllAccessment, setCheckAllAccessment] = useState(false);
 
   const onAccessmentChange = (list) => {
     setCheckedAccessmentList(list);
     setIndeterminateAccessment(!!list.length && list.length < plainOptions.length);
     setCheckAllAccessment(list.length === plainOptions.length);
   };
 
   const onCheckAllAccessmentChange = (e) => {
     setCheckedAccessmentList(e.target.checked ? plainOptions : []);
     setIndeterminateAccessment(false);
     setCheckAllAccessment(e.target.checked);
   };

//Leads
   const [checkedLeadsList, setCheckedLeadsList] = useState(props.departmentAcces.leads);
   const [indeterminateLeads, setIndeterminateLeads] = useState(true);
   const [checkAllLeads, setCheckAllLeads] = useState(false);
 
   const onLeadsChange = (list) => {
     setCheckedLeadsList(list);
     setIndeterminateLeads(!!list.length && list.length < plainOptions.length);
     setCheckAllLeads(list.length === plainOptions.length);
   };
 
   const onCheckAllLeadsChange = (e) => {
     setCheckedLeadsList(e.target.checked ? plainOptions : []);
     setIndeterminateLeads(false);
     setCheckAllLeads(e.target.checked);
   };


   


     // Customer Commercials

     const [checkedCustomerCommercialsList, setCheckedCustomerCommercialsList] = useState(props.departmentAcces.comercial);
     const [indeterminateCustomerCommercials, setIndeterminateCustomerCommercials] = useState(true);
     const [checkAllCustomerCommercials, setCheckAllCustomerCommercials] = useState(false);
   
     const onCustomerCommercialsChange = (list) => {
       setCheckedCustomerCommercialsList(list);
       setIndeterminateCustomerCommercials(!!list.length && list.length < plainOptions.length);
       setCheckAllCustomerCommercials(list.length === plainOptions.length);
     };
   
     const onCheckAllCustomerCommercialsChange = (e) => {
       setCheckedCustomerCommercialsList(e.target.checked ? plainOptions : []);
       setIndeterminateCustomerCommercials(false);
       setCheckAllCustomerCommercials(e.target.checked);
     };


        // Program

        const [checkedProgramList, setCheckedProgramList] = useState(props.departmentAcces.program);
        const [indeterminateProgram, setIndeterminateProgram] = useState(true);
        const [checkAllProgram, setCheckAllProgram] = useState(false);
      
        const onProgramChange = (list) => {
          setCheckedProgramList(list);
          setIndeterminateProgram(!!list.length && list.length < plainOptions.length);
          setCheckAllProgram(list.length === plainOptions.length);
        };
      
        const onCheckAllProgramChange = (e) => {
          setCheckedProgramList(e.target.checked ? plainOptions : []);
          setIndeterminateProgram(false);
          setCheckAllProgram(e.target.checked);
        };



         // Test

         const [checkedTestList, setCheckedTestList] = useState(props.departmentAcces.test);
         const [indeterminateTest, setIndeterminateTest] = useState(true);
         const [checkAllTest, setCheckAllTest] = useState(false);
       
         const onTestChange = (list) => {
           setCheckedTestList(list);
           setIndeterminateTest(!!list.length && list.length < plainOptions.length);
           setCheckAllTest(list.length === plainOptions.length);
         };
       
         const onCheckAllTestChange = (e) => {
           setCheckedTestList(e.target.checked ? plainOptions : []);
           setIndeterminateTest(false);
           setCheckAllTest(e.target.checked);
         };



            // Course

            const [checkedCourseList, setCheckedCourseList] = useState(props.departmentAcces.course              );
            const [indeterminateCourse, setIndeterminateCourse] = useState(true);
            const [checkAllCourse, setCheckAllCourse] = useState(false);
          
            const onCourseChange = (list) => {
              setCheckedCourseList(list);
              setIndeterminateCourse(!!list.length && list.length < plainOptions.length);
              setCheckAllCourse(list.length === plainOptions.length);
            };
          
            const onCheckAllCourseChange = (e) => {
              setCheckedCourseList(e.target.checked ? plainOptions : []);
              setIndeterminateCourse(false);
              setCheckAllCourse(e.target.checked);
            };



            
            // Hours

            const [checkedHoursList, setCheckedHoursList] = useState(props.departmentAcces.hours              );
            const [indeterminateHours, setIndeterminateHours] = useState(true);
            const [checkAllHours, setCheckAllHours] = useState(false);
          
            const onHoursChange = (list) => {
              setCheckedHoursList(list);
              setIndeterminateHours(!!list.length && list.length < plainOptions.length);
              setCheckAllHours(list.length === plainOptions.length);
            };
          
            const onCheckAllHoursChange = (e) => {
              setCheckedHoursList(e.target.checked ? plainOptions : []);
              setIndeterminateHours(false);
              setCheckAllHours(e.target.checked);
            };


                  // Location

                  const [checkedLocationList, setCheckedLocationList] = useState(props.departmentAcces.location              );
                  const [indeterminateLocation, setIndeterminateLocation] = useState(true);
                  const [checkAllLocation, setCheckAllLocation] = useState(false);
                
                  const onLocationChange = (list) => {
                    setCheckedLocationList(list);
                    setIndeterminateLocation(!!list.length && list.length < plainOptions.length);
                    setCheckAllLocation(list.length === plainOptions.length);
                  };
                
                  const onCheckAllLocationChange = (e) => {
                    setCheckedLocationList(e.target.checked ? plainOptions : []);
                    setIndeterminateLocation(false);
                    setCheckAllLocation(e.target.checked);
                  };

                       // Mileage

                       const [checkedMileageList, setCheckedMileageList] = useState(props.departmentAcces.mileage              );
                       const [indeterminateMileage, setIndeterminateMileage] = useState(true);
                       const [checkAllMileage, setCheckAllMileage] = useState(false);
                     
                       const onMileageChange = (list) => {
                         setCheckedMileageList(list);
                         setIndeterminateMileage(!!list.length && list.length < defaultCheckedList.length);
                         setCheckAllMileage(list.length === defaultCheckedList.length);
                       };
                     
                       const onCheckAllMileageChange = (e) => {
                         setCheckedMileageList(e.target.checked ? defaultCheckedList : []);
                         setIndeterminateMileage(false);
                         setCheckAllMileage(e.target.checked);
                       };

                           // Expense

                           const [checkedExpenseList, setCheckedExpenseList] = useState(props.departmentAcces.expense              );
                           const [indeterminateExpense, setIndeterminateExpense] = useState(true);
                           const [checkAllExpense, setCheckAllExpense] = useState(false);
                         
                           const onExpenseChange = (list) => {
                             setCheckedExpenseList(list);
                             setIndeterminateExpense(!!list.length && list.length < defaultCheckedList.length);
                             setCheckAllExpense(list.length === defaultCheckedList.length);
                           };
                         
                           const onCheckAllExpenseChange = (e) => {
                             setCheckedExpenseList(e.target.checked ? defaultCheckedList : []);
                             setIndeterminateExpense(false);
                             setCheckAllExpense(e.target.checked);
                           };

                                // Leaves

                                const [checkedLeavesList, setCheckedLeavesList] = useState(props.departmentAcces.leave              );
                                const [indeterminateLeaves, setIndeterminateLeaves] = useState(true);
                                const [checkAllLeaves, setCheckAllLeaves] = useState(false);
                              
                                const onLeavesChange = (list) => {
                                  setCheckedLeavesList(list);
                                  setIndeterminateLeaves(!!list.length && list.length < defaultCheckedList.length);
                                  setCheckAllLeaves(list.length === defaultCheckedList.length);
                                };
                              
                                const onCheckAllLeavesChange = (e) => {
                                  setCheckedLeavesList(e.target.checked ? defaultCheckedList : []);
                                  setIndeterminateLeaves(false);
                                  setCheckAllLeaves(e.target.checked);
                                };


                                    // User

                                    const [checkedUserList, setCheckedUserList] = useState(props.departmentAcces.user              );
                                    const [indeterminateUser, setIndeterminateUser] = useState(true);
                                    const [checkAllUser, setCheckAllUser] = useState(false);
                                  
                                    const onUserChange = (list) => {
                                      setCheckedUserList(list);
                                      setIndeterminateUser(!!list.length && list.length < plainOptions.length);
                                      setCheckAllUser(list.length === plainOptions.length);
                                    };
                                  
                                    const onCheckAllUserChange = (e) => {
                                      setCheckedUserList(e.target.checked ? plainOptions : []);
                                      setIndeterminateUser(false);
                                      setCheckAllUser(e.target.checked);
                                    };

                                           // Order

                                           const [checkedOrderList, setCheckedOrderList] = useState(props.departmentAcces.order              );
                                           const [indeterminateOrder, setIndeterminateOrder] = useState(true);
                                           const [checkAllOrder, setCheckAllOrder] = useState(false);
                                         
                                           const onOrderChange = (list) => {
                                             setCheckedOrderList(list);
                                             setIndeterminateOrder(!!list.length && list.length < plainOptions.length);
                                             setCheckAllOrder(list.length === plainOptions.length);
                                           };
                                         
                                           const onCheckAllOrderChange = (e) => {
                                             setCheckedOrderList(e.target.checked ? plainOptions : []);
                                             setIndeterminateOrder(false);
                                             setCheckAllOrder(e.target.checked);
                                           };

                                               // Materials

                                               const [checkedMaterialsList, setCheckedMaterialsList] = useState(props.departmentAcces.material              );
                                               const [indeterminateMaterials, setIndeterminateMaterials] = useState(true);
                                               const [checkAllMaterials, setCheckAllMaterials] = useState(false);
                                             
                                               const onMaterialsChange = (list) => {
                                                 setCheckedMaterialsList(list);
                                                 setIndeterminateMaterials(!!list.length && list.length < plainOptions.length);
                                                 setCheckAllMaterials(list.length === plainOptions.length);
                                               };
                                             
                                               const onCheckAllMaterialsChange = (e) => {
                                                 setCheckedMaterialsList(e.target.checked ? plainOptions : []);
                                                 setIndeterminateMaterials(false);
                                                 setCheckAllMaterials(e.target.checked);
                                               };


                                                         // Supplier

                                                         const [checkedSupplierList, setCheckedSupplierList] = useState(props.departmentAcces.supplier              );
                                                         const [indeterminateSupplier, setIndeterminateSupplier] = useState(true);
                                                         const [checkAllSupplier, setCheckAllSupplier] = useState(false);
                                                       
                                                         const onSupplierChange = (list) => {
                                                           setCheckedSupplierList(list);
                                                           setIndeterminateSupplier(!!list.length && list.length < plainOptions.length);
                                                           setCheckAllSupplier(list.length === plainOptions.length);
                                                         };
                                                       
                                                         const onCheckAllSupplierChange = (e) => {
                                                           setCheckedSupplierList(e.target.checked ? plainOptions : []);
                                                           setIndeterminateSupplier(false);
                                                           setCheckAllSupplier(e.target.checked);
                                                         };

                                                               // Inventory

                                                               const [checkedInventoryList, setCheckedInventoryList] = useState(props.departmentAcces.inventory              );
                                                               const [indeterminateInventory, setIndeterminateInventory] = useState(true);
                                                               const [checkAllInventory, setCheckAllInventory] = useState(false);
                                                             
                                                               const onInventoryChange = (list) => {
                                                                 setCheckedInventoryList(list);
                                                                 setIndeterminateInventory(!!list.length && list.length < plainOptions.length);
                                                                 setCheckAllInventory(list.length === plainOptions.length);
                                                               };
                                                             
                                                               const onCheckAllInventoryChange = (e) => {
                                                                 setCheckedInventoryList(e.target.checked ? plainOptions : []);
                                                                 setIndeterminateInventory(false);
                                                                 setCheckAllInventory(e.target.checked);
                                                               };

         // Refurbish

         const [checkedRefurbishList, setCheckedRefurbishList] = useState(props.departmentAcces.refurbish              );
         const [indeterminateRefurbish, setIndeterminateRefurbish] = useState(true);
         const [checkAllRefurbish, setCheckAllRefurbish] = useState(false);
       
         const onRefurbishChange = (list) => {
           setCheckedRefurbishList(list);
           setIndeterminateRefurbish(!!list.length && list.length < plainOptions.length);
           setCheckAllRefurbish(list.length === plainOptions.length);
         };
       
         const onCheckAllRefurbishChange = (e) => {
           setCheckedRefurbishList(e.target.checked ? plainOptions : []);
           setIndeterminateRefurbish(false);
           setCheckAllRefurbish(e.target.checked);
         };


            // Account

            const [checkedAccountList, setCheckedAccountList] = useState(props.departmentAcces.account              );
            const [indeterminateAccount, setIndeterminateAccount] = useState(true);
            const [checkAllAccount, setCheckAllAccount] = useState(false);
          
            const onAccountChange = (list) => {
              setCheckedAccountList(list);
              setIndeterminateAccount(!!list.length && list.length < plainOptions.length);
              setCheckAllAccount(list.length === plainOptions.length);
            };
          
            const onCheckAllAccountChange = (e) => {
              setCheckedAccountList(e.target.checked ? plainOptions : []);
              setIndeterminateAccount(false);
              setCheckAllAccount(e.target.checked);
            };


                  // Dashboard

                  const [checkedDashboardList, setCheckedDashboardList] = useState(props.departmentAcces.dashboard              );
                  const [indeterminateDashboard, setIndeterminateDashboard] = useState(true);
                  const [checkAllDashboard, setCheckAllDashboard] = useState(false);
                
                  const onDashboardChange = (list) => {
                    setCheckedDashboardList(list);
                    setIndeterminateDashboard(!!list.length && list.length < dashboardCheckedList.length);
                    setCheckAllDashboard(list.length === dashboardCheckedList.length);
                  };
                
                  const onCheckAllDashboardChange = (e) => {
                    setCheckedDashboardList(e.target.checked ? dashboardCheckedList : []);
                    setIndeterminateDashboard(false);
                    setCheckAllDashboard(e.target.checked);
                  };

                         // Settings

                         const [checkedSettingsList, setCheckedSettingsList] = useState(props.departmentAcces.settings              );
                         const [indeterminateSettings, setIndeterminateSettings] = useState(true);
                         const [checkAllSettings, setCheckAllSettings] = useState(false);
                       
                         const onSettingsChange = (list) => {
                           setCheckedSettingsList(list);
                           setIndeterminateSettings(!!list.length && list.length < settingsCheckedList.length);
                           setCheckAllSettings(list.length === settingsCheckedList.length);
                         };
                       
                         const onCheckAllSettingsChange = (e) => {
                           setCheckedSettingsList(e.target.checked ? settingsCheckedList : []);
                           setIndeterminateSettings(false);
                           setCheckAllSettings(e.target.checked);
                         };

                                // Tasks

                                const [checkedTasksList, setCheckedTasksList] = useState(props.departmentAcces.task);
                                const [indeterminateTasks, setIndeterminateTasks] = useState(true);
                                const [checkAllTasks, setCheckAllTasks] = useState(false);
                              
                                const onTasksChange = (list) => {
                                  setCheckedTasksList(list);
                                  setIndeterminateTasks(!!list.length && list.length < defaultCheckedList.length);
                                  setCheckAllTasks(list.length === defaultCheckedList.length);
                                };
                              
                                const onCheckAllTasksChange = (e) => {
                                  setCheckedTasksList(e.target.checked ? defaultCheckedList : []);
                                  setIndeterminateTasks(false);
                                  setCheckAllTasks(e.target.checked);
                                };


                                     // Junk

                                     const [checkedJunkList, setCheckedJunkList] = useState(props.departmentAcces.junk);
                                     const [indeterminateJunk, setIndeterminateJunk] = useState(true);
                                     const [checkAllJunk, setCheckAllJunk] = useState(false);
                                   
                                     const onJunkChange = (list) => {
                                       setCheckedJunkList(list);
                                       setIndeterminateJunk(!!list.length && list.length < junkCheckedList.length);
                                       setCheckAllJunk(list.length === junkCheckedList.length);
                                     };
                                   
                                     const onCheckAllJunkChange = (e) => {
                                       setCheckedJunkList(e.target.checked ? junkCheckedList : []);
                                       setIndeterminateJunk(false);
                                       setCheckAllJunk(e.target.checked);
                                     };

                                            // Investor
                                            const [checkedInvestorList, setCheckedInvestorList] = useState(props.departmentAcces.investor);
                                            const [indeterminateInvestor, setIndeterminateInvestor] = useState(true);
                                            const [checkAllInvestor, setCheckAllInvestor] = useState(false);
                                          
                                            const onInvestorChange = (list) => {
                                              setCheckedInvestorList(list);
                                              setIndeterminateInvestor(!!list.length && list.length < plainOptions.length);
                                              setCheckAllInvestor(list.length === plainOptions.length);
                                            };
                                          
                                            const onCheckAllInvestorChange = (e) => {
                                              setCheckedInvestorList(e.target.checked ? plainOptions : []);
                                              setIndeterminateInvestor(false);
                                              setCheckAllInvestor(e.target.checked);
                                            };


                                              //Investor Contact

  const [checkedInvestorContactList, setCheckedInvestorContactList] = useState(props.departmentAcces.investorContact);
  const [indeterminateInvestorContact, setIndeterminateInvestorContact] = useState(true);
  const [checkAllInvestorContact, setCheckAllInvestorContact] = useState(false);

  const onInvestorContactChange = (list) => {
    setCheckedInvestorContactList(list);
    setIndeterminateInvestorContact(!!list.length && list.length < plainOptions.length);
    setCheckAllInvestorContact(list.length === plainOptions.length);
  };

  const onCheckAllInvestorContactChange = (e) => {
    setCheckedInvestorContactList(e.target.checked ? plainOptions : []);
    setIndeterminateInvestorContact(false);
    setCheckAllInvestorContact(e.target.checked);
  };



  function handleUpdateAccess() {
    let data = {
      vendor: checkedVendorList || [],
      customer: checkedCustomerList || [],
      opportunity: checkedOpportunityList || [],
      talent: checkedTalentList || [],
      contact: checkedContactList || [],
      requirement: checkedRequirementList || [],
      publish: checkedPublishList || [],
      pulse: checkedPulseList || [],
      assessment:checkedAccessmentList || [],
      leads:checkedLeadsList || [],
      comercial:checkedCustomerCommercialsList || [],
      // task:checkedTaskList || [],
      program:checkedProgramList || [],
      test:checkedTestList || [],
      course:checkedCourseList || [],
      hours:checkedHoursList || [],
      location:checkedLocationList || [],
      mileage:checkedMileageList || [],
      expense:checkedExpenseList || [],
      leave:checkedLeavesList || [],
      user:checkedUserList || [],
      order:checkedOrderList || [],
      material:checkedMaterialsList || [],
      supplier:checkedSupplierList || [],
      inventory:checkedInventoryList || [],
      refurbish:checkedRefurbishList || [],
      account:checkedAccountList || [],
      dashboard:checkedDashboardList || [],
      settings:checkedSettingsList || [],
      task:checkedTasksList || [],
      junk:checkedJunkList || [],
      investor:checkedInvestorList || [],
      investorContact:checkedInvestorContactList || [],
      
      departmentId: props.departmentId,
      roleTypeId:props.roleTypeId,

    }
    props.addDepartmentAccess(data, props.roleTypeId)
  }
  console.log("departmentData",props.departmentData)
  console.log(props.departmentAcces.vendor)
  return (

    <>

      {/* <Form className="form-background"> */}
      <div style={{ display: "flex", justifyContent: "space-between", height: "80vh", overflowY: "scroll", paddingRight: "0.6em" }}>
          {props.fetchingDepartmentAccess ? (
            <BundleLoader />
          ) : (
            <TabsWrapper style={{height:"42rem"}}>
 

<h1 class=" text-clr font-bold">HR</h1>
<Spacer />
              <FlexContainer justifyContent="space-around">
            
              <div >
                <h1 class="text-sm">Users</h1>
                <Checkbox indeterminate={indeterminateUser} onChange={onCheckAllUserChange} checked={checkAllUser}>
                 <label class="text-xs"> Check all</label>
                </Checkbox>
                <Divider />
                <CheckboxGroup options={plainOptions} value={checkedUserList} onChange={onUserChange} />

              </div>
                {/* <Spacer />
                <div >
                  <h1>Leads</h1>
                  <Checkbox indeterminate={indeterminateLeads} onChange={onCheckAllLeadsChange} checked={checkAllLeads}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedLeadsList} onChange={onLeadsChange} />

                </div> */}
                  <Spacer />
                <div >
                  <h1 class="text-sm">Locations</h1>
                  <Checkbox indeterminate={indeterminateLocation} onChange={onCheckAllLocationChange} checked={checkAllLocation}>
                  <label class="text-xs"> Check all</label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedLocationList} onChange={onLocationChange} />

                </div>
                </FlexContainer>
              {/* Vendor */}
              <Spacer />
              <FlexContainer justifyContent="space-around">
            
         
              </FlexContainer>
            {/* Vendor */}
            <Spacer />
              <FlexContainer justifyContent="space-around">
              
              {/* Contact */}
              <div >
              <h1 class="text-sm">Dashboard</h1>
              <Checkbox indeterminate={indeterminateDashboard} onChange={onCheckAllDashboardChange} checked={checkAllDashboard}>
              <label class="text-xs"> Check all</label>
              </Checkbox>
              <Divider />
              <CheckboxGroup options={dashboardCheckedList} value={checkedDashboardList} onChange={onDashboardChange} />

            </div>

            <div >
              <h1 class="text-sm">Junk</h1>
              <Checkbox indeterminate={indeterminateJunk} onChange={onCheckAllJunkChange} checked={checkAllJunk}>
              <label class="text-xs"> Check all</label>
              </Checkbox>
              <Divider />
              <CheckboxGroup options={junkCheckedList} value={checkedJunkList} onChange={onJunkChange} />

            </div>
            
               
              <div >
                <h1 class="text-sm">Settings</h1>
                <Checkbox indeterminate={indeterminateSettings} onChange={onCheckAllSettingsChange} checked={checkAllSettings}>
                <label class="text-xs">  Check all</label>
                </Checkbox>
                <Divider />
                <CheckboxGroup options={settingsCheckedList} value={checkedSettingsList} onChange={onSettingsChange} />

              </div>
              <div >
                <h1 class="text-sm">Mileage</h1>
                <Checkbox indeterminate={indeterminateMileage} onChange={onCheckAllMileageChange} checked={checkAllMileage}>
                <label class="text-xs">  Check all</label>
                </Checkbox>
                <Divider />
                <CheckboxGroup options={defaultCheckedList} value={checkedMileageList} onChange={onMileageChange} />

              </div>
              <Spacer />
              <div >
                <h1 class="text-sm">Expense</h1>
                <Checkbox indeterminate={indeterminateExpense} onChange={onCheckAllExpenseChange} checked={checkAllExpense}>
                <label class="text-xs">  Check all</label>
                </Checkbox>
                <Divider />
                <CheckboxGroup options={defaultCheckedList} value={checkedExpenseList} onChange={onExpenseChange} />

              </div>
              <Spacer />
              <div >
                <h1 class="text-sm">Leaves</h1>
                <Checkbox indeterminate={indeterminateLeaves} onChange={onCheckAllLeavesChange} checked={checkAllLeaves}>
                <label class="text-xs">Check all</label>
                </Checkbox>
                <Divider />
                <CheckboxGroup options={defaultCheckedList} value={checkedLeavesList} onChange={onLeavesChange} />

              </div>
              <Spacer />
              <div >
                <h1 class="text-sm">Tasks</h1>
                <Checkbox indeterminate={indeterminateTasks} onChange={onCheckAllTasksChange} checked={checkAllTasks}>
                <label class="text-xs">Check all</label>
                </Checkbox>
                <Divider />
                <CheckboxGroup options={defaultCheckedList} value={checkedTasksList} onChange={onTasksChange} />

              </div>
              <Spacer />
            </FlexContainer>
            <Spacer />
              
     
    {props.departmentData.crmInd === true ? 
    <div>     
            <h1 class=" text-clr font-bold">CRM</h1>
            <Spacer />
              <FlexContainer justifyContent="space-around">
                {/* <div >
                  <h1>Vendor</h1>
                  <Checkbox indeterminate={indeterminateVendor} onChange={onCheckAllVendorChange} checked={checkAllVendor}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedVendorList} onChange={onVendorChange} />
                </div>
                <Spacer 
               
                /> */}
             

              
                <div >
                  <h1 class="text-sm">Customer</h1>
                  <Checkbox indeterminate={indeterminateCustomer} onChange={onCheckAllCustomerChange} checked={checkAllCustomer}>
                  <label class="text-xs">  Check all  </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedCustomerList} onChange={onCustomerChange} />
                </div>
                    {/* Contact */}
                    <div >
                  <h1 class="text-sm">Contact</h1>
                  <Checkbox indeterminate={indeterminateContact} onChange={onCheckAllContactChange} checked={checkAllContact}>
                  <label class="text-xs"> Check all</label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedContactList} onChange={onContactChange} />

                </div>
                <Spacer />
              </FlexContainer>
              <Spacer />

            
              <FlexContainer justifyContent="space-around">
              <div >
                  <h1 class="text-sm">Opportunity</h1>
                  <Checkbox indeterminate={indeterminateOpportunity} onChange={onCheckAllOpportunityChange} checked={checkAllOpportunity}>
                  <label class="text-xs">  Check all </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedOpportunityList} onChange={onOpportunityChange} />

                </div>
                <Spacer />
                <div >
                  <h1 class="text-sm">Leads</h1>
                  <Checkbox indeterminate={indeterminateLeads} onChange={onCheckAllLeadsChange} checked={checkAllLeads}>
                  <label class="text-xs">  Check all </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedLeadsList} onChange={onLeadsChange} />

                </div>
            
                {/* <div >
                  <h1>Pulse</h1>
                  <Checkbox indeterminate={indeterminatePulse} onChange={onCheckAllPulseChange} checked={checkAllPulse}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedPulseList} onChange={onPulseChange} />

                </div> */}
              </FlexContainer>
              <Spacer />
              </div> 
              : null } 

           
           

               
           {props.departmentData.erpInd === true ? 
    <div>            
                
<h1 class=" text-clr font-bold">ERP</h1>
                <Spacer />
              <FlexContainer justifyContent="space-around">
             
               <div >
                  <h1 class="text-sm">Account</h1>
                  <Checkbox indeterminate={indeterminateAccount} onChange={onCheckAllAccountChange} checked={checkAllAccount}>
                  <label class="text-xs">   Check all</label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedAccountList} onChange={onAccountChange} />
                </div>
                <Spacer />
             
                <div >
                  <h1 class="text-sm">Order</h1>
                  <Checkbox indeterminate={indeterminateOrder} onChange={onCheckAllOrderChange} checked={checkAllOrder}>
                  <label class="text-xs">  Check all</label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedOrderList} onChange={onOrderChange} />

                </div>
                </FlexContainer>
                <Spacer />
                <FlexContainer justifyContent="space-around">
         
               <div >
                  <h1 class="text-sm">Materials</h1>
                  <Checkbox indeterminate={indeterminateMaterials} onChange={onCheckAllMaterialsChange} checked={checkAllMaterials}>
                  <label class="text-xs">   Check all </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedMaterialsList} onChange={onMaterialsChange} />
                </div>
                <Spacer />
             
                <div >
                  <h1 class="text-sm">Supplier</h1>
                  <Checkbox indeterminate={indeterminateSupplier} onChange={onCheckAllSupplierChange} checked={checkAllSupplier}>
                  <label class="text-xs">  Check all </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedSupplierList} onChange={onSupplierChange} />

                </div>
                </FlexContainer>
                <Spacer />
                <FlexContainer justifyContent="space-around">
         
         <div >
            <h1 class="text-sm">Inventory</h1>
            <Checkbox indeterminate={indeterminateInventory} onChange={onCheckAllInventoryChange} checked={checkAllInventory}>
            <label class="text-xs"> Check all </label>
            </Checkbox>
            <Divider />
            <CheckboxGroup options={plainOptions} value={checkedInventoryList} onChange={onInventoryChange} />
          </div>
          <Spacer />
       
          <div >
            <h1 class="text-sm">Refurbish</h1>
            <Checkbox indeterminate={indeterminateRefurbish} onChange={onCheckAllRefurbishChange} checked={checkAllRefurbish}>
            <label class="text-xs"> Check all </label>
            </Checkbox>
            <Divider />
            <CheckboxGroup options={plainOptions} value={checkedRefurbishList} onChange={onRefurbishChange} />

          </div>
          </FlexContainer>
          <Spacer />
          </div>
          : null }

{/* {props.departmentData.crmInd === true ?  */}
    <div>     
            <h1 class=" text-clr font-bold">IM</h1>
            <Spacer />
              <FlexContainer justifyContent="space-around">
          

              
                <div >
                  <h1 class="text-sm">Investor</h1>
                  <Checkbox indeterminate={indeterminateInvestor} onChange={onCheckAllInvestorChange} checked={checkAllInvestor}>
                  <label class="text-xs">  Check all  </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedInvestorList} onChange={onInvestorChange} />
                </div>
                    {/* Contact */}
                    <div >
                  <h1 class="text-sm">Investor Contact</h1>
                  <Checkbox indeterminate={indeterminateInvestorContact} onChange={onCheckAllInvestorContactChange} checked={checkAllInvestorContact}>
                  <label class="text-xs"> Check all</label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedInvestorContactList} onChange={onInvestorContactChange} />

                </div>
                <Spacer />
              </FlexContainer>
              <Spacer />

            
              <FlexContainer justifyContent="space-around">
              <div >
                  <h1 class="text-sm">Deal</h1>
                  <Checkbox indeterminate={indeterminateOpportunity} onChange={onCheckAllOpportunityChange} checked={checkAllOpportunity}>
                  <label class="text-xs">  Check all </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedOpportunityList} onChange={onOpportunityChange} />

                </div>
                <Spacer />
                <div >
                  <h1 class="text-sm">Pitch</h1>
                  <Checkbox indeterminate={indeterminateLeads} onChange={onCheckAllLeadsChange} checked={checkAllLeads}>
                  <label class="text-xs">  Check all </label>
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedLeadsList} onChange={onLeadsChange} />

                </div>
            
                {/* <div >
                  <h1>Pulse</h1>
                  <Checkbox indeterminate={indeterminatePulse} onChange={onCheckAllPulseChange} checked={checkAllPulse}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedPulseList} onChange={onPulseChange} />

                </div> */}
              </FlexContainer>
              <Spacer />
              </div> 
              {/* : null }  */}
               
              <h4 class="mt-2">Updated on {dayjs(props.departmentAcces.lastUpdatedOn).format("ll")} by {props.departmentAcces.name}</h4>
              
              <FlexContainer justifyContent="flex-end" >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingDepartmentAccess}
                  onClick={() => {
                    handleUpdateAccess()
                  }}
                >
                  <FormattedMessage id="app.Update" defaultMessage="Update" />
                </Button>
              </FlexContainer>


            </TabsWrapper>
          )}
        </div>
      {/* </Form> */}

    </>
  );
};

const mapStateToProps = ({ settings }) => ({
  addingDepartmentAccess: settings.addingDepartmentAccess,
  departmentList: settings.departmentList,
  departmentAcces: settings.departmentAcces,
  departmentRoleData: settings.departmentRoleData,
  fetchingDepartmentAccess: settings.fetchingDepartmentAccess
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addDepartmentAccess,
    getDepartmentAccess
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccessForm);