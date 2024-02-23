import React from 'react'
import AddPhoneExcel from './AddPhoneExcel'

const AccountOrderSecondStep = (props) => {

    return (
        <>
            <div>
                <AddPhoneExcel distributorId={props.distributorId} />
            </div>

        </>
    )
}
export default AccountOrderSecondStep
