import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import Highlighter from "react-highlight-words";
import { Link } from "../../../../Components/Common";
import moment from "moment";
import InfoIcon from '@mui/icons-material/Info';
import { StyledTable } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  SearchOutlined,
} from "@ant-design/icons";
import { CurrencySymbol } from "../../../../Components/Common";
import { getOpportunityListByCustomerId,handleUpdateCustomerOpportunityModal,
  setEditCustomerOpportunity} from "../../CustomerAction";
import { Tooltip,Button,Input,Progress } from "antd";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
const AddCustomerUpdateOpportunityModal =lazy(()=>import("../../Child/CustomerDetail/CustomerTab/OpportunityTab/AddCustomerUpdateOpportunityModal")); 


function CustomerOpportunityCardList(props) {
  useEffect(() => {
    props.getOpportunityListByCustomerId(props.customer.customerId);
  }, []);
  console.log(props.customerId);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            // icon="search"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  
  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
  const {
    customer: { customerId, name },
    user,
    handleUpdateCustomerOpportunityModal,
    fetchingCustomerOpportunity,
    opportunityByCustomerId,
    fetchingCustomerOpportunityError,
    addUpdateCustomerOpportunityModal,
    setEditCustomerOpportunity,
  } = props;


  const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
      <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
      <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.1rem]">Name</div>
        <div className=" md:w-[6.1rem]">startDate</div>
        <div className=" md:w-[4.2rem] ">endDate</div>
        <div className="md:w-[5.8rem]">Proposal Amount</div>
        <div className="md:w-[8.5rem]">Status</div>
        <div className="md:w-[3.8rem]">Sponsor</div> 
        <div className="w-12"></div>

      </div>

        {opportunityByCustomerId.map((item) => {
              var findProbability = item.probability;
              item.stageList.forEach((element) => {
                if (element.oppStage === item.oppStage) {
                  findProbability = element.probability;}
               });
          const currentdate = moment().format("DD/MM/YYYY");
          const date = moment(item.creationDate).format("DD/MM/YYYY");

          const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
              <div
                className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
              >
                <div class="flex ">
                <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
          &nbsp;
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`/opportunity/${item.opportunityId}`}
          title={`${item.opportunityName || ""} `}
        >{item.opportunityName}</Link>&nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null}
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs text-cardBody font-poppins">
                    {moment(item.startDate).format("llll")}
                 
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
         
         <h4 class=" text-xs text-cardBody font-poppins">
         {moment(item.endDate).format("llll")}
           {/* {item.endDate} */}
      
         </h4>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs text-cardBody font-poppins">
                    <span>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;&nbsp;{item.proposalAmount}
          </span>
                 
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
         
         <h4 class=" text-xs text-cardBody font-poppins">
         <Tooltip title={item.oppStage}>
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={findProbability}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
  
</Tooltip>
      
         </h4>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs text-cardBody font-poppins">
                    <Tooltip title={item.contactName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.contactName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </span>
            </Tooltip>
                 
                    </h4>
                  </div>
      
                </div>
              
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                      <Tooltip title={item.description}>
           
          <InfoIcon 
          
              // type="edit"
              style={{ cursor: "pointer",fontSize:"1rem" }}
             
            />
          
          </Tooltip>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                  <Tooltip title="Edit">
             {user.opportunityUpdateInd ===true && (
          <BorderColorIcon 
          
              type="edit"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
              onClick={() => {
                props.setEditCustomerOpportunity(item);
                handleUpdateCustomerOpportunityModal(true);
                handleSetCurrentOpportunityId(item.opportunityId)
                
              }}
            />
            )}
          </Tooltip>
                  </div>
                
             
               
                </div>
              </div>
            </div>
          );
        })}
      </OnlyWrapCard>
      </div>
      <AddCustomerUpdateOpportunityModal
      opportunityId={currentOpportunityId}
      defaultCustomers={[{ label: name, value: customerId }]}
      customerId={{ value: customerId }}
       addUpdateCustomerOpportunityModal={addUpdateCustomerOpportunityModal}
        handleUpdateCustomerOpportunityModal={handleUpdateCustomerOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        
      />
    </>
  );
}
// }
const mapStateToProps = ({ customer,auth }) => ({
  user: auth.userDetails,
  fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
  fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
  customerId: customer.customer.customerId,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByCustomerId,
      handleUpdateCustomerOpportunityModal,
      setEditCustomerOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOpportunityCardList);
