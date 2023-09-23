import TabPane from "antd/lib/tabs/TabPane";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Suspense, useState } from "react";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import QuestionsGroup from "./AssessmentDetailsRight/Questions/QuestionsGroup";
import { handleQuestionrModal } from "../../../AccessmentAction";
import { Form } from "formik";

function AssessmentDetailsRight(props) {
  const { assessment,assessmentByAssessmentId } = props;
const assessmentId=props.assessmentByAssessmentId.assessmentId;
console.log("Ass1",assessmentId);
  const { activeKey, setState } = props;
  function handleTabChange(key) {
    setState({ activeKey: key });
  }
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane
            tab={
              <>
                <span>
                  <FormattedMessage
                    id="app.questions"
                    defaultMessage="Questions"
                  />
                </span>
              </>
            }
            key="1"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              <>
                <Form className="form-background">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "70vh",
                      overflow: "scroll",
                      paddingRight: "0.6em",
                    }}
                  >
                    <QuestionsGroup assessmentId={assessmentId} />
                  </div>
                </Form>
              </>
            </Suspense>
          </TabPane>
        </StyledTabs>
      </TabsWrapper>
      <Suspense fallback={null}></Suspense>
    </>
  );
}
const mapStateToProps = ({ assessment }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleQuestionrModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssessmentDetailsRight);
