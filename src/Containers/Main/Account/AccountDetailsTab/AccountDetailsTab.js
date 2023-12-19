import React, { lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { FlexContainer, TabsWrapper } from "../../../../Components/UI/Layout";
import AccountOrderTable from "./AccountOrderTab/AccountOrderTable";
import {
    handleLinkDistributorOrderConfigureModal,
    handleDistributorContactModal,
    handleDistributorActivityModal,
    getOrderRecords,
    handleDistributorDocumentUploadModal,
    handleOrderGenerateModal,
    handleAddOrderModal
} from "../AccountAction"
import { Tooltip, Badge, Breadcrumb, Button } from "antd";
import AddAccountModal from "./AccountOrderTab/AddAccountModal";
import AddIcon from '@mui/icons-material/Add';
import NotesForm from "./AccountNoteTab/NoteForm"
import AccountActivityTable from "./AccountActivityTab/AccountActivityTable";
import AccountActivityModal from "./AccountActivityTab/AccountActivityModal";
import AddDistributorDocumentModal from "./AccountDocumentTab/AddDistributorDocumentModal";
import DistributorDocumentTable from "./AccountDocumentTab/DistributorDocumentTable";
import LinkedDistributorNotes from "./AccountNoteTab/LinkedDistributorNotes";
import AccountOrderGenerateTable from "./AccountOrder1Tab/AccountOrderGenerateTable";
import AccountOrder1Table from "./AccountOrder1Tab/AccountOrder1Table";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import OrderGenerateModal from "./AccountOrder1Tab/OrderGenerateModal";
import CatalogueOrderModal from "./AccountOrder1Tab/CatalogueOrderModal";
const AccountContactTable = lazy(() => import("./AccountContactTab/AccountContactTable"))
const AddAccountContact = lazy(() => import("./AccountContactTab/AddAccountContact"))


const TabPane = StyledTabs.TabPane;

function AccountDetailsTab(props) {
    useEffect(() => {
        props.getOrderRecords(props.distributorData.distributorId);

    }, []);
    const [activeKey, setactiveKey] = useState("1")
    const [breadCumb, setBreadCumb] = useState(false)

    const handleOrderCreateClick = (data) => {
        setBreadCumb(data);
    };

    const handleTabChange = (key) => setactiveKey(key);

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>
                    <TabPane
                        tab={
                            <>
                                <Badge
                                    size="small"
                                    count={(props.orderRecordData.order) || 0}
                                    overflowCount={999}
                                >
                                    <span >
                                        <i class="fas fa-shopping-bag"></i>
                                        <span style={{ marginLeft: "0.25em" }}>Order</span>
                                    </span>
                                </Badge>
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
                    {/* <TabPane
                        tab={
                            <>
                                <span onClick={() => handleOrderCreateClick(false)}>
                                    <i class="fas fa-shopping-bag"></i>
                                    <span style={{ marginLeft: "0.25em" }}>Order 1</span>
                                </span>
                                {activeKey === "2" && (
                                    <>
                                        <Tooltip title="Create">
                                            <PlusOutlined
                                                onClick={() => handleOrderCreateClick(true)}
                                                size="0.875em"
                                                style={{
                                                    verticalAlign: "center",
                                                    marginLeft: "0.25em",
                                                }}
                                            />
                                        </Tooltip>
                                    </>
                                )}</>}
                        key="2"
                    >
                        {breadCumb ? (
                            <>
                                <Breadcrumb
                                    style={{
                                        marginBottom: "0.625em",
                                        marginTop: "0.625em",
                                        marginLeft: "0.625em",
                                    }}
                                >
                                    <Breadcrumb.Item>
                                        <b>Click on Cart to add items from Catalogue</b>
                                        <Tooltip title="Create">
                                            <ShoppingCartOutlined
                                                onClick={() => {
                                                    props.handleAddOrderModal(true);
                                                }}
                                                style={{
                                                    marginLeft: "0.25em",
                                                    verticalAlign: "center",
                                                    color: "tomato",
                                                    fontSize: "2em",
                                                    marginTop: "-2px",
                                                }}
                                            />
                                        </Tooltip>

                                    </Breadcrumb.Item>
                                </Breadcrumb>
                                <Suspense fallback={"Loading..."}>
                                    <AccountOrderGenerateTable />
                                </Suspense>
                                <FlexContainer
                                    justifyContent="flex-end"
                                    style={{ marginTop: "0.3125em" }}
                                >
                                    <Button
                                        className="ant-btn-generate-order"
                                        type="primary"
                                        //   disabled={!this.props.orderForGenerating.length}
                                        onClick={() =>
                                            props.handleOrderGenerateModal(
                                                true
                                            )
                                        }
                                    >
                                        Generate Order
                                    </Button>
                                </FlexContainer>
                            </>
                        ) : (
                            <Suspense fallback={"Loading..."}>
                                <AccountOrder1Table />
                            </Suspense>
                        )}
                    </TabPane> */}
                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-file-contract"></i>
                                    &nbsp; Contact
                                </span>
                                {activeKey === "3" && (
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
                        key="3"
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
                                {activeKey === "4" && (
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
                        key="4"
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
                        key="5"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <LinkedDistributorNotes />
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
                                {activeKey === "6" && (
                                    <>
                                        <Tooltip title="Create">
                                            <AddIcon
                                                // type="plus"
                                                // tooltipTitle="Create"
                                                onClick={() =>
                                                    props.handleDistributorDocumentUploadModal(
                                                        true
                                                    )
                                                }
                                                size="0.875em"
                                                style={{
                                                    verticalAlign: "center",
                                                    marginLeft: "0.25em",
                                                }}
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="6"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <DistributorDocumentTable
                                distributorId={props.distributorData.distributorId}
                            />
                        </Suspense>
                    </TabPane>


                </StyledTabs>
            </TabsWrapper>
            <AddDistributorDocumentModal
                distributorDocumentUploadModal={
                    props.distributorDocumentUploadModal
                }
                handleDistributorDocumentUploadModal={
                    props.handleDistributorDocumentUploadModal
                }
            />
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
            <CatalogueOrderModal
                handleAddOrderModal={props.handleAddOrderModal}
                addCatalogueOrderModal={props.addCatalogueOrderModal}
            />
            <OrderGenerateModal
                generateOrderModal={props.generateOrderModal}
                handleOrderGenerateModal={props.handleOrderGenerateModal}
            />
        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    orderRecordData: distributor.orderRecordData,
    addLinkDistributorOrderConfigureModal: distributor.addLinkDistributorOrderConfigureModal,
    distributorContactModal: distributor.distributorContactModal,
    distributorDocumentUploadModal: distributor.distributorDocumentUploadModal,
    addDistributorActivityModal: distributor.addDistributorActivityModal,
    generateOrderModal: distributor.generateOrderModal,
    addCatalogueOrderModal: distributor.addCatalogueOrderModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleLinkDistributorOrderConfigureModal,
            handleDistributorContactModal,
            handleDistributorActivityModal,
            getOrderRecords,
            handleDistributorDocumentUploadModal,
            handleOrderGenerateModal,
            handleAddOrderModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsTab);
