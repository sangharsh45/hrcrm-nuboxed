import React, { Component, lazy, useEffect,useState } from "react";
import { StyledTabs } from "../../Components/UI/Antd";
import { TabsWrapper } from "../../Components/UI/Layout";
import Weekend from "../Settings/Recruitement/Child/Weekend/Weekend";
import Holiday from "./Holiday";

const TabPane = StyledTabs.TabPane;

function HolidayTab(props) {

    
   return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`HolidayList`} key="1">
                        <div style={{ marginTop: 10 }}>
                            <Holiday />
                        
                        </div>
                    </TabPane>
                    <TabPane tab={`Weekend`} key="2">
                        <div style={{ marginTop: 10 }}>
                            <Weekend/>
                        </div>
                    </TabPane>
                  
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}



export default HolidayTab;