import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip } from "antd";
import { Spacer } from "../../../Components/UI/Elements";
import {
  getDeletedShipper,
  handleShipperActivityTableModal,
} from "./ShipperAction";
import ShipperDetailsView from "./ShipperDetailsView";
import AddShipperActivityModal from "./AddShipperActivityModal";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";

function ShipperDeleteTable(props) {
  useEffect(() => {
    props.getDeletedShipper();
  }, []);

  const {
    handleUpdateShipperModal,
    updateShipperModal,
    deletedShipper,
  } = props;

  const [currentShipperId, setCurrentShipperId] = useState("");

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
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
      render: (name, item, i) => (
        <ShipperDetailsView shipperId={item.shipperId} name={item.name} />
      ),
    },

    {
      title: "Phone #",
      dataIndex: "phoneNo",
      render: (name, item, i) => {
        return (
          <>
            {item.dialCode} {item.phoneNo}
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "emailId",
    },

    {
      title: "Mobile No",
      dataIndex: "mobileNo",
    },

    {
      title: "Ship By",
      dataIndex: "shipBy",
    },
    {
      title: "Address",
      //  dataIndex: "addressId",
      render: (name, item, i) => {
        return `${(item.addresses &&
          item.addresses.length &&
          item.addresses[0].address1) ||
          ""},
                      ${(item.addresses &&
                        item.addresses.length &&
                        item.addresses[0].state) ||
                        ""},
                      ${(item.addresses &&
                        item.addresses.length &&
                        item.addresses[0].street) ||
                        ""},
                      ${(item.addresses &&
                        item.addresses.length &&
                        item.addresses[0].city) ||
                        ""},
                      ${(item.addresses &&
                        item.addresses.length &&
                        item.addresses[0].pinCode) ||
                        ""}`;
      },
    },

    {
      title: "Pin Code",
      render: (name, item, i) => {
        return `${(item.addresses &&
          item.addresses.length &&
          item.addresses[0].pinCode) ||
          ""}`;
      },
    },
    {
      title: "City",
      render: (name, item, i) => {
        return `${(item.addresses &&
          item.addresses.length &&
          item.addresses[0].city) ||
          ""}`;
      },
    },
    {
      title: props.recriutmentInd ? "Status" : "",
      width: props.recriutmentInd ? "10%" : "",
    },
    // {
    //     title: "",
    //     dataIndex: "documentId",
    //     render: (name, item, i) => {
    //         return (
    //             <Tooltip title="Order">
    //                 <ShoppingCartOutlined

    //                     style={{ marginLeft: "35px" }}
    //                     // style={{ cursor: "pointer", fontSize: "12px" }}
    //                     onClick={() => {
    //                         props.handleShipperOrderModal(true);
    //                         handleSetCurrentShipperId(item.ShipperId);
    //                     }}
    //                 />
    //             </Tooltip>
    //         );
    //     },
    // },
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
                  props.handleShipperActivityTableModal(true);
                  handleSetCurrentShipperId(item.shipperId);
                }}
              ></i>
            </span>
          </Tooltip>
        );
      },
    },
  ];
  if (props.fetchingDeletedShipperError) {
    return <APIFailed />;
  }

  return (
    <>
      <StyledTable
        rowKey=""
        columns={columns}
        dataSource={deletedShipper}
        loading={
          props.fetchingDeletedShipper || props.fetchingDeletedShipperError
        }
        pagination={false}
        scroll={{ y: 320 }}
      />
      <AddShipperActivityModal
        addShipperActivityTableModal={props.addShipperActivityTableModal}
        handleShipperActivityTableModal={props.handleShipperActivityTableModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      />
      <Spacer />
    </>
  );
}
const mapStateToProps = ({ shipper, auth }) => ({
  fetchingDeletedShipper: shipper.fetchingShipper,
  fetchingDeletedShipperError: shipper.fetchingShipperError,
  deletedShipper: shipper.deletedShipper,
  userId: auth.userDetails.userId,
  // addShipperOrderModal: shipper.addShipperOrderModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedShipper,
      handleShipperActivityTableModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDeleteTable);
