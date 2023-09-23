import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Select, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { addLeadsContact } from "../../../LeadsAction";
import { Spacer } from "../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import Upload from "../../../../../Components/Forms/Formik/Upload";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().email("Enter a valid Email"),
  whatsappNumber: Yup.string()
    .matches(phoneRegExp, "Whatsapp number is not valid")
    .min(5, "Number is too short")
    .max(10, "Number is too long"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Mobile number is not valid")
    .min(5, "Number is too short")
    .max(10, "Number is too long"),
});

class LeadsContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      whatsapp: false,
      currentOption: "",
      candidate: false,
      availability: false,
    };
  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };
  handleClick = (option) => {
    ////debugger;
    this.setState({
      currentOption: option,
    });
    console.log(this.state.option);
    console.log(this.state.currentOption);
  };
  handleFieldClik() {
    this.setState({
      disabled: !this.state.disabled,
      visible: !this.state.visible,
    });
  }
  onChange = (value) => {
    console.log(value);
    this.setState({
      option: value,
    });
  };
  onChange1 = (value) => {
    console.log(value);
    this.setState({
      option1: value,
    });
  };
  onChange2 = (value) => {
    ////debugger;
    console.log(value);
    this.setState({
      option2: value,
    });
  };

  render() {
    const {
      user: { userId, firstName, lastName },
      addLeadsContact,
      addingLeadsContact,
      callback,
      user,
      creatorId,
      accountIdTag,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,
      leadsId,
      tagWithCompany,
    } = this.props;
    // console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            designationTypeId: this.props.designationTypeId,
            description: "",
            departmentDetails: "",
            departmentId: this.props.departmentId,
            userId: this.props.userId,
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
            lastName: "",
            whatsappNumber: "",
            mobileNumber: "",
            email: "",
            emailId: "",
            linkedinPublicUrl: "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                // country: this.props.user.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addLeadsContact(
              {
                ...values,
                leadsId: this.props.leadsId,
                whatsapp: this.state.whatsapp ? "Different" : "Same",
              },
              this.props.userId,
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form className="form-background">
            <div class=" flex justify-between">
                <div class=" h-full w-2/4"
                >
                  <Spacer />
                  <div class=" flex flex-nowrap">
                    <FastField name="imageId" component={Upload} />
                    <div>
                    <div class=" flex justify-between">
                        <div class=" w-2/5">
                          <FastField
                            name="salutation"
                            type="text"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="Salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        </div>
                        <div class=" w-2/4">
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstName"
                                defaultMessage="First Name"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                      <Spacer />
                      <div class=" flex justify-between">
                        <div class=" w-2/5">
                          <FastField
                            name="middleName"
                            label={
                              <FormattedMessage
                                id="app.middle"
                                defaultMessage="Middle"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-2/4">
                          <FastField
                            name="lastName"
                            label={
                              <FormattedMessage
                                id="app.lastName"
                                defaultMessage="Last Name"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/3">
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobileNumber"
                            defaultMessage="Mobile #"
                          />
                        }
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </div>
                 
                  <div class=" w-1/4 font-bold"
                  >
                    WhatsApp
                    <Switch
                      onChange={this.handleWhatsApp}
                      checked={this.state.whatsapp}
                      checkedChildren="Different"
                      unCheckedChildren="Same"
                    />
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      {this.state.whatsapp && (
                        <Field
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"
                          label={
                            <FormattedMessage
                              id="app.#whatsApp"
                              defaultMessage="WhatsApp #"
                            />
                          }
                          component={SearchSelect}
                          isColumn
                          inlineLabel
                        />
                      )}
                    </div>
                    <div class=" w-2/4">
                      {this.state.whatsapp && (
                        <FastField
                          name="whatsappNumber"
                          isColumn
                          width={"100%"}
                          style={{ flexBasis: "30%" }}
                          component={InputComponent}
                          inlineLabel
                        />
                      )}
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="emailId"
                        label={
                          <FormattedMessage
                            id="app.emailId"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <Spacer />
                  <div class=" flex justify-between">
                    <div class="w-full">
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedinPublicUrl"
                            defaultMessage="Linkedin"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <Spacer />

                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <>
                        <Field
                          name="customerId"
                          isColumnWithoutNoCreate
                          selectType="customerList"
                          // label="Tag Company"
                          label={
                            <FormattedMessage
                              id="app.tagcompany"
                              defaultMessage="Tag Company"
                            />
                          }
                          component={SearchSelect}
                          isColumn
                          value={values.leadsId}
                          inlineLabel
                        />
                      </>
                    </div>
                    <div class=" w-2/5">
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
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        isColumnWithoutNoCreate
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" w-full">
                    <FastField
                      name="departmentId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="Department"
                        />
                      }
                      isColumn
                      isColumnWithoutNoCreate
                      component={SearchSelect}
                      value={values.departmentId}
                      selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                </div>
                <div class=" h-4/6 w-2/5"
                >
                  <Spacer />
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
               <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <Field
                        // name="address[0].country"
                        name="countryName"
                        isColumnWithoutNoCreate
                        // label="Country"

                        label={
                          <FormattedMessage
                            id="app.countryName"
                            defaultMessage="Country"
                          />
                        }
                        component={SearchSelect}
                        // defaultValue={{
                        //   value: this.props.user.countryName,
                        // }}
                        // value={values.countryName}
                        selectType="country"
                        inlineLabel
                        isColumn
                        width="100%"
                      />
                    </div>
                  </div>
                  <Spacer />
                  <Field
                    name="notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                </div>
              </div>
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingLeadsContact}
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
}

const mapStateToProps = ({
  auth,
  leads,
  customer,
  opportunity,
  departments,
  designations,
}) => ({
  addingLeadsContact: leads.addingLeadsContact,
  addingLeadsContactError: leads.addingLeadsContactError,
  user: auth.userDetails,
   leadsId: leads.lead.leadsId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
      addLeadsContact,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsContactForm);
