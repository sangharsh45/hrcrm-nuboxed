import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { getPlant } from "../../../../../Plant/PlantAction";
import { addDeliveryDate } from "../../../InventoryAction"

function OrderInventoryForm(props) {
  useEffect(() => {
    props.getPlant(props.userId);
  }, []);
  moment.addRealYear = function addRealYear(y) {
    var fm = moment(y).add(10, "Y");
    var fmEnd = moment(fm).endOf("year");
    return y.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
      ? fm.add(10, "y")
      : fm;
  };
  // const locationsName = props.plant.map((item) => {
  //   return {
  //     label: item.name || "",
  //     value: item.locationDetailsId,
  //   };
  // });
  return (
    <>
      <Formik
        initialValues={{
          locationId: "",
          userId: props.userId,
          orderPhoneId: props.rowData.orderPhoneId,
          inspectionInd: 3
        }}
        onSubmit={(values, { resetForm }) => {
          //debugger;
          console.log(values);
          props.addDeliveryDate({
            ...values,
            transferInd: 2,
          }, props.rowData.locationId);
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >

              <div style={{ width: "90%" }}>
                <Field
                  name="locationId"
                  type="text"
                  width={"100%"}
                  placeholder="Location"
                  label="Location"
                  isRequired
                  // component={SelectComponent}
                  // options={Array.isArray(locationsName) ? locationsName : []}
                />
              </div>
              <div style={{ marginTop: "15px", marginLeft: "14px" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ plant, auth }) => ({
  userId: auth.userDetails.userId,
  plant: plant.plant
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getPlant,
    addDeliveryDate
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInventoryForm);
