import React, { useState, useEffect,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Tooltip } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import {getDispatchProductionsbyLocId} from "../../../InventoryAction";

function ProductionDispatchCard(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getDispatchProductionsbyLocId(props.locationId,page);
        setPage(page + 1);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        const proPag = props.productionDispatchByLocsId && props.productionDispatchByLocsId.length && props.productionDispatchByLocsId[0].pageCount
        setTimeout(() => {
            if  (props.productionDispatchByLocsId)
            {
              if (page < proPag) {
                setPage(page + 1);
                props.getDispatchProductionsbyLocId(props.locationId,page);
            }
            if (page === proPag){
              setHasMore(false)
            }
          }
          }, 100);   
    };

    const {
        fetchingDispatchProductionLocId,
        productionDispatchByLocsId,

    } = props;
    return (
        <>
         <div className=' flex justify-end sticky top-28 z-auto'>
         <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Name</div>
        <div className=" md:w-[6.1rem]">Category</div>
        <div className=" md:w-[6rem]">SubCategory</div>
        <div className=" md:w-[4.2rem] ">Attribute</div>
        <div className="md:w-[5.8rem]">Sub Attribute</div>
        <div className="w-12"></div>
            </div>
        <InfiniteScroll
        dataLength={productionDispatchByLocsId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingDispatchProductionLocId?<div class="text-center font-semibold text-xs">Loading...</div>:null}
        height={"75vh"}
        endMessage={ <div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
             {productionDispatchByLocsId.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
       <div class="flex">
   
    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs text-cardBody font-poppins">
                        {item.name} 
                    </div>
    
    </div> 
 
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
    
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">

        <div class=" text-xs text-cardBody font-semibold  font-poppins">
               {item.attributeName}
             </div>
    </div>
<div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div class=" text-xs text-cardBody font-poppins">
<Tooltip title="Edit">
                                        <BorderColorIcon
                                        className="!text-base cursor-pointer text-[tomato]"
                                            // onClick={() => {
                                            //     props.setEditProducts(item);
                                            //     handleUpdateProductModal(true);
                                            // }}
                                        />
                                    </Tooltip>
</div>


</div>
</div>
</div>
          );
        })}
              </InfiniteScroll> 
              </div>
              </div>

    
           
        </>
    );
}


const mapStateToProps = ({ inventory, auth, }) => ({
    productionDispatchByLocsId: inventory.productionDispatchByLocsId,
    fetchingDispatchProductionLocId: inventory.fetchingDispatchProductionLocId,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDispatchProductionsbyLocId
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionDispatchCard);
