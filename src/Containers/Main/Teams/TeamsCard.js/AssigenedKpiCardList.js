import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import {  Select, Tooltip } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
import {getEmployeeKpiList,deleteKpiData} from "../TeamsAction"
import moment from "moment";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function AssigenedKpiCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getEmployeeKpiList(props.rowdata.employeeId)
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
  
  <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[13.5rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
        <div className=" md:w-[8.1rem]"><FormattedMessage
                  id="app.Value"
                  defaultMessage="Value"
                /></div>
        <div className="md:w-[10.1rem]"><FormattedMessage
                  id="app.Frequency"
                  defaultMessage="Frequency"
                /></div>
       
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {props.employeeKpiList.map((item) => { 
        
        
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
                                                
      {item.kpiName}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                                <div className=" flex font-medium flex-col md:w-[13.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                    <div class="text-sm text-cardBody font-poppins">
                                         {item.assignedValue}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[16.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm text-cardBody font-poppins">
                                  {item.frequency}
                                  </div>
                              </div>
                              </div>
   
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <StyledPopconfirm
                  title="Do you want to delete?"
                   onConfirm={() => props.deleteKpiData(item.userKpiLinkId)}
                  >
             <Tooltip title="Delete">
                  <DeleteOutlined
                    type="delete"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "1rem",
                    }}
                  />
               </Tooltip>
                </StyledPopconfirm>

                                    </div>
                                </div>
                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </OnlyWrapCard>
     

   
   
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  teams
}) => ({
    employeeKpiList:teams.employeeKpiList,
  userId:auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getEmployeeKpiList,
        deleteKpiData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AssigenedKpiCardList);

