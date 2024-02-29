import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "antd";
import { Link } from "../../../Components/Common";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllDistributorsList,
} from "./AccountAction";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));


function AccountTable(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllDistributorsList(page);
    setPage(page + 1);
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDistributorsList(props.currentUser ? props.currentUser : page,
    );
  }

  useEffect(() => {
    return () => props.emptyDistributor();
  }, []);

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;
  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex  w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[15.12rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="name"
            /></div>
            <div className=" md:w-[8.121rem]"><FormattedMessage
              id="app.work#"
              defaultMessage="work#"
            /></div>
            <div className=" md:w-[8.825rem] "><FormattedMessage
              id="app.website"
              defaultMessage="website"
            /></div>
            <div className="md:w-[6.95rem]"><FormattedMessage
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
            <div className="md:w-[14.21rem]"><FormattedMessage
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
            loader={props.fetchingAllDistributors ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"75vh"}
          >

            {props.allDistributors.map((item) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
              const diff = Math.abs(
                dayjs().diff(dayjs(item.lastRequirementOn), "days")
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
                  <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 "
                  // style={{
                  //     borderBottom: "3px dotted #515050"
                  // }}
                  >
                    <div class="flex">
                      <div className=" flex font-medium flex-col md:w-[13.6rem] max-sm:w-full  ">


                        <Tooltip>
                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                              {item.name}&nbsp;&nbsp;
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

                            </div>
                          </div>
                        </Tooltip>

                      </div>

                      <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.dialCode} {item.phoneNo}
                        </div>

                      </div>

                    </div>

                    <div className=" flex font-medium flex-col md:w-[8.55rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</div> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.url}

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[7.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.clientName}

                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[10.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</div> */}

                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.payment}

                      </div>
                    </div>

                    <div class="flex md:items-center">

                      <div className=" flex font-medium flex-col  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.countryValue}
                        </div>

                      </div>
                      <div className=" flex font-medium flex-col  md:w-[15.25rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {dataLoc}
                        </div>

                      </div>

                      <div className=" flex font-medium flex-col  md:w-[6.92rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.address && item.address.length && item.address[0].postalCode}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>


              )
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
