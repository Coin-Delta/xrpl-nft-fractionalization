import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toastSuccessObj, toastFailObj } from "../../components/toast";
import { convertToImage } from "../../components/ipfs";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import * as selectors from "../../../store/selectors";
import TransactionLoader from "../../components/transactionLoader";
import auth from "../../../core/auth";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import FractionFirstStep from "./fractionFirstStep";
import FractionSecondStep from "./fractionSecondStep";
import FractionThirdStep from "./fractionThirdStep";
import FractionFourthStep from "./fractionFourthStep";

const Fraction = () => {
  const { state } = useLocation();
  const [nft, setNft] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoaderModal, setShowLoaderModal] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log("state.tokenId", state.tokenId);
    handleGetNfts(state.tokenId);
    handleFractionalizeState();
  }, []);

  const resetForm = () => {
    document.getElementById("trust-line-form").reset();
  };

  const xummWalletDetails = useSelector(selectors.xummWalletDetails);

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

  const handleFractionalizeState = () => {
    const params = {
      identifier: auth.get("identifier"),
    };
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_END_HOST}/getfractionalize_state`,
      params,
    })
      .then(async (response) => {
        if (
          response.data.completed ===
          "Identifier not found or fractionalization is in initial stage"
        ) {
          setActiveStep(0);
        } else if (
          response.data.completed === "set_trustline_and_issue_token"
        ) {
          setActiveStep(1);
        } else if (response.data.completed === "set_trust_owner") {
          setActiveStep(2);
        } else if (response.data.completed === "create_buy_offer") {
          setActiveStep(3);
        } else if (response.data.completed === "Fractionalized") {
          setActiveStep(4);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went wrong", toastFailObj);
      });
  };

  const steps = [
    {
      label: "Trust line and Issue",
      component: (
        <FractionFirstStep
          handleFractionalizeState={handleFractionalizeState}
        />
      ),
    },
    {
      label: "Set Trust Owner",
      component: (
        <FractionSecondStep
          handleFractionalizeState={handleFractionalizeState}
        />
      ),
    },
    {
      label: "Create buy offer",
      component: (
        <FractionThirdStep
          handleFractionalizeState={handleFractionalizeState}
        />
      ),
    },
    {
      label: "Accept buy offer",
      component: (
        <FractionFourthStep
          handleFractionalizeState={handleFractionalizeState}
        />
      ),
    },
  ];

  return (
    <div>
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12 text-center">
                <h1>Fraction</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>{step.component}</StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Fractionalized</Typography>
            </Paper>
          )}
        </div>
      </section>
      <TransactionLoader show={showLoaderModal} />
    </div>
  );
};
export default Fraction;
