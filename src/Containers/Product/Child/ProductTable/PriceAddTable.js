// import React, { useEffect,lazy, Suspense,useState  } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getCurrency } from "../../../Auth/AuthAction";
// import { Button } from "antd";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { getProductCurrency,createProductCurrency,handleDiscountModal,handleOfferModal } from "../../ProductAction";

// const ProductDiscountModal =lazy(()=>import("./ProductDiscountModal"));
// const ProductOfferModal =lazy(()=>import("./ProductOfferModal"));

// function ProductbuilderTable (props) {

//   useEffect(()=> {
//     props.getProductCurrency(props.particularDiscountData.productId);
//     props.getCurrency();
//   },[]);

//   const [editedFields, setEditedFields] = useState({});
//   const [editproductSupplyLinkId, setEditproductSupplyLinkId] = useState(null);

//   const handleChange = (productSupplyLinkId, fieldName, value) => {
//     setEditedFields((prevFields) => ({
//       ...prevFields,
//       [productSupplyLinkId]: {
//         ...prevFields[productSupplyLinkId],
//         [fieldName]: value,
//       },
//     }));
//   };

//   const handleEditClick = (productSupplyLinkId) => {
//     setEditproductSupplyLinkId(productSupplyLinkId);
//   };
//   const handleCancelClick = (productSupplyLinkId) => {
//     setEditedFields((prevFields) => ({ ...prevFields, [productSupplyLinkId]: undefined }));
//     setEditproductSupplyLinkId(null);
//   };

//   const handleUpdateSupplies = (productSupplyLinkId,hsn, name,description,categoryName,subCategoryName, quantity, 
//     ) => {
//     const data = {
//       productSupplyLinkId: productSupplyLinkId,
//       productId:props.particularDiscountData.productId, 
//       hsn:editedFields[productSupplyLinkId]?.hsn !== undefined ? editedFields[productSupplyLinkId].hsn : hsn,
//       suppliesName:editedFields[productSupplyLinkId]?.name !== undefined ? editedFields[productSupplyLinkId].name : name,
//       description:editedFields[productSupplyLinkId]?.description !== undefined ? editedFields[productSupplyLinkId].description : description,
//       categoryName:editedFields[productSupplyLinkId]?.categoryName !== undefined ? editedFields[productSupplyLinkId].categoryName : categoryName,
//       subCategoryName: editedFields[productSupplyLinkId]?.subCategoryName !== undefined ? editedFields[productSupplyLinkId].subCategoryName : subCategoryName,                 
//       quantity: editedFields[productSupplyLinkId]?.quantity !== undefined ? editedFields[productSupplyLinkId].quantity : quantity,        
                          
//     };
  
//     props.createProductCurrency(data)
//       setEditedFields((prevFields) => ({ ...prevFields, [productSupplyLinkId]: undefined }));
//       setEditproductSupplyLinkId(null);
    
//   };

// return (
//     <>
//         <div className=' flex justify-end sticky z-auto'> 
//         <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
//          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
//          <div className=""></div>
//          <div className=" md:w-[7%]">Currency</div>
//         <div className=" md:w-[6.1rem]">Price(B2B)</div>
//         <div className=" md:w-[4.2rem] ">Price(B2C)</div>
//         <div className="md:w-[5.8rem]">VAT(%)</div>
//         <div className="w-12"></div>
//             </div>
      
//              {props.currencies.map((item) => {
//           return (
// <div>
// <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
//     >
//        <div class="flex">
//     <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
//     <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
//                               {item.currency_name}
//                             </h4>
//     </div>

//     <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

//     <h4 class=" text-xs text-cardBody font-poppins">
//                         {item.price} 
//                     </h4>
    
//     </div> 
 
//     </div>
    
//     <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
//     <h4 class=" text-xs text-cardBody font-poppins">
                      
//                       {item.price}
//                     </h4>
//     </div>
//     <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

//         <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
//                       {item.VAT}
//                     </h4>
//     </div>
    
//     <div class="flex md:items-center"> 
    
  
//  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
//     <div>
//     {editproductSupplyLinkId === item.productSupplyLinkId ? (
//                         <>
//                       <Button onClick={() => handleUpdateSupplies(item.productSupplyLinkId,item.hsn, item.name, item.description,item.categoryName, item.subCategoryName )}>
//                         Save
//                       </Button>
//                         <Button onClick={() => handleCancelClick(item.productSupplyLinkId)} style={{ marginLeft: '0.5rem' }}>
//                         Cancel
//                       </Button>
//                       </>
                      
//                     ) : (
//                       <BorderColorIcon
//                         tooltipTitle="Edit"
//                         iconType="edit"
//                         onClick={() => handleEditClick(item.productSupplyLinkId)}
//                         style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
//                       />
//                     )}
//     </div>
  
