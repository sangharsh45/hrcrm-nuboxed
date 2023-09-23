import React, { Component } from "react";
import {
  BellOutlined, FilterOutlined
  
} from '@ant-design/icons';
import { Avatar, Divider, Icon, Button, Menu, Dropdown } from "antd";
import styled from "styled-components";
import { FlexContainer, MainWrapper, ResponsiveCard } from "../Layout";
import { CurrencySymbol } from "../../Common";
import { ActionIcon } from "../../Utils";
import { MultiAvatar } from "./";
import { Title, SubTitle } from "./";
import { connect } from "react-redux";
const ContactBussinessCard = props => {
  const {
    handleClick,
    handleSecondaryTitleClick,
    handlePreview,
    imageId,
    imageURL,
    primaryTitle,
    secondaryTitle,
    secondaryImageId,
    secondaryImageURL,
    subtitle1,
    subtitle2,
    hideSecondaryAvatar,
    subtitle1Icon,
    mainAvatarTitle,
    bottomBarComponent,
    currencyType,
    dropdownMenu,
    user,
  } = props;
  return (
    <ResponsiveCard flexDirection="column" style={{ borderRadius: 3 }}>
      <MainWrapper>
        <FlexContainer
          alignItems="center"
          flexWrap="no-wrap"
          style={{ height: "3.75em" }}
        >
          <FlexContainer style={{ flexBasis: "25%", marginRight: "0.2rem" }}>
            <MultiAvatar
              primaryTitle={primaryTitle}
              imageId={imageId}
              // imageURL={imageURL}
              imgHeight={40}
              imgWidth={40}
              imgRadius={50}
            />
          </FlexContainer>
          &nbsp;
          <FlexContainer
            flexDirection="column"
            style={{ flexBasis: "65%", overflow: "hidden" }}
          >
            <Title
              fontSize="1.125em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer" }}
              onClick={handleClick || null}
            >
              {primaryTitle || ""}
            </Title>
            {secondaryTitle && (
              <SubTitle
                overflow="hidden"
                textOverflow="ellipsis"
                style={{
                  cursor: "pointer",
                  fontSize: 14,
                  display: "flex"
                }}
                onClick={handleSecondaryTitleClick || null}
              >
                {/* <Icon type="mail" theme="filled" />  */}
                {!hideSecondaryAvatar && (
                  <MultiAvatar
                    primaryTitle={secondaryTitle || "F"}
                    imageId={secondaryImageId}
                    imageURL={secondaryImageURL}
                    imgHeight={35}
                    imgWidth={35}
                    smallAvatar
                    minAvatarWidth="1.5625em"
                  // imgRadius={50}
                  />
                )}
                &nbsp;&nbsp;&nbsp;
                {secondaryTitle || ""}
              </SubTitle>
            )}
          </FlexContainer>
          <FlexContainer style={{ flexBasis: "10%", alignSelf: "flex-start" }}>
            {dropdownMenu || <></>}
          </FlexContainer>
        </FlexContainer>
        <FlexContainer flexDirection="column" style={{ padding: "0.2rem" }}>
          <SubTitle style={{ fontWeight: 500, fontSize: 15 }}>
            <FilterOutlined type={subtitle1Icon || "filter"} theme="filled" />
            &nbsp;&nbsp;
            {currencyType && <CurrencySymbol currencyType={currencyType} />}
            &nbsp;{subtitle1 || ""}
          </SubTitle>
          {/* <SubTitle style={{ fontWeight: 500, fontSize: 15 }}>
                        <Icon type="phone" theme="filled" /> &nbsp;
                        {subtitle2 || ''}
                    </SubTitle> */}
        </FlexContainer>
        <FlexContainer style={{ width: "100%", paddingLeft: "0.5rem" }}>
          {/* <FlexContainer style={{}}>
                        <Button
                            type="primary"
                            shape="circle"
                            icon="phone"
                            style={{ backgroundColor: '#466070', border: 'none', marginRight: '0.4rem', fontSize: 18 }} />
                        <Button
                            type="primary"
                            shape="circle"
                            icon="file-text"
                            style={{ backgroundColor: '#466070', border: 'none', marginRight: '0.4rem', fontSize: 18 }} />
                    </FlexContainer> */}
          <FlexContainer
            style={{}}
            justifyContent={bottomBarComponent ? "space-between" : "flex-end"}
            alignSelf="flex-end"
            alignItems="center"
          >
            {bottomBarComponent && bottomBarComponent}
            <Button
              size={"small"}
              type="ghost"
              style={{
                color: "#888",
                borderColor: "transparent",
                alignSelf: "flex-end"
              }}
              onClick={handlePreview}
            >{user.pulseAccessInd ===true && ( 
              <PulseIcon></PulseIcon>
              )}
              {/* <PulseIcon class="fas fa-heartbeat" style={{ fontSize: '145%' }}></PulseIcon> */}
            </Button>
          </FlexContainer>
        </FlexContainer>
      </MainWrapper>
    </ResponsiveCard>
  );
};
const mapStateToProps = ({ auth}) => ({
  user: auth.userDetails,
})
export default  connect(mapStateToProps)(ContactBussinessCard);

const AppIcon = props => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #e54447;
  &:hover {
    background: yellow;
    color: blue;
  }
`;
