import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Tooltip, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import ButtonGroup from "antd/lib/button/button-group";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { addEducationDetails,getLinkedUsersDocument } from "../../../../../../Profile/ProfileAction";
import { getEducations } from "../../../../../../Settings/Educations/EducationAction";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class EducationDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
    };
  }
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };
componentDidMount() {
  this.props.getLinkedUsersDocument(this.props.orgId);
 
}
  render() {
    const { addingEducationDetails } = this.props;
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
            documentTypeId: this.props.documentTypeId,
            // educationType: "",
            educationTypeId: this.props.educationTypeId,
            courseType: this.state.active,
            courseName: "",
            specialization: "",
            university: "",
            marksSecured: "",
            yearOfPassing: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addEducationDetails(
              {
                ...values,
                courseType: this.state.active,

                // yearOfPassing: dayjs(values.yearOfPassing).toISOString(),
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
                    name="educationTypeId"
                    // type="text"
                    //label="Education"
                    label={
                      <FormattedMessage
                        id="app.education"
                        defaultMessage="Education"
                      />
                    }
                    // options={[
                    //   "Matriculation",
                    //   "Intermediate",
                    //   "Graduation",
                    //   "Post-Graduation",
                    //   "Others",
                    // ]}
                    selectType="educationType"
                    component={SearchSelect}
                    value={values.educationTypeId}
                    isColumnWithoutNoCreate
                    inlineLabel
                    className="field"
                    isColumn
                      />
                      </div>
                      <div class=" mt-3">
                    <Field
                      isRequired
                      name="courseName"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Course Name"
                      label={
                        <FormattedMessage
                          id="app.courseName"
                          defaultMessage="Course Name"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  <div class=" mt-3">
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Course Type</div>
                    <div class=" mt-3">
                    <ButtonGroup>
                      <StatusIcon
                        color="blue"
                        type="Full Time"
                        iconType="fa-hourglass-start"
                        tooltip="Full Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Full Time")}
                      />

                      <StatusIcon
                        type="Part Time"
                        iconType="fa-hourglass-half"
                        tooltip="Part Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Part Time")}
                      />

                      <StatusIcon
                        type="Distance"
                        iconType="fa-hourglass"
                        tooltip="Distance"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Distance")}
                        //  status={item.taskStatus}
                        //  onClick={() =>
                        //    patchTask(item.taskId, { ...item, taskStatus: "Completed" })
                        //  }
                      />
                    </ButtonGroup>
                    </div>
                  </div>
                  <div class=" mt-3">
                    <Field
                      isRequired
                      name="specialization"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Specialization"
                      label={
                        <FormattedMessage
                          id="app.Specialization"
                          defaultMessage="Specialization"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  <div class=" mt-3">
                    <Field
                      isRequired
                      name="university"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="University/Institute "
                      label={
                        <FormattedMessage
                          id="app.university"
                          defaultMessage="University/Institute"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                

                  <div class=" flex mt-3" >
                    <div class=" w-[50%]" >
                      <Field
                        name="yearOfPassing"
                        //label="Year of Passing"
                        label={
                          <FormattedMessage
                            id="app.yearOfPassing"
                            defaultMessage="Year of Passing"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        // value={values.yearOfPassing}
                        inlineLabel
                        />
                    </div>
                 
                    <div class=" w-[49%] ml-4" >
                      <Field
                        isRequired
                        //label="Marks Secured"
                        label={
                          <FormattedMessage
                            id="app.marksSecured"
                            defaultMessage="Marks Secured"
                          />
                        }
                        name="marksSecured"
                        type="text"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                      />
                    </div>
                    <div class=" w-[60%] ml-4" >
                      <Field
                        name="marksType"
                        label={
                          <FormattedMessage
                            id="app.marksType"
                            defaultMessage="Marks Type"
                          />
                        }
                        type="text"
                        component={SelectComponent}
                        options={["%", "Out of 10", "Out of 5"]}
                        isColumn
                     
                        width={"100%"}
                        />
                    </div>
                  </div>

              
                </div>

                <div class=" w-[45%]"
                >
                  <Field
                    name="documentId"
                    label={
                      <FormattedMessage
                        id="app.documentId"
                        defaultMessage="Document Id"
                      />
                    }
                    isRequired
                    component={DragableUpload}
                  />
                <div class=" mt-3" >

                  <Field
                    name="documentTitle"
                    //label="Name of Document"
                    label={
                      <FormattedMessage
                        id="app.documentTitle"
                        defaultMessage="Name of Document"
                      />
                    }
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    />
                   </div>
                   <div class=" mt-3" >
                  <Field
                    name="documentDescription"
                    //label="Description of document"
                    label={
                      <FormattedMessage
                        id="app.documentDescription"
                        defaultMessage="Description of document"
                      />
                    }
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                      />
                        </div>
                 
                </div>
              </div>
            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEducationDetails}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ employee,auth, profile,education }) => ({
  employeeId: employee.singleEmployee.employeeId,
  educations: education.educations,
  orgId: auth.userDetails.organizationId,
  linkedUserDocument:profile.linkedUserDocument,
  addingEducationDetails: profile.addingEducationDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    addEducationDetails,
    getEducations, 
   getLinkedUsersDocument}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationDocumentForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  // console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
