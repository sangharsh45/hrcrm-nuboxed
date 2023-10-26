import React, { Component } from "react";
import { Tabs } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import DashboardChart2 from "./DashboardChart2";

const TabPane = Tabs.TabPane;

class ChartTab2 extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            {
                title: "Dashboard Chart2",
                content: <DashboardChart2 />,
                key: "1"
            },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    };

    render() {
        return (
            <TabsWrapper style={{ height: "230px" }}>
                <StyledTabs
                    size={"small"}
                    animated={true}
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                >
                    {this.state.panes.map((pane) => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    ))}
                </StyledTabs>
            </TabsWrapper>
        );
    }
}

export default ChartTab2;
