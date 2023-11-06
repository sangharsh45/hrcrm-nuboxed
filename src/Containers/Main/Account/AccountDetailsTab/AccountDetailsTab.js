import React, { Component, lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import AccountOrderTable from "./AccountOrderTab/AccountOrderTable";
import { handleLinkDistributorOrderConfigureModal } from "../AccountAction"
import { Tooltip } from "antd";
import AddAccountModal from "./AccountOrderTab/AddAccountModal";
import AddIcon from '@mui/icons-material/Add';


const TabPane = StyledTabs.TabPane;

function AccountDetailsTab(props) {

    const [activeKey, setactiveKey] = useState("1")

    const handleTabChange = (key) => this.setState({ activeKey: key });

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" >
                    <TabPane
                        tab={
                            <>
                                <span defaultActiveKey="1" onClick={handleTabChange}>
                                    <i class="fas fa-shopping-bag"></i>
                                    <span style={{ marginLeft: "0.25em" }}>Order</span>
                                </span>

                                {activeKey === "1" && (
                                    <>
                                        <Tooltip title="Add Order">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleLinkDistributorOrderConfigureModal(true);
                                                }}
                                                size="14px"
                                                style={{
                                                    verticalAlign: "center",
                                                    marginLeft: "5px",
                                                }}
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="1"
                    >

                        <Suspense fallback={"Loading ..."}>
                            <AccountOrderTable />
                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fab fa-connectdevelop"></i>
                                    <span style={{ marginLeft: "0.25em" }}>Activity</span>
                                </span>

                            </>
                        }
                        key="6"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i className="fa fa-sticky-note" aria-hidden="true"></i>
                                    <span style={{ marginLeft: "0.25em" }}>Notes</span>
                                </span>
                            </>
                        }
                        key="3"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-history"></i>
                                    <span style={{ marginLeft: "0.25em" }}>History</span>
                                </span>
                            </>
                        }
                        key="4"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="far fa-file"></i>
                                    <span style={{ marginLeft: "0.25em" }}>Documents</span>
                                </span>

                            </>
                        }
                        key="5"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-file-contract"></i>
                                    &nbsp; Contact
                                </span>

                            </>
                        }
                        key="2"
                    >
                        <Suspense fallback={"Loading ..."}>
                            {" "}
                            {/* <ContactShipperTable shipperId={this.props.shipper.shipperId} /> */}
                        </Suspense>
                    </TabPane>
                </StyledTabs>
            </TabsWrapper>
            <AddAccountModal
                handleLinkDistributorOrderConfigureModal={props.handleLinkDistributorOrderConfigureModal}
                addLinkDistributorOrderConfigureModal={props.addLinkDistributorOrderConfigureModal}
            />

        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    addLinkDistributorOrderConfigureModal: distributor.addLinkDistributorOrderConfigureModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleLinkDistributorOrderConfigureModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsTab);
