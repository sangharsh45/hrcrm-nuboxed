import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import {getJobCategory,getJobBoardName,getJobBoardOccupation,getJobBoardIndustry,addMonster} from "../../../../OpportunityAction";

//import ExperienceTable from "./ExperienceTable";

function MonsterForm(props) {
  useEffect(()=>{
    props.getJobCategory();
    props.getJobBoardName();
    props.getJobBoardOccupation();
     props.getJobBoardIndustry();


  },[])
   const categoryOption = props.jobCategory.map((item) => {
      return {
        label: item.jobCategoryAlias||"",
        value: item.monsterCategoryId,
      };
    });
    const occupationOption = props.jobOccupation.map((item) => {
      return {
        label: item.occupationAlias||"",
        value: item.monsterOccupationId,
      };
    });
    const boardNameOption = props.jobBoardName.map((item) => {
      return {
        label: item.jobBoardName||"",
        value: item.monsterBoardId,
      };
    });
    const jobIndustryOption = props.jobBoardIndustry.map((item) => {
      return {
        label: item.industryAlias||"",
        value: item.monsterIndustryId,
      };
    });
    
  return (
    <>
      <Formik
        initialValues={{
          displayTemplate:1,
          industry:"",
          jobOccupation:"",
          jobDuration:"",
          jobBoardName:"",
          jobCategory:"",
          recruitmentId: props.recruitmentId,
         
          // shiftId: props.shiftId,
        }}
        // validationSchema={FormSchema}
         onSubmit={(values, { resetForm }) => {
          props.addMonster(
            {
              ...values,
              

              // startDate: `${newStartDate}T${newStartTime}`,
            },
            // props.locationDetailsId
            // props.shiftId,//from headerPart
          );
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <Form className="form-background">
            {/* <MainWrapper> */}
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "50%",
                }}
              >
                     
                     <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Industry</StyledLabel>
                  <Field
                    name="industry"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                 options={Array.isArray(jobIndustryOption) ? jobIndustryOption : []}                      
                    inlineLabel
                  />
                  </FlexContainer>
                </div>

                     <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Job Category</StyledLabel>
                  <Field
                    name="jobCategory"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                 options={Array.isArray(categoryOption) ? categoryOption : []}                      
                    inlineLabel
                  />
                  </FlexContainer>
                </div>
                <Spacer />
                <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Job Occupation</StyledLabel>
                  <Field
                    name="jobOccupation"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                    options={Array.isArray(occupationOption) ? occupationOption : []}                      
                    inlineLabel
                  />
                  </FlexContainer>
                </div>
                <Spacer />
                      <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Template</StyledLabel>
                  <Field
                    name="displayTemplate"
                    //label=""
                    type="text"
                     isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </FlexContainer>
                </div>
                <Spacer />
             
                <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Job Duration</StyledLabel>
                  <Field
                    name="jobDuration"
                    //label=""
                    //type="number"
                     isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </FlexContainer>
                </div>
                <Spacer />
                <div >
                {/* <Spacer style={{marginTop:"1.25em"}}/>   
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  /> */}
                   {/* <FlexContainer justifyContent="space-between">
                       <div style={{ width: "47%" }}>
                      <Field
                        // name="address[0].country"
                        // The searchselect without create component will work on calling ( isColumnWithoutNoCreate)
                        name="country"
                        isColumnWithoutNoCreate
                        // label="Country"

                        label={
                          <FormattedMessage
                            id="app.country"
                            defaultMessage="Country"
                          />
                        }
                        component={SearchSelect}
                        defaultValue={{
                        //   value: this.props.user.country,
                        }}
                        value={values.country}
                        selectType="country"
                        inlineLabel
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />   */}
                      </div>
                      <Spacer />

                <div >
                <FlexContainer justifyContent="space-between">
                  <StyledLabel>Job Board Name</StyledLabel>
                  <Field
                    name="jobBoardName"
                    //label=""
                    type="number"
                     isColumn
                    width={"100%"}
                    // component={InputComponent}
                    component={SelectComponent}
                    options={Array.isArray(boardNameOption) ? boardNameOption : []}                      
                    inlineLabel
                  />
                  </FlexContainer>
                </div>
                <Spacer />
               

                
                <Spacer style={{marginTop:"1.25em"}}/>              
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.linkingMonster}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                  {/*                     
                    Create */}
                </Button>
              </FlexContainer>
                
               
               
                {/* <div
                  style={{                   
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                   loading={props.addingExperienceForm}
                  >Add
                </Button>*/}
                </div>
                
              </div>
            {/* </MainWrapper> */}
          </Form>
        )}
      </Formik>
      {/* <CommercialsTable/> */}
    </>   
  );
}

const mapStateToProps = ({opportunity,auth}) => ({
  jobCategory:opportunity.jobCategory,
  fetchingJobCategory:opportunity.fetchingJobCategory,
  fetchingJobCategoryError:opportunity.fetchingJobCategoryError,
  organizationId: auth.userDetails.organizationId,
  jobBoardName:opportunity.jobBoardName,
  jobOccupation:opportunity.jobOccupation,
  jobBoardIndustry:opportunity.jobBoardIndustry,
  linkingMonster:opportunity.linkingMonster
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getJobCategory,
        addMonster,
        getJobBoardName,
        getJobBoardOccupation,
        getJobBoardIndustry

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonsterForm);