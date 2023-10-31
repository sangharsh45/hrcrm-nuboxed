import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip } from "antd";
import { Spacer } from "../../../Components/UI/Elements";
import {
    getDeletedDistributors,
    handleDistributorActivityTableModal,
} from "./AccountAction";
// import DistributorDetailsView from "./DistributorDetailView";
// import AddDistributorActivityModal from "../DistributorDetail/DistributorDetailsTab/AddDistributorActivityModal";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";

function AccountDeleteTable(props) {
    useEffect(() => {
        props.getDeletedDistributors();
    }, []);

    const { handleUpdateDistributorModal, updateDistributorModal, deletedDistributors } = props;

    const [currentDistributorId, setCurrentDistributorId] = useState("");

    function handleSetCurrentDistributorId(distributorId) {
        setCurrentDistributorId(distributorId);
    }

    const columns = [
        {
            title: "",
            width: "2%",
        },
        {
            title: "Name",
            // width: "15%",
            defaultSortOrder: "descend",
            // sorter: (a, b) => a.name - b.name,
            // render: (name, item, i) => (
            //     <DistributorDetailsView
            //         distributorId={item.distributorId}
            //         name={item.name}
            //     />
            // ),
        },

        {
            title: "Mobile",
            dataIndex: "phoneNo",
            render: (name, item, i) => {
                return (
                    <>
                        {item.dialCode} {item.phoneNo}
                    </>
                )
            }
        },
        {
            title: "Website",
            width:"15%",
            dataIndex: "url",
        },
        {
            title: "Address",
            width:"20%",
            render: (name, item, i) => {
                return `${item.addresses[0].address1 || ""} ${item.addresses[0]
                    .address2 || ""} ${item.addresses[0].street || ""} 
                ${item.addresses[0].city || ""}
                    `;
            },
        },        
        {
            title: "City",
            render: (name, item, i) => {
                return `${item.addresses[0].city || ""}`;
            },
        },
        {
            title: "Pin Code",
            render: (name, item, i) => {
                return `${item.addresses[0].pinCode || ""}`;
            },
        },
        {
            title: props.recriutmentInd ? "Status" : "",
            width: props.recriutmentInd ? "10%" : "",
        },

        {
            title: "",
            dataIndex: "documentId",
            render: (name, item, i) => {
                return (
                    <Tooltip title="Activity">
                        <span>
                            <i
                                class="fab fa-connectdevelop"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    props.handleDistributorActivityTableModal(true);
                                    handleSetCurrentDistributorId(item.distributorId);
                                }}
                            ></i>
                        </span>
                    </Tooltip>
                );
            },
        },

    ];
    if (props.fetchingDeletedDistributorsError) {
        return <APIFailed />
    }

    return (
        <>
            <StyledTable
                rowKey=""
                columns={columns}
                dataSource={deletedDistributors}
                loading={props.fetchingDeletedDistributors || props.fetchingDeletedDistributorsError}
                pagination={false}
                scroll={{ y: 320 }}
            />
            {/* <AddDistributorActivityModal
                addDistributorActivityTableModal={props.addDistributorActivityTableModal}
                handleDistributorActivityTableModal={props.handleDistributorActivityTableModal}
                distributorId={currentDistributorId}
                handleSetCurrentDistributorId={handleSetCurrentDistributorId}
            /> */}
            <Spacer />
        </>
    );
}
const mapStateToProps = ({ distributor, auth }) => ({
    fetchingDeletedDistributors: distributor.fetchingDistributors,
    fetchingDeletedDistributorsError: distributor.fetchingDistributorsError,
    deletedDistributors: distributor.deletedDistributors,
    userId: auth.userDetails.userId,
    addDistributorActivityTableModal: distributor.addDistributorActivityTableModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDeletedDistributors,
            handleDistributorActivityTableModal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDeleteTable);
