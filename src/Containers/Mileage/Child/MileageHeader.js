import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const MileageActionLeft=lazy(()=>import("./MileageActionLeft"));
const MileageActionRight=lazy(()=>import("./MileageActionRight"));

class MileageHeader extends Component {
    render() {
        const {
            //   handleOpportunityModal,
              viewType,
              setMileageViewType,
        } = this.props;
        return (
            <>
                <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
                    <ActionHeader
                        leftComponent={
                            <MileageActionLeft
                            viewType={viewType}
                            setMileageViewType={setMileageViewType}
                          
                            />
                        }
                        rightComponent={
                            <MileageActionRight
                            //   handleOpportunityModal={handleOpportunityModal}
                            />
                        }
                    />
                </div>


            </>

        );
    }
}

export default MileageHeader;
