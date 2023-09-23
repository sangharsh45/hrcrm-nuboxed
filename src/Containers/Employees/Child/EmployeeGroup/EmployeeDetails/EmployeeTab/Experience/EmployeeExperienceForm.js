import React, { useEffect,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { MainWrapper } from "../../../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import dayjs from "dayjs";
// import ExperienceTable from "./ExperienceTable";
import {getTopicsByUserId,

} from "../../../../../EmployeeAction"
import * as Yup from "yup";
import { updateExperienceByEmployeeId} from "../../../../../EmployeeAction"
import EmployeeExperienceTable from "./EmployeeExperienceTable";
const expRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const experienceSchema = Yup.object().shape({
  experience: Yup.string().required("Input needed!"),
});
function EmployeeExperienceForm(props) {
  useEffect(() => {
    props.getTopicsByUserId(props.singleEmployee.employeeId);
  }, []);

  const skillNameOption = props.topicsByUserId.map((item) => {
    return {
      label: `${item.keySkillsName || ""}`,
      value: item.keySkillsId,
    };
  });  
 console.log("cak", props.topicsByUserId.length && props.topicsByUserId[0].keySkillsId) 
  return (
    <>
      <Formik
        initialValues={{
          employeeId: props.singleEmployee.employeeId,
          keySkillsId:"",
          experience: "",
          // skillSetDetailsId: props.skillSetDetailsId,
         
        }}
        validationSchema={experienceSchema}
        onSubmit={(values, { resetForm }) => {
          props.updateExperienceByEmployeeId(
            {
              ...values,
              // skillSetDetailsId: props.skillSetDetailsId,
      
              
            },
            values.keySkillsId
            
          );
        }}
      >
        {({
          
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <Form className="form-background">
            <MainWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                }}
              >            
                <div
                  style={{                  
                    width: "15%",                   
                  }}
                >
                  <Field
                    name="keySkillsId"
                    label="Skill"
                    type="text"
                    isColumn
                   // width={"100%"}
                    component={SelectComponent}
                    options={
                      Array.isArray(skillNameOption) ? skillNameOption : []
                    }  
                    // onSelect={(e) => {
                    //   console.log(e);
                    //   handleSkillInCandidate(e, setFieldValue);
                    // }}                 
                    inlineLabel
                  />
                </div>
                <div
                  style={{              
                    width: "15%",                  
                  }}
                >
                  <Field
                    name="experience"
                    label="Experience (in Years)"
                    type="number"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div
                  style={{                   
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                   loading={props.updatingEmployeeExperience}
                  >Submit
                  </Button>
                </div>
              </div>
            </MainWrapper>
          </Form>
        )}
      </Formik>
     
      <Suspense fallback={"Loading ..."}>
                {" "}
                <EmployeeExperienceTable/>
              </Suspense>
    </>   
  
  );
}


const mapStateToProps = ({ candidate, auth,profile, employee }) => ({
  topicsByUserId: employee.topicsByUserId,
  singleEmployee: employee.singleEmployee,
  userId: auth.userDetails.userId,
  updatingEmployeeExperience: employee.updatingEmployeeExperience,
  updatingEmployeeExperienceError: employee.updatingEmployeeExperienceError,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByUserId,
      updateExperienceByEmployeeId
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeExperienceForm);