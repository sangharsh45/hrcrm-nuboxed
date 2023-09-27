// import dayjs from "dayjs";
// import React, { lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Tooltip,Button } from "antd";
// import { StyledLabel } from '../../../Components/UI/Elements'
// import { StyledTable,StyledPopconfirm } from "../../../Components/UI/Antd";
// import { getMileageByVoucherId,handleUpdateMileageModal,
//     setEditMileage,updateMileage,deleteMileage} from "../MileageAction";
// import { CurrencySymbol } from "../../../Components/Common";
// import styled from 'styled-components'
// import { FlexContainer,OnlyWrapCard } from '../../../Components/UI/Layout'
// import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
// import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// import moment from "moment";
// const UpdateMileageModal=lazy(()=>import("../Child/UpdateMileageModal"));


// class MileageDrawerCard extends React.Component {
//     componentDidMount() {
//         const { voucherId } = this.props;
//         this.props.getMileageByVoucherId(voucherId);
//       }
    
//       componentDidUpdate(prevProps, prevState, snapshot) {
//         const { voucherId } = this.props;
//         if (this.props.voucherId !== prevProps.voucherId) {
//           this.props.getMileageByVoucherId(voucherId);
//         }
//       }

//   render() {
//     const {mileageVoucherId,handleUpdateMileageModal,updateMileageModal,currentMileageId}=this.props;

//     return (
//       <>
        
//       <OnlyWrapCard>
//       {mileageVoucherId.map((item) => { 
//                     return (
//                         <div>
//                             <div className="flex justify-between mt-4"
//                                 style={{
//                                     borderBottom: "3px dotted #515050"
//                                 }}>
                                     
//                                 <div className=" flex font-medium flex-col w-10 ">

                                   
                                      
//                                             <h4 class=" text-xs text-cardBody font-poppins">
//                                             ID 
//                                             </h4>
//                                             <h4 class=" text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
                                                
//                                             {/* <div onClick={() => { this.handleExpand(item.voucherId) 
//                 this.props.handleMileageVoucherIdDrwer(true)}}>
       
//          </div> */}
//            <Tooltip title={item.mileageId} >
//            <QuestionMarkIcon/>
//            </Tooltip>
           
//                                             </h4>

                                        
                              
//                                 </div>
//                                 <div className=" flex font-medium flex-col  w-32 ">
                           
//                            <h4 class=" text-xs text-cardBody font-poppins"> Attributed To </h4>
//                            <h4 class=" text-xs text-cardBody font-poppins">
//                                {item.clientName}
//                            </h4>
//                        </div>
//                                 <div className=" flex font-medium flex-col  w-32 ">
                           
//                                     <h4 class=" text-xs text-cardBody font-poppins">Date </h4>
//                                     <h4 class=" text-xs text-cardBody font-poppins">
                                        
                                    
//                                     {dayjs(item.mileageDate).format("MMM Do YY")}

//                                     </h4>
//                                 </div>
//                                 <div className=" flex font-medium flex-col w-32 ">
                                  
//                                     <h4 class=" text-xs text-cardBody font-poppins">From</h4>
//                                     <h4 class=" text-xs text-cardBody font-poppins">
//                                          {item.fromLocation}
//                                     </h4>
//                                 </div>
//                                 <div className=" flex font-medium flex-col w-32 ">
                                  
//                                   <h4 class=" text-xs text-cardBody font-poppins">To</h4>
//                                   <h4 class=" text-xs text-cardBody font-poppins">
//                                        {item.toLocation}
//                                   </h4>
//                               </div>
//                               <div className=" flex font-medium flex-col w-32 ">
                                  
//                                   <h4 class=" text-xs text-cardBody font-poppins">Distance</h4>
//                                   <h4 class=" text-xs text-cardBody font-poppins">
//                                        {item.distances}
//                                   </h4>
//                               </div>
//                               <div className=" flex font-medium flex-col w-32 ">
                                
//                                 <h4 class=" text-xs text-cardBody font-poppins">Remarks</h4>
//                                 <h4 class=" text-xs text-cardBody font-poppins">
//                                      {item.remark}
//                                 </h4>
//                             </div>
               


