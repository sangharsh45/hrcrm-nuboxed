import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "antd";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import { Spacer } from "../../../Components/UI/Elements";
import { Link } from "../../../Components/Common";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllDistributorsList,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributorData,
  handleBillingAddressModal,
  handleUpdateAccountModal,
  emptyDistributor
} from "./AccountAction";
import moment from "moment";
import { FormattedMessage } from "react-intl";
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));


function AccountTable(props) {
  const [page, setPage] = useState(0);
  const [RowData, setRowData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllDistributorsList(page);
    setPage(page + 1);
  }, []);
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDistributorsList(props.currentUser ? props.currentUser : page,


    );
  }

  const {
    handleUpdateAccountModal,
  } = props;
  useEffect(() => {
    return () => props.emptyDistributor();
  }, []);

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;
  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
          <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[13.12rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="name"
            /></div>
            <div className=" md:w-[13.121rem]"><FormattedMessage
              id="app.work#"
              defaultMessage="work#"
            /></div>
            <div className=" md:w-[11.825rem] "><FormattedMessage
              id="app.website"
              defaultMessage="website"
            /></div>
            <div className="md:w-[8.95rem]"><FormattedMessage
              id="app.type"
              defaultMessage="type"
            /></div>
            <div className="md:w-[7.8rem]"><FormattedMessage
              id="app.Paymentdays"
              defaultMessage="Paymentdays"
            /></div>
            <div className="md:w-[6.94rem]"><FormattedMessage
              id="app.vat"
              defaultMessage="vat"
            /></div>
            <div className="md:w-[8.21rem]"><FormattedMessage
              id="app.billingaddress"
              defaultMessage="billingaddress"
            /></div>
            <div className="md:w-[7.32rem]"><FormattedMessage
              id="app.pincode"
              defaultMessage="pincode"
            /></div>

          </div>
          <InfiniteScroll
            dataLength={props.allDistributors.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingAllDistributors ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
            height={"75vh"}
          >

            {props.allDistributors.map((item) => {
              const currentdate = moment().format("DD/MM/YYYY");
              const date = moment(item.creationDate).format("DD/MM/YYYY");
              const diff = Math.abs(
                moment().diff(moment(item.lastRequirementOn), "days")
              );
              const dataLoc = `${item.address && item.address.length && item.address[0].address1
                } 
            ${item.address && item.address.length && item.address[0].street
                }   
           ${item.address && item.address.length && item.address[0].state}
          ${(item.address && item.address.length && item.address[0].country) || ""
                } 
           
            `;
              return (
                <div>
                  <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
                  // style={{
                  //     borderBottom: "3px dotted #515050"
                  // }}
                  >
                    <div class="flex">
                      <div className=" flex font-medium flex-col md:w-[12.6rem] max-sm:w-full  ">


                        <Tooltip>
                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                            {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4> */}
                            <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                              <Link
                                toUrl={`distributor/${item.distributorId}`}
                                title={`${item.name}`}
                              >{item.name}</Link>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class="text-xs"
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bold",
                                  }}
                                >
                                  New
                                </span>
                              ) : null}

                            </h4>
                          </div>
                        </Tooltip>

                      </div>

                      <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                        <h4 class=" text-xs text-cardBody font-poppins">
                          {item.dialCode} {item.phoneNo}
                        </h4>

                      </div>

                    </div>

                    <div className=" flex font-medium flex-col md:w-[7.55rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</h4> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.url}

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[6.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.clientName}

                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[4.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</h4> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.payment}

                      </div>
                    </div>

                    <div class="flex md:items-center">

                      <div className=" flex font-medium flex-col  md:w-[7.21rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                        <h4 class=" text-xs text-cardBody font-poppins">
                          {item.countryValue}
                        </h4>

                      </div>
                      <div className=" flex font-medium flex-col  md:w-[8.95rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                        <h4 class=" text-xs text-cardBody font-poppins">
                          {dataLoc}
                        </h4>

                      </div>

                      <div className=" flex font-medium flex-col  md:w-[1.92rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                        <h4 class=" text-xs text-cardBody font-poppins">
                          {item.address && item.address.length && item.address[0].postalCode}
                        </h4>

                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">



                      {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            style={{ color: "grey", fontSize: "0.8rem", padding: "2px", fontSize: "1rem", cursor: "pointer" }}
                            onClick={() => {
                              props.setEditDistributor(item)
                              handleUpdateAccountModal(true);
                              handleCurrentRowData(item);
                            }}
                          />

                        </Tooltip>
                      </h4>


                    </div>
                  </div>
                </div>


              )
            })}
          </InfiniteScroll>
        </OnlyWrapCard>
      </div>
      <UpdateAccountModal
        RowData={RowData}
        updateAccountModal={props.updateAccountModal}
        handleUpdateAccountModal={handleUpdateAccountModal}
      />

      <Spacer />
    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  updateAccountModal: distributor.updateAccountModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getAllDistributorsList,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributorData,
      handleBillingAddressModal,
      handleUpdateAccountModal,
      emptyDistributor
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);


