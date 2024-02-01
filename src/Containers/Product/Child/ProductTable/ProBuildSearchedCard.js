import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getSearchBuilder ,removeProductBuilder,updateProSupplBuilder } from "../../ProductAction";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ProBuildSearchedToggle from "./ProBuildSearchedToggle";

function ProBuildSearchedCard (props) {

  useEffect(()=> {
    // props.getSearchBuilder("15467");
  },[]);
  

return (
    <>
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Name</div>
        {/* <div className=" md:w-[6.1rem]">Description</div> */}
        <div className=" md:w-[4.2rem] ">Category</div>
        <div className="md:w-[5.8rem]">Sub Category</div>
        <div className=" md:w-[4.2rem] ">Unit</div>
        <div className="w-12"></div>
            </div>
      
             {props.searchedBuilders.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "    >
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.name}
                            </div>
    </div>

    {/* <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs text-cardBody font-poppins">
    <span style={{ cursor: "pointer" }}>
              <Tooltip title={item.description}>
                 {elipsize(item.description || "", 70)}
               </Tooltip>
             </span>
                    </div>
    
    </div>  */}
 
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.categoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">  
                       {item.quantity}
                    </div>
  </div>
  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      <ProBuildSearchedToggle item={item} productId={props.particularDiscountData.productId}/>
      
  </div>
 
</div>
</div>
          );
        })}
             
              </div>
              </div>
 
    </>
);
}

const mapStateToProps = ({product }) => ({
    searchedBuilders: product.searchedBuilders,
    fetchingSearchedBuilders: product.fetchingSearchedBuilders
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getSearchBuilder ,
            removeProductBuilder,
            updateProSupplBuilder
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedCard);
