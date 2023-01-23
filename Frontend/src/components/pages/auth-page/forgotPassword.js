import React, { useState, useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../../../config/UserPool";
import axios from "axios";
import Otp from "../../components/otp";
import { toastSuccessObj, toastFailObj } from "../../components/toast";

const initialValues = {
  email: "",
  password: "",
  password_con: "",
};

const emailSchema = Yup.object().shape({
  email: Yup.lazy(() =>
    Yup.string().required("Email is required").email("Wrong email format")
  ),
});

const verficationSchema = Yup.object().shape({
  password: Yup.lazy(() =>
    Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
  ),
  password_con: Yup.lazy(() =>
    Yup.string().test(
      "passwords-match",
      "Confirm password must match",
      function (value) {
        return this.parent.password === value;
      }
    )
  ),
});

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showComPassword, setShowComPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowComPassword = () => {
    setShowComPassword(!showComPassword);
  };

  const handleResendOtp = (email) => {
    console.log("handleResendOtp...", email);
    setMinutes(1);
    setSeconds(30);
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    user.forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        toast.success("Otp sent to your email.", toastSuccessObj);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
        toast.error("Something Went wrong.", toastFailObj);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        toast.success("Otp sent to your email.", toastSuccessObj);
      },
    });
  };

  const forgotPasswordSchema = isEmailVerified
    ? verficationSchema
    : emailSchema;

  const handleSubmitForm = async (data) => {
    setLoading(true);
    try {
      if (data.email && otp) {
        handleConfirmPassword(otp, data);
      } else if (data.email) {
        await handleVerifyEmail(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went wrong.", toastFailObj);
    }
  };

  const handleConfirmPassword = (verificationCode, data) => {
    var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

    var userData = {
      Username: data.values.email,
      Pool: UserPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, data.values.password, {
      onSuccess: function (data) {
        toast.success("Password changed successfully.", toastSuccessObj);
        setTimeout(function () {
          navigate("/");
        }, 2000);
        setLoading(false);
      },
      onFailure: function (err) {
        console.log(err);
        setLoading(false);
        const { code, message } = err;
        if (code === "CodeMismatchException") {
          toast.error(
            "Invalid verification code provided, please try again.",
            toastFailObj
          );
        } else {
          toast.error(message, toastFailObj);
        }
      },
    });
  };

  const handleVerifyEmail = async (formikData) => {
    try {
      axios({
        method: "post",
        url: "http://localhost:3000/forgotOTP",
        data: formikData,
      })
        .then(async (res) => {
          console.log("pass");
          await handleResendOtp();
          setIsEmailVerified(true);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            if (err.response.status === "404") {
              toast.error("Email is not register.", toastFailObj);
            } else {
              console.log(err.response.data);
              toast.error(err.response.data.errors.msg, toastFailObj);
            }
          } else {
            toast.error("Something Went wrong.", toastFailObj);
          }
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      toast.error("Something Went wrong.", toastFailObj);
      setLoading(false);
    }
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
                  <h2 className="text-center">Forget Password</h2>
                  <div className="spacer-10"></div>
                  <div className="spacer-10"></div>
                  <Formik
                    enableReinitialize
                    validationSchema={forgotPasswordSchema}
                    initialValues={initialValues}
                    validateOnMount={forgotPasswordSchema.isValidSync(
                      initialValues
                    )}
                    onSubmit={async (values, { resetForm }) => {
                      console.log(values);
                      setLoading(true);
                      await handleSubmitForm(values);
                    }}
                  >
                    {(formik) => {
                      const { isValid } = formik;
                      return (
                        <Form className="form-border">
                          {!isEmailVerified ? (
                            <>
                              <div className="field-set">
                                <label>Email Address</label>
                                <div className="input-group">
                                  <Field
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your Email"
                                  />
                                  <i
                                    className="fa fa-envelope input-group-text"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div className="error-msg">
                                  <ErrorMessage name="email" component="div" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="field-set mb-5">
                                <Otp setOtp={setOtp} />
                              </div>
                              <div className="field-set">
                                <label>Password</label>
                                <div className="input-group">
                                  <Field
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="●●●●●●●●●●"
                                  />
                                  <i
                                    className={
                                      showPassword
                                        ? "fa fa-unlock input-group-text"
                                        : "fa fa-lock input-group-text"
                                    }
                                    aria-hidden="true"
                                    onClick={handleShowPassword}
                                  ></i>
                                </div>
                                <div className="error-msg">
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                  />
                                </div>
                              </div>

                              <div className="field-set">
                                <label>Confirm Password</label>
                                <div className="input-group">
                                  <Field
                                    className="form-control"
                                    type={showComPassword ? "text" : "password"}
                                    name="password_con"
                                    placeholder="●●●●●●●●●●"
                                  />
                                  <i
                                    className={
                                      showComPassword
                                        ? "fa fa-unlock input-group-text"
                                        : "fa fa-lock input-group-text"
                                    }
                                    aria-hidden="true"
                                    onClick={handleShowComPassword}
                                  ></i>
                                </div>
                                <div className="error-msg">
                                  <ErrorMessage
                                    name="password_con"
                                    component="div"
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          <div className="field-set">
                            <button
                              className="btn btn-main mt-4"
                              type="submit"
                              value="Submit"
                              disabled={loading || !isValid}
                            >
                              {!loading && (
                                <span className="indicator-label">Submit</span>
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
                          {isEmailVerified && (
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
                                        handleResendOtp(formik.values.email);
                                      }}
                                    >
                                      Resend Otp
                                    </a>
                                  </>
                                )}
                              </p>
                            </div>
                          )}
                        </Form>
                      );
                    }}
                  </Formik>

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
export default ForgotPassword;
