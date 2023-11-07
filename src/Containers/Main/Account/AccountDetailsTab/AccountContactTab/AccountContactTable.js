import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    StyledTable,
} from "../../../../../Components/UI/Antd";
import {
    getContactDistributorList,
    setEditDistributorContact,
    applyForLoginInContact,
    handleUpdateDistributorContactModal
} from "../../AccountAction";
import UpdateAccountContactModal from "./UpdateAccountContactModal";
import { Button, Tooltip } from "antd";
import { BorderColorOutlined } from "@mui/icons-material";
class AccountContactTable extends Component {

    componentDidMount() {
        this.props.getContactDistributorList(this.props.distributorId);
    }

    render() {
        const {


        } = this.props;
        const columns = [
            {
                title: "",
                width: "2%",
            },

            {
                title: "Name",
                width: "15%",
                render: (name, item, i) => {
                    return ` ${item.salutation || ""} ${item.firstName ||
                        ""} ${item.middleName || ""} ${item.lastName || ""}`
                }

            },
            {
                title: "Email",
                width: "15%",
                dataIndex: "emailId",
            },
            {
                title: "Mobile No",
                width: "15%",
                render: (name, item, i) => {
                    return ` ${item.dialCode1 || ""} ${item.mobileNo || ""} `
                }
            },
            {
                title: "Designation",
                dataIndex: "designationName",
                width: "15%",
            },
            {
                title: "Department",
                dataIndex: "departmentName",
                width: "15%",
            },
            {
                title: "",
                width: "12%",
                render: (name, item, i) => {
                    const data = {}
                    return (

                        <>
                            {/* {!item.accessInd && */}
                            <Button
                                onClick={() =>
                                    this.props.applyForLoginInContact(
                                        data,
                                        item.contactPersonId,
                                        this.props.distributorId,
                                        this.props.userId
                                    )}
                                style={{ backgroundColor: "blue", color: "white" }}
                            >Apply For Login</Button>
                            {/* } */}
                        </>
                    )
                }
            },
            {
                title: "",
                width: "3%",
                render: (name, item, i) => {
                    return (
                        <Tooltip title="Edit">
                            <BorderColorOutlined
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    this.props.setEditDistributorContact(item);
                                    this.props.handleUpdateDistributorContactModal(true);
                                }}
                            />
                        </Tooltip>
                    );
                },
            },
        ];
        const tab = document.querySelector(".ant-layout-sider-children");
        const tableHeight = tab && tab.offsetHeight * 1.2;
        return (
            <>
                {true && (
                    <StyledTable
                        rowKey="contactPersonId"
                        columns={columns}
                        dataSource={this.props.contactDistributor}
                        Loading={this.props.fetchingContactDistributorsById}
                        onChange={console.log("task onChangeHere...")}
                        scroll={{ y: tableHeight }}
                        pagination={false}

                    />
                )}
                <UpdateAccountContactModal
                    handleUpdateDistributorContactModal={this.props.handleUpdateDistributorContactModal}
                    updateDistributorContactModal={this.props.updateDistributorContactModal}
                />
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    contactDistributor: distributor.contactDistributor,
    updateDistributorContactModal: distributor.updateDistributorContactModal,
    fetchingContactDistributorsById: distributor.fetchingContactDistributorsById,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setEditDistributorContact,
            getContactDistributorList,
            applyForLoginInContact,
            handleUpdateDistributorContactModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountContactTable);


