import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
 import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addTrainingDetails,getLinkedUsersDocument } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

// const documentSchema = Yup.object().shape({
//   documentId: Yup.string().required("Input needed !"),
// });

class TrainingDocumentForm extends Component {
  componentDidMount() {
    const { getLinkedUsersDocument ,orgId} = this.props;
    this.props.getLinkedUsersDocument(this.props.orgId);
    // getLinkedUsersDocument(orgId);
   
}
  render() {
    const { addingTrainingDetails } = this.props;
    const documentNameOption = this.props.linkedUserDocument.map((item) => {
      return {
          label: `${item.documentTypeName|| ""}`,
          value: item.documentTypeId,
      };
  });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            courseName: "",
            grade: "",
            startDate: "",
            documentTypeId: this.props.documentTypeId,
            endDate: "",
            organization: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addTrainingDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.employeeId,
              values.documentId,
              resetForm()
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
                <div class=" flex w-full h-full justify-between"

                >
                  <div class=" w-[45%]"
                  >
                    <div class=" flex justify-between" >
                      <div class=" w-full" >
                      <FastField
                    name="documentTypeId"
                    type="text"
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="Type" />
                    }
                    // options={[
                    //   "Aadhar Card",
                    //   "Voter-Id Card",
                    //   "Driving-License",
                    //   "Pan Card",
                    //   "Passport",
                    // ]}
                    options={
                      Array.isArray(documentNameOption)
                        ? documentNameOption
                        : []
                    }
                    component={SelectComponent}
                    inlineLabel
                    className="field"
                    isColumn
                     />
               <div class=" mt-3">
                        <FastField
                          isRequired
                          name="courseName"
                          //label="Course Name"
                          label={<FormattedMessage
                            id="app.courseName"
                            defaultMessage="Course Name"
                          />}
                          type="text"
                          width={"100%"}
                          isColumn
                          component={InputComponent}
                          inlineLabel
                           />
                           </div>
                      </div>
                    </div>

                   
                    <div class=" flex justify-between mt-3" >
                      <div class=" w-[60%]" >
                        {/* <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Organization/Institution</div> */}
                        <FastField
                          type="Organization"
                          name="organization"
                          label={<FormattedMessage
                            id="app.organization"
                            defaultMessage="Organization"
                          />}
                          className="field"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          />
                      </div>
                      <div class=" w-[30%]" >
                      
                        <FastField
                          name="grade"
                          label={<FormattedMessage
                            id="app.grade"
                            defaultMessage="Grade"
                          />}
                          isColumn
                          selectType="text"
                          width={"30%"}
                          component={InputComponent}
                          inlineLabel
                           style={{
                             width: "100%",
                           }}
                        />
                      </div>
                    </div>
                 
                    <div class=" flex justify-between mt-3" >
                      <div class=" w-[47%]" >
                        <Field
                          name="startDate"
                          //label="Start Date"
                          label={<FormattedMessage
                            id="app.startDate"
                            defaultMessage="Start Date"
                          />}
                          isRequired
                          component={DatePicker}
                          isColumn
                          width={"100%"}
                          value={values.startDate}
                          inlineLabel
                          />
                      </div>
{/* 
                      <div style={{ width: "47%" }}>
                        <Field
                          name="endDate"
                          //label="End Date "
                          label={<FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />}
                          isRequired
                          isColumn
                          width={"100%"}
                          component={DatePicker}
                          value={values.endDate}
                          disabledDate={(currentDate) => {
                            if (values.startDate) {
                              if (
                                dayjs(currentDate).isBefore(
                                  dayjs(values.startDate)
                                )
                              ) {
                                return true;
                              } else {
                                return false;
                              }
                            }
                          }}
                          inlineLabel
                          />
                      </div> */}
                    </div>
                
                  </div>

                  <div class=" w-[50%]"
                  >
                   <div class=" flex justify-between " ></div>

                    <div class=" w-full"
                    >
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                      />
                    <div class=" mt-3">

                      <Field
                        name="documentTitle"
                        //label="Name of Document"
                        label={<FormattedMessage
                          id="app.documentTitle"
                          defaultMessage="Name of Document"
                        />}
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        />
                        </div>
                        <div class=" mt-3">
                      <Field
                        name="documentDescription"
                        //label="Description of Document"
                        label={<FormattedMessage
                          id="app.documentDescription"
                          defaultMessage="Description of Document"
                        />}
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                          />
                            </div>
                  
                    </div>

                   

                    {/* <FieldArray
                                    name="address"
                                    render={(arrayHelpers) => (
                                        <AddressFieldArray
                                            singleAddress
                                            arrayHelpers={arrayHelpers}
                                            values={values}
                                        />
                                    )}
                                /> */}

                  
                  </div>
                </div>
              
                <div class=" flex justify-end mt-3" >
                  <Button
                    htmlType="submit"
                    type="primary"
                    Loading={addingTrainingDetails}
                  >
                    <FormattedMessage
                      id="app.submit"
                      defaultMessage="Submit"
                    />
                  </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee,auth, profile }) => ({
  linkedUserDocument:profile.linkedUserDocument,
  orgId: auth.userDetails.organizationId,
  employeeId: employee.singleEmployee.employeeId,
  addingTrainingDetails: profile.addingTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addTrainingDetails,getLinkedUsersDocument }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingDocumentForm);
