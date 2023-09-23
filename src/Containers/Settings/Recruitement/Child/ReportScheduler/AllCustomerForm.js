import React,{ useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { MainWrapper } from "../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {addScheduler,
} from "../../../SettingsAction";
import dayjs from "dayjs";


function AllCustomerForm(props) {
    // useEffect(() => {
    //   props.getScheduler(props.departmentId)
    // },[props.departmentId])
    // console.log(props.departmentId)
  return (
    <>
      <Formik
       enableReinitialize
        initialValues={{
          type: props.scheduler.type,
          frequency: props.scheduler.frequency,
          department: props.departmentId
        }}
        onSubmit={(values) => {
          props.addScheduler(
            {
                ...values,
            },
            props.departmentId
        )
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
            <MainWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  height: "100%",
                  width: "100%",
                  alignItems: "end",
                }}
              >
                
                <div style={{ width: "20%" }}  >           
                 
                  <Field
                    name="type"                   
                    label="Report"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={SelectComponent}
                    options={[ "Requirment", "Selected"] }  
                    inlineLabel
                  />
                </div>
                <div style={{ width: "20%" }}  > 
                  <Field
                    name="frequency"
                    label="Frequency"
                    type="text"
                    isColumn
                    width={"100%"}
                    options={["Daily", "Weekly","Monthly", ]}                    
                    component={SelectComponent}
                    inlineLabel
                  />
                  
                </div>  
              
                <div
                  style={{               
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                   // loading={props.addingInventoryConsumption}
                  >Add</Button>
                </div>
               
              </div>
              <h4>Updated on {dayjs(props.scheduler && props.scheduler.length && props.scheduler[0].updationDate).format("ll")} by {props.scheduler && props.scheduler.length && props.scheduler[0].name}</h4>             
            </MainWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth,settings}) => ({
  // departmentId:settings.departmentList.departmentId,
  scheduler: settings.scheduler,
  addingScheduler: settings.addingScheduler,
  addingSchedulerError: settings.addingSchedulerError,  
  fetchingScheduler: settings.fetchingScheduler,
  fetchingSchedulerError: settings.fetchingSchedulerError,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addScheduler,
     

     
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCustomerForm);
