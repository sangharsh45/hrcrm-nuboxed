import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import QuizIcon from '@mui/icons-material/Quiz';
import {handleTestDrawerModal} from "../../CourseAction"
import { Button, Tooltip,Switch, Divider, Popconfirm } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Spacer, Select } from "../../../../Components/UI/Elements";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddTestModal from "./AddTestModal";

const { Option } = Select;

class SingleTopic extends Component {
 

  handleStageType=(value)=>
  this.setState({responsible:value});
 
  

  render() {
    const { topicsData } = this.props;
    console.log(topicsData);

    const {
      topicsData: {
        topics,
        opportunityStagesId,

        probability,
      },
      linkedStages,
     
      newTopicName,
    
      updatingStages,
   
      color,
      key,
      currentStage,
    } = this.props;
    console.log(opportunityStagesId, "----------", linkedStages);
    console.log(topics);
    console.log(color);
    console.log(currentStage);

    const disabled = probability === 100 || probability === 0 ? true : false;
    // const disabled = false;
    const disableDelete = linkedStages && linkedStages.includes(opportunityStagesId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer
                justifyContent="start"
                alignItems="center"
                
              >
                
                <StageName style={{ flexBasis: "25%", textAlign: "left" }}>
                  {elipsize(topics, 23)}
                </StageName>
           
                <div class=" flex justify-between">     
                <Tooltip title="Test" >
                    <span
                    onClick={(item) => 
                     {
                       this.props.handleTestDrawerModal(true);  
                      //  this.props.handleApproveIconClick(stageId)                                         
                    }                     
                    }
                     style={{ 
                     marginLeft: "35px",
                      }} 
                     >
                          {/* {probability !== 0 && probability !== 100 && ( */}
                  <QuizIcon/>
                          {/* )} */}
                   </span>
                   </Tooltip>  
</div>
                 
           </FlexContainer>
            
            ) : (
              
              <FlexContainer justifyContent="center">
                <TextInput
                  name={newTopicName}
                  // value={stageValue1 || stageName}
                  defaultValue={topics}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />
                &nbsp;
               
     
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={disabled}
                  loading={updatingStages}                  
            
                >
                  {/* Save */}
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={() => toggleViewType()}>
               {/* Cancel */}
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
              </FlexContainer>
            )
          }

                   {/* <AddTestModal
        handleTestDrawerModal={this.props.handleTestDrawerModal}
        addTestDrawerModal={this.props.addTestDrawerModal}
        /> */}

        </ViewEditCard>  

         

      </StageWrapper>
     
   
     
    );
   
  }

}
const mapStateToProps = ({ course, auth }) => ({
 
  addTestDrawerModal:course.addTestDrawerModal


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
      handleTestDrawerModal
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleTopic);
// export default SingleRecruitStages;


const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;