//                         </div>
// </div>

// </div>
// </div>
//           );
//         })}
             
//               </div>
//               </div>




//               <Suspense fallback={"Loading"}>
// <ProductDiscountModal
//                 addDiscountModal={props.addDiscountModal}
//                 handleDiscountModal={props.handleDiscountModal}
//                 // particularDiscountData={particularDiscountData}
//             />
//             <ProductOfferModal
//                 addProductOfferModal={props.addProductOfferModal}
//                 handleOfferModal={props.handleOfferModal}
//                 // particularDiscountData={particularDiscountData}
//             />
//             </Suspense>
//     </>
// );
// }

// const mapStateToProps = ({product,auth }) => ({
//     ProductCurrency: product.ProductCurrency,
//     fetchingProductCurrency: product.fetchingProductCurrency,
//     addDiscountModal: product.addDiscountModal,
//     addProductOfferModal: product.addProductOfferModal,
//     currencies:auth.currencies
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//           getProductCurrency,
//           createProductCurrency,
//             handleDiscountModal,
//             handleOfferModal,
//             getCurrency
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);

import React, { useEffect,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrency } from "../../../Auth/AuthAction";
import { Button,Input,Select, } from "antd";
import { getProductCurrency,createProductCurrency,handleDiscountModal,handleOfferModal } from "../../ProductAction";

const { Option } = Select;

function ProductbuilderTable (props) {

  const [data, setData] = useState([]);

  useEffect(()=> {
    props.getProductCurrency(props.particularDiscountData.productId);
    props.getCurrency();
  },[]);

  useEffect(() => {
    setData(props.ProductCurrency.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.ProductCurrency]);


  const handleAddRow = () => {
    const newRow = {
      key: String(data.length + 1),
      currency_name: '',
      level1: '',
      level2: '',
      level3: '',

    };
    setData([...data, newRow]);
  };

  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value, currency_id: value } : row
    );
    setData(updatedData);
  };

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };

  const handleSave = (key) => {
    console.log(key)
    const targetRow = data.find((row) => row.key === key);
    if (targetRow) {
      const { level1, level2, level3, currency_id,skillLevelLinkId } = targetRow;
      console.log(`Skill ID: ${currency_id}, Level 1: ${level1}, Level 2: ${level2}, Level 3: ${level3}`);
      const result = {
        currency_id: currency_id,
              level1: level1,
              level2: level2,
              level3: level3,
              skillLevelLinkId:skillLevelLinkId,
             
            };
      props.createProductCurrency(result)
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <div className=' flex justify-end sticky z-auto'> 
         <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">          <div className=""></div>
          <div className=" md:w-[7%]">Currency</div>     
    <div className=" md:w-[6.1rem]">Price(B2B)</div>
        <div className=" md:w-[4.2rem] ">Price(B2C)</div>
         <div className="md:w-[5.8rem]">VAT(%)</div>
         <div className="w-12"></div>             </div>
      
              {data.map((item) => {
          return (
<div key={item.procurId}>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "
    >
     
    <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
    <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              <Select
          classNames="w-32"
          value={item.currency_id}
          onChange={(value) => handleSelectChange(value, item.key, 'currency_id')}
        >
          {props.currencies.map((s) => (
            <Option key={s.currency_id} value={s.currency_id}>
              {s.currency_name}
            </Option>
          ))}
        </Select>
                            </h4>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <h4 class=" text-xs text-cardBody font-poppins">
    <Input
    className="w-32"
          value={item.level1}
          onChange={(e) => handleInputChange(e.target.value, item.key, 'level1')}
        />
                    </h4>
    
    </div> 
 
   
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs text-cardBody font-poppins">
                      
    <Input
         className="w-32"
          value={item.level2}
          onChange={(e) => handleInputChange(e.target.value, item.key, 'level2')}
        />
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
        <Input
         className="w-32"
          value={item.level3}
          onChange={(e) => handleInputChange(e.target.value, item.key, 'level3')}
        />
                    </h4>
    </div>
    
    <div class="flex md:items-center"> 
    
  
 <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
    <div>
    <Button type="primary" onClick={() => handleSave(item.key)}>
          Save
        </Button>
    </div>
  
                        </div>
</div>

</div>
</div>
          );
        })}
             
              </div>
              </div>      

    </div>
  );
};

const mapStateToProps = ({product,auth }) => ({
    ProductCurrency: product.ProductCurrency,
    fetchingProductCurrency: product.fetchingProductCurrency,
    addDiscountModal: product.addDiscountModal,
    addProductOfferModal: product.addProductOfferModal,
    currencies:auth.currencies
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getProductCurrency,
          createProductCurrency,
            handleDiscountModal,
            handleOfferModal,
            getCurrency
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);

