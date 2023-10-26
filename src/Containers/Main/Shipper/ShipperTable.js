import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Input, Button, Space } from "antd";
import {
  EditOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Spacer } from "../../../Components/UI/Elements";
import {
  getShipperByUserId,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
} from "./ShipperAction";
import moment from "moment";
import AddShipperActivityModal from "./AddShipperActivityModal";
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import Highlighter from "react-highlight-words";

function ShipperTable(props) {
  useEffect(() => {
    props.getShipperByUserId(props.userId);
  }, []);

  const { handleUpdateShipperModal, updateShipperModal } = props;

  const [currentShipperId, setCurrentShipperId] = useState("");

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "Name",
      dataIndex: "shipperName",
      width: "16%",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("shipperName"),
      sorter: (a, b) => a.shipperName - b.shipperName,
      render: (name, item, i) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            {/* <ShipperDetailView shipperId={item.shipperId} name={item.shipperName} />
            &nbsp;&nbsp; */}
            {item.shipperName}
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}{" "}
          </>
        );
      },
    },

    {
      title: "Phone #",
      dataIndex: "phoneNo",
      width: "8%",
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
      width: "18%",
    },

    {
      title: "Ship By",
      dataIndex: "shipByName",
      width: "10%",
    },

    {
      title: "Address",
      width: "18%",
      //  dataIndex: "addressId",
      render: (name, item, i) => {
        return `${(item.addresses &&
          item.addresses.length &&
          item.addresses[0].address1) ||
          ""}
                ${(item.addresses &&
            item.addresses.length &&
            item.addresses[0].state) ||
          ""}
                ${(item.addresses &&
            item.addresses.length &&
            item.addresses[0].street) ||
          ""}
                ${(item.addresses &&
            item.addresses.length &&
            item.addresses[0].city) ||
          ""}
                ${(item.addresses &&
            item.addresses.length &&
            item.addresses[0].pinCode) ||
          ""}`;
      },
    },
    {
      title: "City",
      width: "8%",
      render: (name, item, i) => {
        return `${(item.addresses &&
          item.addresses.length &&
          item.addresses[0].city) ||
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
      title: props.recriutmentInd ? "Status" : "",
      width: props.recriutmentInd ? "10%" : "",
    },
    // {
    //   title: "",
    //   dataIndex: "documentId",
    //   width: "2%",
    //   render: (name, item, i) => {
    //     return (
    //       <Tooltip title="Order">
    //         <FontAwesomeIcon icon={solid('cart-shopping')}
    //           onClick={() => {
    //             props.handleShipperOrderModal(true);
    //             handleSetCurrentShipperId(item.shipperId);
    //           }}
    //         />
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "documentId",
    //   width: "2%",
    //   render: (name, item, i) => {
    //     return (
    //       <Tooltip title="Activity">
    //         <span>
    //           <i
    //             class="fab fa-connectdevelop"
    //             style={{ cursor: "pointer" }}
    //             onClick={() => {
    //               props.handleShipperActivityTableModal(true);
    //               handleSetCurrentShipperId(item.shipperId);
    //             }}
    //           ></i>
    //         </span>
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "documentId",
    //   width: "2%",
    //   render: (name, item, i) => {
    //     //debugger
    //     return (
    //       <Tooltip title="Edit">
    //         <FontAwesomeIcon icon={solid('pen-to-square')}
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             props.setEditShipper(item);
    //             handleUpdateShipperModal(true);
    //             handleSetCurrentShipperId(item.shipperId);
    //           }}
    //         />
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   title: "",
    //   width: "10%",
    //   render: (name, item, i) => {
    //     //debugger
    //     return (
    //       <>
    //         <Popconfirm
    //           title="Do you want to delete?"
    //         // onConfirm={() => props.deleteShipperData(item.shipperId)}
    //         >
    //           <DeleteOutlined

    //             style={{ cursor: "pointer", color: "red" }}
    //           />
    //         </Popconfirm>

    //       </>
    //     );
    //   },
    // },
  ];

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;
  return (
    <>
      <StyledTable
        rowKey=""
        columns={columns}
        dataSource={props.shipperByUserId}

        scroll={{ y: tableHeight }}
        pagination={false}
      />
      <UpdateShipperModal
        shipperId={currentShipperId}
        updateShipperModal={updateShipperModal}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        handleUpdateShipperModal={handleUpdateShipperModal}
      />
      <AddShipperOrderModal
        addShipperOrderModal={props.addShipperOrderModal}
        handleShipperOrderModal={props.handleShipperOrderModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
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
  shipperByUserId: shipper.shipperByUserId,
  userId: auth.userDetails.userId,
  fetchingShipperByUserId: shipper.fetchingShipperByUserId,
  fetchingShipperByUserIdError: shipper.fetchingShipperByUserIdError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateShipperModal,
      handleShipperActivityTableModal,
      handleShipperOrderModal,
      deleteShipperData,
      getShipperByUserId,
      setEditShipper,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperTable);
