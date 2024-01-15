
import React, {Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from '../../Components/Placeholder';

const ProcurementTab=lazy(()=>import('./Child/ProcurementTab'));
const ProcurementHeader=lazy(()=>import("./Child/ProcurementHeader"));

function Procurement (props) {
  const {

  } = props;
        return (
            <React.Fragment>
<ProcurementHeader/>
          <Suspense fallback={<BundleLoader />}>     <ProcurementTab/></Suspense>
     
            </React.Fragment>
        )
}

const mapStateToProps = ({}) => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Procurement);