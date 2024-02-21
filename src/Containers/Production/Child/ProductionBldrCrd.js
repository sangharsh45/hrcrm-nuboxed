import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getBuilderByProId,removeProductBuilder,PstoProductionBuilder } from "../../Product/ProductAction";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { MultiAvatar } from "../../../Components/UI/Elements";

function ProductionBldrCrd (props) {

  useEffect(()=> {
    props.getBuilderByProId(props.particularDiscountData.productId);
  },[]);

  const [editableRowIndex, setEditableRowIndex] = useState(-1);
  const [editedRowData, setEditedRowData] = useState(null);

  const handleEditClick = (index, rowData) => {
    setEditableRowIndex(index);
    setEditedRowData({ ...rowData });
  };

  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;
    setEditedRowData({ ...editedRowData, [fieldName]: value });
  };

  const handleSaveClick = () => {
    props.PstoProductionBuilder(editedRowData)
    console.log('Modified Row Data:', editedRowData);
    setEditableRowIndex(-1);
    setEditedRowData(null);
  };

  const handleCancelClick = (index) => {
    setEditableRowIndex((prevFields) => ({ ...prevFields, [index]: undefined }));
  };



return (
    <>
  
  <div className=' flex justify-end sticky z-auto'> 
  <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[7%]">Name</div>
        <div className=" md:w-[4.2rem] ">Category</div>
        <div className="md:w-[5.8rem]">Sub Category</div>
        <div className=" md:w-[4.2rem] ">Unit</div>
        <div className="w-12"></div>
            </div>
      
             {props.builderbyProductId.map((item,index) => {
          return (
<div key={item.suppliesId}>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "    >
<div className=" flex font-medium flex-col w-[10rem]   max-sm:w-full">
                    <div className="flex max-sm:w-full ">
                      <div>
                       
                         <MultiAvatar
                            // primaryTitle={item.name}
                            imageId={item.imageId}
                            // imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                       
                      </div>
                      <div class="w-[4%]"></div>

                      <div class="max-sm:w-full md:flex items-center">
                     
                      <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.suppliesName}
                            </div>
    </div>
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
      
      <div class="flex text-xs text-cardBody font-semibold  font-poppins">
      {editableRowIndex === index ? (
                Array.from({ length: editedRowData ? editedRowData.quantity : item.quantity }, (_, i) => (
                  <input
                  className="border-[2px] border-black rounded w-12 bg-[antiquewhite]"
                    key={i}
                    type="text"
                    value={editedRowData ? editedRowData[`input${i + 1}`] || '' : item[`input${i + 1}`] || ''}
                    onChange={(e) => handleInputChange(e, `input${i + 1}`)}
                  />
                ))
              ) : (
                item.quantity
              )}
                    </div>
  </div>
  <div class="flex flex-col w-24 max-sm:flex-row max-sm:w-[10%]">
    <div class="flex">
    {editableRowIndex === index ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={handleSaveClick}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(index,item)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(index,item)}
                      />
                    )}
    </div>
    <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductBuilder({active:false},item.suppliesId)}
                          >
                     <Tooltip title="Delete">
                          <DeleteIcon
                           className="!text-base cursor-pointer text-[red]"
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

  };

const mapStateToProps = ({product }) => ({
    builderbyProductId: product.builderbyProductId,
    fetchingBuilderByProductId: product.fetchingBuilderByProductId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBuilderByProId,
            removeProductBuilder,
            PstoProductionBuilder
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionBldrCrd);
