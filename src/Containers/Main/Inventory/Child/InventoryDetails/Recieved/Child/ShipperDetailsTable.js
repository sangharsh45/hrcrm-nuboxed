import Item from "antd/lib/list/Item";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { getDispatchShipperList } from "../../../../InventoryAction";
class ShipperDetailsTable extends Component {
  componentDidMount() {
    this.props.getDispatchShipperList(this.props.dispatchId);
  }
  componentDidUpdate(prvP, prvS) {
    if (this.props.dispatchId !== prvP.dispatchId) {
      this.props.getDispatchShipperList(this.props.dispatchId);
    }
  }

  render() {
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Name",
        dataIndex: "shipperName",
        width: "10%",
      },
      {
        title: "Contact",
        dataIndex: "name",
        width: "10%",
      },
      {
        title: "Mobile #",
        render: (text, name) => {
          return (
            <>
              {name.dialCode1}{name.mobileNo}
            </>
          )
        },
        width: "10%",
      },

      {
        title: "Email",
        dataIndex: "emailId",
        width: "10%",
      },
      {
        title: "Department",
        dataIndex: "departmentName",
        width: "10%",
      },
      {
        title: "Designation",
        dataIndex: "designationName",
        width: "10%",
      },
    ];
    // if (this.props.fetchingShipperDetailsListError) {
    //   return <APIFailed />
    // }

    return (
      <>
        {true && (
          <StyledTable
            rowKey=""
            columns={columns}
            dataSource={this.props.dispatchShipperList}
            loading={
              this.props.fetchingDispatchShipperList ||
              this.props.fetchingDispatchShipperListError
            }
            scroll={{ y: 320 }}
            pagination={false}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ inventory }) => ({
  dispatchShipperList: inventory.dispatchShipperList,
  fetchingDispatchShipperList: inventory.fetchingDispatchShipperList,
  fetchingDispatchShipperListError: inventory.fetchingDispatchShipperListError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDispatchShipperList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperDetailsTable);
