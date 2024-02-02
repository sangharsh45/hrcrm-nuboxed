import React, { Component,lazy } from 'react';
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const EmployeePersonalView = lazy(() => import("./EmployeePersonalView"));
const EmployeePersonalEdit = lazy(() => import("./EmployeePersonalEdit"));

class EmployeePersonalCard extends Component {
    render() {
        const { singleEmployee } = this.props;
        console.log(singleEmployee)
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ? <EmployeePersonalView
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                            : <EmployeePersonalEdit
                                singleEmployee={singleEmployee}
                                toggleViewType={toggleViewType}
                            />
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

export default EmployeePersonalCard;