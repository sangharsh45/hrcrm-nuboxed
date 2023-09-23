import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Switch } from "antd";
import { toggleServer } from "../../Containers/Auth/AuthAction";
class ServerCheckbox extends Component {
    handleToggleServer = (checked) => {
        console.log(checked)
        if (checked === true) {
            console.log(this.props.env)
            this.props.toggleServer('server')
        } else {
            console.log(this.props.env)
            this.props.toggleServer('local')
        }
    }
    render() {
        const { env } = this.props;
        return (
            <>
                <Switch
                    checked={env === 'local' ? false : true}
                    onChange={this.handleToggleServer}
                    checkedChildren="Server"
                    unCheckedChildren="Local"
                />
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    env: auth.env
})

const mapDispatchToProps = dispatch => bindActionCreators({toggleServer}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ServerCheckbox)
