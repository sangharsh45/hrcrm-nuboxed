// import React, { Component, Suspense,lazy } from "react";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../Components/UI/Layout";
// import { connect } from "react-redux";
// const Event = lazy(() =>
//   import("../Event/Event")
// );
// const Task = lazy(() =>
//   import("../Task/Task")
// );
// const TabPane = StyledTabs.TabPane;

// class CategoryActivity extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeKey: "1",
//       value: 1,
//     };
//   }
//   onChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   handleTabChange = (key) => this.setState({ activeKey: key });
//   render() {
//     return (
//       <>
//     <div class="flex flex-nowrap" >
//         <div style= {{width:"70%"}}>
//           <TabsWrapper>
//             <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
           
//               <TabPane
//                 tab={
//                   <>
//                    <i class="far fa-calendar-check"></i>
//                     <span class=" ml-[0.25em]" >Event</span>
//                   </>
//                 }
//                 key="1"
//               >
//                 <Suspense>
//                   <Event />
//                 </Suspense>
//               </TabPane>

//               <TabPane
//                 tab={
//                   <>
//                   <i class="fas fa-tasks"></i>
//                     <span class=" ml-[0.25em]">Task</span>
//                   </>
//                 }
//                 key="2"
//               >
//                 <Suspense>
//                   <Task />
//                 </Suspense>
//               </TabPane>

//               {/* <TabPane
//                 tab={
//                   <>
//                   <i class="fas fa-tasks"></i>
//                     <span style={{ marginLeft: "0.25em" }}>Unit</span>
//                   </>
//                 }
//                 key="3"
//               >
//                 <Suspense>
//                   <Unit />
//                 </Suspense>
//               </TabPane> */}
//               {/* <TabPane
//                 tab={
//                   <>
//                   <i class="fas fa-tasks"></i>
//                     <span style={{ marginLeft: "0.25em" }}>Project</span>
//                   </>
//                 }
//                 key="4"
//               >
//                 <Suspense>
//                   <Project />
//                 </Suspense>
//               </TabPane> */}

          
//             </StyledTabs>
//           </TabsWrapper>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
// const mapStateToProps = ({}) => ({});
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(CategoryActivity);


import React, { Component, Suspense, lazy } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
const Event = lazy(() => import("../Event/Event"));
const Task = lazy(() => import("../Task/Task"));
const TabPane = StyledTabs.TabPane;

class CategoryActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
      case "1":
        return <Event />;
      case "2":
        return <Task />;
      default:
        return null;
    }
  };

  render() {
    const { activeKey } = this.state;

    return (
      <div className="flex flex-nowrap">
        <div style={{ width: "70%" }}>
          <TabsWrapper>
            <StyledTabs
              defaultActiveKey={activeKey}
              onChange={this.handleTabChange}
            >
              <TabPane
                tab={
                  <>
                    <i className="far fa-calendar-check"></i>
                    <span className="ml-[0.25em]">Event</span>
                  </>
                }
                key="1"
              />
              <TabPane
                tab={
                  <>
                    <i className="fas fa-tasks"></i>
                    <span className="ml-[0.25em]">Task</span>
                  </>
                }
                key="2"
              />
            </StyledTabs>
            <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
              {this.renderTabContent(activeKey)}
            </Suspense>
          </TabsWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryActivity);
