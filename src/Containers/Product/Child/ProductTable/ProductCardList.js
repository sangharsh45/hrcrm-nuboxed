import React, { useState, useEffect,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrGenerate from "../ProductTable/QrGenerate"
import {
    getProducts,
    getProductByGroup,
    getAllProductCatagory,
    setEditProducts,
    handleUpdateProductModal,
    handleHistoryModal,
    handleCatalogueConfigureModal,
    deleteProductData,
    handleCatalogueWipModal,
    handleProductBuilderDrawer,
    handlePriceDrawer
} from "../../ProductAction";
import ProductPublishToggle from "./ProductPublishToggle";
import {
    EditOutlined,
} from "@ant-design/icons";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { Tooltip } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import { OnlyWrapCard } from "../../../../Components/UI/Layout";

const UpdateProductModal =lazy(()=>import("../../Child/UpdateProductModal"));
const PriceDrawer =lazy(()=>import("./PriceDrawer"));
const ProductBuilderDrawer =lazy(()=>import("./ProductBuilderDrawer"));

function ProductCardList(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(page + 1);
        props.getProducts(page);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        setPage(page + 1);
        props.getProducts(page);
    };

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
         <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Article #</div>
        <div className=" md:w-[6.1rem]">Name</div>
        <div className=" md:w-[4.2rem] ">Category</div>
        <div className="md:w-[5.8rem]">Sub</div>
        <div className="md:w-[8.5rem]">Attribute</div>
                <div className="md:w-[5.2rem]">Website</div>
        <div className="w-12"></div>
            </div>
        <InfiniteScroll
        dataLength={products.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingProducts?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
             {products.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
    // style={{
    //     borderBottom: "3px dotted #515050"
    // }}
    >
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
                            <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                                No Image
                            </span>
                        )}
                    </SubTitle>
        </div>
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.articleNo}
                            </h4>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <h4 class=" text-xs text-cardBody font-poppins">
                        {item.name} 
                    </h4>
    
    </div> 
 
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs text-cardBody font-poppins">
                      
                      {item.categoryName}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">


        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.subCategoryName}
                    </h4>
    </div>
    
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
               {item.attributeName}
             </h4>
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
                            style={{cursor:"pointer",fontSize:"1rem" }}
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
                            style={{cursor:"pointer",fontSize:"1rem" }}
                                onClick={() => {
                                    props.handleProductBuilderDrawer(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                        </div>
            </div>
<div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<h4 class=" text-xs text-cardBody font-poppins">
<Tooltip title="Edit">
                                        <EditOutlined
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                            onClick={() => {
                                                props.setEditProducts(item);
                                                handleUpdateProductModal(true);
                                            }}
                                        />
                                    </Tooltip>
</h4>


</div>
</div>
</div>
          );
        })}
              </InfiniteScroll> 
              </OnlyWrapCard>
              </div>

<Suspense fallback={"Loading"}>
              <UpdateProductModal
        updateProductModal={updateProductModal}
        handleUpdateProductModal={handleUpdateProductModal}
      />

            <ProductBuilderDrawer
            particularDiscountData={particularDiscountData}
            proBuilderDrawer={proBuilderDrawer}
            handleProductBuilderDrawer={handleProductBuilderDrawer}
            />
<PriceDrawer
particularDiscountData={particularDiscountData}
handlePriceDrawer={handlePriceDrawer}
priceOpenDrawer={priceOpenDrawer}
/>
</Suspense>      
           
        </>
    );
}


const mapStateToProps = ({ product, auth, supplies }) => ({
    productByGroup: product.productByGroup,
    fetchingProductByGroup: product.fetchingProductByGroup,
    groupId: auth.userDetails.groupId,
    fetchingProducts: product.fetchingProducts,
    fetchingAllProducts: product.fetchingAllProducts,
    fetchingAllProductsError: product.fetchingAllProductsError,
    products: product.products,
    allproducts: product.allproducts,
    updateProductModal: product.updateProductModal,
    // addDiscountModal: product.addDiscountModal,
    // addProductOfferModal: product.addProductOfferModal,
    addHistoryModal: product.addHistoryModal,
    addCatalogueConfigureModal: product.addCatalogueConfigureModal,
    addCatalogueWipModal: product.addCatalogueWipModal,
    role: auth.userDetails.role,
    department: auth.userDetails.department,
    user: auth.userDetails,
    addCurrencyValue: supplies.addCurrencyValue,
    proBuilderDrawer:product.proBuilderDrawer,
    priceOpenDrawer:product.priceOpenDrawer,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductByGroup,
            setEditProducts,
            handleUpdateProductModal,
            handleHistoryModal,
            deleteProductData,
            handleCatalogueConfigureModal,
            getAllProductCatagory,
            handleCatalogueWipModal,
            getProducts,
            handleProductBuilderDrawer,
            handlePriceDrawer
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCardList);
