import React, { Component } from "react";
import { Tabs } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import DashboardChart3 from "./DashboardChart3"

const TabPane = Tabs.TabPane;

class ChartTab3 extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            {
                title: "Dashboard Chart3",
                content: <DashboardChart3 />,
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

export default ChartTab3;
