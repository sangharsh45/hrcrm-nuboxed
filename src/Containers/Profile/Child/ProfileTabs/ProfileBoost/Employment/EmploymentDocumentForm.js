import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip, Icon } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { addEmploymentDetails } from "../../../../ProfileAction";
import dayjs from "dayjs";
import { getCurrency } from "../../../../../Auth/AuthAction";
import { FormattedMessage } from "react-intl";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class EmploymentDocumentForm extends Component {
  render() {
    const { addingEmploymentDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            documentTypeId: "",
            employeeId: this.props.employeeId,
            companyName: "",
            startDate: "",
            endDate: "",
            // designation: "",
            description: "",
            salary: "",
            salaryType: "",
            currency: "",
            documentId: "",
            designationTypeId: this.props.designationTypeId,
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addEmploymentDetails(
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
              <div
                style={{
                  display: "flex",
                  // border: "0.125em solid red",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
                  }}
                >
                  <div>
                    <Field
                      isRequired
                      name="companyName"
                      type="text"
                      isColumn
                      width={"100%"}
                      // label="Organization Name"
                      label={
                        <FormattedMessage
                          id="app.companyName"
                          defaultMessage="Organization Name"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                  <Spacer />
                  <div>
                    <FastField
                      name="designationTypeId"
                      //label="Designation"
                      label={
                        <FormattedMessage
                          id="app.designation"
                          defaultMessage="Designation"
                        />
                      }
                      selectType="designationType"
                      // options={[
                      //   "Board",
                      //   "CXO",
                      //   "Director",
                      //   "Unit Head",
                      //   "Mid Level",
                      //   "Junior",
                      // ]}
                      isColumn
                      // component={SelectComponent}
                      component={SearchSelect}
                      value={values.designationTypeId}
                      isColumnWithoutNoCreate
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        // marginTop: "0.25em",
                      }}
                    />
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="startDate"
                        //label="Start Date"
                        label={
                          <FormattedMessage
                            id="app.startDate"
                            defaultMessage="Start Date"
                          />
                        }
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.startDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          width: "100%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="endDate"
                        // label="End Date "
                        label={
                          <FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />
                        }
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
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          width: "100%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer>
                    <div style={{ width: "35%" }}>
                      <Field
                        isRequired
                        name="salary"
                        type="text"
                        isColumn
                        width="47%"
                        //label="Salary"
                        label={
                          <FormattedMessage
                            id="app.salary"
                            defaultMessage="Salary"
                          />
                        }
                        component={InputComponent}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ width: "27%" }}>
                      <Field
                        isRequired
                        name="salaryType"
                        type="text"
                        isColumn
                        width="47%"
                        //label="Salary Type"
                        label={
                          <FormattedMessage
                            id="app.salaryType"
                            defaultMessage="Salary Type"
                          />
                        }
                        component={SelectComponent}
                        options={["Daily", "Monthly", "Annual"]}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                          width: "100%",
                        }}
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ width: "30%", marginTop: "0.1875em" }}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Curr"
                        // label="Curr"
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currency"
                        isRequired
                        component={SearchSelect}
                        // options={Array.isArray(currency) ? currency : []}
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.1875em",
                        }}
                      />
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <div>
                    <Field
                      name="description"
                      //label="Describe your role"
                      label={
                        <FormattedMessage
                          id="app.description"
                          defaultMessage="Describe your role"
                        />
                      }
                      isRequired
                      isColumn
                      width={"100%"}
                      component={TextareaComponent}
                      style={{ height: "5em", marginTop: "0.25em" }}
                    />
                  </div>
                  <Spacer />
                </div>

                <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
                  }}
                >
                  <Field
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  />

                  <Field
                    name="documentTitle"
                    // label="Name of Document"
                    label={
                      <FormattedMessage
                        id="app.documentTitle"
                        defaultMessage="Name of Document"
                      />
                    }
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em", marginTop: "0.25em" }}
                  />
                  <Spacer />
                  <Field
                    name="documentTypeId"
                    selectType="documentTypeName"
                    isColumnWithoutNoCreate
                    // label="Type"
                    label={
                      <FormattedMessage
                        id="app.documentId"
                        defaultMessage="Type"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    margintop={"0.25em"}
                    value={values.documentId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <Field
                    name="documentDescription"
                    //label="Description of Document"
                    label={
                      <FormattedMessage
                        id="app.documentDescription"
                        defaultMessage="Description of Document"
                      />
                    }
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em", marginTop: "0.25em" }}
                  />
                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEmploymentDetails}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile, designations }) => ({
  addingEmploymentDetails: profile.addingEmploymentDetails,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addEmploymentDetails,
      getDesignations,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploymentDocumentForm);
