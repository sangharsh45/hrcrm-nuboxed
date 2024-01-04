import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { FormattedMessage } from "react-intl";
import { Spacer } from "../../../../Components/UI/Elements";
import { Formik, Form, Field, FastField } from "formik";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent"; 
import * as Yup from "yup";
import {getCourse} from "../../../Course/CourseAction"
import { addPrograms } from "../../ProgramAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";

const expRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const courseSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});
function ProgramForm(props) {
    useEffect(() => {
        props.getCourse();  
  }, [])
  function handleReset(resetForm) {
    resetForm();
  }
  const {
    addingPrograms,
    addPrograms,

  } = props;


  const courseOption = props.courseById.map((item) => {
    return {
      label: item.courseName || "",
      value: item.courseId,
    };
  });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            courseId: [],
            program:"",
            price:"",
            currency:"",
            duration:"",
            drtnType:"",
            description:"",
        
        
  
          }}
          //  validationSchema={courseSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addPrograms(
              {
                ...values,
                
              },
              // props.userId,
              () => handleReset(resetForm)
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
           <div class=" flex justify-between overflow-scroll ">
              <div class=" h-full w-1/2">
              
              <div class=" flex justify-between">
                  <div class=" w-6/12">
                  <Field
                     isRequired
                    name="program"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage
                        id="app.programName"
                        defaultMessage="Program Name"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
</div>
<div class=" w-2/5">
<Field
                            name="courseId"
                            label={
                              <FormattedMessage
                                id="app.courseList"
                                defaultMessage="Course List"
                              />
                            }
                            mode
                       
                            component={SelectComponent}

                            options={
                              Array.isArray(courseOption) ? courseOption : []
                            }
                          />
                          </div>
                          </div>
                          <div class=" flex justify-between">
                  <div class=" w-6/12">
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
<div class=" w-2/5">
<FastField
                            name="drtnType"
                            type="text"
                            label={
                              <FormattedMessage
                                id="app.duration"
                                defaultMessage="Duration(Unit)"
                              />
                            }
                            options={["Hours", "Days", "Month","Years"]}
                            component={SelectComponent}
                            inlineLabel
                            // className="field"
                            isColumn
                          />
                          </div>
                          </div>
                          <div class=" flex justify-between">
                  <div class=" w-6/12">
                      <Field
                        name="price"
                        //label="State"
                        label={
                          <FormattedMessage
                            id="price"
                            defaultMessage="Price"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div class=" w-2/5">
                    <Field
                              name="currency"
                              isColumnWithoutNoCreate
                              placeholder="Currency"
                              label={
                                <FormattedMessage
                                  id="app.currency"
                                  defaultMessage="Currency"
                                />
                              }
                              isColumn
                              selectType="currencyName"
                              isRequired
                              width={"100%"}
                              component={SearchSelect}
                            />
                    </div>
                  </div>
                 
                         
</div>
<div class=" h-3/4 w-5/12 ">
                    <Field
                    name="description"
                    label="Description"
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                  />
               
 </div>
  </div>
               
               
             
          
              <Spacer />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingPrograms}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ program,course }) => ({
    addingPrograms: program.addingPrograms,
    addingProgramsError: program.addingProgramsError,
    courseById:course.courseById,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addPrograms,
        getCourse
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProgramForm);
