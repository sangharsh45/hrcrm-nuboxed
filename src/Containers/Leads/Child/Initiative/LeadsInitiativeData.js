import { Tag } from "antd";
import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MainWrapper } from "../../../../Components/UI/Layout";
import {
  setEditLeadsInitiative,
  handleUpdateLeadsInitiativeModal,
} from "../../LeadsAction";
import UpdateLeadsInitiativeModal from "./UpdateLeadsInitiativeModal";

const InitiativeData = (props) => {
  const [currentInitiativeDetailsId, setCurrentInitiativeDetailsId] = useState("");
  
  function handleSetCurrentInitiativeDetailsId(initiativeDetailsId) {
    setCurrentInitiativeDetailsId(initiativeDetailsId);
  }
  function generateRandomColor() {
    let maxVal = 0xffffff;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  const {
    handleUpdateLeadsInitiativeModal,
    updateLeadsInitiativeModal,
  } = props;
  return (
    <>
      {props.initiativesByLeadsId &&
        props.initiativesByLeadsId.map((item) => {
          console.log(item.skillList);
          console.log(item.initiativeName);
          const initdata=item.initiativeSkillMapper &&
          item.initiativeSkillMapper.map((skill)=>{
            return { skill, color: generateRandomColor() }
          });
          console.log("init4",initdata)
          return (
            <>
              <MainWrapper style={{ width: "30%", padding: ".8em" }}>
              <div class=" flex justify-between" >
                  <div>
                    {item.initiativeName}
                    <br />
                   
                      {initdata &&initdata
                      .map((init) => {
                        return (
                          <>
                            <Tag 
                               style={{
                                
                                border: `2px solid ${init.color}`,
                               
                              }}
                            >
                              {init.skill.name}
                            </Tag>
                          </>
                            );
                          })} 
                      
                    
                  </div>
                  <div>
                  <BorderColorIcon 
                      type="edit"
                      style={{ cursor: "pointer",fontSize:"1rem" }}
                      onClick={() => {
                        props.setEditLeadsInitiative(item);
                        handleUpdateLeadsInitiativeModal(true);
                        handleSetCurrentInitiativeDetailsId(item.initiativeDetailsId)
                      }}
                    />
                  </div>
                </div>
              </MainWrapper>
            </>
          );
        })}
     <UpdateLeadsInitiativeModal
      initiativeDetailsId={currentInitiativeDetailsId}
      updateLeadsInitiativeModal={updateLeadsInitiativeModal}
        handleUpdateLeadsInitiativeModal={
          handleUpdateLeadsInitiativeModal
        }
      /> 
    </>
  );
};

const mapStateToProps = ({ leads, auth, suppliers, librarys }) => ({
  user: auth.userDetails,
  leadsId: leads.lead.leadsId,
  updateLeadsInitiativeModal: leads.updateLeadsInitiativeModal,
  userId: auth.userDetails.userId,
  initiativesByLeadsId: leads.initiativesByLeadsId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        setEditLeadsInitiative,
        handleUpdateLeadsInitiativeModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeData);
