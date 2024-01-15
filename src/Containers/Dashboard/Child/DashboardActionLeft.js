import React, {  lazy} from "react";
import { StyledSelect, } from "../../../Components/UI/Antd";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { FormattedMessage } from "react-intl";
import {
  setDashboardViewType,
} from "../DashboardAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Input,Tag } from "antd";
import PersonIcon from '@mui/icons-material/Person';
const DashboardShareForm=lazy(() => import("./DashboardShareForm"));


const Option = StyledSelect.Option;
const { Search } = Input;
const DashboardActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  const {
    viewType,
    setDashboardViewType,
    user,
    role
  } = props;
 
  return (
    <div class=" flex items-center">
         { user.department=== "Management" && (  
            <>
         
            
            
            
              {/* <Tag
                color={viewType === "ME" ? "#FFA500" : "orange"}
                style={{
                  cursor: "pointer",                  
                  fontWeight: viewType === "ME" ? "bold" : null,
                  textAlign: "center",
                  fontFamily:"poppins",
                  borderColor: "orange",
                }}
                onClick={() => setDashboardViewType("ME")}
              >
                
                
                <FormattedMessage
                  id="app.myview"
                  defaultMessage="My View"
                />
                
              </Tag> */}
           
             
             
            
            
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setDashboardViewType("test")}
          style={{
            color: props.viewType === "test" && "#1890ff",
  
          }}
        > <PersonIcon/>
        
        </span>

      
           
{user.recruitOppsInd===true && (

        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setDashboardViewType("ques")}
          style={{
            color: props.viewType === "ques" && "#1890ff",
  
          }}
        > <QuestionMarkIcon  />
        
        </span>
)}

           
{user.crmInd===true && (

<span class=" mr-2 cursor-pointer text-xs"
  onClick={() => props.setDashboardViewType("bulb")}
  style={{
    color: props.viewType === "bulb" && "#1890ff",

  }}
> <LightbulbIcon  />

</span>
)}
            </>
             )}

{user.dashboardFullListInd===true && (
              <Tag
                color={viewType === "ALL" ? "tomato" : "#FFA500"}
                style={{
                  cursor: "pointer",                  
                  fontWeight: viewType === "ALL" ? "tomato" : "#FFA500",
                  textAlign: "center",
                  fontFamily:"poppins",
                  borderColor: "tomato",
                }}
               onClick={() => setDashboardViewType("ALL")}
              >
                <FormattedMessage
                  id="app.enterprise"
                  defaultMessage="Enterprise"
                />
              </Tag>
            )}
             {viewType==="ALL" && (
        <DashboardShareForm/>
        )}
           
    </div>
  );
};
const mapStateToProps = ({ account,report, auth,opportunity,dashboard }) => ({
reportViewType: report.reportViewType,
viewType:dashboard.viewType,
user: auth.userDetails,
role: auth.userDetails.role,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    // setReportViewType,
    setDashboardViewType
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardActionLeft)
);
