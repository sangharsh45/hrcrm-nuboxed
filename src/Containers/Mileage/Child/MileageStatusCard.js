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
      <div className="flex justify-arround max-sm:flex-col max-sm:overflow-x-auto h-[34rem]">
        <div className="w-[26rem] max-sm:w-wk">
          <MileagePendingStatusCard/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <MileageApprovedStatusCard/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
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

