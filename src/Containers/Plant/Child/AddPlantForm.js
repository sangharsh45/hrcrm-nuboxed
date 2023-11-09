import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../Components/UI/Layout";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
// import { getSalesManagerUser } from "../../Teams/TeamsAction";
import {addPlant, getProductionManager } from "../PlantAction";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("Please provide First Name"),
  zoneId: Yup.string().required("Input required!"),
  areaId: Yup.string().required("Input required!"),
});

function AddPlantForm(props) {
  useEffect(() => {
    // props.getSalesManagerUser();
    props.getProductionManager();
  }, []);

  // const managementOption = props.salesManagementUsers.map((item) => {
  //   return {
  //     label: `${item.salutation || ""} ${item.firstName ||
  //       ""} ${item.middleName || ""} ${item.lastName || ""}`,
  //     value: item.userId,
  //   };
  // });

  const productionOption = props.productionManagement.map((item) => {
    return {
      label: `${item.salutation || ""} ${item.firstName ||
        ""} ${item.middleName || ""} ${item.lastName || ""}`,
      value: item.userId,
    };
  });
  return (
    <>
      <Formik
        initialValues={{
          plantName: "",
          management: "",
          productionManager: "",
          userId: props.userId,
          address: [
            {
              addressType: "",
              address1: "",
              address2: "",
              addressId: "",

              city: "",
              pinCode: "",
              country: "",
              county: "",
              latitude: "",
              longitude: "",
              location: "",
            },
          ],
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.addPlant({
            ...values,
          });
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
          <Form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                <Field
                  name="plantName"
                  label="Name"
                  type="text"
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  inlineLabel
                  isRequired
                  style={{
                    flexBasis: "80%",
                    height: "35px",
                    // marginTop: "0px",
                  }}
                />
                <Spacer />

                <div style={{ width: "100%" }}>
                  <StyledLabel>Management</StyledLabel>
                </div>
                <div style={{ width: "100%" }}>
                  <Field
                    name="management"
                    placeholder="Management"
                    noLabel
                    component={SelectComponent}
                    options={4
                      // Array.isArray(managementOption) ? managementOption : []
                    }
                    style={{
                      borderRadius: "2px",
                    }}
                  />
                </div>

                <Spacer />

                <div style={{ width: "100%" }}>
                  <StyledLabel>Production Manager</StyledLabel>
                  <Field
                    name="productionManager"
                    placeholder="Production Manager"
                    noLabel
                    // isRequired
                    component={SelectComponent}
                    options={
                      Array.isArray(productionOption) ? productionOption : []
                    }
                    style={{
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <Spacer />
              </div>
              <Spacer />
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                <FieldArray
                  name="address"
                  render={(arrayHelpers) => (
                    <AddressFieldArray
                      singleAddress
                      arrayHelpers={arrayHelpers}
                      values={values}
                    />
                  )}
                />
                {/* </div> */}
              </div>
            </div>
            <Spacer />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingPlant}
              >
                Create
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ plant, auth, teams }) => ({
  userId: auth.userDetails.userId,

  addingPlant: plant.addingPlant,
  // salesManagementUsers: teams.salesManagementUsers,
  productionManagement: plant.productionManagement,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPlant,
      // getSalesManagerUser,
      getProductionManager,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddPlantForm);
