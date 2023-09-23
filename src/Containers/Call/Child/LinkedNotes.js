import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
import { SingleNote } from "../../../Components/Common";
import { getNotesListByCallId } from "../CallAction";
import NoteForm from "../../Note/NoteForm";
class LinkedNotes extends Component {
  // componentDidMount() {
  //   const { setEditingNote, getNotesListByCallId } = this.props;
  //   console.log(setEditingNote);
  //   getNotesListByCallId(setEditingNote.callId);
  // }
  render() {
    const {
      fetchingNotesListByCallId,
      notesListByCallId,
      userId,
      setEditingNote,
    } = this.props;
    console.log(setEditingNote);
    console.log(notesListByCallId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc" }}>
          <NoteForm
            callId={setEditingNote.callId}
            callback={() =>
              this.props.getNotesListByCallId(setEditingNote.callId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNotesListByCallId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByCallId &&
                    notesListByCallId.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleNote {...item} userId={userId} />
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

const mapStateToProps = ({ auth, call }) => ({
  userId: auth.userDetails.userId,
  setEditingNote: call.setEditingNote,
  call: call.call,
  notesListByCallId: call.notesListByCallId,
  fetchingNotesListByCallId: call.fetchingNotesListByCallId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getNotesListByCallId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LinkedNotes);
