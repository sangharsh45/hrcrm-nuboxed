import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd"
import {getTeamList} from "../TeamsAction"
import { FormattedMessage } from "react-intl";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function TeamsCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
 props.getTeamList(props.userId);
  }, []);


  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

//   const handleLoadMore = () => {

//       setPage(page + 1);
//       props.getInvestorsbyId(
//         props.currentUser ? props.currentUser : props.userId,
//         page,
//         props.filter?props.filter:"creationdate"
//       );
//   };

  const {
    fetchingInvestors,
    investorsbyId,
    handleUpdateInvestorModal,
    updateInvestorModal,
    fetchingInvestorsError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
 
  // if (fetchingInvestors) {
  //   return <BundleLoader />;
  // }

  return (
    <>
  
  <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
<div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
<div className=" md:w-[6.5rem]">
<FormattedMessage
        id="app.Name"
        defaultMessage="Name"
      /></div>

<div className="md:w-[6.1rem]"> 
 <FormattedMessage id="app.Sector" defaultMessage="Team Lead" /></div>

 <div className="md:w-[6.1rem]"> 
 <FormattedMessage id="app.Sector" defaultMessage="Team Members" /></div>


<div className="w-[10.2rem]"></div>

</div>


{props.teamList.map((item) => { 


          return (
              <div>
                  <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                      >
                           
                           <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                              <Tooltip>
                                <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                
                                  <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                      
{item.teamName}


                                  </div>
                                  </div>
                              </Tooltip>
                              </div>
                              </div>
                      </div>
                      <div class="flex">

                   
                    
                      <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                      
                        <div class="text-sm text-cardBody font-poppins">
                        {item.courseName}
                        </div>
                    </div>

                  

                 
                    </div>
            

                    
                   
                  </div>
              </div>


          )
      })}
          
</div>
     

   
   
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  teams
}) => ({
  teamList:teams.teamList,
  userId:auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTeamList
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TeamsCardList);

