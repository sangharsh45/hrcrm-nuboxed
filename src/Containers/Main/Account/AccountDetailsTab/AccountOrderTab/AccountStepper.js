
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { StyledSteps } from "../../../../../Components/UI/Antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import AddOrderInAccount from "./AddOrderInAccount";
import AccountOrderSecondStep from "./AccountOrderSecondStep";
import { FormattedMessage } from 'react-intl';

const Step = StyledSteps.Step;

class AccountStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            thirdPageData: {},
        };
    }
    handleSubmit = (data) => {
        this.setState({ thirdPageData: data });
        this.handleComplete();
    };
    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    };

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    };
    handleComplete = () => {
        console.log(this.state.thirdPageData);
    };

    render() {
        const steps = [
            {
                title: <FormattedMessage
                id="app.order"
                defaultMessage="Order"
               />,
                icon: <UserOutlined />,
                content: <AddOrderInAccount distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd} />,
            },
            {
                title: <FormattedMessage
                id="app.phonedetails"
                defaultMessage="Phone details"
               />,
                icon: <PhoneOutlined
                    style={{ color: "blue" }}
                />,
                content: <AccountOrderSecondStep distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd} />,
            },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        title={<i class="fas fa-cube" style={{ fontSize: "1.37em" }}></i>}
                        description={<FormattedMessage
                            id="app.materials"
                            defaultMessage="Materials"
                           />}
                    />
                    <Step
                        title={<UserOutlined style={{ fontSize: "1.37em" }} />}
                        description={<FormattedMessage
                            id="app.orderdetails"
                            defaultMessage="Order details"
                           />}
                    />

                </StyledSteps>
                <div
                    class="min-[50vh]"
                >{steps[current].content}</div>
                <div class="flex justify-end">
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <>
                                {current > 1 ? null : (
                                    <>
                                        <Button className="mt-2"
                                            type="primary"
                                            onClick={() => this.next()}
                                           
                                       >
                                          <FormattedMessage
                 id="app.proceed"
                 defaultMessage="Proceed"
                />
                                        </Button>
                                    </>
                                )}
                            </>
                        )}

                        {current > 0 && (
                            <Button className="mt-1"onClick={() => this.prev()}>
                             <FormattedMessage
                 id="app.previous"
                 defaultMessage="Previous"
                />
                            </Button>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ auth, distributor }) => ({
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountStepper);
