import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { CurrencySymbol } from "../../../../Components/Common";
class RecruitProJumpStart extends Component {
  
  render() {
    return (
      <div class=" flex flex-col">
        <FlexContainer style={{ width: "100%", marginTop: "0.9375em" }}>
          <JumpStartBox
            //title="# Requirements"
            title={<FormattedMessage
              id="app."
              defaultMessage=""
            />}
            noProgress
            stringValue
            // value={this.props.allRecruitmentByOppId}
            bgColor="#005075"
          // isLoading={this.props.fetchingAllRecruitmentByOppId}
          />
          <CurrencySymbol />
          <JumpStartBox
            // title="# Positions"
            title={<FormattedMessage
              id="app."
              defaultMessage=""
            />}
            noProgress
            stringValue
            // isLoading={this.props.fetchingAllRecruitmentPositionByOppId}
            // value={this.props.allRecruitmentPositionByOppId}
            bgColor="#0073a8"
          />

          <JumpStartBox
            noProgress
            stringValue
            //title="Positions Filled"
            title={<FormattedMessage
              id="app."
              defaultMessage=""
            />}
            // isLoading={this.props.fetchingAllRecruitmentPositionFilledByOppId}
            // value={this.props.allRecruitmentPositionFilledByOppId}
            bgColor="#0093d7"
          />
          <JumpStartBox
            noProgress
            stringValue
            //title="Average Time"
            title={<FormattedMessage
              id="app.averagetime"
              defaultMessage="Average Time"
            />}
            // isLoading={this.props.fetchingAllRecruitmentAvgTimeByOppId}
            // value={this.props.allRecruitmentAvgTimeByOppId}
            bgColor="#24b9fe"
          />
        </FlexContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitProJumpStart);
