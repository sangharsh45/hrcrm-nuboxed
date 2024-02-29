import React, {Suspense,lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import {handlePitchActivityModal} from "../PitchAction"
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
const PitchTimeline =lazy(()=>import("../../Pitch/Child/PitchTimeline"));
const AddPitchActivityModal =lazy(()=>import("./PtchActivity/AddPitchActivityModal"));

const TabPane = StyledTabs.TabPane;

function  OpenASSimodal(props)  {
console.log("data",props.rowdata.name)
  return (
    <>
      <StyledDrawer
        title={props.rowdata.firstName}
        width="60%"
        visible={props.openASSImodal}
        onClose={() => {
          props.handleAssimodal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <PitchCETTab rowdata={props.rowdata}/>
        </Suspense>
      </StyledDrawer>
    </>
  );

 function PitchCETTab () {
  const { addPitchactivityModal, handlePitchActivityModal } = props;
    const { ...formProps } = props;
    console.log(props.rowdata)
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
                <>
                  <span>
                    
                       <i class="fas fa-phone-square"></i>&nbsp;
                       <FormattedMessage
                        id="app.activity"
                        defaultMessage="Activity"
                      />
                  
                  </span>
                
                    <>
                      <Tooltip 
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                       
                        <PlusOutlined
                          type="plus"
                          
                          tooltiptitle={
                            <FormattedMessage
                              id="app.Create"
                              defaultMessage="Create"
                            />
                          }
                          onClick={() => {
                            handlePitchActivityModal(true);
                          }}
                          size="0.875em"
                        />
                       
                      </Tooltip>
                    </>
                 
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <PitchTimeline
                  rowdata={props.rowdata}
                />
                {/* <LeadsActivityTab 
                 rowdata={props.rowdata}
                /> */}
              </Suspense>
            </TabPane>
          
          </StyledTabs>
        </TabsWrapper>
        <AddPitchActivityModal
        rowdata={props.rowdata}
        addPitchactivityModal={addPitchactivityModal}
        handlePitchActivityModal={handlePitchActivityModal}
        />
      </>
    );
}

};

const mapStateToProps = ({ pitch }) => ({
  addPitchactivityModal: pitch.addPitchactivityModal,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handlePitchActivityModal
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpenASSimodal);


