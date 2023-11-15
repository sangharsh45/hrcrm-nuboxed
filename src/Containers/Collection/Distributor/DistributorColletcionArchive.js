import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledRangePicker,
  StyledSelect,
  StyledTable,
} from "../../../Components/UI/Antd";
import * as Yup from "yup";
import { Button, Empty, Input, Space, Select, Switch, Icon, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer, MainWrapper, OnlyWrapCard } from "../../../Components/UI/Layout";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DistributorCollectionArchiveToday } from "../CollectionAction";
// import { getAllSalesUser } from "../../Leads/LeadsAction";
import moment from "moment";
import { CurrencySymbol } from "../../../Components/Common";

function DistributorColletcionArchive(props) {
  useEffect(() => {
    // props.getAllSalesUser();
  }, []);


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

  ;


  const salesOption = useMemo(() => {
    if (!props.allSalesUsers) return [];
    return (
      props.allSalesUsers.length &&
      props.allSalesUsers.sort(function (a, b) {
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
      }).map((allSalesUsers) => {
        return {
          text: allSalesUsers.salesExecutive || "",
          value: allSalesUsers.salesExecutive,
        };
      })
    );
  }, [props.allSalesUsers]);


  if (props.DistributorCollectionArchiveError) {
    return <APIFailed />;
  }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;

  const { user, startDate, endDate } = props;

  return (
    <>
      <Formik
        initialValues={{
          startDate: startDate || moment(),
          endDate: endDate || null,
          type: "Distributor",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          console.log(values);
          let timeZoneFirst = "GMT+05:30";

          let mytimeZone = timeZoneFirst.substring(4, 10);
          console.log(mytimeZone);

          var a = mytimeZone.split(":");
          console.log(a);
          var timeZoneminutes = +a[0] * 60 + +a[1];
          console.log(timeZoneminutes);
          if (!values.endDate) {
            values.endDate = values.startDate;
          }
          let newStartDate = moment(values.startDate).format("YYYY-MM-DD");
          console.log(newStartDate);
          //Time calculation
          let firstStartTime = moment(values.startTime).format(
            "HH:mm:ss.SSS[Z]"
          ); // getting start time from form input
          console.log(firstStartTime);

          let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
          console.log(firstStartHours);

          let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
          console.log(timeEndPart);

          var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
          console.log(firstStartTimeSplit);

          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
          console.log(minutes);

          var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
          console.log(firstStartTimeminutes);

          let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;
          console.log(finalStartTime);

          let newStartTime = `${finalStartTime}${timeEndPart}`;
          console.log(newStartTime);

          let newEndDate = moment(values.endDate).format("YYYY-MM-DD");
          let firstEndTime = moment(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
          console.log(firstEndTime);
          let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
          console.log(firstEndHours);

          var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
          console.log(firstEndTimeSplit);
          var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
          console.log(endMinutes);
          var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
          console.log(firstEndTimeminutes);
          let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
          console.log(hr);
          let mi = firstEndTimeminutes % 60;
          console.log(hr);
          hr = hr < 10 ? "0" + hr : hr;
          mi = mi < 10 ? "0" + mi : mi;
          let finalEndTime = `${hr}:${mi}`;
          console.log(finalEndTime);
          console.log(timeEndPart);
          console.log(`${finalEndTime}${timeEndPart}`);

          let newEndTime = `${finalEndTime}${timeEndPart}`;
          props.handleClearReturnCheck()
          props.DistributorCollectionArchiveToday({
            ...values,
            startDate: `${newStartDate}T00:00:00Z`,
            endDate: `${newEndDate}T00:00:00Z`,
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
                  width: "40%",
                  alignItems: "end"
                }}
              >
                <div
                  style={{                  
                    width: "29%",                  
                  }}>
                  <Field
                    isRequired
                    name="startDate"
                    width={"100%"}
                    label="Start Date"
                    component={DatePicker}
                    value={values.startDate}
                    inlineLabel
                    isColumn
                   
                  />
                </div>
                <div
                  style={{
                    width: "29%",                    
                  }}>
                  <Field
                    isRequired
                    width={"100%"}
                    name="endDate"
                    label="End Date"
                    component={DatePicker}
                    value={values.endDate || values.startDate}
                    inlineLabel
                    isColumn
                   
                    disabledDate={(currentDate) => {
                      if (values.startDate) {
                        if (
                          moment(currentDate).isBefore(moment(values.startDate))
                        ) {
                          return true;
                        } else {
                          return false;
                        }
                      }
                    }}
                  />
                </div>
                  <div
                   style={{
                     width: "10%",                    
                  }}
                >
                    <Button
                      type="primary"
                      htmlType="submit"                    
                  >
                     Submit
                    </Button>
                  </div>
                </div>

            {/* <StyledTable
              rowKey="paymentId"
              rowSelection={props.rowSelectionForDistributor}
              columns={columns}
              scroll={{ y: tableHeight }}
              pagination={false}
              loading={
                props.DistributorCollectionArchive ||
                props.DistributorCollectionArchiveError
              }
              dataSource={props.todayDisArchive}
              locale={{
                emptyText: (
                  <Empty description={"We couldn't find relevant data"} />
                ),
              }}
            /> */}
          </Form>
        )}
      </Formik>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
        <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.1rem]">Name</div>
        <div className=" md:w-[5.1rem]">Order#</div>
        <div className=" md:w-[5.8rem] ">Transaction ID</div>
        <div className="md:w-[5.9rem]">Type</div>
        <div className="md:w-[7.8rem]">Date</div>
    
        <div className="md:w-[6.2rem]">Amount</div>
        <div className="md:w-[11.3rem]">Mode</div>
        <div className="w-[3.8rem]">Received?</div>
        <div className="w-[3.8rem]">Owner</div>

      </div>
        {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"70vh"}
      > */}
      
      {props.todayDisArchive.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
           Street : ${
             item.address && item.address.length && item.address[0].street
           }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${
           (item.address && item.address.length && item.address[0].country) || ""
         } 
           PostalCode : ${
             item.address && item.address.length && item.address[0].postalCode
           } `;
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                   <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {item.orderSourceName} 
                           </h4>
                       
                       </div> 

                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                    <h4 class=" text-xs text-cardBody font-poppins">   
                                    {item.orderId} 
                                    </h4>
                                
                                </div> 
                             
                                </div>
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-full max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.transactionNumber}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.paymentType}

                                    </div>
                                </div>
                                </div>
                               
                             
                                <div class="flex md:items-center"> 
                                <div class="flex">
                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {` ${moment(item.paymentDate).format("ll")}`}
                           </h4>
                       
                       </div> 
                       <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {item.paymentAmount}
                           </h4>
                       
                       </div> 
                       </div>
                       <div class="flex">
                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                         {item.paymentMode}
                           </h4>
                       
                       </div> 
                       <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {item.approveByFinanceInd}
                           </h4>
                       
                       </div> 
                       </div>
                       <div class="flex">
                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                         {item.salesExecutive}
                           </h4>
                       
                       </div> 
                       <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {/* {item.approveByFinanceInd} */}
                           </h4>
                       
                       </div> 
                       </div>

                      </div>
                            </div>
                        </div>


                    )
                })}
                {/* </InfiniteScroll> */}
      </OnlyWrapCard>
      </div>
    </>
  );
}
const mapStateToProps = ({ collection, leads }) => ({
  todayDisArchive: collection.todayDisArchive,
  DistributorCollectionArchive: collection.DistributorCollectionArchive,
  allSalesUsers: leads.allSalesUsers,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      DistributorCollectionArchiveToday,
    //   getAllSalesUser,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorColletcionArchive);

// const columns = [
//   {
//     title: "Name",
//     defaultSortOrder: "descend",
//     ...getColumnSearchProps("orderSourceName"),
//     dataIndex: "orderSourceName",
//     width: "12%",
//   },
//   {
//     title: "Order#",
//     dataIndex: "orderId",
//     ...getColumnSearchProps("orderId"),
//     width: "14%",
//     // render: (text, item) => {
//     //   return (
//     //     <>
//     //       <span>
//     //         {item.orderId}
//     //       </span>
//     //     </>
//     //   )
//     // }
//   },
//   {
//     title: "Transaction ID",
//     dataIndex: "transactionNumber",
//     width: "14%",
//     ...getColumnSearchProps("transactionNumber"),
//   },
//   {
//     title: "Type",
//     dataIndex: "paymentType",
//     width: "6%",
//     filters: [
//       { text: "Part", value: "Part" },
//       { text: "Complete", value: "Complete" },
//     ],
//     onFilter: (value, record) => {
//       return record.paymentType === value;
//     },
//   },
//   {
//     title: "Date",
//     dataIndex: "paymentDate",
//     width: "8%",
//     render: (name, item, i) => {
//       return <span>{` ${moment(item.paymentDate).format("DD-MM-YY")}`}</span>;
//     },
//     sorter: (a, b) => {
//       var nameA = a.paymentDate;
//       var nameB = b.paymentDate;
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }

//       return 0;
//     },
//   },
//   {
//     title: "Amount",
//     align: 'right',
//     dataIndex: "paymentAmount",
//     width: "7%",
//     render: (name, item, i) => {
//       return (
//         <span>
//           <CurrencySymbol currencyType={"INR"} />
//           {item.paymentAmount.toFixed(2)}
//         </span>
//       );
//     },
//     sorter: (a, b) => {
//       var nameA = a.paymentAmount;
//       var nameB = b.paymentAmount;
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }

//       return 0;
//     },
//   },
//   {
//     width: "1%"
//   },
//   {
//     title: "Mode",
//     dataIndex: "paymentMode",
//     align: 'center',
//     width: "9%",
//     filters: [
//       { text: "Cash", value: "Cash" },
//       { text: "Credit-Card", value: "Credit-Card" },
//       { text: "Net Banking", value: "Net Banking" },
//       { text: "UPI", value: "UPI" },
//     ],
//     onFilter: (value, record) => {
//       return record.paymentMode === value;
//     },
//   },

//   {
//     title: "Received?",
//     dataIndex: "approveByFinanceInd",
//     width: "7%",
//   },
//   {
//     title: "Owner",
//     dataIndex: "salesExecutive",
//     width: "15%",
//     filters: salesOption,
//     onFilter: (value, record) => {
//       console.log(value, record);
//       return record.salesExecutive === value;
//     },
//     sorter: (a, b) => {
//       var nameA = a.salesExecutive.toLowerCase();
//       var nameB = b.salesExecutive.toLowerCase();
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }

//       return 0;
//     },
//   },
//   {
//     title: "",
//     dataIndex: "remarks",
//     width: "3%",
//     render: (text, item, i) => {
//       return (
//         <>
//           {item.remarks ?
//             <Tooltip title={item.remarks}>
//               <span>
//                 <i className="fa fa-sticky-note"></i>
//               </span>
//             </Tooltip>
//             : null}
//         </>

//       )
//     },
//   }
// ];
