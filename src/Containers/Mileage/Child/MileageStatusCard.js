import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { StyledLabel } from '../../../Components/UI/Elements'
import { StyledTable,StyledPopconfirm } from "../../../Components/UI/Antd";
import { getMileageByUserId,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
import { CurrencySymbol } from "../../../Components/Common";
import styled from 'styled-components'
import { FlexContainer,OnlyWrapCard } from '../../../Components/UI/Layout'
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined,UpCircleOutlined } from "@ant-design/icons";
import MileageVoucherIdDrawer from "./MileageVoucherIdDrawer";
import MileagePendingStatusCard from "./MileagePendingStatusCard";
import MileageApprovedStatusCard from "./MileageApprovedStatusCard";
import MileageRejectedStatusCard from "./MileageRejectedStatusCard";

function MileageStatusCard(props) {
 
    return (
      <>
       <div className="flex justify-arround">
        <div className="w-[28rem]">
          <MileagePendingStatusCard/>
        </div>
        <div className="w-[28rem]">
          <MileageApprovedStatusCard/>
        </div>
        <div className="w-[28rem]">
          <MileageRejectedStatusCard/>
        </div>
       </div>

       
      </>
    );
  }

  const mapStateToProps = ({ auth, mileage }) => ({
    userId: auth.userDetails.userId,
    MileageDat: mileage.MileageDat,
    fetchingMileageByUserId: mileage.fetchingMileageByUserId,
    fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
    mileageVoucherIdDrawer:mileage.mileageVoucherIdDrawer,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getMileageByUserId,
        deleteMileageVoucher,
        handleMileageVoucherIdDrwer
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(MileageStatusCard);

