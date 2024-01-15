import React from "react";
import styled from "styled-components";
import moment from "moment";
import { SubTitle, Spacer } from "../UI/Elements";
import Link from "./Link";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
const NotesWrapper = styled.div``;
export default function SingleFeedback(props) {
    console.log(props);
    const {
        feedback,
        creationDate,
        name,
        rating,
        // metaData: {
        //   creatorDetails: { firstName, lastName }
        // }
    } = props;
    console.log(feedback)
    return (
        <NotesWrapper>
            <div dangerouslySetInnerHTML={{ __html: feedback }} />
            <SubTitle
                fontSize="14px"
                fontFamily="Karla"
                style={{ color: "#a7b2bc", marginTop: "-12px" }}
            >
                <Spacer />
                {props.rating === "1" ? (<>😈</>)
                    : props.rating === "2" ? (<>👎</>)
                        : props.rating === "3" ? (<>🌝</>)
                            : props.rating === "4" ? (<>👍</>)
                                : (<>😀</>)
                }
                <Spacer />
                {`${moment(creationDate).fromNow()}`}
                &nbsp;
                By &nbsp;{name}
            </SubTitle>
        </NotesWrapper>
    );
}
