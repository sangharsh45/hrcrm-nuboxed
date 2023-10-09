import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getlocation } from "./LocationAction";
import styled from 'styled-components';
import {Switch}from "antd";

const LocationCard = (props) => {
  useEffect(() => {
   props.getlocation(props.orgId);
    }, [])
  return (
    <div class="overflow-y-auto max-h-[37rem]">
      <CardWrapper>  
   {props.showLocation.map((item) => {
     return (
  <CardElement>
    
     <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
     <div className=" flex font-medium flex-col md:w-40 max-sm:flex-row w-full max-sm:justify-between ">

<div class=" text-sm text-cardBody font-semibold font-poppins">
Name
</div>

<div class=" font-normal text-sm text-cardBody font-poppins">
  {item.locationName}
</div>
{/* </Tooltip>   */}
</div>         
 
<div className=" flex font-medium flex-col md:w-40  max-sm:flex-row w-full mt-1 max-sm:justify-between">

<div class=" text-sm text-cardBody font-semibold font-poppins">
Country
</div>

<div class=" font-normal text-sm text-cardBody font-poppins">
  {item.country_name}
</div>
</div> 
<div className=" flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">

<div class=" text-sm text-cardBody font-semibold font-poppins">
Address
</div>

<div class=" font-normal text-sm text-cardBody font-poppins">
<span>
            {`${(item.address && item.address[0].city) || ""}` +
              " " +
              `${(item.address && item.address[0].state) || ""}`}
          </span>
</div>
</div> 
<div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
<div class=" text-sm text-cardBody font-semibold font-poppins">
Production
</div>

<div class=" font-normal text-sm text-cardBody font-poppins">
  <Switch className="toggle-clr"
                        checked={item.productionInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
</div>
</div> 
<div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
<div class=" text-sm text-cardBody font-semibold font-poppins">
Inventory
</div>

<div class=" font-normal text-sm text-cardBody font-poppins">
<Switch className="toggle-clr"
                        checked={item.inventoryInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
</div>
</div> 
<div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between ">
<div class=" text-sm text-cardBody font-semibold font-poppins">
Billing
</div>
<div class=" font-normal text-sm text-cardBody font-poppins">
  <Switch className="toggle-clr"
                        checked={item.billingInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
</div>
</div> 
<div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
<div class=" text-sm text-cardBody font-semibold font-poppins">
Corporate
</div>
<div class=" font-normal text-sm text-cardBody font-poppins">
  <Switch className="toggle-clr"
                        checked={item.corporateInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
</div>
</div> 
<div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
<div class=" text-sm text-cardBody font-semibold font-poppins">
Project
</div>
<div class=" font-normal text-sm text-cardBody font-poppins">
  <Switch className="toggle-clr"
                        checked={item.projectInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
</div>
</div> 
<div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full mt-1 max-sm:justify-between">
<div class=" text-sm text-cardBody font-semibold font-poppins">
Retail
</div>
<div class=" font-normal text-sm text-cardBody font-poppins">
  <Switch className="toggle-clr"
                        checked={item.retailInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
</div>
</div> 

 </div>

  </CardElement>
     )
    })}
  </CardWrapper>
    </div>
  )
}
const mapStateToProps = ({ location,auth }) => ({
  showLocation:location.showLocation,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getlocation
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps) (LocationCard)

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 4rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: -webkit-fill-available;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0.25em;
     height: 15rem;
    
  }
`