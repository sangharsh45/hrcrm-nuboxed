import { Switch } from 'antd'
import React, { useState } from 'react'
import AddPhoneExcel from './AddPhoneExcel'
import AddCatalogueTable from './AddCatalogueTable'

const AccountOrderSecondStep = () => {

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
                    <AddCatalogueTable toggle={toggle} /> :
                    <AddPhoneExcel toggle={toggle} />
                }
            </div>

        </div>
    )
}

export default AccountOrderSecondStep
