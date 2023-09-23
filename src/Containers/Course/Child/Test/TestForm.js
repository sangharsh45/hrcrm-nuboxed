import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { FormattedMessage } from "react-intl";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { MainWrapper, Spacer } from "../../../../Components/UI/Elements";
import { Formik, Form, Field, FastField } from "formik";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";

// import { addCourse } from "../CourseAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";


function TestForm(props) {
//   useEffect(() => {}, []);
//   function handleReset(resetForm) {
//     resetForm();
//   }
//   const {
//     addingCourse,
//     addCourse,

//   } = props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            courseId: props.courseId,
            duration:"",
            drtnType:"",
        
  
          }}
          //  validationSchema={courseSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            // addCourse(
            //   {
            //     ...values,
                
            //   },
            //   // props.userId,
            //   () => handleReset(resetForm)
            // );
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
            <div style={{ display: "flex", justifyContent: "space-between", height: "70vh", overflow: "scroll", paddingRight: "0.6em" }}>
           
                <div
                  style={{
                    width: "45%",
                  }}
                >
                  <Field
                     isRequired
                    name="testName"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage id="app.name" defaultMessage="Name" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
   <FlexContainer justifyContent="space-between">
   <div style={{ width: "47%" }}>
                  <Field
                     isRequired
                    name="duration"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage
                        id="app.duration"
                        defaultMessage="Duration"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
</div>
<div style={{ width: "47%" }}>
<FastField
                            name="drtnType"
                            type="text"
                            // placeholder="Mont"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.duration"
                                defaultMessage="Duration(months)"
                              />
                            }
                            options={["Hours", "Days", "Month","Years"]}
                            component={SelectComponent}
                            inlineLabel
                            // className="field"
                            isColumn
                          />
                          </div>
                          </FlexContainer>
              
                         
</div>
<div
                  style={{
                    width: "45%",
                  }}
                >
                  {/* <Field
                    name="description"
                    label="Description"
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                  /> */}
 </div>
  </div>
               
               
             
          
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                //   loading={addingCourse}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ course }) => ({
//   addingCourse: course.addingCourse,
//   addingCourseError: course.addingCourseError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   addCourse,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TestForm);
