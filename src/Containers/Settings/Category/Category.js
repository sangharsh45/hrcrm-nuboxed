// import React, { Component, lazy, Suspense } from "react";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../Components/UI/Layout";
// import { connect } from "react-redux";
// import AccessibilityIcon from '@mui/icons-material/Accessibility';
// const Designation = lazy(() =>
//   import("../Designation/Designation")
// );
// const Department = lazy(() =>
//   import("../Department/Department")
// );
// const Role = lazy(() =>
//   import("./Role/Role")
// );
// const RoleTalent = lazy(() =>
//   import("./Role/RoleTalent")
// );
// const TabPane = StyledTabs.TabPane;

// class Category extends Component {
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
//         <div flexWrap="nowrap">
//           <div class=" w-full">
//             <TabsWrapper>
//               <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
//                 {/* <TabPane
//                   tab={
//                     <>
//                     <FactoryIcon  />
//                       <span style={{ marginLeft: "0.25em" }}>
//                         Sector
//                       </span>
//                     </>
//                   }
//                   key="0"
//                 >
//                   <Suspense>
//                     <Sector />
//                   </Suspense>
//                 </TabPane> */}
//                 <TabPane
//                   tab={
//                     <>
//                       <i class="fas fa-building"></i>
//                       <span class=" ml-[0.25em]"
//                        >Department</span>
//                     </>
//                   }
//                   key="4"
//                 >
//                   <Suspense>
//                     <Department />
//                   </Suspense>
//                 </TabPane>

//                 <TabPane
//                   tab={
//                     <>
//                       <AccessibilityIcon
//                       // icon={solid("user-tie")}
//                       />

//                       <span class=" ml-[0.25em]"
//                        >Role (Internal)</span>
//                     </>
//                   }
//                   key="5"
//                 >
//                   <Suspense>
//                     <Role />
//                   </Suspense>
//                 </TabPane>
//                 <TabPane
//                   tab={
//                     <>
//                       <AccessibilityIcon
//                       // icon={solid("user-tie")}
//                       />

//                       <span class=" ml-[0.25em]">Role (External)</span>
//                     </>
//                   }
//                   key="6"
//                 >
//                   <Suspense>
//                     <RoleTalent />
//                   </Suspense>
//                 </TabPane>
//                 <TabPane
//                   tab={
//                     <>
//                       <i class="fab fa-artstation"></i>
//                       <span
//                        class=" ml-[0.25em]" >Designation</span>
//                     </>
//                   }
//                   key="7"
//                 >
//                   <Suspense>
//                     <Designation />
//                   </Suspense>
//                 </TabPane>

//               </StyledTabs>
//             </TabsWrapper>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ }) => ({});
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Category);


import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import AccessibilityIcon from '@mui/icons-material/Accessibility';

const Designation = lazy(() => import("../Designation/Designation"));
const Department = lazy(() => import("../Department/Department"));
const Role = lazy(() => import("./Role/Role"));
const RoleTalent = lazy(() => import("./Role/RoleTalent"));
const TabPane = StyledTabs.TabPane;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "4", 
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
      case "4":
        return <Department />;
      case "5":
        return <Role />;
      case "6":
        return <RoleTalent />;
      case "7":
        return <Designation />;
      default:
        return null;
    }
  };

  render() {
    const { activeKey } = this.state;

    return (
      <>
        <div flexWrap="nowrap">
          <div className="w-full">
            <TabsWrapper>
              <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <i className="fas fa-building"></i>
                      <span className="ml-[0.25em]">Department</span>
                    </>
                  }
                  key="4"
                />
                <TabPane
                  tab={
                    <>
                      <AccessibilityIcon />
                      <span className="ml-[0.25em]">Role (Internal)</span>
                    </>
                  }
                  key="5"
                />
                <TabPane
                  tab={
                    <>
                      <AccessibilityIcon />
                      <span className="ml-[0.25em]">Role (External)</span>
                    </>
                  }
                  key="6"
                />
                <TabPane
                  tab={
                    <>
                      <i className="fab fa-artstation"></i>
                      <span className="ml-[0.25em]">Designation</span>
                    </>
                  }
                  key="7"
                />
              </StyledTabs>

              <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {this.renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
