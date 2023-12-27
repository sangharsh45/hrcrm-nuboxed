import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Button, Tooltip } from "antd";
import moment from "moment";
import { Link } from "../../../Components/Common";
import { getInventory, handleInventoryRoomRackModal } from "./InventoryAction";
import InventoryRoomRackModal from "./InventoryRoomRackModal";
import { OnlyWrapCard } from '../../../Components/UI/Layout';
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";

const InventoryCard = (props) => {
  const [rowData, setRowData] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const {
    getInventory,
    handleInventoryRoomRackModal,
    inventory,
    orgId,
    addroomrackininventory,
    fetchingInventoryList
  } = props;

  useEffect(() => {
    getInventory(orgId);
  }, [getInventory, orgId]);
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getInventory(orgId);
};

  const filteredData = inventory.filter((item) => item.inventoryInd === true);
  return (
    <>
        <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
        <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[4.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
        <div className=" md:w-[1.1rem]"><FormattedMessage id="app.supervisor" defaultMessage="Supervisor" /></div>
        <div className=" md:w-[9.8rem] "><FormattedMessage id="app.country" defaultMessage="Country" /></div>
        <div className="md:w-[6.6rem]"><FormattedMessage id="app.address" defaultMessage="Address" /></div>
        <div className="md:w-[5.8rem]"><FormattedMessage id="app.pincode" defaultMessage="Pin Code" /></div>
        <div className="md:w-[4.3rem]"></div>
      </div>
        <InfiniteScroll
        dataLength={filteredData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingInventoryList?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
      
      {filteredData.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                <div className=" flex font-medium flex-col md:w-[11.2rem] max-sm:w-full  ">

                                   
                                        <Tooltip>
                                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                            {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4> */}
                                            <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`locationDetails/${item.locationDetailsId}`}
          title={`${item.locationName}`}
        >{item.locationName}</Link>&nbsp;&nbsp;
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

                                <div className=" flex font-medium flex-col  md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                    <h4 class=" text-xs text-cardBody font-poppins">   
                                    {item.management}
                                    </h4>
                                
                                </div> 
                                <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</h4> */}
                                    <h4 class=" text-sm text-cardBody font-poppins">
                                    {(item.address && item.address[0].country) || ""}
                                    </h4>
                                </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[10.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {`${(item.address && item.address[0].city) || ""} ${" "}${(item.address && item.address[0].state) || ""}`}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {(item.address && item.address[0].postalCode) || ""}

                                    </div>
                                </div>
                              
                              
                                <div class="flex md:items-center"> 
                            
                   <div className=" flex font-medium justify-center flex-col max-sm:flex-row  ">
                       
                       <h4 class=" text-sm text-cardBody font-poppins"></h4>

                       <Button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={() => {
              setRowData(item);
              handleInventoryRoomRackModal(true);
            }}
          >
            <FormattedMessage id="app.confirgurestore" defaultMessage="Confirgure Store" />
          </Button>
                   </div>
                      </div>
                            </div>
                        </div>
)})}
                </InfiniteScroll>
      </OnlyWrapCard>
      </div>


      <InventoryRoomRackModal
        rowData={rowData}
        handleInventoryRoomRackModal={handleInventoryRoomRackModal}
        addroomrackininventory={addroomrackininventory}
      />
    </>
  );
};

const mapStateToProps = ({ inventory, auth, locations }) => ({
  userId: auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  fetchingInventoryList: inventory.fetchingInventoryList,
  inventory: inventory.inventory,
  // locationsType: locations.locationsType,
  addroomrackininventory: inventory.addroomrackininventory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventory,
      handleInventoryRoomRackModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryCard);
