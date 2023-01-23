import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import auth from "../../../core/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions/thunks";


import UserPool from "../../../config/UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { toastSuccessObj, toastFailObj } from "../../components/toast";

const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email("Wrong email format").required("Email is required"),
  password: Yup.lazy(() => Yup.string().required("Password is required")),
});

const initialValues = {
  email: "",
  password: "",
};

const Logintwo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitForm = async (formikData) => {

    auth.clearAppStorage();
    setLoading(true);
    try {
      const user = new CognitoUser({
        Username: formikData.email,
        Pool: UserPool,
      });
      const authDetails = new AuthenticationDetails({
        Username: formikData.email,
        Password: formikData.password,
      });
      user.authenticateUser(authDetails, {
        onSuccess: async (data) => {
          toast.success("Login successfully.", toastSuccessObj);
          console.log("onSuccess", data);
          auth.setToken(data.getAccessToken().getJwtToken(), false);
          navigate("/dashboard");
          setLoading(false);
        actions.sidebarToggle()

        },
        onFailure: (err) => {
          console.log("onFailure", err);
          console.error(err);
          const { code } = err;
          setLoading(false);
          if (code === "NotAuthorizedException") {
            toast.error("Incorrect username or password.", toastFailObj);

          } else if (code === "UserNotConfirmedException") {
            toast.error("Please verify otp before login.", toastFailObj);
            setTimeout(function () {
              navigate("/otp-verification", {
                state: { email: formikData.email },
              });
            }, 3000);

          } else {
            toast.error("Something Went wrong.", toastFailObj);
          }
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired", data);
          console.error(data);
          toast.error("Something Went wrong.", toastFailObj);
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error("Something Went wrong.", toastFailObj);
      console.error(error);
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
                  <h2 className="text-center">Sign In</h2>
                  <Formik
                    enableReinitialize
                    validationSchema={validationLoginSchema}
                    initialValues={initialValues}
                    validateOnMount={validationLoginSchema.isValidSync(
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
                              <ErrorMessage name="password" component="div" />
                            </div>
                            <div style={{ textAlign: "end" }}>
                              <a
                                className="link text-right"
                                onClick={() => navigate("/forgot-password")}
                              >
                                Forgot Password?
                              </a>
                            </div>
                          </div>

                          <div className="field-set">
                            <button
                              className="btn btn-main mt-4"
                              type="submit"
                              value="Submit"
                              disabled={loading || !isValid}
                            >
                              {!loading && (
                                <span className="indicator-label">Login</span>
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
                          <div className="text-center">
                            <p>
                              Dont’t have an account?&nbsp;&nbsp;
                              <a
                                className="link"
                                onClick={() => {
                                  navigate("/register");
                                }}
                              >
                                SignUp
                              </a>
                            </p>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Logintwo;
