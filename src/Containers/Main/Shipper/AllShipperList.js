import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Input, Button, Space } from "antd";
import { Spacer } from "../../../Components/UI/Elements";


function AllShipperList(props) {
  useEffect(() => {
  
  }, []);

  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "Name",
      width: "15%",
      // ...getColumnSearchProps("name"),
      defaultSortOrder: "descend",
      // sorter: (a, b) => a.name - b.name,
      // render: (name, item, i) => (
      //   <ShipperDetailsView shipperId={item.shipperId} name={item.name} />
      // ),
    },
    {
      title: "Phone #",
      width: "8%",
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
      width: "15%",
    },

    {
      title: "Mobile #",
      dataIndex: "mobileNo",

    },

    {
      title: "Ship By",
      dataIndex: "shipBy",
    },
    {
      title: "Address",
      width: "18%",
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
      width: "6%",
      render: (name, item, i) => {
        return `${(item.addresses &&
          item.addresses.length &&
          item.addresses[0].pinCode) ||
          ""}`;
      },
    },
    {
      title: "City",
      width: "6%",
      render: (name, item, i) => {
        return `${(item.addresses &&
          item.addresses.length &&
          item.addresses[0].city) ||
          ""}`;
      },
    },
    {
      title: "Owner",
      width: "15%",
      dataIndex: "salesExecutive",
      //   filters: salesOption,
      //   onFilter: (value, record) => {
      //     console.log(value, record);
      //     return record.type === value;
      //   },
      // render: (name, item, i) => {

      //     return (
      //     <Tooltip title= {item.salesExecutiveEmail} >
      //      <Tooltip placement="bottom" title= {item.salesExecutiveMobileNo} >
      //      {item.salesExecutive || ""}</Tooltip>
      //     </Tooltip>
      //     )
      // },
    },

    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.salesExecutiveMobileNo}>
              <span>
                <i class="fas fa-phone"></i>
              </span>
            </Tooltip>
          </>
        );
      },
    },

    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.salesExecutiveEmail}>
              <span>
                <i class="far fa-envelope"></i>
              </span>
            </Tooltip>
          </>
        );
      },
    },

    {
      title: props.recriutmentInd ? "Status" : "",
      width: props.recriutmentInd ? "10%" : "",
    },
  ];
  // if (props.fetchingAllShipperError) {
  //   return <APIFailed />;
  // }

  return (
    <>
      <StyledTable
        rowKey=""
        columns={columns}
        // dataSource={props.allShipper}
        // loading={props.fetchingAllShipper || props.fetchingAllShipperError}
        pagination={false}
        scroll={{ y: 320 }}
      />
      <Spacer />
    </>
  );
}
const mapStateToProps = ({ shipper, auth, leads }) => ({
  // allShipper: shipper.allDistributors,
  // fetchingAllShipper: shipper.fetchingAllShipper,
  // fetchingAllShipperError: shipper.fetchingAllShipperError,
  // userId: auth.userDetails.userId,
  //   onlySalesUsers: leads.onlySalesUsers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAllShipperList,
      //   getOnlySalesUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllShipperList);
