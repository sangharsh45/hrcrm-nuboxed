import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getProductbuilder,addProductBuilder } from "../../ProductAction";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import {  Select } from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const { Option } = Select;

function ProductbuilderTable (props) {

  useEffect(()=> {
    props.getProductbuilder();
  },[]);

  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);

  const handleChange = (suppliesId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [suppliesId]: {
        ...prevFields[suppliesId],
        [fieldName]: value,
      },
    }));
  };

  const handleEditClick = (suppliesId) => {
    setEditsuppliesId(suppliesId);
  };
  const handleCancelClick = (suppliesId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [suppliesId]: undefined }));
    setEditsuppliesId(null);
  };

  const handleUpdateSupplies = (suppliesId,hsn, name,description,categoryName,subCategoryName, quantity, 
    ) => {
    const data = {
      suppliesId: suppliesId,
      productId:props.particularDiscountData.productId, 
      hsn:editedFields[suppliesId]?.hsn !== undefined ? editedFields[suppliesId].hsn : hsn,
      suppliesName:editedFields[suppliesId]?.name !== undefined ? editedFields[suppliesId].name : name,
      description:editedFields[suppliesId]?.description !== undefined ? editedFields[suppliesId].description : description,
      categoryName:editedFields[suppliesId]?.categoryName !== undefined ? editedFields[suppliesId].categoryName : categoryName,
      subCategoryName: editedFields[suppliesId]?.subCategoryName !== undefined ? editedFields[suppliesId].subCategoryName : subCategoryName,                 
      quantity: editedFields[suppliesId]?.quantity !== undefined ? editedFields[suppliesId].quantity : quantity,        
                          
    };
  
    props.addProductBuilder(data)
     
     
      setEditedFields((prevFields) => ({ ...prevFields, [suppliesId]: undefined }));
      setEditsuppliesId(null);
    
  };
return (
    <>
     <div className=' flex justify-end sticky z-auto'> 
         <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
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
      
             {props.productBuilder.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.hsn}
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
                      
    <span style={{ cursor: "pointer" }}>
              <Tooltip title={item.description}>
                {elipsize(item.description || "", 70)}
              </Tooltip>
            </span>
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.categoryName}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.subCategoryName}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                     
                    
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
                    </h4>
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
          );
        })}
             
              </OnlyWrapCard>
              </div>
       
 
    </>
);
}

const mapStateToProps = ({product }) => ({
    productBuilder: product.productBuilder,
    fetchingProductBuilder: product.fetchingProductBuilder
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
