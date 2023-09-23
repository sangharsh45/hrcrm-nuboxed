import React, { Component } from 'react';
import { Checkbox } from 'antd';

class Check extends React.Component {
    state = {
        checked: true,
        disabled: false,
    };

    toggleChecked = () => {
        this.setState({ checked: !this.state.checked });
    }

    toggleDisable = () => {
        this.setState({ disabled: !this.state.disabled });
    }

    onChange = (e) => {
        console.log('checked = ', e.target.checked);
        this.setState({
            checked: e.target.checked,
        });
    }
    render() {
        const { label } = this.props;
        return (
            <div>
                <Checkbox
                    checked={this.state.checked}
                    disabled={this.state.disabled}
                    onChange={this.onChange}
                >
                    {label || ''}
                </Checkbox>
            </div>
        );
    }
}
export default Check;