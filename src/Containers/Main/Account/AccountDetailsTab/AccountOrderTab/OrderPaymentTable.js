import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Switch, DatePicker, Space } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CurrencySymbol } from "../../../../../Components/Common";
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getDistributorOrderPayment } from "../../AccountAction";;

class OrderPaymentTable extends Component {

    componentDidMount() {
        this.props.getDistributorOrderPayment(this.props.particularRowData.orderId)
    }

    render() {

        const columns = [
            {
                title: "",
                width: "1%"
            },
            {
                title: "Transaction #",
                width: "13%",
                dataIndex: "transactionNumber",
            },
            {
                title: "Created By",
                width: "10%",
                dataIndex: "userName",
            },
            {
                title: "Entry",
                width: "11%",
                dataIndex: "date",
                render: (name, item, i) => {
                    return (
                        <>{moment(item.date).format("DD-MM-YY")}</>
                    );
                }
            },
            {
                title: "Amount",
                width: "10%",
                dataIndex: "paymentAmount",
                render: (name, item, i) => {
                    return (
                        <>{item.paymentAmount} {item.orderCurrencyName}</>
                    );
                }
            },

            {
                title: "Mode",
                dataIndex: "paymentModeName",
                width: "10%",
            },
            {
                title: "Reason",
                dataIndex: "remarks",
                width: "14%",
            },

        ];

        return (
            <>
                {true && (
                    <StyledTable
                        rowKey=""
                        columns={columns}
                        dataSource={this.props.paymentHistory}
                        scroll={{ y: 200 }}
                        pagination={false}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    paymentHistory: distributor.paymentHistory,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorOrderPayment,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentTable);



