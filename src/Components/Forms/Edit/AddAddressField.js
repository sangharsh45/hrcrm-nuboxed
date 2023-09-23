import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { FlexContainer } from "../../UI/Layout";
import { ActionIcon } from "../../Utils";
import { Spacer } from "../../UI/Elements";
import { InputComponent } from "../Formik/InputComponent";
import { addEmployeeAddress } from "../../../Containers/Profile/ProfileAction";
// import { SelectComponent } from "../Formik/SelectComponent";
import FormikPlacesAutoComplete from "../Formik/FormikPlacesAutoComplete";

class AddAddressField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingError: false,
    };
  }

  addAddress = (address) => {
    const {
      addAddressType,
      contactId,
      // userId,
      singleEmployee: { employeeId },
      updateContactAddress,
      addEmployeeAddress,
      updateUserAddress,
      toggleAdd,
    } = this.props;
    this.setState({ isSubmitting: true });
    axios
      .post(`${base_url}/address/employee/${employeeId}`, address, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        ////debugger;
        addEmployeeAddress(res.data);
        this.setState({ isSubmitting: false });
        toggleAdd();
        console.log(res);
        // if (addAddressType === "account") {
        //   ////debugger;
        //   addEmployeeAddress(accountId);
        // }
        // if (editAddressType === "contact") {
        //   updateContactAddress(contactId, res.data);
        // }
        // if (editAddressType === "user") {
        //   updateUserAddress(userId, res.data);
        // }
      })
      .catch((err) => {
        toggleAdd();
        this.setState({ isSubmitting: false, isSubmittingError: true });
        console.log(err);
      });
  };

  render() {
    const {
      components: {
        addressId,
        address1,
        address2,
        street,
        town,
        city,
        state,
        country,
        postalCode,
        latitude,
        longitude,
      },
    } = this.props;
    const { accountId } = this.props;
    const { isSubmitting } = this.state;
    console.log(this.props);
    return (
      <>
        <Formik
          initialValues={{
            address: {
              address1: "",
              address2: "",
              street: "",
              town: "",
              city: "",
              state: "",
              country: "",
              postalCode: "",
              latitude: "",
              longitude: "",
            },
          }}
          onSubmit={(values) => this.addAddress(values.address)}
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
                <Field
                  name={`address`}
                  noLabel
                  component={FormikPlacesAutoComplete}
                  options={{}}
                />
                <Spacer />
                {/* <Field
                name={`address.addressType`}
                noLabel
                placeholder='Address type'
                component={SelectComponent}
                options={['Office', 'Communication', 'Headquarters', 'Registered']}
              /> */}
                <Field
                  noLabel
                  placeholder="Address 1"
                  name="address.address1"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Address 2"
                  name="address.address2"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Street"
                  name="address.street"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Town"
                  name="address.town"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="City"
                  name="address.city"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="State"
                  name="address.state"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Country"
                  name="address.country"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Zip code"
                  name="address.postalCode"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Spacer />
                <FlexContainer justifyContent="flex-end">
                  <Button type="primary" htmlType="submit" Loading={isSubmitting}>
                    {/* Save */}
                    <FormattedMessage
                   id="app.save"
                  defaultMessage="Save"
                   />
                </Button>
                &nbsp;
                <Button type="default" onClick={this.props.toggleAdd}>
                    {/* Cancel */}
                    <FormattedMessage
                     id="app.cancel"
                    defaultMessage="Cancel"
                    />
                </Button>
                </FlexContainer>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ profile, employee }) => ({
  employee: profile.employee,
  singleEmployee: employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // updateContactAddress,
      addEmployeeAddress,
      // updateUserAddress,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressField);
