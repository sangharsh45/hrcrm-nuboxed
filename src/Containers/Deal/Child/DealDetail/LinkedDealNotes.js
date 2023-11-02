import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getNotesListByContactId } from "../../../Contact/ContactAction";

import { SingleNote } from "../../../../Components/Common";
import NoteDealForm from "./NoteDealForm";

class LinkedDealNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByContactId(this.props.invOpportunityId);
  }

  render() {
    const { fetchingNotesListByContactId, notesListByContactId } = this.props;
    console.log("data5", this.props.invOpportunityId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteDealForm
            type={"contact"}
            invOpportunityId={this.props.invOpportunityId}
            callback={() =>
              this.props.getNotesListByContactId(this.props.invOpportunityId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div 
           style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByContactId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByContactId &&
                    notesListByContactId.map((item, index) => (
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

const mapStateToProps = ({ auth, contact,contactinvest }) => ({
  userId: auth.userDetails.userId,
  notesListByContactId: contact.notesListByContactId,
  fetchingNotesListByContactId: contact.fetchingNotesListByContactId,
  contactId: contactinvest.contactInVestDetail.contactId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByContactId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDealNotes);
