import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import {getEmployeeKpiList,updateCompletedValue} from "../../../../Main/Teams/TeamsAction"
import BorderColorIcon from '@mui/icons-material/BorderColor';
const PerformanceTable = (props) => {
  const { translatedMenuItems } = props;

  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    props.getEmployeeKpiList(props.employeeId)
  }, []);

  const handleChange = (userKpiLinkId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [userKpiLinkId]: {
        ...prevFields[userKpiLinkId],
        [fieldName]: value,
      },
    }));
  };

  const handleEditClick = (userKpiLinkId) => {
    setEditContactId(userKpiLinkId);
  };
  const handleCancelClick = (userKpiLinkId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
    setEditContactId(null);
  };

  const handleUpdateContact = (userKpiLinkId,  completedValue) => {
    const data = {
        userKpiLinkId: userKpiLinkId, 
       employeeId: props.employeeId,
    completedValue: editedFields[userKpiLinkId]?.completedValue !== undefined ? editedFields[userKpiLinkId].completedValue : completedValue,
    };
  
    props.updateCompletedValue(data, props.employeeId,)
     
     
      setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
      setEditContactId(null);
    
  };
  

  return (
    <>
      <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        {props.employeeKpiList.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between mt-4" 
            //   style={{ borderBottom: '3px dotted #515050' }}
              >
                <div className="flex justify-between w-2/3">
{/*                  
                  <div className="Ccard__title w-40">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Name
                    </div>
                  
                      <div className="font-normal text-sm text-cardBody font-poppins">{item.kpiName}</div>
                   
                  </div> */}
                
                  {/* <div className="Ccard__title w-28">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Frequency
                    </div>
                
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span>
                          {item.frequency} 
                        </span>
                      </div>
                  
                  </div> */}
                  <div className="Ccard__title w-36">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Assigned Value
                    </div>
                   
                      <div className="font-normal text-sm text-cardBody font-poppins">{item.assignedValue}</div>
                  
                  </div>
                  <div className="Ccard__title w-[9rem]">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Completed Value
                    </div>
                    {editContactId === item.userKpiLinkId ? (
                      <input
                      style={{border:"2px solid black"}}
                        value={editedFields[item.userKpiLinkId]?.completedValue !== undefined ? editedFields[item.userKpiLinkId].completedValue : item.completedValue}
                        onChange={(e) => handleChange(item.userKpiLinkId, 'completedValue', e.target.value)}
                      />
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span>{item.completedValue}</span>
                      </div>
                    )}
                  </div>
                  <div className=" flex mt-[1rem] ml-4" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                    {editContactId === item.userKpiLinkId ? (
                        <>
                      <Button onClick={() => handleUpdateContact(item.userKpiLinkId, item.completedValue)}>
                        Save
                      </Button>
                        <Button onClick={() => handleCancelClick(item.userKpiLinkId)} style={{ marginLeft: '0.5rem' }}>
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.userKpiLinkId)}
                        style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};



const mapStateToProps = ({ auth,
    teams }) => ({
    employeeKpiList:teams.employeeKpiList,
  userId:auth.userDetails.userId,

 
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getEmployeeKpiList,
        updateCompletedValue

    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceTable);









