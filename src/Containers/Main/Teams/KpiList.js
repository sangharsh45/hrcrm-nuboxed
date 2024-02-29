import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import {getKpilist,addKpi, } from "./TeamsAction";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import AssigenedKpiCardList from "./TeamsCard.js/AssigenedKpiCardList";


/**
 * yup validation scheme for creating a Team
 */
const TeamsSchema = Yup.object().shape({
  name: Yup.string().required("Please provide Team name"),

});

function KpiList(props) {
  const [selected, setSelected] = useState("");
    useEffect(()=>{
        props.getKpilist(props.rowdata.departmentId)
        // props.getEmployeeKpiList(props.rowdata.employeeId)
    },[]);

  function handleReset(resetForm) {
    resetForm();
  }

  const handleWorkflowChange = (event) => {
    const selected = event.target.value;
    setSelected(selected);
    // setSelectedUser("");
    // props.getDepartmentwiserUser(selected) // Assuming you want to pass the selected department and filtered roles to a parent component
  };

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
          // performanceManagementId:[],
          employeeId:props.rowdata.employeeId,
          performanceManagementId: selected,
          assignedValue:"",
      
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
            <label class=" text-[#444] font-bold text-[0.75rem]" >KPI</label>&nbsp;
                      <select  className="customize-select"
                       
                      onChange={handleWorkflowChange}>
          <option value="">Select Kpi</option>
          {props.kpiList.map((item, index) => (
            <option 
           
            key={index} value={item.performanceManagementId}>
              {item.kpi}
            </option>
          ))}
        </select>
            {/* <Field
              name="performanceManagementId"
              isColumnWithoutNoCreate
              label={
                <FormattedMessage
                  id="app.kpi"
                  defaultMessage="KPI List"
                />
              } 
              onChange={(selectedValue) => setSelected(selectedValue)}
              component={SelectComponent}
              options={kpiNameOption}
              isColumn
              margintop={"0"}
              //value={values.customerId}
              inlineLabel
            />  */}
    
      </div>
      {selected && (
          <>                                           
        <div class=" w-[45%]" >
                          <FastField
                            // isRequired
                            name="assignedValue"
                            type="text"
                            // width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                          {/* <input value={this.state.value} onChange={this.onNumber}/> */}
                        </div>               
</> 
        )}   
     <div class="flex justify-end w-wk  ">
          <Button
            htmlType="submit"
            type="primary"
            Loading={addingKpi}
          >
            Submit
          </Button>
        </div>
        
        </div>
       
       
      </Form>
   
        )}
      </Formik>
      <AssigenedKpiCardList  rowdata={props.rowdata}/>
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
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(KpiList);
