import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Spacer } from "../../../Components/UI/Elements";
import { getDeleteHistory } from "./SuppliesAction";
import ReInstateSupplies from "./ReInstateSupplies";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { Link } from "../../../Components/Common";

function SuppliesDeletedTable(props) {
    useEffect(() => {
        props.getDeleteHistory()
    }, []);

    return (
        <>
   <div className=" flex justify-end sticky top-28 z-auto">
        <OnlyWrapCard style={{ height: "80vh", backgroundColor: "#E3E8EE" }}>
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[6.1rem]">Name</div>
            <div className=" md:w-[5.1rem]">Mobile</div>
            <div className=" md:w-[6.2rem] ">Websites</div>
            <div className="md:w-[6.1rem]">Address</div>
            <div className="md:w-[4.8rem]">City</div>
            <div className="md:w-[4.1rem]">Pin Code</div>
            <div className="md:w-[6.1rem]">Re-Instate</div>
          </div>
          {props.deleteSuppliesHistory.map((item) => {
            return (
              <>
                <div
                  className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
                  style={
                    {
                      // borderBottom: "3px dotted #515050"
                    }
                  }
                >
                  <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* <div class=" text-sm text-cardBody font-medium font-poppins">

Name

</div>  */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {/* <Link
          toUrl={`shipper/${item.shipperId}`}
          title={`${item.shipperName}`}
        >{item.shipperName}</Link> */}
                        {item.name}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* <div class=" text-sm text-cardBody font-medium font-poppins">

Phone #

</div>  */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.dialCode} {item.phoneNo}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* <div class=" text-sm text-cardBody font-medium font-poppins">

Email

</div>  */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.url}
                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* <div class=" text-sm text-cardBody font-medium font-poppins">

Ship By

</div>  */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {`${item.addresses[0].address1 || ""} ${item.addresses[0]
                    .address2 || ""} ${item.addresses[0].street || ""} 
                ${item.addresses[0].city || ""}
                    `}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* 
<div class=" text-sm text-cardBody font-medium font-poppins">

Address

</div>  */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.addresses[0].city || ""}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* <div class=" text-sm text-cardBody font-medium font-poppins">

City

</div>  */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.addresses[0].pinCode || ""}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* <div class=" text-sm text-cardBody font-medium font-poppins">

PinCode

</div>  */}

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      <ReInstateSupplies suppliesId={item.suppliesId} />
                      </div>
                    </div>
                    
                  </div>
                </div>
              </>
            );
          })}
        </OnlyWrapCard>
      </div>
        </>
    );
}
const mapStateToProps = ({ supplies }) => ({
    deleteSuppliesHistory: supplies.deleteSuppliesHistory,
    fetchingDeletedSuppliesHistory: supplies.fetchingDeletedSuppliesHistory
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDeleteHistory
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesDeletedTable);
