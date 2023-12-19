import React, {  } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WebsiteTab from "./WebsiteTab";




const TabPane = StyledTabs.TabPane;

function DistributionTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Leads`} key="1">
                        <div style={{ marginTop: 10 }}>
                        <WebsiteTab/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Order`} key="2">
                        <div style={{ marginTop: 10 }}>
                        {/* <MileageApproveForm/> */}
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


