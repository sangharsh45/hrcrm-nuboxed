import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getContactDistributorList,
    setEditDistributorContact,
    applyForLoginInContact,
    handleUpdateDistributorContactModal
} from "../../AccountAction";
import UpdateAccountContactModal from "./UpdateAccountContactModal";
import { Button, Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import moment from "moment";
import { OnlyWrapCard } from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";

class AccountContactTable extends Component {

    componentDidMount() {
        this.props.getContactDistributorList(this.props.distributorId);
    }

    render() {
        const {
            fetchingContactDistributorsById

        } = this.props;
        if (fetchingContactDistributorsById) {
            return <BundleLoader />;
        }
        const tab = document.querySelector(".ant-layout-sider-children");
        const tableHeight = tab && tab.offsetHeight * 1.2;
        return (
            <>
                <div className=' flex justify-end sticky top-28 z-auto'>
                    <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
                            <div className=" md:w-[3.1rem]"><FormattedMessage id="app.name" defaultMessage="Name"/></div>
                            <div className=" md:w-[3.1rem]"><FormattedMessage id="app.email" defaultMessage="Email"/></div>
                            <div className=" md:w-[4.8rem] "><FormattedMessage id="app.Mobile No" defaultMessage="Mobile No"/></div>
                            <div className="md:w-[2.9rem]"><FormattedMessage id="app.Designation" defaultMessage="Designation"/></div>
                            <div className="md:w-[27.8rem]"><FormattedMessage id="app.Department" defaultMessage="Department"/></div>


                        </div>
                        {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      > */}

                        {this.props.contactDistributor.map((item) => { 
                            const data = {}
                            return (
                                <div>
                                    <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
                                    >
                                        <div class="flex">

                                            <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""
                                                        } ${item.lastName || ""}`}
                                                </h4>

                                            </div>


                                            <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">


                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {item.emailId}
                                                </h4>

                                            </div>

                                        </div>

                                        <div className=" flex font-medium flex-col md:w-[16rem] max-sm:flex-row w-full max-sm:justify-between ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.designationName}

                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col md:w-96 max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.departmentId}

                                            </div>
                                        </div>

                                        <div class="flex md:items-center">
                                            <div class="flex">
                                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">


                                                    {!item.accessInd && <h4 class=" text-xs text-cardBody font-poppins">
                                                        <Button
                                                            onClick={() =>
                                                                this.props.applyForLoginInContact(
                                                                    data,
                                                                    item.contactPersonId,
                                                                    this.props.distributorId,
                                                                    this.props.userId
                                                                )}
                                                            style={{ backgroundColor: "blue", color: "white" }}
                                                        ><FormattedMessage id="app.applyforlogin" defaultMessage="Apply For Login"/></Button>
                                                    </h4>}

                                                </div>
                                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">


                                                    <h4 class=" text-xs text-cardBody font-poppins">
                                                        <Tooltip title="Edit">
                                                            <BorderColorIcon
                                                                style={{ cursor: "pointer", fontSize: "1rem", color: "grey", }}
                                                                onClick={() => {
                                                                    this.props.setEditDistributorContact(item);
                                                                    this.props.handleUpdateDistributorContactModal(true);
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </h4>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            )
                        })}

                    </OnlyWrapCard>
                </div>

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

// const columns = [
//     {
//         title: "",
//         width: "2%",
//     },

//     {
//         title: "Name",
//         width: "15%",
//         render: (name, item, i) => {
//             return ` ${item.salutation || ""} ${item.firstName ||
//                 ""} ${item.middleName || ""} ${item.lastName || ""}`
//         }

//     },
//     {
//         title: "Email",
//         width: "15%",
//         dataIndex: "emailId",
//     },
//     {
//         title: "Mobile No",
//         width: "15%",
//         render: (name, item, i) => {
//             return ` ${item.dialCode1 || ""} ${item.mobileNo || ""} `
//         }
//     },
//     {
//         title: "Designation",
//         dataIndex: "designationName",
//         width: "15%",
//     },
//     {
//         title: "Department",
//         dataIndex: "departmentName",
//         width: "15%",
//     },
//     {
//         title: "",
//         width: "12%",
//         render: (name, item, i) => {
//             const data = {}
//             return (

//                 <>
//                     {/* {!item.accessInd && */}
//                     <Button
//                         onClick={() =>
//                             this.props.applyForLoginInContact(
//                                 data,
//                                 item.contactPersonId,
//                                 this.props.distributorId,
//                                 this.props.userId
//                             )}
//                         style={{ backgroundColor: "blue", color: "white" }}
//                     >Apply For Login</Button>
//                     {/* } */}
//                 </>
//             )
//         }
//     },
//     {
//         title: "",
//         width: "3%",
//         render: (name, item, i) => {
//             return (
//                 <Tooltip title="Edit">
//                     <BorderColorOutlined
//                         style={{ cursor: "pointer" }}
//                         onClick={() => {
//                             this.props.setEditDistributorContact(item);
//                             this.props.handleUpdateDistributorContactModal(true);
//                         }}
//                     />
//                 </Tooltip>
//             );
//         },
//     },
// ];


