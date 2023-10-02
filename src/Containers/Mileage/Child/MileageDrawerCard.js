import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, DatePicker } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import {  OnlyWrapCard } from '../../../Components/UI/Layout';
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
                      <QuestionMarkIcon style={{fontSize:"1.25rem"}} />
                    </Tooltip>
                  </h4>
                </div>
                <div className="flex font-medium flex-col w-32 ml-[0.25rem]">
                  <h4 className="text-sm text-cardBody font-poppins">
                    Attributed To
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                value={item.clientName}
                onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
                   style={{border:"1px solid grey"}}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.clientName}
                  </h4>
            )}
                </div>
                <div className="flex font-medium flex-col w-36 ml-[0.25rem]">
                  <h4 className="text-sm text-cardBody font-poppins">Date</h4>
                  {editStates[index] ? (
  <DatePicker
    value={dayjs(item.mileageDate)} 
    onChange={(date, dateString) =>
      handleInputChange(index, "mileageDate", dateString)
    }
    style={{ border: "1px solid grey" }}
  />
) : (
  <h4 className="text-xs text-cardBody font-poppins">
    {dayjs(item.mileageDate).format("MMM Do YY")}
  </h4>
)}
                </div>
                <div className=" flex font-medium flex-col w-30 ml-[0.25rem]">
                  <h4 className="text-sm text-cardBody font-poppins">
                    From
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                value={item.fromLocation}
                   style={{border:"1px solid grey"}}
                onChange={(e) => handleInputChange(index, 'fromLocation', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.fromLocation}
                  </h4>
            )}
                </div>
                <div className=" flex font-medium flex-col w-30 ml-[0.25rem] ">
                  <h4 className="text-sm text-cardBody font-poppins">To</h4>
                  {editStates[index] ? (
              <input
                type="text"
                   style={{border:"1px solid grey"}}
                value={item.toLocation}
                onChange={(e) => handleInputChange(index, 'toLocation', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.toLocation}
                  </h4>
            )}
                </div>
                <div className=" flex font-medium flex-col w-20 ml-[0.25rem]">
                  <h4 className="text-sm text-cardBody font-poppins">
                    Distance
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                value={item.distances}
                   style={{border:"1px solid grey"}}
                onChange={(e) => handleInputChange(index, 'distances', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.distances}
                  </h4>
            )}
                </div>
                <div className="flex font-medium flex-col w-32 ml-[0.25rem]">
                  <h4 className="text-sm text-cardBody font-poppins">
                    Remarks
                  </h4>
                  {editStates[index] ? (
              <input
                type="text"
                style={{border:"1px solid grey"}}
                value={item.remark}
                onChange={(e) => handleInputChange(index, 'remark', e.target.value)}
              />
            ) : (
                  <h4 className="text-xs text-cardBody font-poppins">
                    {item.remark}
                  </h4>
            )}
                </div>

                <div className="flex font-medium flex-col w-32 justify-center">
                  {/* <h4 className="text-xs text-cardBody font-poppins">
                    Remarks
                  </h4> */}
                  <h4 className="text-xs text-cardBody font-poppins ml-[0.25rem]">
                  <button onClick={() => toggleEdit(index)} >
            {editStates[index] ? 'Cancel' : 'Edit'}
          </button>
          {editStates[index] && (
            <button onClick={() => handleSave(index)} className="ml-[0.25rem]">Save</button>
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

