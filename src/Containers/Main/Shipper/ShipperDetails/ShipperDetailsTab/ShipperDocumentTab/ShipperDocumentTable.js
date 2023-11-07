import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "antd";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import {
  getShipperDocument,
  // deleteDocument
} from "../../../ShipperAction";

class ShipperDocumentTable extends Component {
  componentDidMount() {
    this.props.getShipperDocument(this.props.shipperId);
  }
  render() {
    const {
      documentsByShipperId,
      fetchingDocumentsByShipperId,
      fetchingDocumentsByShipperIdError,
    } = this.props;
    const columns = [
      {
        title: "Date",

        // dataIndex: "creationDate",
        // render: (name, item, i) => {
        //   return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
        // },
      },
      {
        title: "Name",

        dataIndex: "contactDocumentName",
        // onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
        // sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
      },
      {
        title: "Description",

        // dataIndex: "documentType",
        // width: "20%",
        // render: (name, item, i) => {
        //   console.log(item);
        //   return <span>{elipsize(item.documentType || "", 15)}</span>;
        // },
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length,
      },
      {
        title: "Uploaded By",

        // dataIndex: "uploadedBy",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
      },
    ];

    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 280 }}
            expandedRowRender={(record) => {
              //debugger;
              // return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="CustomerId"
            columns={columns}
            dataSource={documentsByShipperId}
            Loading={
              fetchingDocumentsByShipperId || fetchingDocumentsByShipperIdError
            }
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  shipper: shipper.shipper,
  fetchingDocumentsByShipperId: shipper.fetchingDocumentsByShipperId,
  fetchingDocumentsByShipperIdError: shipper.fetchingDocumentsByShipperIdError,
  documentsByShipperId: shipper.documentsByShipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperDocument,
      //   deleteDocument,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperDocumentTable);
