import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { getRenewOrder } from "../../../../ShipperAction";
// import APIFailed from "../../../../../Helpers/ErrorBoundary/APIFailed";
class NestedRenewOrderTable extends Component {
  componentDidMount() {
    debugger;
    this.props.getRenewOrder(this.props.orderId);
  }
  componentDidUpdate(prvP, prvS) {
    console.log(prvP);
    debugger;
    if (this.props.orderId !== prvP.orderId) {
      debugger;
      this.props.getRenewOrder(this.props.orderId);
    }
  }
  render() {
    const columns = [
      {
        title: "Order No",
        dataIndex: "renewId",
        width: "20%",
      },
      {
        title: "Value",
        dataIndex: "renewAmount",
        width: "20%",
      },
      {
        title: "Balance Pay",
        dataIndex: "subscriptionEndDate",
        width: "20%",
      },
      {
        title: "Start",
        dataIndex: "startDate",
        width: "20%",
      },

      {
        title: "End",
        dataIndex: "endDate",
        width: "20%",
      },
    ];
    // if (this.props.fetchingOrderhistoryError) {
    //     return <APIFailed />
    // }

    return (
      <>
        <StyledTable
          rowKey=""
          columns={columns}
          dataSource={this.props.RenewOrder}
          loading={this.props.fetchingRenewOrderByOrderId}
          scroll={{ y: 320 }}
          pagination={{
            defaultPageSize: 30,
            showSizeChanger: true,
            pageSizeOptions: ["25", "40", "50"],
          }}
        />
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  RenewOrder: shipper.RenewOrder,
  fetchingRenewOrderByOrderId: shipper.fetchingRenewOrderByOrderId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRenewOrder,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NestedRenewOrderTable);
