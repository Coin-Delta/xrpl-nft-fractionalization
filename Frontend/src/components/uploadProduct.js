import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { FileUpload } from "./components/ipfs";
import axios from "axios";
import auth from "../core/auth";
import { toastSuccessObj, toastFailObj } from "./components/toast";
import { useDispatch, useSelector } from "react-redux";
import WalletNotConnected from "./WalletNotConnected";
import * as selectors from "../store/selectors";
import { walletAction } from "../store/actions/thunks";
import TransactionLoader from "./components/transactionLoader";

var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i;
const validationSchema = Yup.object().shape({
  name: Yup.lazy(() => Yup.string().required("Name is required")),
  supply: Yup.lazy(() => Yup.string().required("Supply is required")),
  description: Yup.lazy(() => Yup.string().required("Description is required")),
  transferfees: Yup.lazy(() => Yup.number().integer().default(0)),
});

const initialValues = {
  name: "",
  supply: "1",
  description: "",
  external_link: "",
  image: "",
  transferfees: 0,
};

const UploadProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [properties, setProperties] = useState([]);
  const [propertyError, setPropertyError] = useState("");
  const [showLoaderModal, setShowLoaderModal] = useState(false);

  const [tempProperties, setTempProperties] = useState([
    { type: "", value: "" },
  ]);

  const handleClosePropertyModal = () => setShowPropertyModal(false);

  const handleShowProperyModal = () => {
    setPropertyError("");
    setTempProperties([
      ...properties,
      {
        type: "",
        value: "",
      },
    ]);
    setShowPropertyModal(true);
  };

  const handleSaveProperties = () => {
    if (
      tempProperties[tempProperties.length - 1].type === "" ||
      tempProperties[tempProperties.length - 1].value === ""
    ) {
      const rows = [...tempProperties];
      rows.splice(tempProperties.length - 1, 1);
      setProperties(rows);
    } else {
      setProperties(tempProperties);
    }
    handleClosePropertyModal(true);
  };

  const addPropertyField = () => {
    if (
      tempProperties[tempProperties.length - 1].type === "" ||
      tempProperties[tempProperties.length - 1].value === ""
    ) {
      setPropertyError("You should fill the type and value of property.");
    } else {
      setTempProperties([
        ...tempProperties,
        {
          type: "",
          value: "",
        },
      ]);
    }
  };

  useEffect(() => {
    dispatch(walletAction());
  }, []);

  const xummWalletDetails = useSelector(selectors.xummWalletDetails);

  const removePropertyFields = (index) => {
    const rows = [...tempProperties];
    rows.splice(index, 1);
    setTempProperties(rows);
  };

  const handleChangeProperty = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...tempProperties];
    list[index][name] = value;
    console.log(list);
    setTempProperties(list);
  };

  const handleCloseLoaderModal = () => {
    resetForm();
    setLoading(false);
    setShowLoaderModal(false);
  };

  const resetForm = () => {
    document.getElementById("upload-product-form").reset();
    setImageFile(null);
  };

  const handleSubmitForm = async (formikData) => {
    if (imageFile === null) {
      setImageError("Image is required");
      return;
    }
    if (imageError !== null) {
      setLoading(true);
      setShowLoaderModal(true);
      try {
        const uri = await FileUpload(imageFile);
        axios({
          headers: {
            user_token: xummWalletDetails.walletToken,
          },
          method: "post",
          url: `${process.env.REACT_APP_BACK_END_HOST}/mintxrplnft`,
          data: {
            ...formikData,
            uri: uri,
            address: xummWalletDetails.walletAccount,
            symbol: formikData.name,
          },
        })
          .then((response) => {
            if (response.data.Message === "Signature declined") {
              toast.error("Declined successfully", toastSuccessObj);
            } else {
              toast.success("Mint Nft Submitted successfully", toastSuccessObj);
            }
            console.log(response);
            setLoading(false);
            handleCloseLoaderModal();
          })
          .catch((err) => {
            setLoading(false);
            setImageFile(null);
            toast.error("Something Went wrong", toastFailObj);
            handleCloseLoaderModal();
          });
      } catch (error) {
        setLoading(false);
        setImageFile(null);
        toast.error("Something Went wrong", toastFailObj);
        handleCloseLoaderModal();
      }
    }
  };

  const handlePreviewImage = (e) => {
    setImageError();
    if (allowedExtensions.exec(e.target.value)) {
      setImageFile(e.target.files[0]);
    } else {
      setImageError("Invalid Image Format");
    }
  };

  return (
    <div>
      {xummWalletDetails &&
      xummWalletDetails.walletAccount &&
      xummWalletDetails.walletToken ? (
        <div>
          <section
            className="jumbotron breadcumb no-bg"
            style={{
              backgroundImage: `url(${"./img/background/subheader.jpg"})`,
            }}
          >
            <div className="mainbreadcumb">
              <div className="container">
                <div className="row m-10-hor">
                  <div className="col-12">
                    <h1 className="text-center">Upload Product</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container">
            <div className="row">
              <div className="col-lg-7 offset-lg-1 mb-5">
                <div className="field-set">
                  <div className="de_tab tab_methods">
                    <ul className="de_nav">
                      <li id="btn1" className="active">
                        <span>
                          <i className="fa fa-tag"></i>Fixed price
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="spacer-20"></div>
                  <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    validateOnMount={validationSchema.isValidSync(
                      initialValues
                    )}
                    onSubmit={async (values, { resetForm }) => {
                      await handleSubmitForm(values);
                    }}
                  >
                    {(formik) => {
                      const { isValid } = formik;
                      return (
                        <Form className="form-border" id="upload-product-form">
                          <div className="field-set">
                            <h5>Image</h5>

                            <p id="file_name">
                              File types supported: JPG, JPEG, PNG, GIF, SVG.
                            </p>
                            <div className="input-group">
                              <div className="mint-nft-image-input-div">
                                <Field
                                  name="image"
                                  type="file"
                                  className="mint-nft-image-input"
                                  onChange={handlePreviewImage}
                                ></Field>
                                {imageFile ? (
                                  <img
                                    src={URL.createObjectURL(imageFile)}
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <label htmlFor="media">
                                    <i className="fa fa-image fa-5x"></i>
                                  </label>
                                )}
                              </div>
                            </div>
                            {imageError && (
                              <div className="error-msg">{imageError}</div>
                            )}
                          </div>

                          <div className="field-set">
                            <h5>Name</h5>
                            <div className="input-group">
                              <Field
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                              />
                            </div>
                            <div className="error-msg">
                              <ErrorMessage name="name" component="div" />
                            </div>
                          </div>

                          <div className="field-set">
                            <h5>Supply</h5>
                            <div className="input-group">
                              <Field
                                className="form-control"
                                type="text"
                                name="supply"
                                placeholder="Enter Supply"
                                disabled
                              />
                            </div>
                            <div className="error-msg">
                              <ErrorMessage name="supply" component="div" />
                            </div>
                          </div>

                          <div className="field-set">
                            <h5>Description</h5>
                            <Field name="description">
                              {({ field, form, meta }) => (
                                <div>
                                  <textarea
                                    className="form-control"
                                    data-autoresize
                                    {...field}
                                  ></textarea>
                                </div>
                              )}
                            </Field>
                            <div className="error-msg">
                              <ErrorMessage
                                name="description"
                                component="div"
                              />
                            </div>
                          </div>

                          <div className="field-set">
                            <h5>External Link</h5>
                            <div className="input-group">
                              <Field
                                className="form-control"
                                type="text"
                                name="external_link"
                                placeholder="Enter Supply"
                              />
                            </div>
                          </div>

                          <div className="field-set">
                            <h5>Transfer fees</h5>
                            <div className="input-group">
                              <Field
                                className="form-control"
                                type="number"
                                name="transferfees"
                                placeholder="Enter Transfer fees"
                              />
                            </div>
                            <div className="error-msg">
                              <ErrorMessage
                                name="transferfees"
                                component="div"
                              />
                            </div>
                          </div>

                          <div className="field-set item-space-between">
                            <h5>Properties</h5>
                            <button
                              className="btn btn-main mt-3"
                              onClick={handleShowProperyModal}
                            >
                              Add
                            </button>
                          </div>
                          <div className="display-flex">
                            {properties.map((property, index) => (
                              <div key={index}>
                                <div className="properties-add">
                                  <div className="properties-add-box">
                                    <div className="properties-add-type">
                                      {property.type}
                                    </div>
                                    <div className="properties-add-value">
                                      {property.value}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            className="btn btn-main mt-4"
                            type="submit"
                            value="Submit"
                            disabled={loading || !isValid}
                          >
                            {!loading && (
                              <span className="indicator-label">Create</span>
                            )}
                            {loading && (
                              <span
                                className="indicator-progress"
                                style={{ display: "block" }}
                              >
                                Please wait...{" "}
                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                              </span>
                            )}
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                  <Modal
                    className="properties"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    show={showPropertyModal}
                    onHide={handleClosePropertyModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Add Properties</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h4 className="red">{propertyError}</h4>
                      {tempProperties.map((property, index) => (
                        <div key={index} className="item-space-between mt-2">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="type"
                            name="type"
                            value={property.type}
                            onChange={(evnt) =>
                              handleChangeProperty(index, evnt)
                            }
                          />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="value"
                            name="value"
                            value={property.value}
                            onChange={(evnt) =>
                              handleChangeProperty(index, evnt)
                            }
                          />
                          <i
                            className="fa fa-times fa-2x mt-1 red"
                            onClick={() => removePropertyFields(index)}
                          ></i>
                        </div>
                      ))}

                      <button
                        className="btn btn-main mt-3"
                        onClick={addPropertyField}
                      >
                        Add More
                      </button>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-main"
                        onClick={handleSaveProperties}
                      >
                        Save
                      </button>
                    </Modal.Footer>
                  </Modal>

                  <TransactionLoader show={showLoaderModal} />
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <WalletNotConnected />
      )}
    </div>
  );
};
export default UploadProduct;
