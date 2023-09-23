import React, { useState } from "react";

function SkillsLoadMore(props) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [particularRowData, setParticularRowData] = useState({});
  function generateRandomColor() {
    let maxVal = 0xffffff;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }

  const newSkill =
    props.skillList === null
      ? []
      : props.skillList.map((item) => {
          return { skillName: item, color: generateRandomColor() };
        });

  console.log("skill", newSkill);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {!isViewAll ? (
          <>
            {newSkill.slice(0, 2).map((option, i) => {
              return (
                <>
                  {/* {newSkill !==null?"": */}
                  <div
                    key={i}
                    style={{
                      border: `1px solid ${option.color}`,
                      padding: "0px 0.4em",
                      textAlign: "center",
                      placeSelf: "center",
                      margin: "2px",
                      borderRadius: "0.4em",
                    }}
                  >
                    {option.skillName}
                  </div>
                  {/* } */}
                </>
              );
            })}
          </>
        ) : (
          <>
            {newSkill &&
              newSkill.map((option, i) => {
                return (
                  <>
                    {/* {newSkill && newSkill!==null?"": */}
                    <div
                      key={i}
                      style={{
                        border: `2px solid ${option.color}`,
                        padding: "0px 0.62em",
                        textAlign: "center",
                        margin: "2px",
                        borderRadius: "0.62em",
                      }}
                    >
                      {option.skillName}
                    </div>
                    {/* } */}
                  </>
                );
              })}
          </>
        )}
        {props.skillList.length ? (
          <p
            className="load1"
            styles={{ cursor: "pointer" }}
            onClick={() =>
              !isViewAll ? setIsViewAll(true) : setIsViewAll(false)
            }
          >
            {!isViewAll ? " Load More" : " View Less"}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default SkillsLoadMore;