// const columns = [
//   {
//     title: "",
//     width: "1%",
//   },
//   {
//     title: "Name",
//     width: "12%",
//     defaultSortOrder: "descend",
//     dataIndex: "name",
//     sorter: (a, b) => {
//       var nameA = a.name.toLowerCase(); // ignore upper and lowercase
//       var nameB = b.name.toLowerCase(); // ignore upper and lowercase
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }

//       return 0;
//     },
//     render: (name, item, i) => {
//       const currentdate = moment().format("DD/MM/YYYY");
//       const date = moment(item.creationDate).format("DD/MM/YYYY");
//       return (
//         <>
//           <AccountDetailsView
//             distributorId={item.distributorId}
//             name={item.name}
//           />
//           &nbsp;&nbsp;
//           {date === currentdate ? (
//             <span
//               style={{
//                 color: "tomato",
//                 fontWeight: "bold",
//               }}
//             >
//               New
//             </span>
//           ) : null}
//         </>
//       );
//     },
//   },

//   {
//     title: "Work",
//     dataIndex: "phoneNo",
//     render: (name, item, i) => {
//       return (
//         <>
//           {item.dialCode} {item.phoneNo}
//         </>
//       );
//     },
//     width: "10%",
//   },
//   {
//     title: "Website",
//     dataIndex: "url",
//     width: "15%",
//   },
//   {
//     title: "Type",
//     dataIndex: "clientName",
//     width: "10%",
//     textAlign: "center"
//   },
//   {
//     title: "Payment",
//     dataIndex: "payment",
//     width: "10%",
//     textAlign: "center"
//   },
//   {
//     title: "VAT",
//     dataIndex: "",
//     textAlign: "center",
//     width: "8%",

//     render: (text, item) => {
//       return (
//         <>
//           {item.countryName}
//         </>
//       )
//     }
//   },

//   {
//     title: "Billing Address",
//     // render: (name, item, i) => {
//     //   return `${item.addresses[0].address1 || ""} ${item.addresses[0]
//     //     .address2 || ""} ${item.addresses[0].street || ""} ${item.addresses[0].city || ""}`;
//     // },
//     width: "22%",
//   },

//   {
//     title: "Pin Code",
//     // render: (name, item, i) => {
//     //   return `${item.addresses[0].pinCode || ""}`;
//     // },
//     width: "6%",
//   },
//   // {
//   //   title: "",
//   //   dataIndex: "",
//   //   render: (name, item, i) => {
//   //     return (
//   //       <Tooltip title="Add Shipping Address">
//   //         <PlusOutlined
//   //           onClick={() => {
//   //             handleBillingAddressModal(true)
//   //             handleSetCurrentDistributorId(item.distributorId);
//   //           }}
//   //         />
//   //       </Tooltip>
//   //     );
//   //   },
//   //   width: "4%",
//   // },
//   {
//     title: "",
//     width: "3%",
//     render: (name, item, i) => {
//       return (
//         <Tooltip title="Contacts">
//           <div
//           // onClick={() => {
//           //   handleBillingAddressModal(true)
//           //   handleSetCurrentDistributorId(item.distributorId);
//           // }}
//           >
//           </div>
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     width: "2%",
//     dataIndex: "documentId",
//     render: (name, item, i) => {
//       return (
//         <Tooltip title="Order">

//           <div
//           // onClick={() => {
//           //   props.handleDistributorOrderModal(true);
//           //   handleSetCurrentDistributorId(item.distributorId);
//           // }}
//           />
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     dataIndex: "documentId",
//     width: "2%",
//     render: (name, item, i) => {
//       return (
//         <Tooltip title="Activity">
//           <span>
//             <i
//               class="fab fa-connectdevelop"
//               style={{ cursor: "pointer" }}
//             // onClick={() => {
//             //   props.handleDistributorActivityTableModal(true);
//             //   handleSetCurrentDistributorId(item.distributorId);
//             // }}
//             ></i>
//           </span>
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     dataIndex: "documentId",
//     width: "2%",
//     render: (name, item, i) => {
//       //debugger
//       return (
//         <Tooltip title="Edit">
//           <div
//             style={{ cursor: "pointer" }}
//           // onClick={() => {
//           //   props.setEditDistributor(item);
//           //   handleUpdateDistributorModal(true);
//           //   handleSetCurrentDistributorId(item.distributorId);
//           // }}
//           />
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     width: "3%",
//     render: (name, item, i) => {
//       //debugger
//       return (
//         <>
//           <Tooltip title="Delete Client">
//             <Popconfirm
//               title="Do you want to delete?"
//             // onConfirm={() => props.deleteDistributorData(item.distributorId)}
//             >
//               <DeleteOutlined

//                 style={{ cursor: "pointer", color: "red" }}
//               />
//             </Popconfirm>
//           </Tooltip>

//         </>
//       );
//     },
//   },
// ];
