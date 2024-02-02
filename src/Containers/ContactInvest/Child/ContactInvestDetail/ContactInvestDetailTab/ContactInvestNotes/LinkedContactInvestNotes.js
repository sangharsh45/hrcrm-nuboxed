import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getNotesListByContactId } from "../../../../../Contact/ContactAction";
import NoteContactInvestForm from "./NoteContactInvestForm";
import { SingleNote } from "../../../../../../Components/Common";

class LinkedContactNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByContactId(this.props.contactiData.contactId);
  }

  render() {
    const { fetchingNotesListByContactId, notesListByContactId } = this.props;
    return (
      <>
        <div class="bg-[#dcdcdc] h-[14.35em]">
          <NoteContactInvestForm
            type={"contact"}
            contactId={this.props.contactiData.contactId}
            callback={() =>
              this.props.getNotesListByContactId(this.props.contactiData.contactId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div class="h-[200] overflow-auto p-[0.3rem]">
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

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContactNotes);
