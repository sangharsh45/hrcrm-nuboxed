import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Switch } from "antd";
import { SubTitle } from "../../../../Components/UI/Elements";

class NotificationRow extends Component {
    render() {
        const { label, enabled, onChange } = this.props;
        return (
            <div class=" flex flex-no-wrap mb-[10px]" >
                <SubTitle style={{ flexBasis: '30%' }}>{label || ''}</SubTitle>
                <Switch
                    checked={enabled || false}
                    onChange={onChange || null}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                />
            </div>
        );
    }
}
NotificationRow.propTypes = {
    label: PropTypes.string,
    enabled: PropTypes.bool,
    onChange: PropTypes.func,
}
export default NotificationRow;