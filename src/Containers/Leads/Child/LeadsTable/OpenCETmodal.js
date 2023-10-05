import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";

const CallForm = lazy(() =>
  import("../../../Call/Child/CallForm")
);
const EventForm = lazy(() =>
  import("../../../Event/Child/EventForm")
);
const TaskForm = lazy(() =>
  import("../../../Task/Child/TaskForm")
);

const TabPane = StyledTabs.TabPane;

function  OpenCETmodal(props)  {

  return (
    <>
      <StyledDrawer
        title={"All"}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.openCETmodal}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => {
          props.handleCETmodal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsCETTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );

 function LeadsCETTab () {

    const { ...formProps } = props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            style={{ overflow: "visible", width: "53vw", padding: "15px" }}
            animated={false}
          >
            <TabPane
              tab={
                <span>
                 <i class="fas fa-phone-square"></i>&nbsp;
                  Calls
                </span>
              }
              key="1"
            >
              <Suspense fallback={"loading ..."}>
                <CallForm {...formProps} />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="fas fa-tasks"></i>&nbsp;
                  Events
                </span>
              }
              key="2"
            >
              <Suspense fallback={"loading ..."}>
                <EventForm {...formProps}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="far fa-calendar-check"></i>&nbsp;
                  Tasks
                </span>
              }
              key="3"
            >
              <Suspense fallback={"loading ..."}>
                <TaskForm {...formProps}/>
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      </>
    );
}

};

const mapStateToProps = ({  }) => ({


});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpenCETmodal);


