import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
// import { addDistributorOffer } from "../../ProductAction";

function CurrencyCoversionForm2(props)  {

        const { distributorStartDate, distributorEndDate } = props;
        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        currency2:"",

                    }}
                    onSubmit={(values, { resetForm }) => {
                        // this.props.addDistributorOffer({
                        //     ...values,
                        // });
                        resetForm();
                    }
                    }
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
                                        width: "100%",
                                    }}
                                >

                                    <div class="flex justify-between">
                                        <div style={{ width: "18%" }}>
                                            <Field
                                                isRequired
                                                name="currency2"
                                                isColumn
                                                label="Select"
                                                component={SelectComponent}
                                                inlineLabel
                                               options={["USD","EUR","GBP","INR"]}
                                                style={{
                                                    flexBasis: "80%",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "18%" }}>
                                            <Field
                                                isRequired
                                                name="currency2"
                                                isColumn
                                                label="Conversion Factor"
                                                component={InputComponent}
                                                inlineLabel
                                               options={["USD","EUR","GBP","INR"]}
                                                style={{
                                                    flexBasis: "80%",
                                                }}
                                            />
                                        </div>
                                        <div>
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    // loading={this.props.addingDistributorOffer}
                                    style={{
                                        marginTop: "20px",
                                        marginLeft: "286px",
                                    }}
                                >
                                    Add
                                </Button>
                                </div>
                                    </div>
                                </div>
                            </div>

                     
                        </Form>
                    )}
                </Formik>
            </>
        );
}


const mapStateToProps = ({ product }) => ({
    // addingDistributorOffer: product.addingDistributorOffer,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // setClearbitProductDistributorData,
            // addDistributorOffer,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyCoversionForm2);
