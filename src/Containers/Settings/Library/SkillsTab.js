import React, { Component, lazy, useEffect,useState } from "react";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import Certification from "../Recruitement/Child/Certification/Certification";

import Library from "./Library";


const TabPane = StyledTabs.TabPane;

function SkillsTab(props) {

    
   return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Skills`} key="1">
                        <div >
                        <Library/>
                        
                        </div>
                    </TabPane>
                    <TabPane tab={`Certifications`} key="2">
                        <div > 
                            <Certification />
                        </div>
                    </TabPane>
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}



export default SkillsTab;