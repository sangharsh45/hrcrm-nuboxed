import React, { Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";


function Pitch (props) {


        return (
            <React.Fragment>
                <h1>Hii Pitch</h1>
            </React.Fragment>
        )
}

const mapStateToProps = ({  }) => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Pitch);