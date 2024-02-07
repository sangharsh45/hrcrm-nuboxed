import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getBuilderByProId,removeProductBuilder,updateProSupplBuilder } from "../../../Product/ProductAction";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';

function MaterialbuilderCard (props) {

  useEffect(()=> {
    props.getBuilderByProId(props.particularDiscountData.suppliesId);
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

  // const handleUpdateSupplies = (suppliesId,suppliesName,description,categoryName,subCategoryName, quantity,
  //   ) => {
  //   const data = {
  //     suppliesId: suppliesId, 
  //     // productSupplyLinkId: productSupplyLinkId,
  //     productId:props.particularDiscountData.productId, 
  //     suppliesName:editedFields[productSupplyLinkId]?.suppliesName !== undefined ? editedFields[productSupplyLinkId].suppliesName : suppliesName,
  //     description:editedFields[productSupplyLinkId]?.description !== undefined ? editedFields[productSupplyLinkId].description : description,
  //     categoryName:editedFields[productSupplyLinkId]?.categoryName !== undefined ? editedFields[productSupplyLinkId].categoryName : categoryName,
  //     subCategoryName: editedFields[productSupplyLinkId]?.subCategoryName !== undefined ? editedFields[productSupplyLinkId].subCategoryName : subCategoryName,                 
  //     quantity: editedFields[productSupplyLinkId]?.quantity !== undefined ? editedFields[productSupplyLinkId].quantity : quantity,        
                      
  //   };
  
  //   props.updateProSupplBuilder(data)
  //     setEditedFields((prevFields) => ({ ...prevFields, [productSupplyLinkId]: undefined }));
  //     setEditproductSupplyLinkId(null);
    
  // };

return (
    <>
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Name</div>
        <div className=" md:w-[6.1rem]">Description</div>
        <div className=" md:w-[4.2rem] ">Category</div>
        <div className="md:w-[5.8rem]">Sub Category</div>
        <div className=" md:w-[4.2rem] ">Unit</div>
        <div className="w-12"></div>
            </div>
      
             {props.builderbyProductId.map((item) => {
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "    >
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.suppliesName}
                            </div>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs text-cardBody font-poppins">
    <span style={{ cursor: "pointer" }}>
              <Tooltip title={item.description}>
                 {elipsize(item.description || "", 70)}
               </Tooltip>
             </span>
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
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      {/* <div class=" text-xs text-cardBody font-semibold  font-poppins">
                   {editproductSupplyLinkId === item.productSupplyLinkId ? (
                       <input
                       style={{border:"2px solid black"}}
                       value={editedFields[item.productSupplyLinkId]?.quantity !== undefined ? editedFields[item.productSupplyLinkId].quantity : item.quantity}
                       onChange={(e) => handleChange(item.productSupplyLinkId, 'quantity', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span> {item.quantity}</span>
                      </div>
                    )}
                    </div> */}
  </div>
  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
    {/* <div>
    {editproductSupplyLinkId === item.productSupplyLinkId ? (
                        <>
                      <Button onClick={() => handleUpdateSupplies(item.productSupplyLinkId,item.hsn, item.name, item.description,item.categoryName, item.subCategoryName )}>
                        Save
                      </Button>
                        <Button onClick={() => handleCancelClick(item.productSupplyLinkId)} style={{ marginLeft: '0.5rem' }}>
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.productSupplyLinkId)}
                        style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                    )}
    </div> */}
    <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductBuilder({active:false},item.productSupplyLinkId)}
                          >
                     <Tooltip title="Delete">
                          <DeleteOutlined
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                       </Tooltip>
                       </StyledPopconfirm>
                       </div>
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
    builderbyProductId: product.builderbyProductId,
    fetchingBuilderByProductId: product.fetchingBuilderByProductId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBuilderByProId,
            removeProductBuilder,
            updateProSupplBuilder
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialbuilderCard);
