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
const defaultCheckedList = ['Apple', 'Orange'];

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
    setCheckedTaskList(props.departmentAcces.task)
    setCheckedCustomerCommercialsList(props.departmentAcces.comercial)
    setCheckedProgramList(props.departmentAcces.program)
    setCheckedTestList(props.departmentAcces.test)
    setCheckedCourseList(props.departmentAcces.course)
    setCheckedTestList(props.departmentAcces.hours)
    setCheckedLocationList(props.departmentAcces.location)
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
  props.departmentAcces.task,
  props.departmentAcces.comercial,
  props.departmentAcces.program,
  props.departmentAcces.test,
  props.departmentAcces.course,
  props.departmentAcces.hours,
  props.departmentAcces.location
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


     // Task

     const [checkedTaskList, setCheckedTaskList] = useState(props.departmentAcces.task);
     const [indeterminateTask, setIndeterminateTask] = useState(true);
     const [checkAllTask, setCheckAllTask] = useState(false);
   
     const onTaskChange = (list) => {
       setCheckedTaskList(list);
       setIndeterminateTask(!!list.length && list.length < plainOptions.length);
       setCheckAllTask(list.length === plainOptions.length);
     };
   
     const onCheckAllTaskChange = (e) => {
       setCheckedTaskList(e.target.checked ? plainOptions : []);
       setIndeterminateTask(false);
       setCheckAllTask(e.target.checked);
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
      task:checkedTaskList || [],
      program:checkedProgramList || [],
      test:checkedTestList || [],
      course:checkedCourseList || [],
      hours:checkedHoursList || [],
      location:checkedLocationList || [],
      departmentId: props.departmentId,
      roleTypeId:props.roleTypeId,

    }
    props.addDepartmentAccess(data, props.roleTypeId)
  }
  console.log(props.departmentAcces.vendor)
  return (

    <>

      {/* <Form className="form-background"> */}
      <div style={{ display: "flex", justifyContent: "space-between", height: "80vh", overflow: "scroll", paddingRight: "0.6em" }}>
          {props.fetchingDepartmentAccess ? (
            <BundleLoader />
          ) : (
            <TabsWrapper style={{overflow: "auto"}}>

              {/* Vendor */}
              <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Vendor</h1>
                  <Checkbox indeterminate={indeterminateVendor} onChange={onCheckAllVendorChange} checked={checkAllVendor}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedVendorList} onChange={onVendorChange} />
                </div>
                <Spacer 
                // style={{marginTop:"6.2em"}}
                />

                {/* Customer */}
                <div >
                  <h1>Customer</h1>
                  <Checkbox indeterminate={indeterminateCustomer} onChange={onCheckAllCustomerChange} checked={checkAllCustomer}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedCustomerList} onChange={onCustomerChange} />
                </div>
              </FlexContainer>
              <Spacer />

              {/* Opportunity */}
              <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Opportunity</h1>
                  <Checkbox indeterminate={indeterminateOpportunity} onChange={onCheckAllOpportunityChange} checked={checkAllOpportunity}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedOpportunityList} onChange={onOpportunityChange} />

                </div>
                <Spacer />
                {/* Contact */}
                <div >
                  <h1>Contact</h1>
                  <Checkbox indeterminate={indeterminateContact} onChange={onCheckAllContactChange} checked={checkAllContact}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedContactList} onChange={onContactChange} />

                </div>
              </FlexContainer>
              <Spacer />

              {/* Talent */}
              <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Talent</h1>
                  <Checkbox indeterminate={indeterminateTalent} onChange={onCheckAllTalentChange} checked={checkAllTalent}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedTalentList} onChange={onTalentChange} />

                </div>

                <Spacer />
                <div >
                  <h1>Requirement</h1>
                  <Checkbox
                    indeterminate={indeterminateRequirement}
                    onChange={onCheckAllRequirementChange}
                    checked={checkAllRequirement}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedRequirementList}
                    onChange={onRequirementChange}
                  />

                </div>
              </FlexContainer>
              <Spacer />
              <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Post</h1>
                  <Checkbox indeterminate={indeterminatePublish} onChange={onCheckAllPublishChange} checked={checkAllPublish}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedPublishList} onChange={onPublishChange} />

                </div>
                <Spacer />
                <div >
                  <h1>Pulse</h1>
                  <Checkbox indeterminate={indeterminatePulse} onChange={onCheckAllPulseChange} checked={checkAllPulse}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedPulseList} onChange={onPulseChange} />

                </div>
                </FlexContainer>

                <Spacer />
              <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Assessment</h1>
                  <Checkbox indeterminate={indeterminateAccessment} onChange={onCheckAllAccessmentChange} checked={checkAllAccessment}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedAccessmentList} onChange={onAccessmentChange} />

                </div>
                <Spacer />
                <div >
                  <h1>Leads</h1>
                  <Checkbox indeterminate={indeterminateLeads} onChange={onCheckAllLeadsChange} checked={checkAllLeads}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedLeadsList} onChange={onLeadsChange} />

                </div>
                </FlexContainer>
                <Spacer />

                <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Task</h1>
                  <Checkbox indeterminate={indeterminateTask} onChange={onCheckAllTaskChange} checked={checkAllTask}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedTaskList} onChange={onTaskChange} />

                </div>
                <Spacer />
                <div >
                  <h1>Customer-Commercials</h1>
                  <Checkbox indeterminate={indeterminateCustomerCommercials} onChange={onCheckAllCustomerCommercialsChange} checked={checkAllCustomerCommercials}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedCustomerCommercialsList} onChange={onCustomerCommercialsChange} />

                </div>
                </FlexContainer>
                <Spacer />
                
                <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Program</h1>
                  <Checkbox indeterminate={indeterminateProgram} onChange={onCheckAllProgramChange} checked={checkAllProgram}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedProgramList} onChange={onProgramChange} />

                </div>
                <Spacer />
                <div >
                  <h1>Test</h1>
                  <Checkbox indeterminate={indeterminateTest} onChange={onCheckAllTestChange} checked={checkAllTest}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedTestList} onChange={onTestChange} />

                </div>
                </FlexContainer>
                <Spacer />

                <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Course</h1>
                  <Checkbox indeterminate={indeterminateCourse} onChange={onCheckAllCourseChange} checked={checkAllCourse}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedCourseList} onChange={onCourseChange} />

                </div>
                <Spacer />
                <div >
                  <h1>Hours</h1>
                  <Checkbox indeterminate={indeterminateHours} onChange={onCheckAllHoursChange} checked={checkAllHours}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedHoursList} onChange={onHoursChange} />

                </div>
                </FlexContainer>
                <FlexContainer justifyContent="space-around">
                <div >
                  <h1>Project</h1>
                  <Checkbox indeterminate={indeterminateCourse} onChange={onCheckAllCourseChange} checked={checkAllCourse}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedCourseList} onChange={onCourseChange} />

                </div>
                <div >
                  <h1>Location</h1>
                  <Checkbox indeterminate={indeterminateLocation} onChange={onCheckAllLocationChange} checked={checkAllLocation}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedLocationList} onChange={onLocationChange} />

                </div>
            
                </FlexContainer>
                <Spacer />
              <h4>Updated on {dayjs(props.departmentAcces.lastUpdatedOn).format("ll")} by {props.departmentAcces.name}</h4>

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
  fetchingDepartmentAccess: settings.fetchingDepartmentAccess
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addDepartmentAccess,
    getDepartmentAccess
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccessForm);