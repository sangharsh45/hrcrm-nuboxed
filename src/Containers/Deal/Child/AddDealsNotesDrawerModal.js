import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../Components/UI/Antd";
import LinkedDealNotes from "./DealDetail/LinkedDealNotes";

class AddDealsNotesDrawerModal extends Component {
  render() {
     

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.currentItem.opportunityName}
          width="64%"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerDealsNotesModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleDealsNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <LinkedDealNotes currentItem={this.props.currentItem} 
            invOpportunityId={this.props.currentItem.invOpportunityId} 
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDealsNotesDrawerModal);
