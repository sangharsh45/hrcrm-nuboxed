import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
//import { BorderBox } from "../../../../Components/UI/Layout";
 import {getNotesListByTaskId } from "../TaskAction";

 import NoteFile from "./NoteFile";
import { BundleLoader } from "../../../Components/Placeholder";
import SingleNote from "./SingleNote";

class NotesForm extends Component {
  componentDidMount() {
    this.props.getNotesListByTaskId(this.props.data1.taskId);
  }

  render() {
    const { fetchingNotesListByTaskId, notesListByTaskId } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteFile
            type={"task"}
            taskId={this.props.data1.taskId}
            callback={() =>
              this.props.getNotesListByTaskId(this.props.data1.taskId)
            }
          />
        </div>
        <br />

        <div class="border-spacing-2 rounded-md shadow-2xl mb-1 mt-9">
          <div style={{ height: 200, overflow: "auto", padding: "1rem" }}>
            {fetchingNotesListByTaskId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByTaskId &&
                    notesListByTaskId.map((item, index) => (
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

const mapStateToProps = ({ auth, task }) => ({
   userId: auth.userDetails.userId,
   notesListByTaskId: task.notesListByTaskId,
   fetchingNotesListByTaskId: task.fetchingNotesListByTaskId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getNotesListByTaskId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);