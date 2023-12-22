import React, {  } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WebsiteTab from "./WebsiteTab";
import WebsiteOrderForm from "../DistributionTab/WebsiteOrderForm"




const TabPane = StyledTabs.TabPane;

function DistributionTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Leads`} key="1">
                    <div class=" mt-[10px]" >
                        <WebsiteTab/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Order`} key="2">
                    <div class=" mt-[10px]" >
                        <WebsiteOrderForm/>
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


