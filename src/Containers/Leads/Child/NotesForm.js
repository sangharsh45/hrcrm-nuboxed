import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Timeline } from "antd";
//import { BorderBox } from "../../../../Components/UI/Layout";
import { getNotesListByLeadsId } from "../LeadsAction";

 import NoteFile from "./NoteFile";
import { BundleLoader } from "../../../Components/Placeholder";
import SingleNote from "./SingleNote";
import { FormattedMessage } from "react-intl";

class NotesForm extends Component {
  componentDidMount() {
     this.props.getNotesListByLeadsId(this.props.rowdata.leadsId);
  }

  render() {
    const { fetchingNotesListByLeadsId,
        notesListByLeadsId 
      } = this.props;
// console.log(this.props.currentNameId.taskId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteFile
            type={"lead"}
            leadsId={this.props.rowdata.leadsId}
            callback={() =>
               this.props.getNotesListByLeadsId(this.props.rowdata.leadsId)
            }
          />
        </div>
      
        <br />

        <div class="border-spacing-2 rounded-md shadow-2xl mb-1 mt-9">
          <div style={{ height:"41vh", overflow: "auto", padding: "1rem" }}>
            {fetchingNotesListByLeadsId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByLeadsId &&
                    notesListByLeadsId.map((item, index) => (
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

const mapStateToProps = ({ auth, task,leads,call }) => ({
    userId: auth.userDetails.userId,
    notesListByLeadsId: leads.notesListByLeadsId,
    fetchingNotesListByLeadsId: leads.fetchingNotesListByLeadsId,
    leadsId: leads.lead.leadsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getNotesListByLeadsId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);