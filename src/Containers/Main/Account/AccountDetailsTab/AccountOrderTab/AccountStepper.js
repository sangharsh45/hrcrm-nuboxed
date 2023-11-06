
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { bindActionCreators } from "redux";
import { StyledSteps } from "../../../../../Components/UI/Antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import AddOrderInAccount from "./AddOrderInAccount";
import AddPhoneExcel from "./AddPhoneExcel";

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
                title: 'Order',
                icon: <UserOutlined />,
                content: <AddOrderInAccount />,
            },
            {
                title: 'Add Phone details',
                icon: <PhoneOutlined
                    style={{ color: "blue" }}
                />,
                content: <AddPhoneExcel />,
            },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        // title={<ShoppingCartOutlined style={{ fontSize: "1.37em" }} />}
                        title={<i class="fas fa-cube" style={{ fontSize: "1.37em" }}></i>}
                        // type="shopping-cart"
                        description="Materials"
                    />
                    <Step
                        title={<UserOutlined style={{ fontSize: "1.37em" }} />}
                        // type="user"
                        description="Other item"
                    />

                </StyledSteps>
                <div
                    style={{ minHeight: "40vh" }}
                >{steps[current].content}</div>
                <FlexContainer justifyContent="flex-end">
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <>
                                {current > 1 ? null : (
                                    <>
                                        <Button
                                            type="primary"
                                            onClick={() => this.next()}
                                            style={{ marginTop: "7px" }}
                                        // disabled={this.props.serachedData === null}
                                        >
                                            Proceed
                                        </Button>
                                    </>
                                )}
                            </>
                        )}

                        {current > 0 && (
                            <Button style={{ marginTop: "2px" }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                    </div>
                </FlexContainer>
            </>
        );
    }
}

const mapStateToProps = ({ auth, distributor }) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountStepper);
