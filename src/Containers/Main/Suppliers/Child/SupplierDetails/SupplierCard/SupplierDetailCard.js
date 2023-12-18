import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import SupplierDetailView from "./SupplierDetailView";
import SupplierViewDataEdit from "./SupplierViewDataEdit";

class SupplierDetailCard extends Component {
    render() {
        const { supplier } = this.props;
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <SupplierDetailView supplier={supplier}
                                toggleViewType={toggleViewType}
                            />
                        ) : (
                                <SupplierViewDataEdit
                                supplier={supplier}
                                    toggleViewType={toggleViewType}
                                />
                            )
                    }

                </ViewEditCard>
            </div>
        );
    }
}

export default SupplierDetailCard;
