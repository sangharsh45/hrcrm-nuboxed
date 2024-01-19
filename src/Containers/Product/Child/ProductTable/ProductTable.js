import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTable } from "../../../../Components/UI/Antd";

class ProductTable extends Component {
  componentDidMount() {
    // this.props.getProducts();
  }
  render() {
    const { fetchingProducts, products } = this.props;
    const columns = [
      // {
      //   title: "Name",
      //   dataIndex: "productName"
      // },

      {
        title: "Categor",
        dataIndex: "category",
      },
      {
        title: "Sub-category",
        dataIndex: "subCategory",
      },
      // {
      //   title: "Attribute",
      //   dataIndex: "subCategory"
      // },  // combine attribute+ subattribute
      {
        title: "Price",
        dataIndex: "price",
      },
      // {
      //   title: "Max Discount(%)",
      //   dataIndex: "maxDiscount"
      // },
      // {
      //   title: "Description",
      //   dataIndex: "description"
      // }
    ];

    if (false) {
      return <BundleLoader />;
    }
    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            rowKey=""
            columns={columns}
            loading={fetchingProducts}
            dataSource={products}
            onChange={console.log("contact onChangeHere...")}
            pagination={false}
            scroll={{ y: 320 }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ product }) => ({
  // fetchingProducts: product.fetchingProducts,
  // products: product.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getProducts
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
