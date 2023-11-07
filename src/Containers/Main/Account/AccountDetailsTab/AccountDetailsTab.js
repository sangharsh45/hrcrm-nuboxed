import React, { lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import AccountOrderTable from "./AccountOrderTab/AccountOrderTable";
import {
    handleLinkDistributorOrderConfigureModal,
    handleDistributorContactModal,
    handleDistributorActivityModal
} from "../AccountAction"
import { Tooltip } from "antd";
import AddAccountModal from "./AccountOrderTab/AddAccountModal";
import AddIcon from '@mui/icons-material/Add';
import AccountActivityTable from "./AccountActivityTab/AccountActivityTable";
import AccountActivityModal from "./AccountActivityTab/AccountActivityModal";
const AccountContactTable = lazy(() => import("./AccountContactTab/AccountContactTable"))
const AddAccountContact = lazy(() => import("./AccountContactTab/AddAccountContact"))


const TabPane = StyledTabs.TabPane;

function AccountDetailsTab(props) {

    const [activeKey, setactiveKey] = useState("1")

    const handleTabChange = (key) => setactiveKey(key);

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>
                    <TabPane
                        tab={
                            <>
                                <span >
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
                            <AccountOrderTable distributorId={props.distributorData.distributorId} />
                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-file-contract"></i>
                                    &nbsp; Contact
                                </span>
                                {activeKey === "2" && (
                                    <>
                                        <Tooltip title="Add Contact">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleDistributorContactModal(true);
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
                        key="2"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountContactTable distributorId={props.distributorData.distributorId} />
                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fab fa-connectdevelop"></i>
                                    <span style={{ marginLeft: "0.25em" }}>Activity</span>
                                </span>
                                {activeKey === "3" && (
                                    <>
                                        <Tooltip title="Create">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleDistributorActivityModal(true);
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
                        key="3"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountActivityTable distributorId={props.distributorData.distributorId} />
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
                        key="4"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane>

                    {/* <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-history"></i>
                                    <span style={{ marginLeft: "0.25em" }}>History</span>
                                </span>
                            </>
                        }
                        key="5"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane> */}
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

                </StyledTabs>
            </TabsWrapper>
            <AddAccountModal
                handleLinkDistributorOrderConfigureModal={props.handleLinkDistributorOrderConfigureModal}
                addLinkDistributorOrderConfigureModal={props.addLinkDistributorOrderConfigureModal}
                distributorId={props.distributorData.distributorId}
            />
            <AddAccountContact
                handleDistributorContactModal={props.handleDistributorContactModal}
                distributorContactModal={props.distributorContactModal}
                distributorId={props.distributorData.distributorId}
            />
            <AccountActivityModal
                addDistributorActivityModal={props.addDistributorActivityModal}
                handleDistributorActivityModal={props.handleDistributorActivityModal} />
        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    addLinkDistributorOrderConfigureModal: distributor.addLinkDistributorOrderConfigureModal,
    distributorContactModal: distributor.distributorContactModal,
    addDistributorActivityModal: distributor.addDistributorActivityModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleLinkDistributorOrderConfigureModal,
            handleDistributorContactModal,
            handleDistributorActivityModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsTab);
