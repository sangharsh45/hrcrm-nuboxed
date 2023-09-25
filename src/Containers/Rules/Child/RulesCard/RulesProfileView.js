import React, { useMemo } from "react";
import { Title, ViewEditCard } from "../../../../Components/UI/Elements";
import styled from "styled-components";
import { FlexContainer } from "../../../../Components/UI/Layout";
import RulesActionRight from "../../RulesActionRight";

function RulesProfileView(props) {
  console.log(props);
  const RuleID = useMemo(() => {
    return props.rule.map((item) => item.ruleId);
  }, [props.rule]);
  console.log(RuleID);
  return (
    <>
 

      {props.rule.map((item) => {
        return (
          <StageWrapper>
            <ViewEditCard>
              {({ viewType }, toggleViewType) =>
                viewType === "view" ? (
                  <FlexContainer
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => props.handleRuleClick(item)}
                    style={{
                      backgroundColor:
                        props.current &&
                        props.current.ruleId === item.ruleId &&
                        "rgb(161, 185, 185)",
                    }}
                  >
                    <StageName>{item.rulesName}</StageName>
                  </FlexContainer>
                ) : null
              }
            </ViewEditCard>
          </StageWrapper>
        );
      })}
    </>
  );
}

export default RulesProfileView;
const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  text-align:center;
  flex-basis: 80%;
  // margin-bottom: 0;
  margin: 0;
`;
