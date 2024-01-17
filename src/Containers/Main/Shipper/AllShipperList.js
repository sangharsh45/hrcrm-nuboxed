import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tooltip, Popconfirm } from "antd";
import {
  getAllShipperList,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
} from "./ShipperAction";
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { Link } from "../../../Components/Common";
import { FormattedMessage } from "react-intl";

function AllShipperList(props) {
  useEffect(() => {
    props.getAllShipperList();
  }, []);

  const { handleUpdateShipperModal, updateShipperModal } = props;
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }

  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{ height: "70vh", backgroundColor: "#E3E8EE" }}>
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[8.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
            <div className=" md:w-[5.1rem]"><FormattedMessage id="app.phones" defaultMessage="Phones #" /></div>
            <div className=" md:w-[6.8rem] "><FormattedMessage id="app.email" defaultMessage="Email" /></div>
            <div className="md:w-[5.9rem]"><FormattedMessage id="app.shipby" defaultMessage="Ship By" /></div>
            <div className="md:w-[7.8rem]"><FormattedMessage id="app.address" defaultMessage="Address" /></div>
            <div className="md:w-[7.9rem]"><FormattedMessage id="app.city" defaultMessage="City" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.pinCode" defaultMessage="Pin Code" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.owner" defaultMessage="Owner" /></div>

          </div>
          {props.allShipper.map((item) => {
            return (
              <>
                <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 "

                  style={{
                    // borderBottom: "3px dotted #515050"
                  }}
                >
                  <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">

                        <Link
                          toUrl={`shipper/${item.shipperId}`}
                          title={`${item.shipperName}`}
                        >{item.shipperName}</Link>

                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      {/* <div class=" text-sm text-cardBody font-medium font-poppins">

Phone #

</div>  */}


                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.dialCode} {item.phoneNo}
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.emailId}
                      </div>

                    </div>

                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.shipByName}
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {`${(item.addresses && item.addresses.length && item.addresses[0].address1) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].state) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].street) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].city) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].pinCode) || ""}`}
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {(item.addresses &&
                          item.addresses.length &&
                          item.addresses[0].city) ||
                          ""}
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {(item.addresses &&
                          item.addresses.length &&
                          item.addresses[0].pinCode) ||
                          ""}
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.salesExecutive}
                      </div>

                    </div>
                    <div class="flex flex-col w-[3%] max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Tooltip title="Edit">
                          <EditOutlined
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              props.setEditShipper(item);
                              handleRowData(item);
                              handleUpdateShipperModal(true);
                              handleSetCurrentShipperId(item.shipperId);
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <Popconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.deleteShipperData(item.shipperId)}
                        >
                          <DeleteOutlined

                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </Popconfirm>
                      </div>
                    </div>





                  </div>




                </div>
              </>
            )
          })}

        </OnlyWrapCard>
      </div>
      <UpdateShipperModal
        rowdata={rowdata}
        shipperId={currentShipperId}
        updateShipperModal={updateShipperModal}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        handleUpdateShipperModal={handleUpdateShipperModal}
      />
      <AddShipperOrderModal
        addShipperOrderModal={props.addShipperOrderModal}
        handleShipperOrderModal={props.handleShipperOrderModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      />
      {/* <AddShipperActivityModal
        addShipperActivityTableModal={props.addShipperActivityTableModal}
        handleShipperActivityTableModal={props.handleShipperActivityTableModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      /> */}
    </>
  )
}
const mapStateToProps = ({ shipper, auth }) => ({
  allShipper: shipper.allShipper,
  userId: auth.userDetails.userId,
  fetchingShipperByUserId: shipper.fetchingShipperByUserId,
  fetchingShipperByUserIdError: shipper.fetchingShipperByUserIdError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateShipperModal,
      handleShipperActivityTableModal,
      handleShipperOrderModal,
      deleteShipperData,
      getAllShipperList,
      setEditShipper,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllShipperList);