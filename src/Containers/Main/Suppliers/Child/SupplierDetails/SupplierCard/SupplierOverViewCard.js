import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import SupplierOverViewView from "./SupplierOverViewView";


class SupplierOverViewCard extends Component {
    render() {
        const { supplier } = this.props;
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <SupplierOverViewView
                            supplier={supplier}
                            />
                        ) : null
                    }
                </ViewEditCard>
            </div>
        );
    }
}

export default SupplierOverViewCard;
