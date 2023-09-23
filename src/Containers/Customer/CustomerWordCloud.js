import Item from "antd/lib/list/Item";
import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  //   getCustomerDetailsById,
  // getCustomerDocument,
  getCustomerKeySkill,

    // handleCustomerDrawerModal

  } from "../Customer/CustomerAction";
// import { StyledSelect } from "../../../../../../Components/UI/Antd";

function CustomerWordCloud(props) {
  useEffect(() => {
    props.getCustomerKeySkill(props.customer.customerId )
      
  }, []);
    const [isViewAll, setIsViewAll] = useState(false);
    const [particularRowData, setParticularRowData] = useState({});
  
//        const color = ["red"];
function generateRandomColor() {
  let maxVal = 0xffffff;
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}


 const newSkill=props.customerKeySkill.skillSetList&&props.customerKeySkill.skillSetList.map((item)=> {
   return { skillName:item, color: generateRandomColor() };
     });

    console.log("skill",newSkill)



        return (
        
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
            

 {!isViewAll ? (
        <>
          {newSkill&&newSkill.slice(0, 10).map((option,i) => {
            return (
              <>
              {/* {newSkill !==null?"": */}
                <div key={i} style={{
                    border: `1px solid ${option.color}`,
                    padding: "0px 0.4em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.4em",
                  }}>
                    {option.skillName}
                    </div>
          {/* } */}
              </>
            );
          })}
        </>
      ) : (
        <>
       
            {newSkill && newSkill.map((option, i) => {
            return (
              <>
                {/* {newSkill && newSkill!==null?"": */}
                  <div key={i} style={{
                    border: `2px solid ${option.color}`,
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}>
                 {option.skillName}
                    </div>
            {/* } */}
                
              </>
                
            );
          })}
 
        </>

      )} 
   


      
    </div>
  
             
          
          </>
        );
      }
    
      const mapStateToProps = ({ auth, customer, account }) => ({
        user: auth.userDetails,
    
      
        // customer: customer.customer,
         customerKeySkill:customer.customerKeySkill,
     
      });
  
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
  

            getCustomerKeySkill,
   
   
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerWordCloud);

// export default CustomerWordCloud;
