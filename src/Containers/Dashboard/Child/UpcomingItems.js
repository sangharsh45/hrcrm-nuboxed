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

class UpcomingItems extends Component {
  handleCallback = () => { };
  handleChange = (checked) => {
    console.log("afskajshfkashfjkaskf", checked);
    const { updateTodoEvent, updateTodoCall, updateTodoTask,todo, ratingValue } = this.props;
    console.log(todo);
  
  };
  render() {
    const { upComing, ratingValue } = this.props;
 
   
    // let contactName = todo.metaData && todo.metaData.contacts;
    // let accountName = todo.metaData && todo.metaData.accounts;
    // let opportunity = todo.metaData && todo.metaData.opportunity;
  
    // const add = todo.metaData && todo.metaData.Address;
    
  

    return (
      <>
        <div 
        //style={{overflow:"scroll" }}
        >
          <div>
            <FlexContainer>
            
              {/* {show && ( */}
              
            
              <SubTitle style={{ fontSize: 12, marginLeft: "1.56em" }}>
                 {`${upComing.userName}  ${upComing.eventType} on  ${moment(upComing.date).format("ll")} `}
               
                 </SubTitle>
            </FlexContainer>
          </div>

               

             
         
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ dashboard, event }) => ({

});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingItems);
