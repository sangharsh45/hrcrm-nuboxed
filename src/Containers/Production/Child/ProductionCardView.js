import React, { useState, useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Tooltip,Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import MoveToggleProduction from "../Child/MoveToggleProduction";
import {getProductionsbyLocId,handleBuilderProduction,handleProductionIDrawer} from "../ProductionAction"
const BuilderProductionDrawer =lazy(()=>import("./BuilderProductionDrawer"));
const ProductionIDrawer=lazy(()=>import("./ProductionIDrawer"));

function ProductionCardView(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getProductionsbyLocId(props.locationId,page);
        setPage(page + 1);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        const proPag = props.productionByLocsId && props.productionByLocsId.length && props.productionByLocsId[0].pageCount
        setTimeout(() => {
            if  (props.productionByLocsId)
            {
              if (page < proPag) {
                setPage(page + 1);
                props.getProductionsbyLocId(props.locationId,page);
            }
            if (page === proPag){
              setHasMore(false)
            }
          }
          }, 100);   
    };

    const {
        fetchingProductionLocId,
        productionByLocsId,
        user,
        openbUILDERProductiondrawer,handleBuilderProduction,clickedProductionIdrwr,handleProductionIDrawer
    } = props;
    return (
        <>
         <div className=' flex justify-end sticky top-28 z-auto'>
         <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[8%]">Id</div>
         <div className=" md:w-[7%]">Item</div>
        <div className=" md:w-[6.1rem]">Start Date</div>
        <div className=" md:w-[6rem]">End Date</div>
        <div className=" md:w-[4.2rem] ">Status</div>
        <div className="md:w-[5.8rem]"></div>
        <div className="w-12"></div>
            </div>
        <InfiniteScroll
        dataLength={productionByLocsId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingProductionLocId?<div class="text-center font-semibold text-xs">Loading...</div>:null}
        height={"75vh"}
        endMessage={ <div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
             {productionByLocsId.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
       <div class="flex">
       <div className=" flex font-medium flex-col  md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
       
<div class=" underline text-[#1890ff] cursor-pointer w-[7rem] flex text-xs  font-poppins"
 onClick={() => {
    handleParticularRowData(item);
    props.handleProductionIDrawer(true)
}}
>
                    {item.manufactureId} 
                </div>

</div> 
    <div className=" flex font-medium flex-col  md:w-[6.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs text-cardBody font-poppins">
                        {item.productName} 
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
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">

<div class=" text-xs text-cardBody font-semibold  font-poppins">
    <Button 
     type="primary"
     onClick={() => {
                                                handleParticularRowData(item);
                                                handleBuilderProduction(true);
                                            }}
     >
        Add Parts
     </Button>
     </div>
</div>
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">

        <div class=" text-xs text-cardBody font-semibold  font-poppins">
        <MoveToggleProduction item={item}/>
             </div>
    </div>
  
    {(user.productionUpdateInd === true  || user.role === "ADMIN") &&  (  
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
    )}
</div>
</div>
          );
        })}
              </InfiniteScroll> 
              </div>
              </div>

    <BuilderProductionDrawer
    particularDiscountData={particularDiscountData}
    openbUILDERProductiondrawer={openbUILDERProductiondrawer}
    handleBuilderProduction={handleBuilderProduction}
    />
    <ProductionIDrawer
     particularDiscountData={particularDiscountData}
     clickedProductionIdrwr={clickedProductionIdrwr}
     handleProductionIDrawer={handleProductionIDrawer}
    />     
        </>
    );
}


const mapStateToProps = ({ production, auth, }) => ({
    productionByLocsId: production.productionByLocsId,
    fetchingProductionLocId: production.fetchingProductionLocId,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,
    openbUILDERProductiondrawer:production.openbUILDERProductiondrawer,
    clickedProductionIdrwr:production.clickedProductionIdrwr
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionsbyLocId,
            handleBuilderProduction,
            handleProductionIDrawer
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionCardView);
