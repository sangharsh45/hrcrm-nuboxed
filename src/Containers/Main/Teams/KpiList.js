import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {getKpilist,addKpi,getEmployeeKpiList } from "./TeamsAction";
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
        props.getEmployeeKpiList(props.rowdata.employeeId)
    },[]);

  function handleReset(resetForm) {
    resetForm();
  }

  const kpiNameOption = props.kpiList.map((item) => {
    return {
      label: `${item.kpi || ""}`,
      value: item.performanceManagementId,
    };
  });
  const { addingKpi } = props;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          performanceManagementId:[],
          employeeId:props.rowdata.employeeId,
          // performanceManagementId: "",
      
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
                    name="performanceManagementId"
                    // label="Include"
                    label={
                      <FormattedMessage
                        id="app.KPIList"
                        defaultMessage="KPI List"
                      />
                    }
                    mode
                    placeholder="Select"
                    component={SelectComponent}
                    options={Array.isArray(kpiNameOption) ? kpiNameOption : []}
                    value={values.performanceManagementId}
                    defaultValue={{
                      label: `${props.kpi || ""} `,
                      value: props.performanceManagementId,
                    }}
                  />
            {/* <Field
              name="performanceManagementId"
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
            /> */}
    
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
    employeeKpiList:teams.employeeKpiList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getKpilist,
        addKpi,
        getEmployeeKpiList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(KpiList);
