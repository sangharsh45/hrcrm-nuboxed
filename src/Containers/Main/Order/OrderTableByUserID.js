import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Input, Popconfirm, Space, Button, Badge } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Spacer } from "../../../Components/UI/Elements";
import {
    getOrderById,
} from "./OrderAction";
// import OrderDetailsTable from "../../Customer/Child/CustomerDetail/CustomerDetailsTab/OrderDetailsTable";
import { CurrencySymbol } from "../../../Components/Common";

function OrderTableByUserID(props) {
    useEffect(() => {
        props.getOrderById(props.userId);
    }, []);

    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [particularRowData, setParticularRowData] = useState({});
    const [searchedColumn, setSearchedColumn] = useState("");

    function handleOrder(orderId) {
        setshow(true);
        setorderId(orderId);
    }

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

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
            // render: (name, item, i) => {
            //     return {
            //         props: {
            //             style: {
            //                 background:
            //                     show && orderId === item.orderId
            //                         ? "rgb(158 183 223)"
            //                         : null,
            //             },
            //         },

            //         children: <span></span>,
            //     };
            // },
        },
        {
            title: "Order Id",
            width: "22%",
            dataIndex: "newOrderNo",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("newOrderNo"),
            render: (text, item) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.creationDate).format("DD/MM/YYYY");
                return {

                    children: (
                        <Badge size="small" count={item.productNum}>
                            <span
                                onClick={() => {
                                    handleOrder(item.orderId);
                                    handleSetParticularOrderData(item);
                                }}

                            >{`${item.newOrderNo} `}

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
                            </span>
                        </Badge>
                    ),
                };
            },
        },
        {
            title: "Client",
            dataIndex: "distributorName",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("distributorName"),
            width: "18%",
        },
        {
            title: "Contact",
            dataIndex: "contactPersonName",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("contactPersonName"),
            width: "18%",
        },
        {
            title: "#Phone",
            dataIndex: "noOfPhones",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("noOfPhones"),
            width: "18%",
        },
        {
            title: "Creation Date",
            width: "18%",
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                var nameA = a.creationDate.toLowerCase(); // ignore upper and lowercase
                var nameB = b.creationDate.toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            },
            render: (name, item, i) => {
                const date = moment(item.creationDate).format("DD/MM/YYYY");
                return {
                    props: {
                        // style: {
                        //     background:
                        //         show && orderId === item.orderId
                        //             ? "rgb(158 183 223)"
                        //             : null,
                        // },
                    },

                    children: <span>{date}</span>,
                };
            },
        },
        {
            title: "Owner",
            dataIndex: "noOfownerPhones",
            width: "8%",
        },
        {
            title: "Status",
            width: "18%",
            dataIndex: "orderStatus",
            filters: [
                { text: "Pending", value: "Pending" },
                { text: "Complete", value: "Complete" },
            ],
            onFilter: (value, record) => {
                return record.orderStatus === value;
            },
            render: (name, item, i) => {
                return {
                    props: {
                        // style: {
                        //     background:
                        //         show && orderId === item.orderId
                        //             ? "rgb(158 183 223)"
                        //             : null,
                        // },
                    },

                    children: <span>{item.orderStatus}</span>,
                };
            },
        },

    ];
    //   if (props.fetchingDistributorsByUserIdError) {
    //     return <APIFailed />
    //   }

    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 200;

    return (
        <>
            <StyledTable
                rowKey="orderId"
                columns={columns}
                dataSource={props.orderShowById}
                loading={props.fetchingOrderById}
                scroll={{ y: tableHeight }}
                pagination={false}
                rowSelection={props.rowSelection}
            />

            <Spacer />
        </>
    );
}

const mapStateToProps = ({ order, auth }) => ({
    allOrderList: order.allOrderList,
    fetchingOrderByIdError: order.fetchingOrderByIdError,
    fetchingOrderById: order.fetchingOrderById,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOrderById,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableByUserID);
