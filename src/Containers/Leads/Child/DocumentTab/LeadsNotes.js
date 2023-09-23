import React, { Component,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getNotesListByLeadsId } from "../../LeadsAction";
import { SingleNote } from "../../../../Components/Common";
import LeadsNoteForm from "./LeadsNoteForm";


class LeadsNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByLeadsId(this.props.leadsId);
  }

  render() {
    const { fetchingNotesListByLeadsId,
          notesListByLeadsId 
        } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <LeadsNoteForm
            type={"lead"}
            leadsId={this.props.leadsId}
            callback={() =>
              this.props.getNotesListByLeadsId(this.props.leadsId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
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
        </BorderBox>
      </>
    );
  }
}

const mapStateToProps = ({ auth, leads }) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadsNotes);
