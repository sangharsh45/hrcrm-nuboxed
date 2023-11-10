import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import * as Yup from "yup";
import { Button, Empty, Input, Space, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../Components/UI/Layout";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import {
  getTodayDistributor,
  DistributorCollectionReceivableToday,
  handleDistributorProductModal
} from "../CollectionAction";
import moment from "moment";
// import { getAllSalesUser } from "../../../Leads/LeadsAction";
import DistributorPaymentToggle from "./DistributorPaymentToggle";
import { CurrencySymbol } from "../../../Components/Common";
import DistributorProductHistory from "./DistributorProductHistory";

function DistributorColletcionArchive(props) {
  useEffect(() => {
    // props.getAllSalesUser();
    props.getTodayDistributor();
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const [selectedRow, setselectedRow] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
            //   searchInput = node;
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
          ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
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
  function handleClear() {
    props.getTodayDistributor();
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

  const { user } = props;

  const columns = [
    {
      title: "",
      width: "1%",
      render: (name, item) => {
        return {
          props: {
            style: {
              backgroundColor: item.color,
            },
            children: <span></span>,
          },
        };
      },
    },
    {
      title: "Name",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("orderSourceName"),
      dataIndex: "orderSourceName",
      width: "16%",
    },
    {
      title: "Order#",
      dataIndex: "orderId",
      ...getColumnSearchProps("orderId"),
      width: "18%",
      render: (text, item) => {
        return (
          <>
            <span
              style={{
                textDecoration: "underline",
                color: "#1890ff",
                // fontWeight: item.orderStatus === "Completed" ? "bold" : null,
                cursor: "pointer",
              }}
              onClick={() => {
                props.handleDistributorProductModal(true)
                handleSetParticularOrderData(item);
              }}
            >
              {item.orderId}
            </span>
          </>
        )
      }
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionNumber",
      width: "14%",
      ...getColumnSearchProps("transactionNumber"),
      render: (text, item, i) => {
        return (
          <>
            {item.transactionNumber === "Nill" ? "" : item.transactionNumber}
          </>
        )
      },
    },
    {
      title: "Type",
      dataIndex: "paymentType",
      width: "8%",
      filters: [
        { text: "Part", value: "Part" },
        { text: "Complete", value: "Complete" },
      ],
      onFilter: (value, record) => {
        return record.paymentType === value;
      },
    },
    {
      title: "Payment",
      dataIndex: "date",
      width: "6%",
      sorter: (a, b) => {
        var nameA = a.date;
        var nameB = b.date;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
      render: (name, item, i) => {
        return <span>{` ${moment(item.date).format("DD-MM-YY")}`}</span>;
      },
    },
    {
      title: "Entry",
      dataIndex: "paymentDate",
      sorter: (a, b) => {
        var nameA = a.paymentDate;
        var nameB = b.paymentDate;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      width: "8%",
      render: (name, item, i) => {
        return <span>{` ${moment(item.paymentDate).format("ll")}`}</span>;
      },
    },
    ,
    {
      title: "Amount",
      dataIndex: "paymentAmount",
      align: "left",
      width: "7%",
      sorter: (a, b) => {
        var nameA = a.paymentAmount;
        var nameB = b.paymentAmount;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        return (
          <span>
            <CurrencySymbol currencyType={"INR"} />
            {item.paymentAmount.toFixed(2)}
          </span>
        );
      },
    },
    // {
    //   width: "1%",
    // },
    {
      title: "Mode",
      align: "left",
      dataIndex: "paymentMode",
      width: "7%",
      filters: [
        { text: "Cash", value: "Cash" },
        { text: "Credit-Card", value: "Credit-Card" },
        { text: "Net Banking", value: "Net Banking" },
        { text: "UPI", value: "UPI" },
      ],
      onFilter: (value, record) => {
        return record.paymentMode === value;
      },
    },

    {
      title: "Received?",
      dataIndex: "approveByFinanceInd",
      render(name, item) {
        return (
          <>
            {user.designation === "Manager" &&
              user.functionName === "Sales" ? null : (
               <DistributorPaymentToggle paymentId={item.paymentId} />
            )}
          </>
        );
      },
      width: "7%",
    },
    {
      title: "Owner",
      dataIndex: "salesExecutive",
      width: "16%",
      filters: salesOption,
      onFilter: (value, record) => {
        console.log(value, record);
        return record.salesExecutive === value;
      },
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
    },
    {
      title: "",
      dataIndex: "remarks",
      width: "2%",
      render: (text, item, i) => {
        return (
          <>
            {item.remarks ? (
              <Tooltip title={item.remarks}>
                <span>
                  <i className="fa fa-sticky-note"></i>
                </span>
              </Tooltip>
            ) : null}
          </>
        );
      },
    },
  ];
  // if (props.DistributorCollectionArchiveError) {
  //   return <APIFailed />;
  // }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;
  return (
    <>
      <Formik
        initialValues={{
          date: undefined,
          type: "Distributor",
        }}
        onSubmit={(values, { resetForm }) => {
          props.handleClearCheck();
          let newStartDate = moment(values.date).format("YYYY-MM-DD");

          props.DistributorCollectionReceivableToday({
            ...values,
            date: `${newStartDate}T00:00:00Z`,
          });
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <Form>
            <div
                style={{
                  display: "flex",
                  justifyContent:"space-evenly",
                  height: "100%",
                  width: "30%",
                  alignItems: "end"
                }}
              >
                <div
                  style={{                  
                    width: "35%",                  
                  }}>
                  <Field
                    isRequired
                    name="date"
                    width={"100%"}
                    label="Payment Date"
                    component={DatePicker}
                    value={values.date}
                    inlineLabel
                    isColumn
                    
                  />
                </div>
                <div
                  style={{
                    width: "25%",                    
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={props.DistributorCollectionReceivable}
                    disabled={values.date ? false : true}
                    
                  >
                    Submit
                  </Button>
                  </div>
                  <div
                  style={{
                    width: "15%",                    
                  }}
                >
                  <Button
                    type="primary"
                    disabled={values.date ? false : true}
                   
                    onClick={() => {
                      setFieldValue("date", undefined);
                      handleClear();
                    }}
                  >
                    Clear
                  </Button>
                  </div>
                </div>             
            

            <StyledTable
              rowKey="paymentId"
              rowSelection={props.rowSelectionTodayForDistributor}
              columns={columns}
              scroll={{ y: tableHeight }}
              pagination={false}
              loading={
                props.fetchingTodayDistributor ||
                props.fetchingTodayDistributorError
              }
              dataSource={props.todayDistributor}
              locale={{
                emptyText: (
                  <Empty description={"We couldn't find relevant data"} />
                ),
              }}
            />
          </Form>
        )}
      </Formik>
      <DistributorProductHistory
        handleDistributorProductModal={props.handleDistributorProductModal}
        collectionDistributorOrder={props.collectionDistributorOrder}
        particularRowData={particularRowData}
      />

    </>
  );
}
const mapStateToProps = ({ collection, leads, auth }) => ({
  DistributorCollectionReceivable: collection.DistributorCollectionReceivable,
  todayDistributor: collection.todayDistributor,
  fetchingTodayDistributor: collection.fetchingTodayDistributor,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allSalesUsers: leads.allSalesUsers,
  collectionDistributorOrder: collection.collectionDistributorOrder
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTodayDistributor,
    //   getAllSalesUser,
      DistributorCollectionReceivableToday,
      handleDistributorProductModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorColletcionArchive);
