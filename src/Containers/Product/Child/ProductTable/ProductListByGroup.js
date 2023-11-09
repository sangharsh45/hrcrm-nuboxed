
import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getProducts,
    getAllProductCatagory,
    setEditProducts,
    handleUpdateProductModal,
    handleDiscountModal,
    handleOfferModal,
    handleHistoryModal,
    handleCatalogueConfigureModal,
    deleteProductData,
    handleCatalogueWipModal,
} from "../../ProductAction";
import UpdateProductModal from "../../Child/UpdateProductModal";
import ProductDiscountModal from "./ProductDiscountModal";
import CustomerDiscountHistory from "./CustomerDiscountHistory";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import ProductHistoryModal from "./ProductHistoryModal";
import CatalogueConfigureModal from "../Configure/CatalogueConfigureModal";
import SuspendToggleProduct from "../ProductTable/SuspendToggleProduct";
import DistributorDiscountHistory from "./DistributorDiscountHistory";
import ProductOfferModal from "./ProductOfferModal";
import CustomerOfferHistory from "./CustomerOfferHistory";
import DistributorOfferHistory from "./DistributorOfferHistory";
import CatalogueWipModal from "../Wip/CatalogueWipModal";
import ProductPublishToggle from "./ProductPublishToggle";
import moment from "moment";
import { CurrencySymbol } from "../../../../Components/Common";
import { handleCurrencyPriceModal } from "../../../Supplies/SuppliesAction"
import {
    EditOutlined,
    HistoryOutlined,
    DeleteOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import CurrencyPriceModal from "../../../Supplies/Child/CurrencyPriceModal";
import { StyledModal, StyledTable } from "../../../../Components/UI/Antd";
import { getProductByGroup } from "../../ProductAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { Empty, Icon, Tooltip, Button, Popconfirm, Switch } from "antd";
import AddToSuppliesToggle from "./AddToSuppliesToggle";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ProductHistoryTable(props) {
    useEffect(() => {
        props.getProductByGroup(props.groupId);
    }, []);

    const [showHistory, setshowHistory] = useState(false);
    const [showDistributorHistory, setshowDistributorHistory] = useState(false);
    const [customerOfferHistory, setcustomerOfferHistory] = useState(false);
    const [distributorOfferHistory, setdistributorOfferHistory] = useState(false);
    const [productId, setproductId] = useState("");
    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }
    function handleProductHistory(productId) {
        setshowHistory(true);
        setshowDistributorHistory(false);
        setcustomerOfferHistory(false);
        setdistributorOfferHistory(false);
        setproductId(productId);
    }

    function handleDistributorHistory(productId) {
        setshowDistributorHistory(true);
        setcustomerOfferHistory(false);
        setshowHistory(false);
        setdistributorOfferHistory(false);
        setproductId(productId);
    }

    function handleCustomerOfferHistory(productId) {
        setcustomerOfferHistory(true);
        setshowHistory(false);
        setdistributorOfferHistory(false);
        setshowDistributorHistory(false);
        setproductId(productId);
    }

    function handleDistributorOfferHistory(productId) {
        setdistributorOfferHistory(true);
        setshowHistory(false);
        setcustomerOfferHistory(false);
        setshowDistributorHistory(false);
        setproductId(productId);
    }
    const categoryNameOption = useMemo(() => {
        if (!props.allproducts) return [];
        return (
            props.allproducts.length &&
            props.allproducts.map((allproducts) => {
                return {
                    text: allproducts.categoryName || "",
                    value: allproducts.categoryName,
                };
            })
        );
    }, [props.allproducts]);

    const {
        fetchingProducts,
        fetchingProductsError,
        fetchingAllProductsError,
        products,
        updateProductModal,
        handleUpdateProductModal,
        handleDiscountModal,
        addDiscountModal,
        user,
        handleHistoryModal,
        addProductOfferModal,
        handleOfferModal,
        addHistoryModal,
        addCatalogueConfigureModal,
        handleCatalogueConfigureModal,
        addCatalogueWipModal,
        handleCatalogueWipModal,
    } = props;
    const columns = [
        {
            title: "",
            dataIndex: "imageId",
            width: "4%",
            render: (name, item, i) => {
                return (
                    <SubTitle>
                        {item.imageId ? (
                            <MultiAvatar
                                imageId={item.imageId ? item.imageId : ''}
                                imgHeight={"1.8em"}
                                imgWidth={"1.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                                No Image
                            </span>
                        )}
                    </SubTitle>
                );
            },
        },

        {
            title: "Article #",
            dataIndex: "articleNo",
            width: "7%",
            render: (name, item, i) => {

                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {item.articleNo}</span>,
                };
            },
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {item.categoryName}</span>,
                };
            },
            sorter: (a, b) => {
                var nameA = a.categoryName.toLowerCase(); // ignore upper and lowercase
                var nameB = b.categoryName.toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            },
            width: "8%",
            filters: categoryNameOption,

            onFilter: (value, record) => {
                return record.categoryName === value;
            },
        },
        {
            title: "Sub",
            dataIndex: "subCategoryName",
            width: "6%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {item.subCategoryName}</span>,
                };
            },
        },
        {
            title: "Attribute",
            dataIndex: "attributeName",
            width: "7%",
            render: (name, item, i) => {
                const data = `${item.attributeName || ""} ${item.subAttributeName ||
                    ""}`;
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {data}</span>,
                };
            },
        },
        {
            title: "Gross Wt.",
            width: "6%",
            render: (text, item) => {
                return (
                    <>{item.grossWeight} {item.grossUnit}</>
                )
            }
        },
        {
            title: "Net Wt.",
            width: "6%",
            render: (text, item) => {
                return (
                    <>{item.netWeight} {item.netUnit}</>
                )
            }
        },
        {
            title: "Pallet",
            width: "6%",
            dataIndex: "palette",
        },
        // {
        //     title: "Manufacture Date",
        //     width: "10%",
        //     dataIndex: "dateOfManufacture",
        //     render: (text, item) => {
        //         return (
        //             <>
        //                 {moment(item.dateOfManufacture).format("DD-MM-YY")}
        //             </>
        //         )
        //     }
        // },
        // {
        //     title: "Created",
        //     width: "7%",
        //     dataIndex: "transfer",
        //     render: (text, item) => {
        //         return (
        //             <>
        //                 <b>{item.transfer}</b>
        //             </>
        //         )
        //     }
        // },
        {
            title: "GST%",
            dataIndex: "tax",
            width: "4%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {item.tax}</span>,
                };
            },
        },

        {
            title: "Margin(Max)",
            dataIndex: "distributorMaxMargin",
            width: "8%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {item.marginType === "Amount" ? (
                                <CurrencySymbol currencyType={"INR"} />
                            ) : (
                                "%"
                            )}
                            &nbsp;
                            {item.distributorMaxMargin}
                        </span>
                    ),
                };
            },
        },
        {
            title: "B2C Margin",
            width: "8%",
            dataIndex: "consumerMaxMargin",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {item.consumerMarginType === "Amount" ? (
                                <CurrencySymbol currencyType={"INR"} />
                            ) : (
                                "%"
                            )}
                            &nbsp;
                            {item.consumerMaxMargin}
                        </span>
                    ),
                };
            },
        },
        {
            title: "Add to Material",
            width: "8%",
            render: (text, item) => {
                return (
                    <>
                        <AddToSuppliesToggle item={item} />

                    </>
                )
            }
        },

        {
            title: "",
            width: "2%",
            render: (text, item) => {
                return (
                    <>
                        <Tooltip title="Add price">
                            <MoneyCollectOutlined

                                onClick={() => {
                                    props.handleCurrencyPriceModal(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                    </>
                )
            }
        },
        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {(user.userType === "USER" &&
                                user.functionName === "Production" &&
                                user.designation === "Manager") ||
                                (user.userType === "ADMIN" &&
                                    user.functionName === "Management" &&
                                    user.designation === "Manager") ? (
                                <Tooltip title="WIP">
                                    <span onClick={() => handleCatalogueWipModal(true)}>

                                        <FontAwesomeIcon icon={solid('server')} />
                                    </span>
                                </Tooltip>
                            ) : null}
                        </span>
                    ),
                };
            },
        },

        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {(user.userType === "USER" &&
                                user.functionName === "Production" &&
                                user.designation === "Manager") ||
                                (user.userType === "ADMIN" &&
                                    user.functionName === "Management" &&
                                    user.designation === "Manager") ? (
                                <Tooltip title="Configure">
                                    <span onClick={() => handleCatalogueConfigureModal(true)}>
                                        <FontAwesomeIcon icon={solid('network-wired')} />
                                    </span>
                                </Tooltip>
                            ) : null}
                        </span>
                    ),
                };
            },
        },
        {
            title: "",
            width: "7%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {user.designation === "Manager" &&
                                user.functionName === "Management" ? (
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: "teal",
                                        // backgroundColor: "Yellow",
                                        fontSize: "11px",
                                    }}
                                    onClick={() => {
                                        handleDiscountModal(true);
                                        handleParticularRowData(item);
                                    }}
                                >
                                    Discount
                                </Button>
                            ) : (
                                <Button
                                    disabled
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: "teal",
                                        color: "white",
                                        fontSize: "11px",
                                    }}
                                    onClick={() => {
                                        handleDiscountModal(true);
                                        handleParticularRowData(item);
                                    }}
                                >
                                    Discount
                                </Button>
                            )}
                        </span>
                    ),
                };
            },
        },

        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            <Tooltip title="Customer Discount History">
                                <span
                                    onClick={() => handleProductHistory(item.productId)}
                                    style={{
                                        color:
                                            showHistory && item.productId === productId
                                                ? "orange"
                                                : "black",
                                        cursor: "pointer",
                                    }}
                                ><FontAwesomeIcon icon={solid('address-card')} />

                                </span>
                            </Tooltip>
                        </span>
                    ),
                };
            },
        },
        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            <Tooltip title="Distributor Discount History">
                                <span
                                    onClick={() => handleDistributorHistory(item.productId)}
                                    style={{
                                        color:
                                            showDistributorHistory && item.productId === productId
                                                ? "orange"
                                                : "black",
                                        cursor: "pointer",
                                    }}
                                ><FontAwesomeIcon icon={solid('building')} />

                                </span>
                            </Tooltip>
                        </span>
                    ),
                };
            },
        },
        {
            title: "",
            width: "5%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {user.designation === "Manager" &&
                                user.functionName === "Management" ? (
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: "Tomato",
                                        fontSize: "11px",
                                    }}
                                    onClick={() => {
                                        handleOfferModal(true);
                                        handleParticularRowData(item);
                                    }}
                                >
                                    Offer
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    shape="round"
                                    disabled
                                    style={{
                                        backgroundColor: "Tomato",
                                        color: "white",
                                        fontSize: "11px",
                                    }}
                                    onClick={() => {
                                        handleOfferModal(true);
                                        handleParticularRowData(item);
                                    }}
                                >
                                    Offer
                                </Button>
                            )}
                        </span>
                    ),
                };
            },
        },
        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            <Tooltip title="Customer Offer History">
                                <span
                                    onClick={() => handleCustomerOfferHistory(item.productId)}
                                    style={{
                                        color:
                                            customerOfferHistory && item.productId === productId
                                                ? "orange"
                                                : "black",
                                        cursor: "pointer",
                                    }}
                                ><FontAwesomeIcon icon={solid('address-card')} />

                                </span>
                            </Tooltip>
                        </span>
                    ),
                };
            },
        },
        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            <Tooltip title="Distributor Offer History">
                                <span
                                    onClick={() => handleDistributorOfferHistory(item.productId)}
                                    style={{
                                        color:
                                            distributorOfferHistory && item.productId === productId
                                                ? "orange"
                                                : "black",
                                        cursor: "pointer",
                                    }}
                                ><FontAwesomeIcon icon={solid('building')} />

                                </span>
                            </Tooltip>
                        </span>
                    ),
                };
            },
        },
        {
            title: "Website",
            width: "9%",
            render: (name, item, i) => {
                return <ProductPublishToggle item={item} />
            },
        },

        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            <Tooltip title="Product History">
                                <HistoryOutlined
                                    onClick={() => {
                                        handleHistoryModal(true);
                                        handleParticularRowData(item);
                                    }}
                                    style={
                                        {
                                            // color:
                                            //   showHis && item.orderId === orderId ? "orange" : "#1890ff",
                                            // cursor: "pointer",
                                        }
                                    }
                                />
                            </Tooltip>
                        </span>
                    ),
                };
            },
        },

        {
            title: "",
            dataIndex: "documentId",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {user.designation === "Manager" &&
                                (user.functionName !== "Sales" ||
                                    user.designation !== "Manager") && (
                                    <Tooltip title="Edit">
                                        <FontAwesomeIcon icon={solid('pen-to-square')}
                                            style={{ cursor: "pointer", fontSize: "12px" }}
                                            onClick={() => {
                                                props.setEditProducts(item);
                                                handleUpdateProductModal(true);
                                                // handleSetCurrentLeadsId(item.leadsId);
                                            }}
                                        />
                                    </Tooltip>
                                )}
                        </span>
                    ),
                };
            },
        },

        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {user.designation === "Manager" &&
                                user.functionName === "Management" && (
                                    <Tooltip title="Delete">
                                        <Popconfirm
                                            title="Do you want to delete?"
                                            onConfirm={() => props.deleteProductData(item.productId)}
                                        >
                                            <FontAwesomeIcon icon={solid('trash')}
                                                style={{ cursor: "pointer", color: "red" }}
                                            />
                                        </Popconfirm>
                                    </Tooltip>
                                )}
                        </span>
                    ),
                };
            },
        },
    ];

    return (
        <>

            <StyledTable
                rowKey=""
                columns={columns}
                dataSource={props.productByGroup}
                loading={
                    props.fetchingProductByGroup
                }
                scroll={{ y: 320 }}
                pagination={false
                    // defaultPageSize: 30,
                    // showSizeChanger: true,
                    // pageSizeOptions: ["25", "40", "50"],
                }
            />
            <UpdateProductModal
                // leadsId={currentLeadsId}
                updateProductModal={updateProductModal}
                // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
                handleUpdateProductModal={handleUpdateProductModal}
            />
            <ProductDiscountModal
                addDiscountModal={addDiscountModal}
                handleDiscountModal={handleDiscountModal}
                particularDiscountData={particularDiscountData}
            />
            <ProductHistoryModal
                addHistoryModal={addHistoryModal}
                handleHistoryModal={handleHistoryModal}
                particularDiscountData={particularDiscountData}
            />
            <CatalogueConfigureModal
                addCatalogueConfigureModal={addCatalogueConfigureModal}
                handleCatalogueConfigureModal={handleCatalogueConfigureModal}
                particularDiscountData={particularDiscountData}
            />

            <CatalogueWipModal
                addCatalogueWipModal={addCatalogueWipModal}
                handleCatalogueWipModal={handleCatalogueWipModal}
                particularDiscountData={particularDiscountData}
            />

            <ProductOfferModal
                addProductOfferModal={addProductOfferModal}
                handleOfferModal={handleOfferModal}
                particularDiscountData={particularDiscountData}
            />
            <CurrencyPriceModal
                handleCurrencyPriceModal={props.handleCurrencyPriceModal}
                addCurrencyValue={props.addCurrencyValue}
                manufactureId={particularDiscountData.manufactureId}
            />
            {showHistory && <CustomerDiscountHistory productId={productId} />}
            {showDistributorHistory && (
                <DistributorDiscountHistory productId={productId} />
            )}
            {customerOfferHistory && <CustomerOfferHistory productId={productId} />}
            {distributorOfferHistory && (
                <DistributorOfferHistory productId={productId} />
            )}
        </>
    );
}


