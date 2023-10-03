import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Icon, Button, Input,DatePicker } from "antd";
import { FormattedMessage } from "react-intl";
import { getExpenseByVoucherId, handleDocumentUploadModal,updateExpense, setEditExpense, handleUpdateExpenseModal, deleteExpenseDrawer, } from "../ExpenseAction";
import { getExpenses } from "../../Settings/Expense/ExpenseAction";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import { FlexContainer, OnlyWrapCard } from '../../../Components/UI/Layout'
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { base_url } from "../../../Config/Auth";
import { DeleteOutlined, DownloadOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EditUpload from "../../../Components/Forms/Edit/EditUpload";

const AddDocumentModal = lazy(() => import("./AddDocumentModal"));
const UpdateExpenseModal = lazy(() => import("./UpdateExpense/UpdateExpenseModal"));

function ExpenseDrawerCard(props) {
  const [data, setData] = useState(props.expVoucherId);
  const [editStates, setEditStates] = useState(props.expVoucherId.map(() => false));
 
  const [inputValues, setInputValues] = useState([]);
  useEffect(() => {
    const { voucherId } = props;
    props.getExpenseByVoucherId(voucherId);
    props.getExpenses();
  }, [props.voucherId]);
  useEffect(() => {
   
    setInputValues(props.expVoucherId);
  }, [props.expVoucherId]);

  const toggleEdit = (index) => {
    const newEditStates = [...editStates];
    newEditStates[index] = !newEditStates[index];
    setEditStates(newEditStates);
  };
  const handleInputChange = (index, field, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index][field] = value;
    setInputValues(newInputValues);
  };

  const [newimageId, setnewimageId] = useState("");
  function handleSetImage(imageId) {
    setnewimageId(imageId);
  }
  const handleSave = (index) => {
    const newData = [...data];
    newData[index] = { ...inputValues[index] };
      console.log('Previous Data:', data[index]);
  console.log('New Data:', newData[index]);
  console.log('New Data1:', newData);
    setData(newData);

    const newEditStates = [...editStates];
    newEditStates[index] = false;
    setEditStates(newEditStates);
    // console.log(newData[index].clientName)
    let result={
      clientName:newData[index].clientName,
     
      expenseType:newData[index].expenseType,
    
      organizationId:newData[index].organizationId,
      // remark:newData[index].remark,
    amount:newData[index].amount,
    expenseId:newData[index].expenseId,
    particular:newData[index].particular,
    imageId: newimageId !== "" ? newimageId.imageId  : props.setEditingUser.imageId,
    // documentId:newimageId !== "" ? newData[index].documentId :newimageId.documentId,
    documentId:newData[index].documentId!==newimageId.documentId ? newimageId.documentId:newData[index].documentId,
      userId:newData[index].userId,
      expenseDate:`${newData[index].expenseDate}T20:00:00Z`
    }
     props.updateExpense(result)
  };

  const {
    fetchingExpenseByVoucherIdError,
    expVoucherId,
    documentUploadModal,
    updateExpenseModal,
    deleteExpenseDrawer,
    setEditExpense,
    handleUpdateExpenseModal,
  } = props;

  
  return (
    <>
       <OnlyWrapCard>
    {inputValues.map((item,index) => { 
                  return (
                      <div key={index}>
                          <div className="flex justify-between mt-4"
                              style={{
                                  borderBottom: "3px dotted #515050"
                              }}>
                                <div className=" flex font-medium flex-col w-[6rem] ">
                                {editStates[index] ? (
  <div>                           
<EditUpload
imageId={item.documentId}
imgWidth={100}
imgHeight={100}
getImage={handleSetImage}
/>
  <button 
  // onClick={() => 
  // deleteHandler(image)}
  >
  delete image
</button>
</div>  
):(
<img src={`${base_url}/image/${item.documentId}`}
style={{width:"3rem",height:"3rem"}}
/>
)}
</div>   
                              <div className=" flex font-medium flex-col w-[2rem] ">

  
                                    
                                          <h4 class=" text-sm text-cardBody font-poppins">
                                           ID
                                          </h4>
                                          <h4 class=" text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
                                              
                                          {/* <div onClick={() => { this.handleExpand(item.voucherId) 
              this.props.handleMileageVoucherIdDrwer(true)}}>
     
       </div> */}  <Tooltip title={item.expenseId} >
         
         <QuestionMarkIcon style={{fontSize:"1rem"}}/>
         </Tooltip>                        </h4>

                                     
                            
                              </div>
                              <div className=" flex font-medium flex-col  w-20 ">
                         
                         <h4 class=" text-sm text-cardBody font-poppins"> Type </h4>
                         {editStates[index] ? (
            // <input
            //   type="text"
            //   value={item.expenseType}
            //   onChange={(e) => handleInputChange(index, 'expenseType', e.target.value)}
            //   style={{border:"2px solid black"}}
            // />
            <select
  className="input-field"
  value={item.expenseType}
  onChange={(e) => handleInputChange(index, 'expenseType', e.target.value)}
>
  {props.expenses.map(item => (
    <option key={item.expenseTypeId} value={item.expenseTypeId}>
      {item.expenseType}
    </option>
  ))}
</select>
          ) : (
                         <h4 class=" text-xs text-cardBody font-poppins">
                             {item.expenseType}
                         </h4>
                           )}
                     </div>
                              <div className=" flex font-medium flex-col w-32 ml-[0.25rem]">
                         
                                  <h4 class=" text-sm text-cardBody font-poppins">Date </h4>
                                  {editStates[index] ? (
  <DatePicker
    value={dayjs(item.expenseDate)} 
    onChange={(date, dateString) =>
      handleInputChange(index, "expenseDate", dateString)
    }
    style={{ border: "1px solid grey" }}
  />
) : (
                                  <h4 class=" text-xs text-cardBody font-poppins">
                                      
                                  
                                  {dayjs(item.expenseDate).format("MMM Do YY")}

                                  </h4>
                                  )}
                              </div>
                              <div className="flex font-medium flex-col w-32">
                              <h4 class=" text-sm text-cardBody font-poppins w-36 ml-[0.25rem]"> Cost Code </h4>
                              {editStates[index] ? (
            <input
              type="text"
              value={item.clientName}
              onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
              style={{ border: "1px solid grey" }}
            />
          ) : (
                         <h4 class=" text-xs text-cardBody font-poppins">
                             {item.clientName}
                         </h4>
          )}
          </div>
                         <div className=" flex font-medium flex-col w-64 ml-[0.25rem]">

                                
                                  <h4 class=" text-sm text-cardBody font-poppins">Particulars</h4>
                                  {editStates[index] ? (
                                  <input
              type="text"
              value={item.particular}
              onChange={(e) => handleInputChange(index, 'particular', e.target.value)}
              style={{ border: "1px solid grey" }}
            />
          ) : (
        
                                  <h4 class=" text-xs text-cardBody font-poppins">
                                       {item.particular}
                                  </h4>
          )}
     
                              </div>
                              <div className=" flex font-medium flex-col w-32 ml-[0.25rem]">
                                
                              <div className=" flex font-medium flex-col w-20 ">


                                <h4 class=" text-sm text-cardBody font-poppins">Amount</h4>
                                {editStates[index] ? (
                                  <input
              type="text"
              value={item.amount}
              onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
              style={{ border: "1px solid grey" }}
            />
          ) : (
                                                               
          
                                <h4 class=" text-xs text-cardBody font-poppins">
                                    {item.amount}
                                </h4>
          )}
                            </div> 

                     </div>
                     <div className=" flex font-medium flex-col w-20 ml-[0.25rem]">


<h4 class=" text-sm text-cardBody font-poppins">Curency</h4>
{editStates[index] ? (
  <input
type="text"
value={item.currency}
// onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
style={{ border: "1px solid grey" }}
/>
) : (
                               

<h4 class=" text-xs text-cardBody font-poppins">
   {item.currency}
</h4>
)}
</div> 

                              <div class="flex flex-row items-center w-[10%]">
                                <div class="flex items-center">
                                <Tooltip title="Upload Document">
            <UploadOutlined
              type="upload"
              style={{ cursor: "pointer",fontSize:"1rem" }}
              onClick={() => {
                handleDocumentUploadModal(true);
                
              }}
            />
          </Tooltip>
          <Tooltip title="Download Document">
          <a
          href={`${base_url}/document/${item.documentId}`}
        // target="_blank"
        >
          <DownloadIcon
            type="download"
            // onClick={() => startDownload()}
            style={{ cursor: "pointer",fontSize:"1rem" }}
          />
        </a>
          </Tooltip>
                                </div>
                  <div class="flex items-center ml-[0.25rem]">
                    {/* <EditOutlined
                      //  style={{ color: "blue" ,display:"flex",justifyItems:"center",justifyContent:"center",fontSize:"0.75rem",marginTop:"0.25rem",marginLeft:"0.25rem"}}
                      type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.props.setEditExpense(item);
                handleUpdateExpenseModal(true);
        }} 
                      /> */}
                                <button onClick={() => toggleEdit(index)}>
          {editStates[index] ? 'Cancel' : 'Edit'}
        </button>
        {editStates[index] && (
          <button onClick={() => handleSave(index)} className="ml-[0.25rem]">Save</button>
        )}
                      </div>
                      <div >
                      <div >
                         {/* {item.status === "Pending" ? ( */}
                         <Tooltip title="Delete">
            <DeleteOutlined
              type="delete"
              style={{ cursor: "pointer",fontSize:"1rem" }}
              onClick={() => {
              this.props.deleteExpenseDrawer(item.expenseId);
                
              }}
            />
          </Tooltip>
          {/* ):null} */}
           {item.status==="Rejected" && (
          <Button type="primary"
          onClick={()=>{
            // this.props.reapply();
          }}>
          Reapply
          </Button>
        )}
            </div>

                  </div>
                  </div>
                            
                          </div>
                      </div>


                  )
              })}

    </OnlyWrapCard>
        <UpdateExpenseModal
      // expenseId={currentExpenseId}
      updateExpenseModal={updateExpenseModal}
      handleUpdateExpenseModal={handleUpdateExpenseModal}
      // handleSetCurrentExpenseId={handleSetCurrentExpenseId}
    />
    <AddDocumentModal
      documentUploadModal={documentUploadModal}
      handleDocumentUploadModal={handleDocumentUploadModal}
    />
    </>
  );
}

const mapStateToProps = ({ expense,expenses }) => ({
  fetchingExpenseByVoucherIdError: expense.fetchingExpenseByVoucherIdError,
  expVoucherId: expense.expVoucherId,
  documentUploadModal: expense.documentUploadModal,
  updateExpenseModal: expense.updateExpenseModal,
  expenses: expenses.expenses,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getExpenseByVoucherId,
  deleteExpenseDrawer,
  setEditExpense,
  updateExpense,
  getExpenses,
  handleUpdateExpenseModal,
  handleDocumentUploadModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDrawerCard);

