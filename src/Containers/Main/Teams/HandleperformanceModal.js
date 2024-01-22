import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
const KpiList = lazy(() => import("./KpiList"));



class HandleperformanceModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);
console.log(this.props.rowdata)
    return (
      <div>
        <StyledDrawer
        title="KPI List"
         // title={this.props.customer.name}
          width="60%"
          style={{ marginTop: "3rem" }}
          visible={this.props.addDrawerPerformanceModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleperformanceDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <KpiList 
            rowdata={this.props.rowdata}
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandleperformanceModal);
