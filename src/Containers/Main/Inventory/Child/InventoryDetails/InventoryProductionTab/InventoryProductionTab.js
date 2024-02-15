import React, { Component, lazy, PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import { withRouter } from "react-router";

const TabPane = StyledTabs.TabPane;
class InventoryProductionTab extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "1",
        };
    }


    handleTabChange = (key) => this.setState({ activeKey: key });

    render() {
        const { activeKey } = this.state;
        console.log(this.props.match);

        return (
            <>
                <TabsWrapper>
                    <StyledTabs
                        defaultActiveKey="1"
                        onChange={this.handleTabChange}
                    >

                        <TabPane
                            tab={
                                <>
                                    <i class="fas fa-satellite-dish"></i>&nbsp; WIP
                                </>
                            }
                            key="1"
                        >
                            {" "}
                            <Suspense fallback={"Loading..."}>
                            </Suspense>
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <i class="fab fa-linode"></i>  &nbsp; Dispatch
                                </>
                            }
                            key="2"
                        >
                            {" "}
                            <Suspense fallback={"Loading..."}>

                            </Suspense>
                        </TabPane>

                    </StyledTabs>
                </TabsWrapper>

            </>
        );
    }
}
const mapStateToProps = ({ inventory, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InventoryProductionTab)

);

