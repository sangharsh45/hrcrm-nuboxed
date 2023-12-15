import { Switch } from 'antd'
import React, { useState } from 'react'
import AddPhoneExcel from './AddPhoneExcel'
import AddCatalogueForm from './AddCatalogueForm'

const AccountOrderSecondStep = (props) => {

    const [toggle, setToggle] = useState(true)
    const handleChange = () => {
        setToggle(!toggle)
    }
    return (
        <div>
            <div>
                <Switch
                    checked={toggle}
                    checkedChildren="Catalogue"
                    unCheckedChildren="Non-Catalogue"
                    onChange={handleChange}
                />
            </div>
            <div>
                {toggle ?
                    <AddCatalogueForm toggle={toggle} distributorId={props.distributorId} /> :
                    <AddPhoneExcel toggle={toggle} distributorId={props.distributorId} />
                }
            </div>

        </div>
    )
}
export default AccountOrderSecondStep
