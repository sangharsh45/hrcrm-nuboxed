import React, { Component, lazy, Suspense } from "react";
import { Icon } from "antd";
// import { FileOutlined, PlusOutlined} from '@ant-design/icons';
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { ActionIcon } from "../../../../../../../Components/Utils";
import { TabsWrapper } from "../../../../../../../Components/UI/Layout";
// import LinkContactDocumentTable from "../../../../../../Contact/Child/ContactDetail/ContactTab/LinkContactDocumentTable";
import RemarksTable from "../Child/RemarksTable";
// import { handleRemarksModal } from "../../../../../OpportunityAction";
import AddRemarksModal from "../Child/AddRemarksModal";
import { Tooltip } from "antd";
import { FileOutlined, PlusOutlined } from "@ant-design/icons";

const TabPane = StyledTabs.TabPane;

class RecruitmentDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const { handleRemarksModal, addRemarksModal } = this.props;
    console.log(this.props.stageList);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>Remarks</span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip //title="Tag Remarks"
                        title={<FormattedMessage
                          id="app.tagremarks"
                          defaultMessage="Tag Remarks"
                        />}
                      >
                        <PlusOutlined
                          type="plus"
                          //tooltipTitle="Tag Remarks"
                          tooltiptitle={<FormattedMessage
                            id="app.tagremarks"
                            defaultMessage="Tag Remarks"
                          />}
                          // handleIconClick={() => handleRemarksModal(true)}
                          size="0.875em"
                          style={{ marginLeft: 10, verticalAlign: "center" }}
                        />

                        {/* <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                        handleRemarksModal={handleRemarksModal}
                        stageList={this.props.stageList}
                        profileId={this.props.profileId}
                      /> */}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <RemarksTable profileId={this.props.profileId} />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <FileOutlined type="file" />
                    {/* <FileOutlined /> */}
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                    {/* Documents */}
                  </span>
                  {activeKey === "3" && (
                    <>
                      <Tooltip //title="Tag Document"
                        title={<FormattedMessage
                          id="app.tagdocument"
                          defaultMessage="Tag Document"
                        />}
                      >
                        <PlusOutlined
                          type="plus"
                          // tooltipTitle="Tag Document"
                          tooltiptitle={<FormattedMessage
                            id="app.tagdocument"
                            defaultMessage="Tag Document"
                          />}
                          // handleIconClick={() =>
                          //   handleDocumentUploadModal(true)
                          // }
                          size="1em"
                          style={{ marginLeft: 10, verticalAlign: "center" }}
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="3"
            >
              {/* <DocumentUploadModal /> */}

              <Suspense fallback={"Loading ..."}>
                {/* <LinkContactDocumentTable contact={this.props.contact} /> */}
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      </>
    );
  }
}
const mappropsToProps = ({ opportunity }) => ({
  // addRemarksModal: opportunity.addRemarksModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // handleRemarksModal,
    },
    dispatch
  );

export default connect(
  mappropsToProps,
  mapDispatchToProps
)(RecruitmentDetailsTab);
