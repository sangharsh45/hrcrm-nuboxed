import React, { useState, useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getProductbuilder,addProductBuilder,getSearchBuilder } from "../../ProductAction";
import {  Select } from "../../../../Components/UI/Elements";
const ProductbuilderTable2 =lazy(()=>import("./ProductbuilderTable2"));
const ProBuildSearchedCard =lazy(()=>import("./ProBuildSearchedCard"));

const { Option } = Select;

function ProductbuilderTable (props) {

  useEffect(()=> {
    props.getProductbuilder();
    
  },[]);

  const prosb=props.productBuilder

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedObject, setSelectedObject] = useState(null);
  const [showCard, setshowCard] = useState(false);

  const handleChange = (ev) => {
    setSelectedValue(ev);
    // const foundObject = prosb.find(option => option.hsn === ev);
    // setSelectedObject(foundObject);
      props.getSearchBuilder(ev);
      setshowCard(true)
  };

  const handleSubmit = () => {

    const selectedObjdata= {
hsn:selectedObject.hsn,
attributeName:selectedObject.attributeName,
categoryName:selectedObject.categoryName,
suppliesName:selectedObject. name,
subAttributeName:selectedObject.subAttributeName,
subCategoryName:selectedObject.subCategoryName,
suppliesId:selectedObject.suppliesId,
productId:props.particularDiscountData.productId,
quantity:selectedObject.quantity,
    }
    props.addProductBuilder(selectedObjdata);
    setshowCard(true)
 
  };

  return (
    <>

    <div class=" flex" >
                                <div class=" w-full h-full">

                                    <div class="flex justify-between">
                                    <div class=" w-[18%]">
                                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">HSN</div>
      <Select value={selectedValue} onChange={handleChange}>
        {prosb.map(option => {
          return <Option key={option.suppliesId} value={option.hsn}>{option.hsn}</Option>
})}
      </Select>
      </div>

        <div>
                                        
                                        {/* <Button
                                    type="primary" 
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button> */}
                                </div>
                                    </div>
                                </div>
                            </div>     

                            
<Suspense fallback={"Loading"}>
{showCard &&
<ProBuildSearchedCard particularDiscountData={props.particularDiscountData}/>
}
<ProductbuilderTable2 particularDiscountData={props.particularDiscountData}/>
</Suspense>
                       
     {/* <div className=' flex justify-end sticky z-auto'> 
          <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Hsn</div>
        <div className=" md:w-[6.1rem]">Name</div>
        <div className=" md:w-[4.2rem] ">Description</div>
        <div className="md:w-[5.8rem]">Category</div>
        <div className="md:w-[5.8rem]">Sub-Category</div>
        <div className="md:w-[5.8rem]">Unit</div>
        <div className="w-12"></div>
            </div>

<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {props.addedProBuilder.hsn}
                            </div>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs text-cardBody font-poppins">
                        {props.addedProBuilder.name} 
                    </div>
    
    </div> 
 
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
    <span style={{ cursor: "pointer" }}>
              <Tooltip title={props.addedProBuilder.description}>
                {elipsize(props.addedProBuilder.description || "", 70)}
              </Tooltip>
            </span>
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {props.addedProBuilder.categoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {props.addedProBuilder.subCategoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                     
                    {props.addedProBuilder.quantity}

                    {editsuppliesId === item.suppliesId ? (
                       <input
                       style={{border:"2px solid black"}}
                       value={editedFields[item.suppliesId]?.quantity !== undefined ? editedFields[item.suppliesId].quantity : item.quantity}
                       onChange={(e) => handleChange(item.suppliesId, 'quantity', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span> {item.quantity}</span>
                      </div>
                    )}
                    </div>
    </div>
    <div className=" flex mt-[1rem]" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                    {editsuppliesId === item.suppliesId ? (
                        <>
                      <Button onClick={() => handleUpdateSupplies(item.suppliesId,item.hsn, item.name, item.description,item.categoryName, item.subCategoryName )}>
                        Save
                      </Button>
                        <Button onClick={() => handleCancelClick(item.suppliesId)} style={{ marginLeft: '0.5rem' }}>
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.suppliesId)}
                        style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                    )}
                  </div>
</div>
</div>
          
      
             
              </div>
              </div> */}
              
      
 
    </>
);
}

const mapStateToProps = ({product }) => ({
    productBuilder: product.productBuilder,
    fetchingProductBuilder: product.fetchingProductBuilder,
    addingProductBuilder:product.addingProductBuilder,
    addedProBuilder:product.addedProBuilder
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductbuilder,
            addProductBuilder,
            getSearchBuilder,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);
