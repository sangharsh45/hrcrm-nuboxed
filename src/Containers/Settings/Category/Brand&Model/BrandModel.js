import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message, Input } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../Components/UI/Elements";
import {
    getBrandModel,
    addBrandModel,
} from "./BrandModelAction";
import SingleBrandModel from "./SingleBrandModel";

class BrandModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkedBrand: [],
            isTextInputOpen: false,
            addingBrandModel: false,
            brand: "",
            model: "",
            singlebrand: "",
            currentData: ""
        };
    }
    handleClear = () => {
        this.setState({ currentData: "" });
        this.props.getBrandModel();
    };
    setCurrentData = (value) => {
        this.setState({ currentData: value });
    };
    handleChange = ({ target: { name, value } }) =>
        this.setState({ [name]: value });
    handleModelChange = (e) => {
        this.setState({ model: e.target.value });
    }
    handleSearchChange = (e) => {
        this.setState({ currentData: e.target.value });
    };
    toggleInput = () =>
        this.setState((prevState) => ({
            isTextInputOpen: !prevState.isTextInputOpen,
        }));
    handleChange = ({ target: { name, value } }) =>
        this.setState({ [name]: value });
    handleAddBrandModel = () => {
        const { addBrandModel, brandModel } = this.props;
        const { brand, model } = this.state;
        let brandType = {
            brand,
            model,
            userId: this.props.userId,
            orgId: this.props.orgId,
        };
        let exist = brandModel && brandModel.some((element) => element.brand == brand && element.model == model);

        if (exist) {
            message.error(
                "Brand and model has already exist!"
            );
        } else {
            addBrandModel(brandType, () => console.log("add Customer callback"));
        }

        this.setState({
            brand: "",
            model: "",
            singlebrand: "",
            isTextInputOpen: false
        });
    };

    componentDidMount() {
        this.props.getBrandModel();
    }
    render() {
        const {
            fetchingBrandModel,
            brandModel,
            addingBrandModel,
            updatingBrandModel,
        } = this.props;
        const {
            isTextInputOpen,
            brand,
            model,
            singlebrand,
            linkedBrand,
        } = this.state;
        console.log(this.props.brandModel)
        if (fetchingBrandModel) return <BundleLoader />;
        //if (fetchingSectorsError) return <p>We are unable to load data</p>;
        return (
            <>
                <FlexContainer flexWrap="nowrap">
                    <MainWrapper
                        style={{
                            flexBasis: "100%",
                            // height: "30.625em",
                            overflow: "auto",
                            color: "#FFFAFA",
                        }}
                    >
                        <div style={{ width: "18vw", display: "flex" }}>
                            <Input
                                placeholder="Search by Name"
                                width={"100%"}
                                // onSearch={(value) => {
                                //   props.inputCandidateDataSearch(value);
                                //   props.setCurrentData(value);

                                // }}
                                onChange={(e) => this.handleSearchChange(e)}
                                value={this.props.currentData}
                            />
                            <Button
                                type={this.props.currentData ? "primary" : "danger"}
                            // onClick={() => {
                            //   this.props.searchSectorName(this.state.currentData);
                            // }}
                            >
                                Submit
                            </Button>
                            &nbsp;
                            <Button
                                type={this.props.currentData ? "primary" : "danger"}
                                onClick={() => {
                                    this.handleClear();
                                }}
                            >
                                <FormattedMessage id="app.clear" defaultMessage="Clear" />
                            </Button>
                        </div>

                        <FlexContainer flexDirection="column">
                            {/* <Title style={{ padding: 8 }}>Types Of Documents</Title> */}
                            <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                                {brandModel.length &&
                                    brandModel.map((brandmodel, i) => (
                                        <SingleBrandModel
                                            key={i}
                                            value={singlebrand}
                                            name="singlebrand"
                                            brandmodel={brandmodel}
                                            updatingBrandModel={updatingBrandModel}
                                            linkedBrand={linkedBrand}
                                            handleChange={this.handleChange}
                                            handleModelChange={this.handleModelChange}
                                            handleSearchChange={this.handleSearchChange}
                                            currentData={this.state.currentData}
                                            setCurrentData={this.setCurrentData}
                                        />
                                    ))}
                            </MainWrapper>
                        </FlexContainer>
                        {isTextInputOpen ? (
                            <FlexContainer
                                alignItems="center"
                                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
                            >
                                <br />
                                <br />

                                <TextInput
                                    placeholder="Add brand"
                                    name="brand"
                                    value={brand}
                                    onChange={this.handleChange}
                                    width="36%"
                                    style={{ marginRight: "2px" }}
                                />
                                <br />
                                <TextInput
                                    placeholder="Add Model"
                                    name="model"
                                    value={model}
                                    onChange={this.handleModelChange}
                                    width="36%"
                                    style={{ marginRight: "2px" }}
                                />
                                &nbsp;
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // disabled={!name}
                                    Loading={addingBrandModel}
                                    onClick={this.handleAddBrandModel}
                                    style={{ marginRight: "0.125em" }}
                                >
                                    {/* Save */}
                                    <FormattedMessage id="app.save" defaultMessage="Save" />
                                </Button>
                                &nbsp;
                                <Button type="primary" ghost onClick={this.toggleInput}>
                                    {/* Cancel */}
                                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                                </Button>
                            </FlexContainer>
                        ) : (
                            <>
                                <br />
                                <FlexContainer justifyContent="flex-end">
                                    <Button
                                        type="primary"
                                        ghost
                                        htmlType="button"
                                        loading={addingBrandModel}
                                        onClick={this.toggleInput}
                                    >
                                        Add More
                                        {/* <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    /> */}
                                    </Button>
                                </FlexContainer>
                                {/* <h4>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</h4> */}
                            </>
                        )}
                    </MainWrapper>
                </FlexContainer>

            </>
        );
    }
}

const mapStateToProps = ({ brandmodel, auth }) => ({
    addingBrandModel: brandmodel.addingBrandModel,
    addingBrandModelError: brandmodel.addingBrandModelError,
    brandModel: brandmodel.brandModel,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    fetchingBrandModel: brandmodel.fetchingBrandModel,
    fetchingBrandModelError: brandmodel.fetchingBrandModelError,
    updatingBrandModel: brandmodel.updatingBrandModel
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBrandModel,
            addBrandModel,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(BrandModel);
