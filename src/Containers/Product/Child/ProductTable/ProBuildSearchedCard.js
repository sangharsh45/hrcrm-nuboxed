// import React from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import ProBuildSearchedToggle from "./ProBuildSearchedToggle";
// import { MultiAvatar } from "../../../../Components/UI/Elements";

// function ProBuildSearchedCard (props) {

// return (
//     <>
  
//   <div className=' flex justify-end sticky z-auto'> 
//   <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
//          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
//          <div className=""></div>
//          <div className=" md:w-[7%]">Name</div>
//         {/* <div className=" md:w-[6.1rem]">Description</div> */}
//         <div className=" md:w-[4.2rem] ">Category</div>
//         <div className="md:w-[5.8rem]">Sub Category</div>
//         <div className=" md:w-[4.2rem] ">Unit</div>
//         <div className="w-12"></div>
//             </div>
      
//              {props.searchedBuilders.map((item) => {
//           return (
// <div>
// <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "    >
// <div className=" flex font-medium flex-col w-[10rem]   max-sm:w-full">
//                     <div className="flex max-sm:w-full ">
//                       <div>
                       
//                          <MultiAvatar
//                             // primaryTitle={item.name}
//                             imageId={item.imageId}
//                             // imageURL={item.imageURL}
//                             imgWidth={"1.8rem"}
//                             imgHeight={"1.8rem"}
//                           />
                       
//                       </div>
//                       <div class="w-[4%]"></div>

//                       <div class="max-sm:w-full md:flex items-center">
                     
//                       <div className=" flex font-medium flex-col md:w-[7.1rem] max-sm:w-full  ">
//     <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
//                               {item.name}
//                             </div>
//     </div>
//                       </div>
//                     </div>
//                   </div>

//     <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
//     <div class=" text-xs text-cardBody font-poppins">
                      
//                       {item.categoryName}
//                     </div>
//     </div>
//     <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
//         <div class=" text-xs text-cardBody font-semibold  font-poppins">
//                       {item.subCategoryName}
//                     </div>
//     </div>
//     <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
//       <div class=" text-xs text-cardBody font-semibold  font-poppins">  
//                        {item.quantity}
//                     </div>
//   </div>
//   <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
//       <ProBuildSearchedToggle item={item} productId={props.particularDiscountData.productId}/>
      
//   </div>
 
// </div>
// </div>
//           );
//         })}
             
//               </div>
//               </div>
 
//     </>
// );
// }

// const mapStateToProps = ({product }) => ({
//     searchedBuilders: product.searchedBuilders,
//     fetchingSearchedBuilders: product.fetchingSearchedBuilders
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
               
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedCard);



import React, { useEffect,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Table, Input, Select, } from "antd";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import {addProductBuilder} from "../../ProductAction";

function ProBuildSearchedCard (props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.searchedBuilders.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.searchedBuilders]);

  const columns = [
    {
title:"",
width:"3%",
dataIndex:"imageId",
render: (_, record) => (
  <MultiAvatar
                              imageId={record.imageId}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}/>
),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      // render: (_, record) => (
      //   <Input
      //     style={{ width: 120 }}
      //     value={record.name}
      //     onChange={(value) => handleInputChange(value, record.key, 'name')}
      //   />
          
        
      // ),
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      // render: (_, record) => (
      //   <Input
      //   style={{width:"11em"}}
      //     value={record.categoryName}
      //     onChange={(e) => handleInputChange(e.target.value, record.key, 'categoryName')}
      //   />
      // ),
    },
    {
      title: 'Sub Category',
      dataIndex: 'subCategoryName',
      // render: (_, record) => (
      //   <Input
      //   style={{width:"11em"}}
      //     value={record.subCategoryName}
      //     onChange={(e) => handleInputChange(e.target.value, record.key, 'subCategoryName')}
      //   />
      // ),
    },
    {
      title: 'Unit',
      dataIndex: 'quantity',
      render: (_, record) => (
        <Input
        style={{width:"11em"}}
          value={record.quantity}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleSave(record.key)}>
          Save
        </Button>
      ),
    },
  ];

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
      const { name,categoryName, subCategoryName, quantity,hsn,attributeName,imageId,suppliesId, productId,subAttributeName} = targetRow;
     
      const result = {
        hsn: hsn,
        suppliesName:name,
        attributeName:attributeName,
        subAttributeName:subAttributeName,
              categoryName: categoryName,
              subCategoryName: subCategoryName,
              quantity:quantity,
              productId:props.particularDiscountData.productId,
              suppliesId:suppliesId,
              imageId:imageId
            };
      props.addProductBuilder(result)
    }
  };
return (
    <>
   <div>
      <Table dataSource={data} columns={columns} />
    </div>
    </>
);
}

const mapStateToProps = ({product }) => ({
    searchedBuilders: product.searchedBuilders,
    fetchingSearchedBuilders: product.fetchingSearchedBuilders
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          addProductBuilder
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedCard);
