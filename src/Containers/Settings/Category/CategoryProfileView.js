import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { ViewEditCard } from "../../../Components/UI/Elements";

function CategoryProfileView(props) {
  return (
    <>
      <div class=" flex justify-around"
      // style={{ display: "flex", justifyContent: "space-around" }}
      >
        <h1 class=" flex justify-center items-center text-[catClr] text-[1.25em] "
        >
         Category
        </h1>
      </div>
     
      {props.rules.map((item, i) => {
        return (
          <StageWrapper>
            <ViewEditCard>
              {({ viewType }, toggleViewType) =>
                viewType === "view" ? (
                  <div class=" flex justify-center items-center"
                    // justifyContent="center"
                    // alignItems="center"
                    onClick={
                      () => props.handleRuleClick(item)
                    }
                    style={{
                      backgroundColor:
                        props.currentRulesOpen &&
                        props.currentRulesOpen.ruleId === item.ruleId &&
                        "rgb(161, 185, 185)",
                    }}
                  >
                    <StageName
                      style={{
                        color: "#444 "
                          ,
                        cursor:
                         "pointer",
                      }}
                    >
                      {
                        item.rulesName
                      
                      }
                    </StageName>
                  </div>
                ) : null
              }
            </ViewEditCard>
          </StageWrapper>
        );
      })}
    </>
  );
}
const mapStateToProps = ({ auth }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryProfileView);

const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  flex-basis: 80%;
  // margin-bottom: 0;
  margin: 0;
`;
