import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const validationRegisterSchema = Yup.object().shape({
  firstName: Yup.lazy(() => Yup.string().required("FirstName is required")),
  lastName: Yup.lazy(() => Yup.string().required("LastName is required")),
  email: Yup.lazy(() =>
    Yup.string().required("Email is required").email("Wrong email format")
  ),
  password: Yup.lazy(() =>
    Yup.string()
      .required("Password is required")
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

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password_con: "",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showComPassword, setShowComPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowComPassword = () => {
    setShowComPassword(!showComPassword);
  };

  const handleSubmitForm = async (formikData) => {
    setLoading(true);
    try {
      axios({
        method: "post",
        url: `http://44.206.116.217:3000/register`,
        data: formikData,
      })
        .then((res) => {
          toast.success("User regiser successfully", {
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
            navigate("/otp-verification", {
              state: { email: formikData.email },
            });
          }, 3000);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            if (err.response.status === "409") {
              toast.error("Email Already exists.", {
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
          }
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
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
                  <h2 className="text-center">Sign Up</h2>
                  <Formik
                    enableReinitialize
                    validationSchema={validationRegisterSchema}
                    initialValues={initialValues}
                    validateOnMount={validationRegisterSchema.isValidSync(
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
                          <div className="row">
                            <div className="col-md-6">
                              <div className="field-set">
                                <label>FirstName</label>
                                <div className="input-group">
                                  <Field
                                    className="form-control"
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter FirstName"
                                  />
                                  <i
                                    className="fa fa-envelope input-group-text"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div className="error-msg">
                                  <ErrorMessage
                                    name="firstName"
                                    component="div"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="field-set">
                                <label>LastName</label>
                                <div className="input-group">
                                  <Field
                                    className="form-control"
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter LastName"
                                  />
                                  <i
                                    className="fa fa-envelope input-group-text"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div className="error-msg">
                                  <ErrorMessage
                                    name="lastName"
                                    component="div"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="field-set">
                            <label>Email Address</label>
                            <div className="input-group">
                              <Field
                                className="form-control"
                                type="email"
                                name="email"
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

                          <div className="field-set">
                            <button
                              className="btn btn-main mt-4"
                              type="submit"
                              value="Submit"
                              disabled={loading || !isValid}
                            >
                              {!loading && (
                                <span className="indicator-label">SignUp</span>
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
                              Already have account?&nbsp;&nbsp;
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
export default Register;
