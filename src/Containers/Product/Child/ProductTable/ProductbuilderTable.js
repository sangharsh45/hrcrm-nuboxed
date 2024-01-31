
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getProductbuilder,addProductBuilder } from "../../ProductAction";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Formik, Form, Field,} from "formik";
import { Select } from "../../../../Components/UI/Elements";

const { Option } = Select;

function ProductbuilderTable (props) {

  useEffect(()=> {
    props.getProductbuilder();
  },[]);

  const[selectedHsn,setselectedHsn]=useState("");


const prosb = props.productBuilder

return (
    <>
        {/* <Formik
                    enableReinitialize
                    initialValues={{
                        hsn:selectedHsn,
                        // conversionCurrency:conversionCurrency,
                        // conversionFactor:"",
                        // reportingFactor:"1",
                        // userId:props.userId,
                        // orgId:props.orgId
                    }}
                    onSubmit={(values, { resetForm }) => {
                        props.createCurrencyConversion({
                            ...values,
                        });
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
        <Select value={selectedHsn} 
        onChange={handleSelect1Change}
        >
          {prosb.map((option) => {
          return   
          <Option key={option.currency_id} value={option.currency_name}>
             {option.currency_name}
           </Option>
})}
        </Select>
        </div>

        <div>
                                        
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    // loading={props.creatingCurrencyConversion}
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
                </Formik> */}

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


// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Tooltip,Input, Popconfirm, Button, Form,Typography } from "antd";
// import { StyledTable } from "../../../../Components/UI/Antd";
// import { getProductbuilder,addProductBuilder } from "../../ProductAction";
// import { EditOutlined } from "@ant-design/icons";
// import { elipsize } from "../../../../Helpers/Function/Functions";
// import { Select } from "../../../../Components/UI/Elements";

// const { Option } = Select;
// const ButtonGroup = Button.Group;

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = <Input />;
//   return (
//       <td {...restProps}>
//           {editing && inputType === "picker"  ? (
//               <Form.Item
//                   name={dataIndex}
//                   style={{
//                       margin: 0,
//                   }}
//                   rules={[
//                       {
//                           required: true,
//                           message: `Please Input ${title}!`,
//                       },
//                   ]}
//               >
//                   {inputNode}
//               </Form.Item>
//           ) : editing && inputType !== "picker" ? (
//               <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           <Select>
//             {["USD", "EURO","GBP","INR"].map((item) => {
//               return <Option value={item}>{item} </Option>;
//             })}
//           </Select>
//         </Form.Item>
//     ):(
//               children
//           )}
//       </td>
//   );
// };

// function ProductbuilderTable (props) {

//   useEffect(()=> {
//     props.getProductbuilder();
//   },[]);

//   const [form] = Form.useForm();
//   const [data, setData] = useState([]);
//   const [editingKey, setEditingKey] = useState('');

//   useEffect(() => {
//       setData(props.productBuilder)
//   }, [props.productBuilder])

//   const isEditing = (record) => record.suppliesId === editingKey;

//   const edit = (record) => {
//       form.setFieldsValue({
//           quantity: '',
//           subCategoryName: '',
//           categoryName: '',
//           attributeName: '',
         
//           ...record,
//       });
//       setEditingKey(record.suppliesId);
//   };

//   const cancel = () => {
//       setEditingKey('');
//   };
//   const save = async (key) => {
//       try {
//           const row = await form.validateFields();
//           const newData = [...data];
//           const index = newData.findIndex((item) => key === item.suppliesId);
//           if (index > -1) {
//               // alert("if");
//               const item = newData[index];
//               console.log(item)
//               newData.splice(index, 1, { ...item, ...row });
//               const a = newData[index];
              
//                   props.addProductBuilder(
//                       {
//                           quantity: a.quantity,
//                           subCategoryName: a.subCategoryName,
//                           categoryName: a.categoryName,
//                           attributeName: a.attributeName,
//                           subAttributeName:a.subAttributeName,
//                           suppliesId: a.suppliesId,
//                           productId:props.particularDiscountData.productId,
//                           creationDate:a.creationDate,
//                           suppliesName:a.name,
//                       }, 
//                   );

//               setEditingKey('');
//           } else {
//               alert("else");
//               newData.push(row);
//               // setData(newData);
//               setEditingKey('');
//           }
//       } catch (errInfo) {
//           console.log('Validate Failed:', errInfo);
//       }
//   };


// const columns = [
//     {
//         title: "",
//         dataIndex: "",
//         width: "2%",
//       },
//       {
//         title: "HSN",
//         dataIndex: "hsn",
//         width: "15%",

//       },
//       {
//         title: "NAME",
//         dataIndex: "name",
//         width: "15%",
//       },

//       {
//         title: "DESCRIPTION",
//         dataIndex: "description",
//         width: "20%",
//         render: (name, item, i) => {
//           return (
//             <span style={{ cursor: "pointer" }}>
//               <Tooltip title={item.description}>
//                 {elipsize(item.description || "", 70)}
//               </Tooltip>
//             </span>
//           );
//         },
//       },
//        {
//             title: "Category",
//             dataIndex: "categoryName",

//         },
//         {
//             title: "Sub Category",
//             dataIndex: "subCategoryName",
//             width: "10%"
//         },
//       {
//         title: "UNIT",
//         dataIndex: "quantity",
//         width: "10%",
//         editable: true,
//       },
     
//       {
//         title: '',
//         width: "10%",
//         dataIndex: 'operation',
//         render: (_, record) => {
//             const editable = isEditing(record);
//             return editable ? (
//                 <span>
//                     <Typography.Link
//                         onClick={() =>
//                             save(record.suppliesId)
//                             // alert("Save success")
//                         }
//                         style={{
//                             marginRight: 8,
//                         }}
//                     >
//                         Save
//                     </Typography.Link>
//                     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                         <a>Cancel</a>
//                     </Popconfirm>
//                 </span>
//             ) : (
//                 <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//                     <EditOutlined />
//                 </Typography.Link>
//             )
//         },
//     },
//     ];
// const tab = document.querySelector(".ant-layout-sider-children");
// const tableHeight = tab && tab.offsetHeight - 200;
// const mergedColumns = columns.map((col) => {
//   if (!col.editable) {
//       return col;
//   }

//   return {
//       ...col,
//       onCell: (record) => ({
//           record,
//           inputType: col.dataIndex === 'currency1' ? 'text' : 'picker',
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: isEditing(record),
//       }),
//   };
// });
// return (
//     <>
//      <Form form={form} component={false}>
//         <StyledTable
//             rowKey="suppliesId"
//             // columns={columns}
//             dataSource={data}
//             loading={props.fetchingProductBuilder}
//             pagination={false}
//             scroll={{ y: tableHeight }}
//             components={{
//               body: {
//                   cell: EditableCell,
//               },
//           }}
//           columns={mergedColumns}
//           rowClassName="editable-row"
//         />
// </Form>
 
//     </>
// );
// }

// const mapStateToProps = ({product }) => ({
//     productBuilder: product.productBuilder,
//     fetchingProductBuilder: product.fetchingProductBuilder
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getProductbuilder,
//             addProductBuilder,
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);