const mapStateToProps = ({ product, auth, supplies }) => ({
    productByGroup: product.productByGroup,
    fetchingProductByGroup: product.fetchingProductByGroup,
    groupId: auth.userDetails.groupId,
    fetchingProducts: product.fetchingProducts,
    fetchingProductsError: product.fetchingProductsError,
    fetchingAllProducts: product.fetchingAllProducts,
    fetchingAllProductsError: product.fetchingAllProductsError,
    products: product.products,
    allproducts: product.allproducts,
    updateProductModal: product.updateProductModal,
    addDiscountModal: product.addDiscountModal,
    addProductOfferModal: product.addProductOfferModal,
    addHistoryModal: product.addHistoryModal,
    addCatalogueConfigureModal: product.addCatalogueConfigureModal,
    addCatalogueWipModal: product.addCatalogueWipModal,
    role: auth.userDetails.role,
    department: auth.userDetails.department,
    user: auth.userDetails,
    addCurrencyValue: supplies.addCurrencyValue
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductByGroup,
            setEditProducts,
            handleUpdateProductModal,
            handleDiscountModal,
            handleHistoryModal,
            deleteProductData,
            handleCatalogueConfigureModal,
            getAllProductCatagory,
            handleOfferModal,
            handleCatalogueWipModal,
            handleCurrencyPriceModal
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductHistoryTable);
