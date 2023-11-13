import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getNotesListByDealId } from "../../DealAction";

import NoteDealForm from "./NoteDealForm";
import SingleNote from "./SingleNote";

class LinkedDealNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByDealId(this.props.invOpportunityId);
  }

  render() {
    const { fetchingNotesListByDealId, notesListByDealId } = this.props;
    console.log("data5", this.props.invOpportunityId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteDealForm
            type={"deals"}
            invOpportunityId={this.props.invOpportunityId}
            callback={() =>
              this.props.getNotesListByDealId(this.props.invOpportunityId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div 
           style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByDealId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByDealId &&
                    notesListByDealId.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleNote {...item} userId={this.props.userId} />
                      </Timeline.Item>
                    ))}
                </Timeline>
              )}
          </div>
        </BorderBox>
      </>
    );
  }
}

const mapStateToProps = ({ auth, contact,deal,contactinvest }) => ({
  userId: auth.userDetails.userId,
  notesListByDealId: deal.notesListByDealId,
  fetchingNotesListByDealId: deal.fetchingNotesListByDealId,
  contactId: contactinvest.contactInVestDetail.contactId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByDealId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDealNotes);
