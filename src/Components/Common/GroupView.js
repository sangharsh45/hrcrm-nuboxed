// import React, { Component } from 'react';
// import { SubTitle, Title, HeaderText } from "../UI/Elements";
// import { BundleLoader } from "../Placeholder";
// class GroupView extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isViewAll: false,
//         }
//     }
//     toggleViewAll = () => this.setState((prevState) => ({ isViewAll: !prevState.isViewAll }))
//     render() {
//         const { groupTitle, isFetching, length, noData } = this.props;
//         const { isViewAll } = this.state;
//         return (
//             <>
//                 {!noData &&
//                     <>
//                         <HeaderText style={{marginBottom: 0, color: '#1f4c93', fontWeight: 600}}>{groupTitle}</HeaderText>
//                         {
//                             isFetching
//                                 ? <div style={{ height: 180 }}><BundleLoader /></div>
//                                 : this.props.children(isViewAll, this.toggleViewAll)
//                         }
//                         {length <= 5 && <div style={{ marginBottom: 10 }} />}
//                         {
//                             length > 5 &&
//                             <SubTitle
//                                 style={{ cursor: 'pointer', color: '#02488e', textAlign: 'right', marginRight: '0.3rem' }}
//                                 onClick={this.toggleViewAll}
//                             >{isViewAll ? 'View less' : 'View all'}</SubTitle>
//                         }
//                     </>
//                 }
//             </>
//         );
//     }
// }

// export default GroupView;

import React, { Component } from "react";
import { SubTitle, Title, HeaderText } from "../UI/Elements";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../Placeholder";
import { Empty, Spin } from "antd";
class GroupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewAll: false,
    };
  }
  toggleViewAll = () => {
    console.log(this.props.onViewmore);
    //debugger;
    this.setState((prevState) => ({ isViewAll: !prevState.isViewAll }));
    if (!this.state.isViewAll) {
      //debugger;
      if (this.props.onViewmore && this.props.onViewmore) {
        //debugger;
        this.props.onViewmore();
      }
    }
  };

  render() {
    const {
      groupTitle,
      isFetching,
      length,
      noData,
      isLoading,
      error,
    } = this.props;
    const { isViewAll } = this.state;
    return (
      <>
        {error && (
          <>
            <HeaderText
              style={{ color: "#ff7158bf", fontWeight: 600 }}
            >
              {groupTitle}
            </HeaderText>
            <Empty
              description={` No appointments listed for ${groupTitle}`}
              style={{ color: "#777" }}
            />
          </>
        )}
        {!noData && (
          <>
            <HeaderText
              style={{ marginBottom: 0, color: "rgba(255, 113, 88, 0.75)", fontWeight: 600 }}
            >
              {groupTitle}
            </HeaderText>
            {length >= 5 && (
              <SubTitle
                style={{
                  cursor: "pointer",
                  color: "#02488e",
                  textAlign: "right",
                  marginRight: "0.3rem",
                }}
                onClick={this.toggleViewAll}
              >
               {isLoading && <Spin size="large" />}
                <div style={{ marginBottom: 10 }}></div>
                {isViewAll ? "View less" :
                  // "View all"
                  <FormattedMessage
                    id="app.viewall"
                    defaultMessage="View all"
                  />
                }
              </SubTitle>
            )}
             
            {isFetching ? (
              <div style={{ height: 100 }}>
                <BundleLoader height={40} />
              </div>
            ) : (
              this.props.children(isViewAll, this.toggleViewAll)
            )}
            {length <= 5 && <div style={{ marginBottom: 10 }} />}
           
          </>
        )}
      </>
    );
  }
}

export default GroupView;

// .kRuTcW:hover {
//   box-shadow: 0px 0.31em 0.62em -0.125em #444;
