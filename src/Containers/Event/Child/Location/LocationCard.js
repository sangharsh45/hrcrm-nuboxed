import React, { useEffect,useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getlocation, handleLocationShiftDrawer,
  handleUpdateLocationDrawer,
  handleLocationCustomerDrawer,
  handleLocationSupplierDrawer,
  deleteLocation } from "./LocationAction";
import styled from "styled-components";
import { Switch, Tooltip } from "antd";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import InventoryIcon from '@mui/icons-material/Inventory';
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import LocationCustomerDrawer from "./LocationCustomerDrawer";
import LocationSupplierDrawer from "./LocationSupplierDrawer";

const LocationShiftDrawer = lazy(() => import("./LocationShiftDrawer"));
const LocationUpdateDrawer=lazy(()=>import("./LocationUpdateDrawer"));

const LocationCard = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getlocation(props.orgId);
  }, []);

  const [storedLoc,setStoredLoc]=useState({});
const handleStoredLocations=(locs)=>{
  setStoredLoc(locs);
}
const handleLoadMore = () => {
      setPage(page + 1);
      props.getlocation(props.orgId);
}
  // if (props.fetchingLocationData) return <BundleLoader />;
  return (
    <>
      <div>
      <InfiniteScroll
        dataLength={props.showLocation.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingLocationData?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
      <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[9rem]">Name</div>
        <div className=" md:w-[13rem]">Country</div>
        <div className=" md:w-28 ">Address</div>
        <div className=" md:w-28 ">Refurbish</div>
        <div className=" md:w-28 ">Producation</div>
        <div className="md:w-36">Inventory</div>
        <div className="md:w-[6.5rem]">Billing</div>
        <div className="md:w-24">Corporate</div>
        <div className="md:w-24">Project</div>
        <div className="md:w-24">Retail</div>
      </div>
        <CardWrapper>
          {props.showLocation.map((item) => {
            return (
              <div class="w-wk">
                <div class=" flex rounded-xl justify-between bg-white mt-[0.5rem]  h-[2.75rem] items-center p-3">
                  <div class="flex">
                    <div className=" flex font-medium flex-col md:w-40 max-sm:flex-row w-full max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Name
                      </div> */}

                      <div class=" font-normal text-[0.82rem]text-cardBody font-poppins">
                        {item.locationName}
                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-40  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Country
                      </div> */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.country_name}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Address
                      </div> */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <span>
                          {`${(item.address && item.address[0].city) || ""}` +
                            " " +
                            `${(item.address && item.address[0].state) || ""}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Refurbish
                      </div> */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <Switch
                          className="toggle-clr"
                          checked={item.productionInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Inventory
                      </div> */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <Switch
                          className="toggle-clr"
                          checked={item.prodmanufInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Inventory
                      </div> */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <Switch
                          className="toggle-clr"
                          checked={item.inventoryInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Billing
                      </div> */}
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <Switch
                          className="toggle-clr"
                          checked={item.billingInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Corporate
                      </div> */}
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <Switch
                          className="toggle-clr"
                          checked={item.corporateInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Project
                      </div> */}
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <Switch
                          className="toggle-clr"
                          checked={item.projectInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      {/* <div class=" text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                        Retail
                      </div> */}
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <Switch
                          className="toggle-clr"
                          checked={item.retailInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Tooltip title="Shift">
                          <FilterTiltShiftIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() => {
                              handleStoredLocations(item);
                              props.handleLocationShiftDrawer(true);
                              // handleSetCurrentLeadsId(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                      {/* <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteLeadsData(item.leadsId)}
          >
     
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", color: "red" ,fontSize: "1rem",}}
            />
          </StyledPopconfirm>
                        </div> */}
                      <div></div>
                    </div>
                    <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Tooltip title="Customer">
                          <AcUnitIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() => {
                               handleStoredLocations(item);
                            props.handleLocationCustomerDrawer(true);
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                      <Tooltip title="Supplier">
                          <InventoryIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() => {
                               handleStoredLocations(item);
                            props.handleLocationSupplierDrawer(true);
                            }}
                          />
                         </Tooltip>
                      </div>
                      <div></div>
                    </div>
                    <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() => {
                               handleStoredLocations(item);
                            props.handleUpdateLocationDrawer(true);
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.deleteLocation(item.locationDetailsId)}
                        >
                          <DeleteIcon
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                        </StyledPopconfirm>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardWrapper>
        </InfiniteScroll>
      </div>
      <LocationShiftDrawer
        storedLoc={storedLoc}
        locShiftDrawer={props.locShiftDrawer}
        handleLocationShiftDrawer={props.handleLocationShiftDrawer}
        handleStoredLocations={handleStoredLocations}
      />
      <LocationUpdateDrawer
      storedLoc={storedLoc}
      locationUpdatedrawr={props.locationUpdatedrawr}
      handleUpdateLocationDrawer={props.handleUpdateLocationDrawer}
      />
           <LocationCustomerDrawer
      storedLoc={storedLoc}
      locationCustomerdrawr={props.locationCustomerdrawr}
      handleLocationCustomerDrawer={props.handleLocationCustomerDrawer}
      />
                 <LocationSupplierDrawer
      storedLoc={storedLoc}
      locationSupplierdrawr={props.locationSupplierdrawr}
      handleLocationSupplierDrawer={props.handleLocationSupplierDrawer}
      />
    </>
  );
};
const mapStateToProps = ({ location, auth }) => ({
  showLocation: location.showLocation,
  locationSupplierdrawr:location.locationSupplierdrawr,
  locationCustomerdrawr:location.locationCustomerdrawr,
  orgId: auth.userDetails.organizationId,
  locShiftDrawer: location.locShiftDrawer,
  locationUpdatedrawr:location.locationUpdatedrawr
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getlocation,
      handleLocationShiftDrawer,
      handleUpdateLocationDrawer,
      deleteLocation,
      handleLocationCustomerDrawer,
      handleLocationSupplierDrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LocationCard);

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`;
const CardElement = styled.div`
  border-radius: 0.75rem;
  border: 3px solid #eeeeee;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.25em 0.62em #aaa;
  height: 4rem;
  color: rgb(68, 68, 68);
  margin: 1em;
  padding: 0.2rem;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0.25em;
    height: 7rem;
  }
`;
