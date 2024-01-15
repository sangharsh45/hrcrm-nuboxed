import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
// const Shift = lazy(() => import("../../../../Shift/Shift"));
const AllocationTable = lazy(() => import("./Allocation/AllocationTable"));

const TabPane = StyledTabs.TabPane;

class PlantDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      value: 1,
    };
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  handleOrderCreateClick = (data) => {
    this.setState({ breadCumb: data });
  };
  handleTabChange = (key) => this.setState({ activeKey: key });

  render() {
    const { activeKey } = this.state;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            {/* <TabPane
              tab={
                <>
                  <i class="fas fa-user-clock"></i>&nbsp;Shift
                </>
              }
              key="1"
            >
              {" "}
              <Suspense fallback={"Loading..."}>
                <Shift />
              </Suspense>
            </TabPane> */}

            <TabPane
              tab={
                <>
                  <i class="fas fa-thumbtack"></i>&nbsp;Allocation
                </>
              }
              key="3"
            >
              {" "}
              <Suspense fallback={"Loading..."}>
                <AllocationTable />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      </>
    );
  }
}
const mapStateToProps = ({ plant, auth }) => ({
  //   addPlantSubscriptionConfigureModal: Plant.addPlantSubscriptionConfigureModal,
  //   addLinkOrderConfigureModal: Plant.addLinkOrderConfigureModal,
  //   orderForGenerating: Plant.orderForGenerating,
  //   PlantId: Plant.currentPlant.PlantId,
  //   userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   handleLinkOrderConfigureModal,
      //   handlePlantSubscriptionConfigureModal,
      //   generateOrderByPlantId,
      //   getPlantOrderByPlantId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetailTab);
