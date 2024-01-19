import React, { useState, Suspense, lazy, Component } from "react";
import {
  setCollectionViewType,
  getTodayDistributor,
  setCustomerSubViewType,
  setDistributorViewType,
} from "../CollectionAction";
import GroupsIcon from '@mui/icons-material/Groups';
import moment from "moment";
import { getAllDistributorsList } from "../CollectionAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
const DistributorCollectionTableToday =lazy(()=>import("../Distributor/DistributorCollectionTableToday"));
const DistributorColletcionArchive =lazy(()=>import("../Distributor/DistributorColletcionArchive"));
const DistributorCollectionTableAll =lazy(()=>import("../Distributor/DistributorCollectionTableAll"));



const TabPane = StyledTabs.TabPane;

function CollectionDistributorTab(props) {
  const [
    selectedTodayRowDistributor,
    setSelectedTodayRowDistributor,
  ] = useState([]);

  const [selectedRowDistributor, setSelectedRowDistributor] = useState([]);
  const [activeKey, setActiveKey] = useState("1");

  function handleTabChange(key) {
    setActiveKey(key);
  }

  function handleClearReturnCheck() {
    setSelectedRowDistributor([]);
  }

  function handleClearCheck() {
    setSelectedTodayRowDistributor([]);
  }
  const resultForDis = selectedRowDistributor.reduce((acc, item) => {
    acc = acc + item.paymentAmount;
    return acc;
  }, 0);

  const rowSelectionTodayForDistributor = {
    onChange: (selectedTodayRowKeys, selectedTodayRow) => {
      setSelectedTodayRowDistributor(selectedTodayRow);
      console.log(
        `selectedTodayRowKeys: ${selectedTodayRowKeys}`,
        "selectedTodayRow: ",
        selectedTodayRow
      );
    },
  };

  const resultForToday = selectedTodayRowDistributor.reduce((acc, item) => {
    acc = acc + item.paymentAmount;
    return acc;
  }, 0);

  return (
    <>
      <TabsWrapper>
        {activeKey === "3" && (
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Balance as of {moment().format("ll")} : ₹{resultForDis.toFixed(2)}
          </div>
        )}
        {activeKey === "1" && (
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Receivables: ₹ {resultForToday.toFixed(2)}
          </div>
        )}
        <StyledTabs defaultActiveKey={activeKey} onChange={handleTabChange}>
          <TabPane
            tab={
              <>
                <span>
                  <i class="fas fa-hand-holding-usd"></i>&nbsp; Receivables
                </span>
                &nbsp;
                {activeKey === "1" && <></>}
              </>
            }
            key="1"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              <DistributorCollectionTableToday
                rowSelectionTodayForDistributor={
                  rowSelectionTodayForDistributor
                }
                handleClearCheck={handleClearCheck}
              />
            </Suspense>
          </TabPane>

   

          <TabPane
            tab={
              <>
                <span>
                  <i class="fas fa-archive"></i>&nbsp; Archive
                </span>
                &nbsp;
                {activeKey === "2" && <></>}
              </>
            }
            key="2"
          >
            <Suspense fallback={"Loading ..."}>
            
              <DistributorColletcionArchive

                handleClearReturnCheck={handleClearReturnCheck}
              />
            </Suspense>
          </TabPane>
          
          <TabPane
            tab={
              <>
                <span>
                <GroupsIcon />All
                </span>
                &nbsp;
                {activeKey === "3" && <></>}
              </>
            }
            key="3"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              <DistributorCollectionTableAll
    
              />
            </Suspense>
          </TabPane>

     
        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ collection, auth }) => ({
  user: auth.userDetails,
  viewType: collection.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCollectionViewType,
      setCustomerSubViewType,
      setDistributorViewType,
      getTodayDistributor,
      getAllDistributorsList,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionDistributorTab);
