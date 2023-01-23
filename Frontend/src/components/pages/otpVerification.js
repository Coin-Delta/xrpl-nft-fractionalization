import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Otp from "../../components/components/otp";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../../config/UserPool";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toastSuccessObj, toastFailObj } from "../components/toast";


const OtpVerfication = () => {
  const location = useLocation();
  const email = location?.state?.email;
  const [loading, setLoading] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined || email === "") {
      navigate("/");
    }
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleResendOtp = async () => {
    setMinutes(1);
    setSeconds(30);
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.resendConfirmationCode(function (err, result) {
      if (err) {
        console.log(err);
        toast.error("Something went wrong.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      toast.success("Otp sent to your email.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    user.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        setLoading(false);
        console.log(err);
        const { code, message } = err;
        if (code === "CodeMismatchException") {
          toast.error("Invalid verification code provided, please try again.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.success("Otp verified successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(function () {
          navigate("/");
        }, 3000);
      }
    });
  };

  return (
    <div>
      <section
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"./img/background/subheader.jpg"})`,
          minHeight: "100vh",
          maxHeight: "100%",
        }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-5 text-light wow fadeInRight"
                data-wow-delay=".5s"
              >
                <div className="spacer-10"></div>
                <h1>Create, sell or collect digital items.</h1>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  ut enim.
                </p>
              </div>
              <div
                className="col-lg-4 offset-lg-2 wow fadeIn"
                data-wow-delay=".5s"
              >
                <div className="form-box">
                  <h2 className="text-center">Otp Verification</h2>
                  <div className="spacer-10"></div>
                  <div className="spacer-10"></div>
                  <form onSubmit={handleVerifyOtp}>
                    <div className="field-set mb-5">
                      <Otp setOtp={setOtp} />
                    </div>
                    <div className="field-set">
                      <button
                        className="btn btn-main mt-4"
                        type="submit"
                        value="Submit"
                      >
                        {!loading && (
                          <span className="indicator-label">Verify</span>
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
                    </div>
                  </form>
                  <div className="text-center">
                    <p className="mb-0">
                      {seconds > 0 || minutes > 0 ? (
                        <>
                          Resend Otp in :&nbsp;&nbsp;
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </>
                      ) : (
                        <>
                          Didn't recieve code?&nbsp;&nbsp;
                          <a
                            className="link"
                            onClick={() => {
                              handleResendOtp(email);
                            }}
                          >
                            Resend Otp
                          </a>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="m-0">
                      Click here to?&nbsp;&nbsp;
                      <a
                        className="link"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        SignIn
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default OtpVerfication;
