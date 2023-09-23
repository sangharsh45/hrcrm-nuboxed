import { Field, Form, Formik } from 'formik'
import React from 'react'
import { FormattedMessage } from "react-intl";
import { MainWrapper } from "../../Components/UI/Elements";
import { Spacer } from "../../Components/UI/Elements";
import { TimePicker } from "../../Components/Forms/Formik/TimePicker";
import { InputComponent } from '../../Components/Forms/Formik/InputComponent'

function SecondInvoicePage() {
    return (
        <>
        <MainWrapper >
            <Formik>
                <Form style={{ minHeight:"30vh"}}>
                <div class=" flex justify-between ">
              <div class=" h-full w-1/2">
              <div class=" flex justify-between">
              <div class=" w-5/12">
              <Field
                          isRequired
                          name="billingAddress"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.billingAddress"
                              defaultMessage="Billing Address"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          style={{
                            width: "100%",
                          }}
                        />
             </div>
             <Spacer />
                    <div class=" w-5/12">
                  <Field
                          isRequired
                          name="contactPerson"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.projectName"
                              defaultMessage="Contact Person"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          style={{
                            width: "100%",
                          }}
                        />
                  </div>
                </div>
              </div>
         
           
           </div>
                </Form>
            </Formik>
            </MainWrapper>
        </>
    )
}

export default SecondInvoicePage;