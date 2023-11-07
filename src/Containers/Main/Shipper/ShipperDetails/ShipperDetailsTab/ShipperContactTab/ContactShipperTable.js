import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  getContactShipperList,
  handleUpdateShipperContactModal,
  setEditShipperContact,
} from "../../../ShipperAction";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import { Tooltip, Input, Button, Space } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import UpdateShipperContactModal from "./UpdateShipperContactModal";
import Highlighter from "react-highlight-words";

class ShipperContactTable extends Component {
  componentDidMount() {
    this.props.getContactShipperList(this.props.shipperId);
  }

  state = {
    searchText: "",
    searchedColumn: "",
  };
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
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
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
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
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Name",
        ...this.getColumnSearchProps("firstName"),
        render: (name, item, i) => {
          return ` ${item.salutation || ""} ${item.firstName ||
            ""} ${item.middleName || ""} ${item.lastName || ""}`;
        },
      },
      {
        title: "Email",
        dataIndex: "emailId",
        width: "18%",
      },
      {
        title: "Mobile No",
        render: (name, item, i) => {
          return ` ${item.dialCode1 || ""} ${item.mobileNo || ""} `;
        },
      },
      {
        title: "Designation",
        dataIndex: "designationName",
        width: "13%",
        // address1+street
      },
      {
        title: "Department",
        dataIndex: "departmentName",
        width: "13%",
      },
      {
        title: "",
        width: "2%",
        dataIndex: "documentId",
        render: (name, item, i) => {
          return (
            <Tooltip title="Edit">
             <EditOutlined 
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.setEditShipperContact(item);
                  this.props.handleUpdateShipperContactModal(true);
                }}
              />
            </Tooltip>
          );
        },
      },
    ];

    // if (this.props.fetchingDistributorHistoryError) {
    //     return <APIFailed />
    // }
    return (
      <>
        {true && (
          <StyledTable
            rowKey="shipperId"
            columns={columns}
            dataSource={this.props.contactShipper}
            loading={this.props.fetchingContactShipperById}
            onChange={console.log("task onChangeHere...")}
            scroll={{ y: 280 }}
            pagination={false}
          />
        )}
        <UpdateShipperContactModal
          handleUpdateShipperContactModal={
            this.props.handleUpdateShipperContactModal
          }
          updateShipperContactModal={this.props.updateShipperContactModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  contactShipper: shipper.contactShipper,
  fetchingContactShipperById: shipper.fetchingContactShipperById,
  updateShipperContactModal: shipper.updateShipperContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactShipperList,
      handleUpdateShipperContactModal,
      setEditShipperContact,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperContactTable);
