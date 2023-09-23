import React, { Component, Suspense, lazy } from "react";
import NotificationSetting from "./Notification/NotificationSetting";
const AddRecruitmentDrawerModal = lazy(() => import( "../Settings/Recruitement/Child/RecruitmentTab/AddRecruitmentDrawerModal"));
class Settings extends Component {
    render() {
        const {
            addDrawerRecruitmentModal,
            handleRecruitmentDrawerModal,
          } = this.props;
        return (
            <>
                <NotificationSetting />
                <AddRecruitmentDrawerModal
          addDrawerRecruitmentModal={addDrawerRecruitmentModal}
          handleRecruitmentDrawerModal={handleRecruitmentDrawerModal}
        />
            </>
        )
    }
}

export default Settings;