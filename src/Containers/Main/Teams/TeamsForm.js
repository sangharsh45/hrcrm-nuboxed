import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import {getTeamMemberlist,addTeams} from "../Teams/TeamsAction"
import { FormattedMessage } from "react-intl";
import Upload from "../../../Components/Forms/Formik/Upload";
import { Spacer } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../Components/UI/Layout";

/**
 * yup validation scheme for creating a Team
 */
const TeamsSchema = Yup.object().shape({
  name: Yup.string().required("Please provide Team name"),

});

function TeamsForm(props) {
  useEffect(() => {
props.getTeamMemberlist();
  }, []);

  function handleReset(resetForm) {
    resetForm();
  }

  const employeesData = props.teamEmployeeList.map((item) => {
    return {
      label: `${item.empName}`,
      value: item.employeeId,
    };
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          teamMember:[],
          teamName: "",
      
        }}
        // validationSchema={TeamsSchema}
        onSubmit={(values, { resetForm }) => {
          props.addTeams(values, () => handleReset(resetForm));
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
          <Form class="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                
                <Spacer />
                  <FastField name="imageId" component={Upload} />
                        
                 <FlexContainer style={{ justifyContent: "space-between",marginTop:"1rem" }}>
                  <div style={{ width: "100%" }}>
                  <Field
                  name="teamName"
                  label="Name"
                  type="text"
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  inlineLabel
                  isRequired
                  
                />          
                 <Field
                    name="teamMember"
                    // label="Include"
                    label={
                      <FormattedMessage
                        id="app.teamMember"
                        defaultMessage="Team Member"
                      />
                    }
                    mode
                    placeholder="Select"
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    value={values.teamMember}
                    // defaultValue={{
                    //   label: `${fullName || ""} `,
                    //   value: employeeId,
                    // }}
                  />
                  </div>
                </FlexContainer>          
              </div>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                {/* <FlexContainer style={{ justifyContent: "space-between" }}>
                  <div style={{ width: "100%" }}>
                    <Field
                      isRequired
                      name="state"
                      type="text"
                      label="State"
                      options={["Tripura"]}
                      component={SelectComponent}
                      isColumn
                      inlineLabel
                      
                    />                
                    <Field
                      isRequired
                      name="city"
                      type="text"
                      label="City"
                      options={["Agartala"]}
                      component={SelectComponent}
                      isColumn
                      inlineLabel
                     
                    />
                  </div>
                </FlexContainer>              */}
           
              </div>
            </div>
            <Spacer />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingTeam}
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

const mapStateToProps = ({ teams, auth, area }) => ({
  teamEmployeeList:teams.teamEmployeeList,
  addingTeam:teams.addingTeam,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTeamMemberlist,
      addTeams
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TeamsForm);
