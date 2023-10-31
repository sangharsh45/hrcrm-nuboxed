import React, { Component, Suspense, lazy } from "react";
import AccountHeader from "./AccountHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { handleDistributorModal, setDistributorViewType, getDistributorsByUserId, getAllDistributorsList } from "./AccountAction";
import AddAccountModal from "./AddAccountModal";
import AccountTable from "./AccountTable";
import AccountDeleteTable from "./AccountDeleteTable";
import AllAccountList from "./AllAccountList";

class Account extends Component {
    state = { currentData: "" };
    handleClear = () => {
        this.setState({ currentData: "" });
        if (this.props.viewType === "table") {
            this.props.getDistributorsByUserId(this.props.userId);
        } else if (this.props.viewType === "all") {
            this.props.getAllDistributorsList();
        }
    };
    setCurrentData = (value) => {
        this.setState({ currentData: value });
    }
    render() {
        const {
            distributor,
            addDistributorModal,
            handleDistributorModal,
            viewType,
            setDistributorViewType,
        } = this.props;
        return (
            <>
                <AccountHeader
                    viewType={viewType}
                    setDistributorViewType={setDistributorViewType}
                    handleClear={this.handleClear}
                    currentData={this.state.currentData}
                    setCurrentData={this.setCurrentData}
                    handleDistributorModal={handleDistributorModal}
                />
                <AddAccountModal
                    handleDistributorModal={handleDistributorModal}
                    addDistributorModal={addDistributorModal}
                />
                <Suspense fallback={<BundleLoader />}>
                    {this.props.viewType === "list" ?
                        <AccountTable /> :
                        this.props.viewType === "dashboard" ? (
                            <AccountDeleteTable />) :
                            this.props.viewType === "all" ? (
                                <AllAccountList />
                            ) :
                                //     this.props.viewType === "group" ? (
                                //     <DistributorByGroup viewType={viewType} />
                                // ) :
                                null}
                </Suspense>
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    viewType: distributor.viewType,
    addDistributorModal: distributor.addDistributorModal,
    userId: auth.userDetails.userId,
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
