import React, { lazy, Suspense, Component } from "react";
import { Button, Icon } from "antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Spacer } from "../../../../Components/UI/Elements";
const VoIPForm = lazy(() => import("./VoIPForm"));
const EmailForm = lazy(() => import("../../Email/Child/EmailForm"));

class AddIntegrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currrentForm: "voip"
    };
  }
  render() {
    const {
      addIntegrationModal,
      handleIntegrationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledModal
          //title="Integration"
          title={<FormattedMessage
            id="app.integration"
            defaultMessage="Integration"
          />}
          width="36vw"
          height="30vh"
          visible={addIntegrationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleIntegrationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <FlexContainer justifyContent="center">
              <Button.Group size="large">
                <Button
                  type="default"
                  className="voip"
                  onClick={() => this.setState({ currrentForm: "voip" })}
                >
                  <Icon type="customer-service" />
                  VoIP
                </Button>
                <Button
                  type="default"
                  className="voip"
                  onClick={() => this.setState({ currrentForm: "email" })}
                >
                  Email
                  <Icon type="mail" />
                </Button>
              </Button.Group>
            </FlexContainer>
            <Spacer />
            {this.state.currrentForm === "voip" && <VoIPForm {...formProps} />}
            {this.state.currrentForm === "email" && (
              <EmailForm {...formProps} />
            )}
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddIntegrationModal;
