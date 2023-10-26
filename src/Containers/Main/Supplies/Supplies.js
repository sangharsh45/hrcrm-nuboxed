import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliesViewType, handleSuppliesModal } from "./SuppliesAction";
import SuppliesHeader from "./SuppliesHeader";
import SuppliesTable from "./SuppliesTable";
import SuppliesDeletedTable from "./SuppliesDeletedTable";
import { BundleLoader } from "../../../Components/Placeholder";




class Supplies extends Component {
    render() {
        const {
            setSuppliesViewType,
            viewType,
            handleSuppliesModal
        } = this.props;
        return (
            <React.Fragment>
                <SuppliesHeader
                    setSuppliesViewType={setSuppliesViewType}
                    viewType={viewType}
                    handleSuppliesModal={handleSuppliesModal}
                />

                <Suspense fallback={<BundleLoader />}>
                    {viewType === "all" ?
                        (
                            <SuppliesTable />
                        ) :
                        // viewType === "grid" ?
                        //     (
                        //         <SuppliesTableByGroup />
                        //     ) :
                        viewType === "dashboard" ?
                            (
                                <SuppliesDeletedTable />
                            ) :
                            null}
                </Suspense>

            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ supplies }) => ({
    viewType: supplies.viewType,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setSuppliesViewType,
            handleSuppliesModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Supplies);