//                                 <div class="flex flex-col w-[4%]">
//                                 {item.status === "Pending" ? (
//                     <div >
//                       <EditOutlined
//                         //  style={{ color: "blue" ,display:"flex",justifyItems:"center",justifyContent:"center",fontSize:"0.75rem",marginTop:"0.25rem",marginLeft:"0.25rem"}}
//                         type="edit"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                  this.props.setEditMileage(item);
//                   handleUpdateMileageModal(true);
//           }} 
//                         />
//                         </div>
//                                 ) : null}
//                         <div >
//                         <div >
//                            {item.status === "Pending" ? (
//             <Tooltip title="Delete">
//               <DeleteOutlined
//                 type="delete"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                 this.props.deleteMileage(item.mileageId);
                  
//                 }}
//               />
//             </Tooltip>
//             ):null}
//              {item.status==="Rejected" && (
//             <Button type="primary"
//             onClick={()=>{
//               // this.props.reapply();
//             }}>
//             Reapply
//             </Button>
//           )}
//               </div>

//                     </div>
//                     </div>
                              
//                             </div>
//                         </div>


//                     )
//                 })}
//       </OnlyWrapCard>




//       <UpdateMileageModal
//         mileageId={currentMileageId}
//         updateMileageModal={updateMileageModal}
//         handleUpdateMileageModal={handleUpdateMileageModal}
//         />
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ auth, mileage }) => ({
//     fetchingMileageByVoucherId: mileage.fetchingMileageByVoucherId,
//     fetchingMileageByVoucherIdError: mileage.fetchingMileageByVoucherIdError,
//     mileageVoucherId: mileage.mileageVoucherId,
//     updateMileageModal:mileage.updateMileageModal,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getMileageByVoucherId,
//         handleUpdateMileageModal,
//         setEditMileage,
//         updateMileage,
//         deleteMileage,
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(MileageDrawerCard);

// import React, { lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Tooltip, Button, Input,DatePicker } from "antd";
// import moment from 'moment'

// import dayjs from "dayjs";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { FlexContainer,OnlyWrapCard } from '../../../Components/UI/Layout'
// import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
// import {
//   getMileageByVoucherId,
//   handleUpdateMileageModal,
//   setEditMileage,
//   updateMileage,
//   deleteMileage,
// } from "../MileageAction";

// const UpdateMileageModal = lazy(() => import("../Child/UpdateMileageModal"));

// class MileageDrawerCard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editingMileageId: null, 
//       editedData: {}, 
//       editedDate: null
//     };
//   }

//   componentDidMount() {
//     const { voucherId } = this.props;
//     this.props.getMileageByVoucherId(voucherId);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { voucherId } = this.props;
//     if (voucherId !== prevProps.voucherId) {
//       this.props.getMileageByVoucherId(voucherId);
//     }
//   }

//   startEditing = (mileageId) => {
//     this.setState({
//       editingMileageId: mileageId,
//       editedData: {},
//       editedDate: null,
//     });
//   };

//   cancelEditing = () => {
//     this.setState({
//       editingMileageId: null,
//       editedData: {},
//       editedDate: null,
//     });
//   };

//   updateEditedData = (field, value) => {
//     const { editedData } = this.state;
//     editedData[field] = value;
//     this.setState({ editedData });
//     // if (field === "mileageDate") {
//     //   // For the date field, update the editedDate state
//     //   this.setState({ editedDate: value });
//     // } else {
//     //   const { editedData } = this.state;
//     //   editedData[field] = value;
//     //   this.setState({ editedData });
//     // }
//   };

//   // updateEditedData = (field, value) => {
//   //   const { editedData } = this.state;
//   //   editedData[field] = value;
//   //   this.setState({ editedData });
//   // };
  

//   saveEditedData = () => {
//     const { editingMileageId, editedData } = this.state;
    
//     this.props.updateMileage(editingMileageId, editedData); 
   
//     this.setState({
//       editingMileageId: null,
//       editedData: {},
//     });
// //     const { editingMileageId, editedData, editedDate } = this.state;

// //     if (editedDate) {
// //       // Update the edited date in the editedData object
// //       editedData.mileageDate = editedDate;
// //     }

   
// //     this.props.updateMileage(editingMileageId, editedData); 
// // console.log(editedData)
  
// //     this.setState({
// //       editingMileageId: null,
// //       editedData: {},
// //       editedDate: null, 
// //     });
//   };

//   render() {
//     const {
//       mileageVoucherId,
//       handleUpdateMileageModal,
//       updateMileageModal,
//       currentMileageId,
//     } = this.props;

//     return (
//       <>
//         <OnlyWrapCard>
//           {mileageVoucherId.map((item) => {
//             const isEditing = item.mileageId === this.state.editingMileageId;
//             return (
//               <div key={item.mileageId}>
//                 <div
//                   className="flex justify-between mt-4"
//                   style={{ borderBottom: "3px dotted #515050" }}
//                 >
//                   <div className="flex font-medium flex-col w-10">
//                     <h4 className="text-xs text-cardBody font-poppins">ID</h4>
//                     <h4 className="text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
//                       <Tooltip title={item.mileageId}>
//                         <QuestionMarkIcon />
//                       </Tooltip>
//                     </h4>
//                   </div>
//                   <div className="flex font-medium flex-col w-32">
//                     <h4 className="text-xs text-cardBody font-poppins">
//                       Attributed To
//                     </h4>
//                     {isEditing ? (
                    
//                       <Input
//                         value={this.state.editedData.clientName || item.clientName}
//                         onChange={(e) =>
//                           this.updateEditedData("clientName", e.target.value)
//                         }
//                       />
//                     ) : (
                     
//                       <h4 className="text-xs text-cardBody font-poppins">
//                         {item.clientName}
//                       </h4>
//                     )}
//                   </div>
//                   {/* <div className="flex font-medium flex-col w-32">
//                     <h4 className="text-xs text-cardBody font-poppins">Date</h4>
//                     <h4 className="text-xs text-cardBody font-poppins">
//                       {dayjs(item.mileageDate).format("MMM Do YY")}
//                     </h4>
//                   </div> */}
//  <div className="flex font-medium flex-col w-32">
//                     <h4 className="text-xs text-cardBody font-poppins">Date</h4>
//                     {isEditing ? (
                     
//                       <DatePicker
//                         // value={
//                         //   this.state.editedDate
//                         //     ? moment(this.state.editedDate)
//                         //     : moment(item.mileageDate)
//                         // }
//                         // onChange={(date, dateString) =>
//                         //   this.updateEditedData("mileageDate", dateString)
//                         // }
//                       />
//                     ) : (
                 
//                       <h4 className="text-xs text-cardBody font-poppins">
//                         {dayjs(item.mileageDate).format("MMM Do YY")}
//                       </h4>
//                     )}
//                     </div>







//                   {/* ... Other fields ... */}
//                   <div className=" flex font-medium flex-col w-32 ">
                                  
//                                   <h4 class=" text-xs text-cardBody font-poppins">From</h4>
//                                   {isEditing ? (
                    
//                     <Input
//                       value={this.state.editedData.fromLocation || item.fromLocation}
//                       onChange={(e) =>
//                         this.updateEditedData("clientName", e.target.value)
//                       }
//                     />
//                   ) : (
//                                   <h4 class=" text-xs text-cardBody font-poppins">
//                                        {item.fromLocation}
//                                   </h4>
                                      
//                                       )}
//                               </div>
//                               <div className=" flex font-medium flex-col w-32 ">
                                
//                                 <h4 class=" text-xs text-cardBody font-poppins">To</h4>
//                                 {isEditing ? (
                    
//                     <Input
//                       value={this.state.editedData.toLocation || item.toLocation}
//                       onChange={(e) =>
//                         this.updateEditedData("clientName", e.target.value)
//                       }
//                     />
//                   ) : (
//                                 <h4 class=" text-xs text-cardBody font-poppins">
//                                      {item.toLocation}
//                                 </h4>
//                                    )}
//                             </div>
//                             <div className=" flex font-medium flex-col w-32 ">
                                  
//                                   <h4 class=" text-xs text-cardBody font-poppins">Distance</h4>
//                                   {isEditing ? (
                    
//                     <Input
//                       value={this.state.editedData.distances || item.distances}
//                       onChange={(e) =>
//                         this.updateEditedData("clientName", e.target.value)
//                       }
//                     />
//                   ) : (
//                                   <h4 class=" text-xs text-cardBody font-poppins">
//                                        {item.distances}
//                                   </h4>
//                                     )}
//                               </div>
//                   <div className="flex font-medium flex-col w-32">
//                     <h4 className="text-xs text-cardBody font-poppins">Remarks</h4>
//                     {isEditing ? (
                     
//                       <Input
//                         value={this.state.editedData.remark || item.remark}
//                         onChange={(e) =>
//                           this.updateEditedData("remark", e.target.value)
//                         }
//                       />
//                     ) : (
                     
//                       <h4 className="text-xs text-cardBody font-poppins">
//                         {item.remark}
//                       </h4>
//                     )}
//                   </div>
//                   <div className="flex flex-col w-[4%]">
//                     {item.status === "Pending" ? (
//                       <div>
//                         {isEditing ? (
                         
//                           <>
//                             <Button
//                               type="primary"
//                               onClick={this.saveEditedData}
//                             >
//                               Save
//                             </Button>
//                             <Button onClick={this.cancelEditing}>Cancel</Button>
//                           </>
//                         ) : (
                        
//                           <EditOutlined
//                             type="edit"
//                             style={{ cursor: "pointer" }}
//                             onClick={() => {
//                               this.startEditing(item.mileageId);
//                             }}
//                           />
//                         )}
//                       </div>
//                     ) : null}
                  
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </OnlyWrapCard>
//         <UpdateMileageModal
//           mileageId={currentMileageId}
//           updateMileageModal={updateMileageModal}
//           handleUpdateMileageModal={handleUpdateMileageModal}
//         />
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth, mileage }) => ({
//   fetchingMileageByVoucherId: mileage.fetchingMileageByVoucherId,
//   fetchingMileageByVoucherIdError: mileage.fetchingMileageByVoucherIdError,
//   mileageVoucherId: mileage.mileageVoucherId,
//   updateMileageModal: mileage.updateMileageModal,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getMileageByVoucherId,
//       handleUpdateMileageModal,
//       setEditMileage,
//       updateMileage,
//       deleteMileage,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(MileageDrawerCard);


import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input, DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import { FlexContainer, OnlyWrapCard } from '../../../Components/UI/Layout';
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  getMileageByVoucherId,
  handleUpdateMileageModal,
  updateMileage,
  deleteMileage,
} from "../MileageAction";

const UpdateMileageModal = lazy(() => import("../Child/UpdateMileageModal"));

function MileageDrawerCard(props) {

  const [data, setData] = useState(props.mileageVoucherId);
  const [editStates, setEditStates] = useState(props.mileageVoucherId.map(() => false));
 
  const [inputValues, setInputValues] = useState([]);
  useEffect(() => {
    const { voucherId } = props;
    props.getMileageByVoucherId(voucherId);
  }, []);
  useEffect(() => {
   
    setInputValues(props.mileageVoucherId);
  }, [props.mileageVoucherId]);


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
    console.log(newData[index].clientName)
    let result={
      clientName:newData[index].clientName,
      distances:newData[index].distances,
      fromLocation:newData[index].fromLocation,
      mileageId:newData[index].mileageId,
      organizationId:newData[index].organizationId,
      remark:newData[index].remark,
      toLocation:newData[index].toLocation,
      unit:newData[index].unit,
      userId:newData[index].userId,
      mileageDate:`${newData[index].mileageDate}T20:00:00Z`
    }
    props.updateMileage(result)
  };


  const {
    mileageVoucherId,
    handleUpdateMileageModal,
    currentMileageId,
  } = props;

  return (
    <>
      <OnlyWrapCard>
        {inputValues.map((item,index) => {
          return (
            <div key={index}>
              <div
                className="flex justify-between mt-4"
                style={{ borderBottom: "3px dotted #515050" }}
              >
                <div className="flex font-medium flex-col w-10">
                  <h4 className="text-sm text-cardBody font-poppins">ID</h4>
                  <h4 className="text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
                    <Tooltip title={item.mileageId}>
                      <QuestionMarkIcon />
                    </Tooltip>
                  </h4>
                </div>
                <div className="flex font-medium flex-col w-32">
                  <h4 className="text-sm text-cardBody font-poppins">
                    Attributed To
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                value={item.clientName}
                onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
                style={{border:"2px solid black"}}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.clientName}
                  </h4>
            )}
                </div>
                <div className="flex font-medium flex-col w-32">
                  <h4 className="text-sm text-cardBody font-poppins">Date</h4>
                  {editStates[index] ? (
  <DatePicker
    value={dayjs(item.mileageDate)} 
    onChange={(date, dateString) =>
      handleInputChange(index, "mileageDate", dateString)
    }
    style={{ border: "2px solid black" }}
  />
) : (
  <h4 className="text-xs text-cardBody font-poppins">
    {dayjs(item.mileageDate).format("MMM Do YY")}
  </h4>
)}
                </div>
                <div className=" flex font-medium flex-col w-32 ">
                  <h4 className="text-sm text-cardBody font-poppins">
                    From
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                value={item.fromLocation}
                style={{border:"2px solid black"}}
                onChange={(e) => handleInputChange(index, 'fromLocation', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.fromLocation}
                  </h4>
            )}
                </div>
                <div className=" flex font-medium flex-col w-32 ">
                  <h4 className="text-sm text-cardBody font-poppins">To</h4>
                  {editStates[index] ? (
              <input
                type="text"
                style={{border:"2px solid black"}}
                value={item.toLocation}
                onChange={(e) => handleInputChange(index, 'toLocation', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.toLocation}
                  </h4>
            )}
                </div>
                <div className=" flex font-medium flex-col w-32 ">
                  <h4 className="text-sm text-cardBody font-poppins">
                    Distance
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                value={item.distances}
                style={{border:"2px solid black"}}
                onChange={(e) => handleInputChange(index, 'distances', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.distances}
                  </h4>
            )}
                </div>
                <div className="flex font-medium flex-col w-32">
                  <h4 className="text-sm text-cardBody font-poppins">
                    Remarks
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                style={{border:"2px solid black"}}
                value={item.remark}
                onChange={(e) => handleInputChange(index, 'remark', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.remark}
                  </h4>
            )}
                </div>

                <div className="flex font-medium flex-col w-32">
                  {/* <h4 className="text-xs text-cardBody font-poppins">
                    Remarks
                  </h4> */}
                  <h4 className="text-xs text-cardBody font-poppins">
                  <button onClick={() => toggleEdit(index)}>
            {editStates[index] ? 'Cancel' : 'Edit'}
          </button>
          {editStates[index] && (
            <button onClick={() => handleSave(index)}>Save</button>
          )}
                  </h4>
                </div>
                {item.status === "Pending" ? (
            <Tooltip title="Delete">
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer",display:"flex",alignItems:"flex-start" }}
                 onClick={() => {
                this.props.deleteMileage(item.mileageId);
                  
                 }}
               />
             </Tooltip>
             ):null}
                {/* <div className="flex flex-col w-[4%]">
                  {item.status === "Pending" ? (
                    <div>
                      <Button
                        type="primary"
                        onClick={() => saveEditedData(item.mileageId)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : null}
                </div> */}
              </div>
            </div>
          );
        })}
      </OnlyWrapCard>

      <UpdateMileageModal
        // mileageId={currentMileageId}
        // updateMileageModal={handleUpdateMileageModal}
        mileageId={currentMileageId}
        updateMileageModal={props.updateMileageModal}
        handleUpdateMileageModal={handleUpdateMileageModal}
      />
    </>
  );
}

const mapStateToProps = ({ auth, mileage }) => ({
  fetchingMileageByVoucherId: mileage.fetchingMileageByVoucherId,
  fetchingMileageByVoucherIdError: mileage.fetchingMileageByVoucherIdError,
  mileageVoucherId: mileage.mileageVoucherId,
  updateMileageModal: mileage.updateMileageModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByVoucherId,
      handleUpdateMileageModal,
      updateMileage,
      deleteMileage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MileageDrawerCard);

