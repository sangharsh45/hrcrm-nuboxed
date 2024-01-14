import { Switch } from 'antd'
import React, { useState } from 'react'
import AddPhoneExcel from './AddPhoneExcel'
import AddCatalogueForm from './AddCatalogueForm'

const AccountOrderSecondStep = (props) => {


    return (
        <>
            <div>
                {props.inspectionRequiredInd ?
                    <AddCatalogueForm distributorId={props.distributorId} /> :
                    <AddPhoneExcel distributorId={props.distributorId} />
                }
            </div>

        </>
    )
}
export default AccountOrderSecondStep
