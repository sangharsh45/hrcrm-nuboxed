import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "antd";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
    StyledTable,
    StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import {
    getDistributorTable,
    // deleteDocument
} from "../../AccountAction";


class DistributorDocumentTable extends Component {
    componentDidMount() {
        this.props.getDistributorTable(this.props.distributorId);
    }
    render() {
        const {
            documentTable,
            fetchingDocumentsByTable,
            fetchingDocumentsByTableError,

        } = this.props;
        const columns = [
            {
                title: "Date",

                dataIndex: "creationDate",
                render: (name, item, i) => {
                  return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
                },
            },
            {
                title: "Name",

                dataIndex: "documentTitle",
                // onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
                // sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
            },
            {
                title: "Description",

                 dataIndex: "discription",
                // width: "20%",
                // render: (name, item, i) => {
                //   console.log(item);
                //   return <span>{elipsize(item.documentType || "", 15)}</span>;
                // },
                // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
                // sorter: (a, b) => a.taskType.length - b.taskType.length,
            },
            {
                //title: "Uploaded By",

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
                        dataSource={documentTable}
                        Loading={
                            fetchingDocumentsByTable ||
                            fetchingDocumentsByTableError
                        }
                        onChange={console.log("task onChangeHere...")}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = ({ distributor }) => ({
    distributor: distributor.distributor,
    documentTable:distributor.documentTable,
    fetchingDocumentsByTable: distributor.fetchingDocumentsByTable,
    fetchingDocumentsByTableError:
        distributor.fetchingDocumentsByTableError,
    documentsByDistributorId: distributor.documentsByDistributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorTable,
            //   deleteDocument,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorDocumentTable);


