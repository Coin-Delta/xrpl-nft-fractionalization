import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { convertToImage } from "../../components/ipfs";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as selectors from "../../../store/selectors";
import { toastSuccessObj, toastFailObj } from "../../components/toast";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import auth from "../../../core/auth";

const FractionFirstStep = (props) => {
  const { state } = useLocation();
  const [nft, setNft] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);
  const xummWalletDetails = useSelector(selectors.xummWalletDetails);

  const resetForm = () => {
    document.getElementById("trust-line-form").reset();
  };

  const handleGetNfts = () => {
    const params = {
      token_id: state.tokenId,
    };
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_END_HOST}/getnftdetails/single`,
      params,
    })
      .then(async (response) => {
        setNft(response.data.data);
        setImageUri(await convertToImage(response.data.data.uri));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went wrong", toastFailObj);
      });
  };

  const trustLineSchema = Yup.object().shape({
    token_name: Yup.lazy(() =>
      Yup.string()
        .required("token_name is required")
        .min(3, "Min token size 3")
        .max(3, "Max token size 3")
    ),
    fractions: Yup.lazy(() => Yup.number().integer().default(1)),
  });

  const initialTrustLineValues = {
    token_name: "",
    fractions: 1,
  };

  useEffect(() => {
    console.log("state.tokenId", state.tokenId);
    handleGetNfts(state.tokenId);
  }, []);

  const handleTrustedLineSubmitForm = async (formikData) => {
    setLoading(true);
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BACK_END_HOST}/fractionalize/set_trustline_and_issue_token`,
        data: {
          token_name: formikData.token_name,
          fractions: formikData.fractions.toString(),
          address: xummWalletDetails.walletAccount,
          nft_token_id: nft.token_id,
        },
      })
        .then((response) => {
          toast.success("TrustLine Set Successfully.", toastSuccessObj);
          if (response.data.Success === true) {
            auth.set(response.data.identifier, "identifier", true);
            props.handleFractionalizeState();
          }
          console.log(response);
          setLoading(false);
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Something Went wrong", toastFailObj);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something Went wrong", toastFailObj);
    }
  };
  return (
    <div className="fraction-layout">
      <div className="row">
        <div className="col-md-6">
          {nft && (
            <div>
              <div className="bg-white box">
                <img className="lazy nft-image" src={imageUri} alt="" />
              </div>
              <div className="bg-white box">
                <div className="title">Token Name</div>
                <div className="sub-title">{nft.name}</div>
              </div>
              <div className="bg-white box">
                <div className="title">Description</div>
                <div className="sub-title">{nft.Description}</div>
              </div>
              <div className="bg-white box ">
                <div className="title">Token Id</div>
                <div className="sub-title ellipsis">{nft.token_id}</div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <Formik
            enableReinitialize
            validationSchema={trustLineSchema}
            initialValues={initialTrustLineValues}
            validateOnMount={trustLineSchema.isValidSync(
              initialTrustLineValues
            )}
            onSubmit={async (values, { resetForm }) => {
              await handleTrustedLineSubmitForm(values);
            }}
          >
            {(formik) => {
              const { isValid } = formik;
              return (
                <Form className="form-border" id="trust-line-form">
                  <div className="form-box">
                    <h3>Trust line and Issue</h3>
                    <div className="field-set">
                      <h5>Fraction</h5>
                      <div className="input-group">
                        <Field
                          className="form-control"
                          type="number"
                          name="fractions"
                          placeholder="Enter fraction"
                        />
                      </div>
                      <div className="error-msg">
                        <ErrorMessage name="fractions" component="div" />
                      </div>
                    </div>

                    <div className="field-set">
                      <h5>Token Name</h5>
                      <div className="input-group">
                        <Field
                          className="form-control"
                          type="text"
                          name="token_name"
                          placeholder="Enter token_name"
                        />
                      </div>
                      <div className="error-msg">
                        <ErrorMessage name="token_name" component="div" />
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
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default FractionFirstStep;
