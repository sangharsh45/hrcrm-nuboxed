import React, { Component, lazy, useEffect,useState } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import Notifications from "../General/Notifications";
import NotificationAccess from "./NotificationAccess";
const TabPane = StyledTabs.TabPane;

function NotificationsTab(props) {

    
   return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`In App`} key="1">
                        <div style={{ marginTop: 10 }}>
                        <NotificationAccess />
                        
                        </div>
                    </TabPane>
                    <TabPane tab={`Email`} key="2">
                        <div style={{ marginTop: 10 }}>
                        <Notifications />
                        </div>
                    </TabPane>
                    <TabPane tab={`WhatsApp`} key="2">
                        {/* <div style={{ marginTop: 10 }}>
                        <Notifications />
                        </div> */}
                    </TabPane>
                    <TabPane tab={`SMS`} key="2">
                        {/* <div style={{ marginTop: 10 }}> */}
                        {/* <Notifications /> */}
                        {/* </div> */}
                    </TabPane>
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}



export default NotificationsTab;