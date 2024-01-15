import React, { Component, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import Event from "../Event/Event";
import Task from "../Task/Task";
const TabPane = StyledTabs.TabPane;

class CategoryActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      value: 1,
    };
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    return (
      <>
    <div class="flex flex-nowrap" >
        <div style= {{width:"70%"}}>
          <TabsWrapper>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
           
              <TabPane
                tab={
                  <>
                   <i class="far fa-calendar-check"></i>
                    <span class=" ml-[0.25em]" >Event</span>
                  </>
                }
                key="1"
              >
                <Suspense>
                  <Event />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span class=" ml-[0.25em]">Task</span>
                  </>
                }
                key="2"
              >
                <Suspense>
                  <Task />
                </Suspense>
              </TabPane>

              {/* <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span style={{ marginLeft: "0.25em" }}>Unit</span>
                  </>
                }
                key="3"
              >
                <Suspense>
                  <Unit />
                </Suspense>
              </TabPane> */}
              {/* <TabPane
                tab={
                  <>
                  <i class="fas fa-tasks"></i>
                    <span style={{ marginLeft: "0.25em" }}>Project</span>
                  </>
                }
                key="4"
              >
                <Suspense>
                  <Project />
                </Suspense>
              </TabPane> */}

          
            </StyledTabs>
          </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryActivity);
