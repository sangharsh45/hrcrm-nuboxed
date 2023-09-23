import React, { Component } from "react";
import { ImageGradient } from "./styled";
import { Title, Spacer } from "../../Components/UI/Elements";
// import LoginBackground from "../../Assets/Images/login-background1.jpg";
import TimeToConnectImage from "../../Assets/Images/BusinessLeaders.jpg";
import DashboardImage from "../../Assets/Images/BusinessLeaders.jpg";
import { Carousel } from "antd";
class RandomImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: DashboardImage,
    };
  }
  componentDidMount() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    console.log(getRandomInt(3));
    let randomNumber = getRandomInt(3);
    if (randomNumber <= 1) {
      this.setState({
        screenshot: DashboardImage,
      });
    } else if (randomNumber === 2) {
      this.setState({
        screenshot: TimeToConnectImage,
      });
    }
  }
  render() {
    return (
      <ImageGradient
        // backgroundImage={LoginBackground}
        style={{ padding: "0 auto" }}
      >
        <div style={{}}>
          <Title
            color="#fff"
            fontSize="1.5rem"
            fontFamily="Poppins"
            textAlign="center"
            style={{
              lineHeight: " 1.1",
            }}

          // style={{
          //     whiteSpace: "inherit",
          //     lineHeight: " 1.1",
          //     fontSize: "1.5rem",
          //     // fontWeight: "bold",
          //     color: "#fffff",
          //     fontFamily: " Segoe UI",
          //     marginTop: "0.75em"
          // }}
          >
            <div>Empower your remotely located teams to collaborate</div>
            <div>and complete tasks.</div>
            <br />
            <div
              className="image"
              style={{
                alignItems: "center",
                textAlign: "center",
                minHeight: "10em",
                display: "flex",
                justifyContent: "center",
                boxShadow: "0 0.3125em 1.25em 0 #444",
                border: "0.0625em solid #ddd",
                borderRadius: " 0.4375em",
                padding: "0.5em 0.625em",
                backgroundColor: "white",
                marginTop: "0em",
              }}
            >
              <img src={TimeToConnectImage} className="login_image"></img>
            </div>
          </Title>

          <div>
            <div className="randome_text2">
              <div>
                Watch out this space as we keep rolling out interesting features
                so that
              </div>
              <div>
                {" "}
                you focus on your opportunity funnel and customer engagement.
              </div>
              <div></div>
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              textAlign: "center",
              minHeight: "7.5em",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0 0.3125em 1.25em 0 #444",
              border: "0.0625em solid #ddd",
              borderRadius: " 0.4375em",
              padding: "0.5em 0.625em",
              backgroundColor: "#ebe9e9",
              marginTop: "1.5625em",
            }}
          >
            <div className="randome_text3">
              <div>
                Korero team extends its support to the Small and Medium
                enterprises sector.
                <div>
                  You will not be billed for usage untill 30th Sep 2020.
                </div>
              </div>

              <Spacer />
              <div>
                Do send your feedback on improving the experience, email us on
                support@tekorero.com
              </div>
            </div>
          </div>
        </div>
      </ImageGradient>
    );
  }
}

export default RandomImageScreen;
