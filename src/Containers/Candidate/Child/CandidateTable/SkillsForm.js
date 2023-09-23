import React from "react";
function SkillsForm(props) {
  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "space-evenly",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {props.skill.map((item, i) => {
        return (
          <>
            {i === 0 && (
              <div
                style={{
                  border: "2px solid rgb(125 241 193)",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "0.125em",
                  borderRadius: "0.62em",
                }}
              >
                {item}
              </div>
            )}

            {i === 1 && (
              <div
                style={{
                  border: "2px solid rgb(251 182 132)",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "0.125em",
                  borderRadius: "0.62em",
                }}
              >
                {item}
              </div>
            )}
            {i === 2 && (
              <div
                style={{
                  border: "2px solid rgb(51, 125, 244)",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "0.125em",
                  borderRadius: "0.62em",
                }}
              >
                {item}
              </div>
            )}
            {i === 3 && (
              <div
                style={{
                  border: "2px solid  rgb(203 190 254)",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "0.125em",
                  borderRadius: "0.62em",
                }}
              >
                {item}
              </div>
            )}
            {i === 4 && (
              <div
                style={{
                  border: "2px solid rgb(106 241 22)",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "0.125em",
                  borderRadius: "0.62em",
                }}
              >
                {item}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
export default SkillsForm;
