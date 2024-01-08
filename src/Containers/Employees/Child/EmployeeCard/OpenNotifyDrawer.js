import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
// const AddQuestionForm = lazy(() => import("../../Child/AccessmentTable/AddQuestionsForm"));


class  OpenNotifyDrawer extends Component {
  render() {
    const { openNotifydrwr, handleNotifyDrawer, rowData,...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title={"Notify"}

          width="60%"
          visible={openNotifydrwr}
          closable
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"3rem"}}
          onClose={() => handleNotifyDrawer(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          {/* <AddQuestionForm rowData={rowData}/>{" "} */}Admin tog
        </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default OpenNotifyDrawer;
