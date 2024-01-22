import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {getKpilist,addKpi } from "./TeamsAction";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";


/**
 * yup validation scheme for creating a Team
 */
const TeamsSchema = Yup.object().shape({
  name: Yup.string().required("Please provide Team name"),

});

function KpiList(props) {
    useEffect(()=>{
        props.getKpilist(props.rowdata.departmentId)
    },[]);

  function handleReset(resetForm) {
    resetForm();
  }

  const kpiNameOption = props.kpiList.map((item) => {
    return {
      label: `${item.workflowName || ""}`,
      value: item.opportunityWorkflowDetailsId,
    };
  });
  const { addingKpi } = props;
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
          props.addKpi(values, () => handleReset(resetForm));
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
            <div class="flex justify-between  pr-2 max-sm:flex-col">
            <div class=" w-w47.5 max-sm:w-wk">
            <Field
              //name="customerId"
              isColumnWithoutNoCreate
              label={
                <FormattedMessage
                  id="app.kpi"
                  defaultMessage="KPI List"
                />
              } 
              component={SelectComponent}
              options={
                Array.isArray(kpiNameOption)
                  ? kpiNameOption
                  : []
              }
              isColumn
              margintop={"0"}
              //value={values.customerId}
              inlineLabel
            />
    
      </div>

    
        
        </div>
       
        <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
          <Button
            htmlType="submit"
            type="primary"
            Loading={addingKpi}
          >
            Submit
          </Button>
        </div>
      </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ teams, auth, area }) => ({
    userDetails: auth.userDetails,
    kpiList:teams.kpiList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getKpilist,
        addKpi
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(KpiList);
