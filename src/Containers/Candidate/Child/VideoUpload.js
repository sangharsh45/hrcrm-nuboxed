import React from "react";
import { base_url } from "../../../Config/Auth";
import axios from "axios";
const token = sessionStorage.getItem("token");

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    console.log("file",file)
    let formData = new FormData();
    formData.append("videoClips", file);
    console.log(formData);
    ////debugger;
    axios
      .post(`${base_url}/videoClips/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        ////debugger;
        console.log(res);
        props.handleSetVideo(res.data)
        // onSuccess();
       // this.props.form.setFieldValue(this.props.field.name, res.data);
        // this.setState({ previewVisible: false, previewImage: "" });
      })
      .catch(err => {
        console.log(err);
        // onError();
      });
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {/* {!source && <button onClick={handleChoose}>Choose</button>} */}
      {/* {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )} */}
      {/* <div className="VideoInput_footer">{source || "Nothing selectd"}</div> */}
    </div>
  );
}