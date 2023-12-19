import React, { Component, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Input, Button, Space } from "antd";
import { MainWrapper, Spacer } from "../../../Components/UI/Elements";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getAllDistributorsList,emptyDistributor } from "./AccountAction";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { CurrencySymbol } from "../../../Components/Common";
// import { getAllSalesUser } from "../../../Leads/LeadsAction";
import moment from "moment";
import AccountDetailsView from "./AccountDetailsView";

function AllAccountList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllDistributorsList(page);
    setPage(page + 1);
   // props.getAllSalesUser();
  }, []);
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDistributorsList(props.currentUser?props.currentUser:page,


      );
}

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRow, setselectedRow] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setselectedRow(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

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

  const salesOption = useMemo(() => {
    if (!props.allSalesUsers) return [];
    return (
      props.allSalesUsers.length &&
      props.allSalesUsers
        .sort(function (a, b) {
          var nameA = a.salesExecutive.toUpperCase(); // ignore upper and lowercase
          var nameB = b.salesExecutive.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        })
        .map((allSalesUsers) => {
          return {
            text: allSalesUsers.salesExecutive || "",
            value: allSalesUsers.salesExecutive,
          };
        })
    );
  }, [props.allSalesUsers]);

  function handleDistributorCheck() {
    setselectedRow([]);
  }
  useEffect(() => {
    return () => props.emptyDistributor();
  }, []);

  const result = selectedRow.reduce((acc, item) => {
    acc = acc + item.totalPayableAmount;
    return acc;
  }, 0);

  const columns = [

    {
      title: "Name",
      width: "15%",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("name"),
      render: (name, item, i) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            <AccountDetailsView
              distributorId={item.distributorId}
              name={item.name}
            />
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
          </>
        );
      },

    },

    {
      title: "Mobile",
      dataIndex: "phoneNo",
      width: "10%",
    },
    {
      title: "Website",
      dataIndex: "url",
      width: "14%",
    },
    {
      title: "Address",
      // render: (name, item, i) => {
      //   return `${item.address[0].address1 || ""} ${item.address[0]
      //     .address2 || ""} ${item.address[0].street || ""} 
      //           ${item.address[0].city || ""}
      //               `;
      // },
      width: "18%",
    },

    {
      title: "City",
      // render: (name, item, i) => {
      //   return <>
      //     {item.address[0].city === "Null" ? "" :
      //       <span>
      //         {item.address[0].city || ""}
      //       </span>
      //     }
      //   </>
      // },
      // sorter: (a, b) => {
      //   var nameA = a.address && a.address.length && a.address[0].city; // ignore upper and lowercase
      //   var nameB = b.address && b.address.length && b.address[0].city; // ignore upper and lowercase
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }

      //   return 0;
      // },
      width: "8%",
    },
    {
      title: "Pin Code",
      // render: (name, item, i) => {
      //   return `${item.address[0].pinCode || ""}`;
      // },
      width: "6%",
    },
    {
      title: "Balance",
      align: "right",
      render: (name, item, i) => {
        return (
          <span>
            <CurrencySymbol currencyType={"INR"} />
            {item.totalPayableAmount.toFixed(2)}
          </span>
        );
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalPayableAmount - b.totalPayableAmount,
      width: "7%",
    },
    {
      title: "Previous",
      dataIndex: "totalPayablePrev",
      align: "right",
      render: (name, item, i) => {
        return (
          <span>
            <CurrencySymbol currencyType={"INR"} />
            {item.totalPayablePrev.toFixed(2)}
          </span>
        );
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalPayablePrev - b.totalPayablePrev,
      width: "8%",
    },

    {
      title: "",
      width: "1%",
    },
    {
      title: "Owner",
      width: "10%",
      dataIndex: "salesExecutive",
      sorter: (a, b) => {
        var nameA = a.salesExecutive.toLowerCase();
        var nameB = b.salesExecutive.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      filters: salesOption,
      onFilter: (value, record) => {
        return record.salesExecutive === value;
      },
      render: (name, item, i) => {
        return {
          props: {},

          children: <span>{item.salesExecutive}</span>,
        };
      },
    },

    {
      title: "",
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.salesExecutiveMobileNo}>
              <span>
                <i class="fas fa-phone"></i>
              </span>
            </Tooltip>
          </>
        );
      },
      width: "2%",
    },
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.salesExecutiveEmail}>
              <span>
                <i class="far fa-envelope"></i>
              </span>
            </Tooltip>
          </>
        );
      },
    },
  ];
  if (props.fetchingAllDistributorsError) {
    return <APIFailed />;
  }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;
  return (
    <>
      <StyledTable
        rowKey="distributorId"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.allDistributors}
        loading={
          props.fetchingAllDistributors || props.fetchingAllDistributorsError
        }
        pagination={false}
        scroll={{ y: tableHeight }}
      />
      <Spacer />
    </>
  );
}
const mapStateToProps = ({ distributor, auth, leads }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  fetchingAllDistributorsError: distributor.fetchingAllDistributorsError,
  userId: auth.userDetails.userId,
  allSalesUsers: leads.allSalesUsers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList,
      emptyDistributor,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllAccountList);
