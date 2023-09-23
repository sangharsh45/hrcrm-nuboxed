import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const PublishActionLeft=lazy(()=> import("./PublishActionLeft"));

class PublishHeader extends Component {
  render() {
    const {
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <PublishActionLeft
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
        //   rightComponent={
        //     <PublishActionRight
        //     viewType={viewType}

        //     handlePublishModal={handlePublishModal} />
        //   }
        />
      </div>
    );
  }
}

export default PublishHeader;