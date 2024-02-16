import React, { useState, useEffect,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function ProductionCardView(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        // props.getProducts(page);
        // setPage(page + 1);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    // const handleLoadMore = () => {
    //     const proPag = props.products && props.products.length && props.products[0].pageCount
    //     setTimeout(() => {
    //         if  (props.products)
    //         {
    //           if (page < proPag) {
    //             setPage(page + 1);
    //             props.getProducts(page);
    //         }
    //         if (page === proPag){
    //           setHasMore(false)
    //         }
    //       }
    //       }, 100);   
    // };

    const {
        fetchingProducts,
        products,
        handleUpdateProductModal,
        updateProductModal,
        user,
        proBuilderDrawer,
        handleProductBuilderDrawer,
        handlePriceDrawer,
        priceOpenDrawer
    } = props;
    return (
        <>
         <div className=' flex justify-end sticky top-28 z-auto'>
         <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Item</div>
        <div className=" md:w-[6.1rem]">Start Date</div>
        <div className=" md:w-[4.2rem] ">End Date</div>
        <div className="md:w-[5.8rem]">Status</div>
        <div className="md:w-[8.5rem]"></div>  
        <div className="w-12"></div>
            </div>
        {/* <InfiniteScroll
        dataLength={products.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingProducts?<div class="text-center font-semibold text-xs">Loading...</div>:null}
        height={"75vh"}
        endMessage={ <div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
             {products.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
       <div class="flex">
       <div className=" flex font-medium flex-col md:w-[5.1rem] max-sm:w-full  ">
       <SubTitle>
                        {item.imageId ? (
                            <MultiAvatar
                                imageId={item.imageId ? item.imageId : ''}
                                imgHeight={"1.8em"}
                                imgWidth={"1.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <div class="font-bold text-xs" >
                                No Image
                            </div>
                        )}
                    </SubTitle>
        </div>
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.articleNo}
                            </div>
    </div>

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
 
    <div class="flex md:items-center"> 
    
    <div className=" flex font-medium flex-col  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
    <QrGenerate/>
</div> 
<div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

<ProductPublishToggle item={item} />

</div> 

</div>
<div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                   <div>
                   <Tooltip title="Add Price">
                            <EuroIcon
                            className="!text-base cursor-pointer text-[blue]"
                                onClick={() => {
                                    props.handlePriceDrawer(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                   </div>
                   
                   <div>
                   <Tooltip title="Product Builder">
                            <ViewQuiltIcon
                            className="!text-base cursor-pointer text-[#4bc076]"
                                onClick={() => {
                                    props.handleProductBuilderDrawer(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                        </div>
            </div>
<div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div class=" text-xs text-cardBody font-poppins">
<Tooltip title="Edit">
                                        <BorderColorIcon
                                        className="!text-base cursor-pointer text-[tomato]"
                                            onClick={() => {
                                                props.setEditProducts(item);
                                                handleUpdateProductModal(true);
                                            }}
                                        />
                                    </Tooltip>
</div>


</div>
</div>
</div>
          );
        })}
              </InfiniteScroll>  */}
              </div>
              </div>

<Suspense fallback={"Loading"}>
             
</Suspense>      
           
        </>
    );
}


const mapStateToProps = ({ product, auth, supplies }) => ({
   
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionCardView);
