import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Timeline } from "antd";
//import { BorderBox } from "../../../../Components/UI/Layout";
  import {getNotesListByCallId } from "../CallAction";

 import NoteFile from "./NoteFile";
import { BundleLoader } from "../../../Components/Placeholder";
import SingleNote from "./SingleNote";
import { FormattedMessage } from "react-intl";

class NotesForm extends Component {
  componentDidMount() {
     this.props.getNotesListByCallId(this.props.currentNameId.callId);
  }

  render() {
    const { fetchingNotesListByCallId, notesListByCallId } = this.props;
// console.log(this.props.currentNameId.taskId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteFile
            type={"task"}
            callId={this.props.currentNameId.callId}
            callback={() =>
               this.props.getNotesListByCallId(this.props.currentNameId.callId)
            }
          />
        </div>
      
        <br />

        <div class="border-spacing-2 rounded-md shadow-2xl mb-1 mt-9">
          <div style={{ height: 200, overflow: "auto", padding: "1rem" }}>
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
                        <SingleNote {...item} userId={this.props.userId} />
                      </Timeline.Item>
                    ))}
                </Timeline>
              )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, task,call }) => ({
   userId: auth.userDetails.userId,
   notesListByCallId: call.notesListByCallId,
   fetchingNotesListByCallId: call.fetchingNotesListByCallId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getNotesListByCallId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);