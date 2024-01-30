import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import {  Input, Button, } from "antd";
import {  SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import {
    getShiftlocs,
} from "./LocationAction";

function ShftLocsTable(props) {
    useEffect(() => {
        props.getShiftlocs(props.storedLoc.locationDetailsId);
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
title:"Name",
dataIndex:"shiftName",
width:"12%",
       },
        {
            title: "Start Date",
            width: "18%",
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                var nameA = a.startDate.toLowerCase(); // ignore upper and lowercase
                var nameB = b.startDate.toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            },
            render: (name, item, i) => {
                const date = moment(item.startDate).format("DD/MM/YYYY");
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
            title: "End Date",
            width: "18%",
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                var nameA = a.endDate.toLowerCase(); // ignore upper and lowercase
                var nameB = b.endDate.toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            },
            render: (name, item, i) => {
                const date = moment(item.endDate).format("DD/MM/YYYY");
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
                dataSource={props.shiftLocs}
                loading={props.fetchingShoftlocs}
                scroll={{ y: tableHeight }}
                pagination={false}
                rowSelection={props.rowSelection}
            />

          
        </>
    );
}

const mapStateToProps = ({ location, auth }) => ({
    shiftLocs: location.shiftLocs,
    fetchingShoftlocs: location.fetchingShoftlocs,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getShiftlocs,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ShftLocsTable);
