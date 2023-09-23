import { Tag } from "antd";
import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../../../Components/UI/Layout";
import {
  setEditCustomerInitiative,
  handleUpdateCustomerInitiativeModal,
  deleteInitiativeData
} from "../../../../CustomerAction";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import UpdateCustomerInitiativeModal from "./UpdateCustomerInitiativeModal";
import { StyledPopconfirm } from "../../../../../../Components/UI/Antd";

const InitiativeData = (props) => {
  const [currentInitiativeDetailsId, setCurrentInitiativeDetailsId] = useState("");
  const [deleteInitiativeData, setdeleteInitiativeData] = useState("");

  const handledeleteInitiativeData =(initiativeDetailsId) => {
    props.deleteInitiativeData(initiativeDetailsId);
    setdeleteInitiativeData(initiativeDetailsId);
  };

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
    handleUpdateCustomerInitiativeModal,
    updateCustomerInitiativeModal,
  } = props;
  console.log(props.initiatives);
  return (
    <>
      {props.initiatives &&
        props.initiatives.map((item) => {
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
                    {initdata &&
                      initdata.map((init) => {
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
                        props.setEditCustomerInitiative(item);
                        handleUpdateCustomerInitiativeModal(true);
                        handleSetCurrentInitiativeDetailsId(item.initiativeDetailsId)
                      }}
                    />
                  </div>
                  <div>
                  <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() =>
               handledeleteInitiativeData(item.initiativeDetailsId)}
          >
            
             {/* {user.opportunityDeleteInd ===true && ( */}
            <DeleteIcon 
            type="delete" style={{ cursor: "pointer", color: "red" }} />
             {/* )} */}
          </StyledPopconfirm>
                  </div>
                </div>
                <div>
                  {item.description}
                  </div>
              </MainWrapper>
            </>
          );
        })}
      <UpdateCustomerInitiativeModal
      initiativeDetailsId={currentInitiativeDetailsId}
        updateCustomerInitiativeModal={updateCustomerInitiativeModal}
        handleUpdateCustomerInitiativeModal={
          handleUpdateCustomerInitiativeModal
        }
      />
    </>
  );
};

const mapStateToProps = ({ customer, auth, suppliers, librarys }) => ({
  user: auth.userDetails,
  customerId: customer.customer.customerId,
  updateCustomerInitiativeModal: customer.updateCustomerInitiativeModal,
  userId: auth.userDetails.userId,
  initiatives: customer.initiatives,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEditCustomerInitiative,
      handleUpdateCustomerInitiativeModal,
      deleteInitiativeData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeData);
