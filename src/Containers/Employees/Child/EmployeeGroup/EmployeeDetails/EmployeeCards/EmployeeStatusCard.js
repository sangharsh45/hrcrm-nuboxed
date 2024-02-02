import React, { Component,lazy } from 'react';
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const EmployeeStatusView = lazy(() => import("./EmployeeStatusView"));
const EmployeeStatusEdit = lazy(() => import("./EmployeeStatusEdit"));

class EmployeeStatusCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <EmployeeStatusView
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                            : <EmployeeStatusEdit
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default EmployeeStatusCard;