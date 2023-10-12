import React, { Component } from "react";
import { Avatar, Divider, Button, Menu, Dropdown } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from "react-intl";
import { elipsize } from "../../../Helpers/Function/Functions";

import { FlexContainer, MainWrapper } from "../../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
  SubTitle,
} from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import { CurrencySymbol } from "../../../Components/Common";

// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="#">
//         {/* Call */}
//         <FormattedMessage
//           id="app.calls"
//           defaultMessage="Call"
//         />,
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="#">
//         {/* Email */}
//         <FormattedMessage
//           id="app.email"
//           defaultMessage="Email"
//         />,
//       </a>
//     </Menu.Item>
//   </Menu>
// );

const BussinessCard = (props) => {
  const {
    handleClick,
    handlePreview,
    imageId,
    imageURL,
    primaryTitle,
    secondaryTitle,
    subtitle1,
    subtitle2,
    currencyType,
    currency,
  } = props;
  console.log("...>>>>>>>>>>>.......<<<<<<<<<<<<<<", imageURL);
  return (
    <FlexContainer flexDirection="column" style={{ borderRadius: 3 }}>
      <MainWrapper>
        <FlexContainer
          alignItems="center"
          flexWrap="no-wrap"
          style={{ height: "2.5em" }}
        >
          <FlexContainer style={{ flexBasis: "20%", margin: "0.3rem" }}>
            <MultiAvatar
              primaryTitle={primaryTitle}
            //   imageId={imageId}
            //   imageURL={imageURL}
              imgHeight={"1.56em"}
              imgWidth={"1.56em"}
            />
          </FlexContainer>
          <FlexContainer
            flexDirection="column"
            style={{ flexBasis: "70%", overflow: "hidden" }}
          >
            <Title
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer" }}
              onClick={handleClick}
            >
              {primaryTitle || ""}
            </Title>
            <SubTitle>
              {/* <UserOutlined theme="filled" /> */}
              {/* <i class="far fa-address-book"></i> */}
              &nbsp;&nbsp;
              {currencyType && <CurrencySymbol currencyType={currencyType} />}
              &nbsp;
              {secondaryTitle || ""} 
            </SubTitle>
          </FlexContainer>
          <FlexContainer
            style={{ flexBasis: "10%", alignSelf: "flex-start" }}
          ></FlexContainer>
        </FlexContainer>

        <SubTitle style={{ color: "#337df4", fontSize: "0.75em" }}>
          {/* {elipsize(subtitle1 || "", 23)} */}
        </SubTitle>
      </MainWrapper>
    </FlexContainer>
  );
};
export default BussinessCard;
