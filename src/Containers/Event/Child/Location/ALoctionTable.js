import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Tooltip, Input, Popconfirm, Space, Button, Badge } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Spacer } from "../../../../Components/UI/Elements";
import {
    getAlLocshift,
} from "./LocationAction";
import { CurrencySymbol } from "../../../../Components/Common";

function ALoctionTable(props) {
    useEffect(() => {
        props.getAlLocshift();
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
        },
        {
            title: "Shift Id",
            width: "12%",
            dataIndex: "shiftId",
    
        },
        {
            title: "Name",
            width: "15%",
            dataIndex: "shiftName",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("shiftName"),
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

                            >{`${item.shiftName} `}

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
            title: "Shift",
            dataIndex: "shift",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("shift"),
            width: "18%",
        },
        {
            title: "Effective",
            dataIndex: "contactPersonName",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("contactPersonName"),
            width: "18%",
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
                dataSource={props.alLocShift}
                loading={props.fetchingAlLocShift}
                scroll={{ y: tableHeight }}
                pagination={false}
                rowSelection={props.rowSelection}
            />

            <Spacer />
        </>
    );
}

const mapStateToProps = ({ location, auth }) => ({
    alLocShift: location.alLocShift,
    fetchingAlLocShift: location.fetchingAlLocShift,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAlLocshift,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ALoctionTable);
