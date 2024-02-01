import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getProductbuilder,addProductBuilder } from "../../ProductAction";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import {  Select } from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Formik, Form, Field,} from "formik";

const { Option } = Select;

function ProductbuilderTable (props) {

  useEffect(()=> {
    props.getProductbuilder();
  },[]);

  const [selectedHsn, setselectedHsn] = useState("");
  const [showCard, setshowCard] = useState(false);

  const handleSelectHsn=(slhsn)=>{
    setselectedHsn(slhsn);
    
  }

  const prosb=props.productBuilder

return (
    <>
     <Formik
                    enableReinitialize
                    initialValues={{
                        hsn:selectedHsn,
                        productId:props.particularDiscountData.productId
                        // conversionCurrency:conversionCurrency,
                        // conversionFactor:"",
                        // reportingFactor:"1",
                        // userId:props.userId,
                        // orgId:props.orgId
                    }}
                    onSubmit={(values, { resetForm }) => {
                        props.addProductBuilder({
                            ...values,
                        });
                        setshowCard(true);
                        resetForm();
                    }
                    }
                >
                    {({
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        ...rest
                    }) => (
                        <Form>
                            <div class=" flex" >
                                <div class=" w-full h-full">

                                    <div class="flex justify-between">
                                    <div class=" w-[18%]">
                                        <div class="hont-bold text-sm">HSN</div>
        <Select 
        value={selectedHsn} 
        onChange={handleSelectHsn}
        >
          {prosb.map((option) => {
          return  <Option key={option.suppliesId} value={option.hsn}>
             {option.hsn}
           </Option>
})}
        </Select>
        </div>

        <div>
                                        
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingProductBuilder}
                                    // style={{
                                    //     marginTop: "20px",
                                    //     marginLeft: "286px",
                                    // }}
                                >
                                    Submit
                                </Button>
                                </div>
                                    </div>
                                </div>
                            </div>

                     
                        </Form>
                    )}
                </Formik> 
                {showCard &&
     <div className=' flex justify-end sticky z-auto'> 
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
    <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {props.addedProBuilder.hsn}
                            </h4>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <h4 class=" text-xs text-cardBody font-poppins">
                        {props.addedProBuilder.name} 
                    </h4>
    
    </div> 
 
    </div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs text-cardBody font-poppins">
                      
    <span style={{ cursor: "pointer" }}>
              <Tooltip title={props.addedProBuilder.description}>
                {elipsize(props.addedProBuilder.description || "", 70)}
              </Tooltip>
            </span>
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {props.addedProBuilder.categoryName}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {props.addedProBuilder.subCategoryName}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                     
                    {props.addedProBuilder.quantity}

                    {/* {editsuppliesId === item.suppliesId ? (
                       <input
                       style={{border:"2px solid black"}}
                       value={editedFields[item.suppliesId]?.quantity !== undefined ? editedFields[item.suppliesId].quantity : item.quantity}
                       onChange={(e) => handleChange(item.suppliesId, 'quantity', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span> {item.quantity}</span>
                      </div>
                    )} */}
                    </h4>
    </div>
    {/* <div className=" flex mt-[1rem]" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
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
                  </div> */}
</div>
</div>
          
      
             
              </div>
              </div>
}
 
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
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);
