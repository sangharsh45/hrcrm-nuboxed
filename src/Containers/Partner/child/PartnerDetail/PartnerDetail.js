import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPartnerDetailsById } from "../../PartnerAction";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../Components/Placeholder";
import PartnerDetailRight from "./PartnerDetailRight";
import PartnerDetailLeft from "./PartnerDetailLeft";
import PartnerDetailHeader from "./PartnerDetailHeader";

class PartnerDetail extends Component {
  componentDidMount() {
    this.props.getPartnerDetailsById(this.props.match.params.partnerId);
  }
  render() {
    const { partner, fetchingPartnerDetailsById } = this.props;
    return (
      <>
        <>
          <PartnerDetailHeader />
          {fetchingPartnerDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "25%" }}>
                    <PartnerDetailLeft partner={partner} />
                  </div>
                  <div style={{ width: "75%" }}>
                    <PartnerDetailRight partner={partner} />
                  </div>
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ partner }) => ({
  fetchingPartnerDetailsById: partner.fetchingPartnerDetailsById,
  partner: partner.partner,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerDetailsById,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PartnerDetail)
);
