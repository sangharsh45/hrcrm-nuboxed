import React from "react";
import Avatar from "antd/lib/avatar";
import { ProgressiveImage } from "../../Utils";
import { base_url } from "../../../Config/Auth";
import ProfilePreview from "../../../Assets/Images/ProfilePreview.png";
const QRCodeModal = ({
    qrCodeId,
    qrUrl,
    primaryTitle,
    imgWidth,
    imgHeight,
    smallAvatar,
    imgRadius,
    // bgcolor,
    minAvatarWidth,
}) => {
    const size = smallAvatar && !qrCodeId && !qrUrl ? "small" : "large";
    // const fontSize = size === "large" ? 18 : 12;
    const color = size === "large" ? "#fff" : "#fff";
    // const backgroundColor = size === "large" ? "#337df4" : "#337df4";
    const backgroundColor = size === "large" ? "#337df4" : "#337df4";
    const borderWidth = size === "large" ? "1px" : "1px";
    const borderColor = size === "large" ? "#337df4" : "#337df4";
    const borderStyle = size === "large" ? "solid" : "solid";
    return (
        <>
            {qrCodeId || qrUrl ? (
                qrCodeId ? (
                    <div style={{ borderRadius: 24 }}>
                        <ProgressiveImage
                            preview={ProfilePreview}
                            image={`${base_url}/qrcode/img/${qrCodeId}`}
                            width={imgWidth || "55px"}
                            height={imgHeight || "55px"}
                            borderRadius={imgRadius}
                        />
                    </div>
                ) : (
                    <ProgressiveImage
                        preview={ProfilePreview}
                        image={qrUrl}
                        width={imgWidth || "55px"}
                        height={imgHeight || "55px"}
                        borderRadius={imgRadius}
                    // borderRadius={'50%'}
                    />
                )
            ) : (
                <Avatar
                    size={size || "large"}
                    style={{
                        color,
                        // backgroundColor: bgcolor ? "red" : backgroundColor,
                        backgroundColor,
                        // fontSize,
                        borderWidth,
                        borderColor,
                        borderStyle,
                        minWidth: minAvatarWidth,
                    }}
                >
                    {primaryTitle && primaryTitle.split("")[0].toUpperCase()}
                </Avatar>
            )}
        </>
    );
};

export default QRCodeModal;
{
    /* <Icon type="audit" />influencer */
}
{
    /* <i class="material-icons">
  how_to_reg
  </i> evaluator */
}

// <i class="material-icons">
// how_to_vote
// </i>decision maker
{
    /* <i class="material-icons">
  assistant
  </i>influencer */
}

//decision maker <i class="fas fa-vote-yea"></i>
//evaluator <i class="fas fa-address-card"></i>
//influencer <i class="fas fa-hands-helping"></i>
