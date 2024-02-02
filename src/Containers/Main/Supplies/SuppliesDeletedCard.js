import React, {useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDeleteHistory } from "./SuppliesAction";
import ReInstateSupplies from "./ReInstateSupplies";


function SuppliesDeletedCard(props) {
    useEffect(() => {
        props.getDeleteHistory()
    }, [])
    return(
        <>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        {props.deleteSuppliesHistory.map((item) => {
          return (
            <>
             <div className="flex justify-between mt-2 "
                          // style={hrStyle}
                          style={{
                            borderBottom: "3px dotted #515050"
                          }}
                        >
         <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
         <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm text-cardBody font-medium font-poppins">
        
        Name
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
        {item.descend}
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm text-cardBody font-medium font-poppins">
        
        Mobile
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
        {item.dialCode} {item.phoneNo}
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm text-cardBody font-medium font-poppins">
        
        Websites
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
        {item.url} 
        </div>
        
        </div>
        
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm text-cardBody font-medium font-poppins">
        
        Address
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
        {item.addresses[0].address1 || ""} ${item.addresses[0]
                    .address2 || ""} ${item.addresses[0].street || ""} 
                ${item.addresses[0].city || ""}
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm text-cardBody font-medium font-poppins">
        
        City
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
        {item.addresses[0].city || ""}
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm text-cardBody font-medium font-poppins">
        
        Pin Code
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
        {item.addresses[0].pinCode || ""}
        </div>
        
        </div>
        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
        
        <div class=" text-sm text-cardBody font-medium font-poppins">
        
        Re-Instate
        
        </div> 
        
        
        <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
        <ReInstateSupplies suppliesId={item.suppliesId} />
        </div>
        
        </div>
      
        
         </div>
        
        
        
        
                        </div>
            </>
          )
        })}
        
          </div>
         
        </>
        )
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(SuppliesDeletedCard);
    