import React, { Component,lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const ItemTask = lazy(() =>
  import("../ItemTask/ItemTask")
);

const TabPane = StyledTabs.TabPane;

class OrderTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "0",
      value: 1,
    };
  }



  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
      case "0":
        return       <ItemTask />;

      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
           <div class="flex flex-nowrap" >
          <div class ="w-[70%]" >
            <TabsWrapper>
            <StyledTabs
                defaultActiveKey={activeKey}
                onChange={this.handleTabChange}
              >
                <TabPane
                  tab={
                    <>
                      <MonetizationOnIcon />
                      <span class=" ml-1" >
                      Item task
                      </span>
                    </>
                  }
                  key="0"
                >
             
                </TabPane>
               
             
              </StyledTabs>
              <Suspense fallback={<div>Loading...</div>}>
                {this.renderTabContent(activeKey)}
              </Suspense>
            </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderTab);






// import React, { Component,lazy, Suspense } from "react";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../Components/UI/Layout";
// import { connect } from "react-redux";
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// const ItemTask = lazy(() =>
//   import("../ItemTask/ItemTask")
// );

// const TabPane = StyledTabs.TabPane;

// class OrderTab extends Component {
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
//            <div class="flex flex-nowrap" >
//           <div class ="w-[70%]" >
//             <TabsWrapper>
//               <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
//                 <TabPane
//                   tab={
//                     <>
//                       <MonetizationOnIcon />
//                       <span class=" ml-1" >
//                       Item task
//                       </span>
//                     </>
//                   }
//                   key="0"
//                 >
//                   <Suspense>
//                     <ItemTask />
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

// export default connect(mapStateToProps, mapDispatchToProps)(OrderTab);
