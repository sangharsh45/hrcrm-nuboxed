import React, { Component,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getNotesListByInvestorId } from "../../../../InvestorAction";
import { SingleNote } from "../../../../../../Components/Common";
const NoteForm =lazy(()=> import("./NoteForm"));

class InvestorLinkedNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByInvestorId(this.props.investorDetails.investorId);
  }

  render() {
    const { fetchingNoteByInvestorId, investorNoteslist } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteForm
            type={"customer"}
          investorId={this.props.investorDetails.investorId}
            callback={() =>
              this.props.getNotesListByInvestorId(this.props.investorDetails.investorId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
            {fetchingNoteByInvestorId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {investorNoteslist &&
                    investorNoteslist.map((item, index) => (
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

const mapStateToProps = ({ auth,investor,customer }) => ({
  userId: auth.userDetails.userId,
  fetchingNoteByInvestorId: investor.fetchingNoteByInvestorId,
  investorNoteslist:investor.investorNoteslist
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByInvestorId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorLinkedNotes);
