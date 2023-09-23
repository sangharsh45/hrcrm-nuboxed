import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { updateTodoEvent, updateTodoCall,updateTodoTask } from "../DashboardAction"
import { Checkbox, Rate } from "antd";
import { ScheduleOutlined, StarOutlined } from '@ant-design/icons';
import moment from "moment";
import { FlexContainer } from "../../../Components/UI/Layout";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../Components/UI/Elements";
import TodoCheckBox from "../Child/TodoCheckBox"
import { Link } from "../../../Components/Common";

class TodoItem extends Component {
  handleCallback = () => { };
  handleChange = (checked) => {
    console.log("afskajshfkashfjkaskf", checked);
    const { updateTodoEvent, updateTodoCall, updateTodoTask,todo, ratingValue } = this.props;
    console.log(todo);
    if (todo.activity === "Call") {
      console.log("inside call");
      if (todo.completionInd === false) {
        updateTodoCall({ completionInd: true },
          todo.callId, 
          todo.activity,
          );
      }
      
      if (todo.completionInd === true) {
        updateTodoCall({ completionInd: false },
          todo.callId, 
          todo.activity,
          );
      }
    }
    if (todo.activity === "Event") {
      console.log("inside event", todo);
      if (todo.completionInd === false) {
        updateTodoEvent( 
          { completionInd: true },
          todo.eventId, 
          todo.activity,
          );
      }
      if (todo.completionInd === true) {
        updateTodoEvent({ completionInd: false },
          todo.eventId, 
          todo.activity,
          );
      }
    }

    if (todo.activity === "Task") {
      console.log("inside event", todo);
      if (todo.completionInd === false) {
        updateTodoTask(  
        
          { completionInd: true },
          todo.taskId, 
          todo.activity,
          );
      }
      if (todo.completionInd === true) {
        updateTodoTask({ completionInd: false },
          todo.taskId, 
          todo.activity,
          );
      }
    }
  };
  render() {
    const { todo, ratingValue } = this.props;
     console.log("Rank1",ratingValue);
    console.log("Tweet",todo);
     console.log("todos",todo.eventTypeId);
    // let accountList = todo.metaData && todo.metaData.accountMapper;
    let contactName = todo.metaData && todo.metaData.contacts;
    let accountName = todo.metaData && todo.metaData.accounts;
    let opportunity = todo.metaData && todo.metaData.opportunity;
    // console.log(contactName);
    // console.log(accountName);
    const add = todo.metaData && todo.metaData.Address;
    
  

    return (
      <>
        <div 
        //style={{overflow:"scroll" }}
        >
          <div>
            <FlexContainer>
            
              {/* {show && ( */}
                <Checkbox
                  checked={todo.completionInd === true}
                  // checked={todo.completionInd === "false" ? false : true}
                  onChange={(checked) =>
                    // todo.completionInd === false
                      this.handleChange(checked)
                      // :  null
                     
                  }
                ></Checkbox>
                {/* <TodoCheckBox
                ratingValue={ratingValue}
                todo={todo}
                /> */}
              {/* )} */}
              &nbsp;&nbsp;
             
            
              <SubTitle
                style={{ fontSize: 14, color: "#93a6c4", width: "auto" }}
              >
                <ScheduleOutlined
                  // type={todo.title === "Call" ? "phone" : "schedule"}
                  theme="twoTone"
                />{" "}
                &nbsp; {moment(todo.startTime).format("LT")}
              </SubTitle>
              &nbsp;&nbsp; &nbsp;&nbsp;
            
              <SubTitle style={{ fontSize: 12, marginLeft: "1.56em" }}>
                 {`${todo.topic} / `}
                 {`${todo.activity}  `}
                 {`${todo.type}`}
                 </SubTitle>
            </FlexContainer>
          </div>

          {/* <div>
            <FlexContainer>
              <SubTitle
                style={{
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#888",
                  marginLeft: "1.56em",
                }}
              > */}
               

                {/* {contactName === " " ? null : <>{`${contactName} / `}</>}

                {opportunity === " " ? null : <>{`${opportunity}`}</>}
    
              </SubTitle>
            </FlexContainer>
          </div> */}
          {/* <div>
            <FlexContainer>
              <SubTitle
                style={{
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#888",
                  marginLeft: "1.56em",
                }}
              >
              
                <div></div>
             
              </SubTitle>
            </FlexContainer>
          </div> */}
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ dashboard, event }) => ({
//   ratingValue: event.ratingValue,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // updateTodoCall,
  // updateTodoEvent,
  // updateTodoTask
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
