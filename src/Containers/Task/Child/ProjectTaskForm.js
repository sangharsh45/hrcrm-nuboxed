import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {addProjectTask}from "../TaskAction"
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer } from "../../../Components/UI/Elements";
import { FlexContainer } from "../../../Components/UI/Layout";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import dayjs from "dayjs";

/**
 * yup validation scheme for creating a opportunity
 */


class ProjectTaskForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

//   componentDidMount() {
//     this.props.getRecruiterName();
//     this.props.getAllSalesList();
//   }

  render() {

 
console.log("Item2",this.props.item.hourId)


    const {
      user: { userId },
      candidateDate,
      onboardDate,
      actualEndDate,
      value
     
    } = this.props;
  
    return (
      <>
        <Formik
          initialValues={{
            approveInd:true,
            approveUnit:"",
            hourId:this.props.item.hourId
           
                     

           
           


          }}
          
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);
            

           

            //let newStartDate = dayjs(values.date).format("YYYY-MM-DD");

            this.props.addProjectTask(
              {
                ...values,
                // onboardDate: dayjs(values.onboardDate).toISOString(),
                // actualEndDate:dayjs(values.actualEndDate),
                // actualEndDate:dayjs(values.actualEndDate),
                // finalBilling:parseFloat(values.finalBilling),
                // billableHour:parseFloat(values.billableHour) 
                 
                
             
              },
            //   this.props.userId,
              // this.props.customerId,
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
            <Spacer/>
            <FlexContainer justifyContent="space-between">
                  <div style={{width:"47%"}}>              
                    <Field
                      isRequired
                      name="approveUnit"              
                      label="Approve Unit"
                      component={InputComponent}
                     
                      inlineLabel
                      isColumn
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                
               
                
              
                  </FlexContainer>
              
               
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
              Loading={this.props.projectTask}
                >
                Update
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, task,contact, customer }) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    projectTask:task.projectTask
   
    
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

        addProjectTask
     
        // addCandidateDate

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTaskForm);
