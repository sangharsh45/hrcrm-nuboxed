import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch, Tooltip, Icon, Select } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../Components/UI/Elements";
import {getCountries} from "../../../../../../Auth/AuthAction"
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { addEducationDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";
import { getEducations } from "../../../../../../Settings/Educations/EducationAction";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UserVisaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
      type:null,
      entry: false,
    };
  }
  handleStageType=(value)=>
  this.setState({type:value});
  handleMultipleEntry = (checked) => {
    this.setState({ entry: checked });
  };
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  componentDidMount() {
    const { getCountries ,} = this.props;
   
    getCountries(getCountries);
   
}

  render() {
    const { addingEducationDetails,startDate,endDate ,employeeId} = this.props;
    const countryNameOption = this.props.countries.map((item) => {
        return {
            label: `${item.country_name|| ""}`,
            value: item.country_name,
        };
    });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            entry: this.state.entry ? "Yes" : "No",
          
            courseType: this.state.active,
            country_name: "",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            endDate: dayjs(),
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addEducationDetails(
              {
                ...values,
                entry: this.state.entry ? "Yes" : "No",
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
                 width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    }}
                >
                <Field
                        name="country"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={<FormattedMessage
                          id="app.country"
                          defaultMessage="Country"
                        />}
                        isColumn
                        options={
                          Array.isArray(countryNameOption)
                            ? countryNameOption
                            : []
                        }
                        component={SelectComponent}
                        inlineLabel
                        />
                  <Spacer />
                  <div>
                  <Select style={{ width: "100%"}}
                onChange={this.handleStageType}
                placeholder="Select Type"
                >
                  <option value="Business">Business</option>
        <option value="Work Permit">Work Permit</option>
      
                </Select> 
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
                        // value={values.endDate}
                        value={values.endDate || values.startDate}
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
                    </div>
                  </FlexContainer>
                  <div
                      style={{
                        width: "25%",
                        fontWeight: "bold",
                      }}
                    >
                      <StyledLabel>Multiple Entry</StyledLabel>
                      <Switch
                        onChange={this.handleMultipleEntry}
                        checked={this.state.entry}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </div>
               
                </div>

                <div
                  style={{
                    width: "45%",
                    }}
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
               
                  <Spacer style={{ marginBottom: "0.9375em" }} />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEducationDetails}
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
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ employee,auth, profile,education }) => ({
  employeeId: employee.singleEmployee.employeeId,
  educations: education.educations,
  countries: auth.countries,
  addingEducationDetails: profile.addingEducationDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    // addEducationDetails,
    // getEducations,
    getCountries
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserVisaForm);

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
