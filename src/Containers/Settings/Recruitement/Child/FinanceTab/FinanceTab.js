import React,{ } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CurrencyCoversionForm from "./CurrencyCoversionForm";
import CurrencyCoversionForm2 from "./CurrencyCoversionForm2";
import OneTimeTable from "./OneTimeTable";

const TabPane = StyledTabs.TabPane;

function DistributionTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Currency`} key="1">
                        <div class=" mt-[10px]">
                        <CurrencyCoversionForm/>
                        <CurrencyCoversionForm2/>
                        <OneTimeTable/>
                        </div>
                    </TabPane>
                    
                 
                </StyledTabs>
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DistributionTab);


