import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const EmployeeOverviewView = lazy(() => import("./EmployeeOverviewView"));
const EmployeeOverviewEdit = lazy(() => import("./EmployeeOverviewEdit"));

class ProfileOverviewCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee);
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <EmployeeOverviewView
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                        ) : (
                                <EmployeeOverviewEdit
                                    singleEmployee={singleEmployee}
                                    toggleViewType={toggleViewType}
                                />
                            )
                    }
                </ViewEditCard>
            </div>
        );
    }
}

export default ProfileOverviewCard;
