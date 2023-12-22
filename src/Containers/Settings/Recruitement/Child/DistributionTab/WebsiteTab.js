import React, {  } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WebsiteForm from "./WebsiteForm";
import LeadsAgingForm from "../../../LeadsConfig/LeadsAgingForm";




const TabPane = StyledTabs.TabPane;

function WebsiteTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Distribution`} key="1">
                        <div class=" mt-[10px]" >
                        <WebsiteForm/>
                        </div>
                        
                    </TabPane>
                    <TabPane tab={`Ageing`} key="2">
            <div class=" mt-[10px]" >
              <LeadsAgingForm />
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

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteTab);


