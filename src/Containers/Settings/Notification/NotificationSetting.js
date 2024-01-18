import React, { Component, lazy } from 'react';
const NotificationTab = lazy(() => import('./NotificationTab'))

class NotificationSetting extends Component {
    render() {
        return (
            <>
                <NotificationTab />
            </>
        );
    }
}

export default NotificationSetting;