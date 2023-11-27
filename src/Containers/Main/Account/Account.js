import React, { useState, useEffect, Suspense, lazy } from "react";
import AccountHeader from "./AccountHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  handleDistributorModal,
  setDistributorViewType,
  getDistributorsByUserId,
  getAllDistributorsList
} from "./AccountAction";
import AddAccountModal from "./AddAccountModal";
import AccountTable from "./AccountTable";
import AccountDeleteTable from "./AccountDeleteTable";
import AllAccountList from "./AllAccountList";
import AccountCard from "./AccountCard";
import AllAccountCard from "./AllAccountCard";
import AccountDeleteCard from "./AccountDeleteCard";

const Account = ({
  distributor,
  addDistributorModal,
  viewType,
  setDistributorViewType,
  userId,
  handleDistributorModal,
  getDistributorsByUserId,
  getAllDistributorsList
}) => {
  const [currentData, setCurrentData] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleClear = () => {
    setCurrentData("");
    if (viewType === "table") {
      getDistributorsByUserId(userId);
    } else if (viewType === "all") {
      getAllDistributorsList();
    }
  };

  return (
    <>
      <AccountHeader
        viewType={viewType}
        setDistributorViewType={setDistributorViewType}
        handleClear={handleClear}
        currentData={currentData}
        setCurrentData={setCurrentData}
        handleDistributorModal={handleDistributorModal}
      />
      <AddAccountModal
        handleDistributorModal={handleDistributorModal}
        addDistributorModal={addDistributorModal}
      />
      <Suspense fallback={<BundleLoader />}>
        {viewType === "list" ? (
          <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
            <AccountTable />
          </div>
        ) : viewType === "card" ? (
          <AccountCard />
        ) : viewType === "dashboard" ? (
          <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
            {isLargeScreen ? <AccountDeleteTable /> : <AccountDeleteCard />}
          </div>
        ) : viewType === "all" ? (
          <div className={isLargeScreen ? "hidden sm:block" : "block sm:hidden"}>
            {isLargeScreen ? <AllAccountList /> : <AllAccountCard />}
          </div>
        ) : null}
      </Suspense>
    </>
  );
};

const mapStateToProps = ({ distributor, auth }) => ({
  viewType: distributor.viewType,
  addDistributorModal: distributor.addDistributorModal,
  userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDistributorViewType,
      handleDistributorModal,
      getDistributorsByUserId,
      getAllDistributorsList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Account);
