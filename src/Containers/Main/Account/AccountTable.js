import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Input, Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Spacer } from "../../../Components/UI/Elements";
import {
  getAllDistributorsList,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributorData,
  handleBillingAddressModal
} from "./AccountAction";
import Highlighter from "react-highlight-words";
import moment from "moment";
import AccountDetailsView from "./AccountDetailsView";


function AccountTable(props) {
  useEffect(() => {
    props.getAllDistributorsList();
  }, []);

  const columns = [
    {
      title: "",
      width: "1%",
    },
    {
      title: "Name",
      width: "12%",
      defaultSortOrder: "descend",
      dataIndex: "name",
      sorter: (a, b) => {
        var nameA = a.name.toLowerCase(); // ignore upper and lowercase
        var nameB = b.name.toLowerCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            <AccountDetailsView
              distributorId={item.distributorId}
              name={item.name}
            />
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },

    {
      title: "Work",
      dataIndex: "phoneNo",
      render: (name, item, i) => {
        return (
          <>
            {item.dialCode} {item.phoneNo}
          </>
        );
      },
      width: "10%",
    },
    {
      title: "Website",
      dataIndex: "url",
      width: "15%",
    },
    {
      title: "Type",
      dataIndex: "clientName",
      width: "10%",
      textAlign: "center"
    },
    {
      title: "Payment",
      dataIndex: "payment",
      width: "10%",
      textAlign: "center"
    },
    {
      title: "VAT",
      dataIndex: "",
      textAlign: "center",
      width: "8%",

      render: (text, item) => {
        return (
          <>
            {item.countryName}
          </>
        )
      }
    },

    {
      title: "Invoice Address",
      // render: (name, item, i) => {
      //   return `${item.addresses[0].address1 || ""} ${item.addresses[0]
      //     .address2 || ""} ${item.addresses[0].street || ""} ${item.addresses[0].city || ""}`;
      // },
      width: "22%",
    },

    {
      title: "Pin Code",
      // render: (name, item, i) => {
      //   return `${item.addresses[0].pinCode || ""}`;
      // },
      width: "6%",
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   render: (name, item, i) => {
    //     return (
    //       <Tooltip title="Add Shipping Address">
    //         <PlusOutlined
    //           onClick={() => {
    //             handleBillingAddressModal(true)
    //             handleSetCurrentDistributorId(item.distributorId);
    //           }}
    //         />
    //       </Tooltip>
    //     );
    //   },
    //   width: "4%",
    // },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        return (
          <Tooltip title="Contacts">
            <div
            // onClick={() => {
            //   handleBillingAddressModal(true)
            //   handleSetCurrentDistributorId(item.distributorId);
            // }}
            >
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      width: "2%",
      dataIndex: "documentId",
      render: (name, item, i) => {
        return (
          <Tooltip title="Order">

            <div
            // onClick={() => {
            //   props.handleDistributorOrderModal(true);
            //   handleSetCurrentDistributorId(item.distributorId);
            // }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip title="Activity">
            <span>
              <i
                class="fab fa-connectdevelop"
                style={{ cursor: "pointer" }}
              // onClick={() => {
              //   props.handleDistributorActivityTableModal(true);
              //   handleSetCurrentDistributorId(item.distributorId);
              // }}
              ></i>
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Edit">
            <div
              style={{ cursor: "pointer" }}
            // onClick={() => {
            //   props.setEditDistributor(item);
            //   handleUpdateDistributorModal(true);
            //   handleSetCurrentDistributorId(item.distributorId);
            // }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            <Tooltip title="Delete Client">
              <Popconfirm
                title="Do you want to delete?"
              // onConfirm={() => props.deleteDistributorData(item.distributorId)}
              >
                <DeleteOutlined

                  style={{ cursor: "pointer", color: "red" }}
                />
              </Popconfirm>
            </Tooltip>

          </>
        );
      },
    },
  ];

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;
  return (
    <>
      <StyledTable
        rowKey=""
        columns={columns}
        dataSource={props.allDistributors}
        loading={
          props.fetchingAllDistributors
        }
        scroll={{ y: tableHeight }}
        pagination={false}
      />
      {/* <UpdateAccountModal
        distributorId={currentDistributorId}
        updateDistributorModal={updateDistributorModal}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
        handleUpdateDistributorModal={handleUpdateDistributorModal}
      />
      <AddAccountOrderModal
        addDistributorOrderModal={props.addDistributorOrderModal}
        handleDistributorOrderModal={props.handleDistributorOrderModal}
        distributorId={currentDistributorId}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
      />
      <AddAccountActivityModal
        addDistributorActivityTableModal={
          props.addDistributorActivityTableModal
        }
        handleDistributorActivityTableModal={
          props.handleDistributorActivityTableModal
        }
        distributorId={currentDistributorId}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
      /> */}
      {/* <BillingAddressModal
        handleBillingAddressModal={handleBillingAddressModal}
        addBillToAddress={addBillToAddress}
        distributorId={currentDistributorId}
      /> */}
      {/* {show && <BillingAddressLocation distributorId={currentDistributorId} />} */}
      <Spacer />
    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  updateDistributorModal: distributor.updateDistributorModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getAllDistributorsList,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributorData,
      handleBillingAddressModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
