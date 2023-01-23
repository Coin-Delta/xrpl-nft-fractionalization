// import * as Yup from "yup";
// import {
//   FormikStepper,
//   FormikStep,
//   InputField,
//   CheckBoxField,
//   RadioField,
//   SelectField,
//   FormikHelpers,
// } from "formik-stepper";
// /// You have to Import this line to
// import "../../../node_modules/formik-stepper/dist/style.css";
// import Select from "react-select";

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("The First Name field is required"),
//   lastName: Yup.string().required("The Last Name field is required"),
//   email: Yup.string()
//     .email("The email must be a valid email address.")
//     .required("The Email field is required"),
//   password: Yup.string()
//     .required("The Password field is required")
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*)[A-Za-z\d]{8,}$/,
//       `Must Contain 8 Characters, One Uppercase, One Lowercase,
//       One Number and one special case Character [@$!%*#?&-_]`
//     ),
//   privacy: Yup.boolean()
//     .isTrue()
//     .oneOf([true], "The terms and conditions must be accepted."),
// });

// const optionCategories = [
//   { value: "Featured Artists", label: "Featured Artists" },
//   { value: "Pay to Earn Assets", label: "Pay to Earn Assets" },
//   { value: "Utility Assets", label: "Utility Assets" },
//   { value: "Land Assets", label: "Land Assets" },
// ];
// const SegmintNft = () => {
//   const onSubmit = async (values, { setSubmitting }) => {
//     console.log(values);
//   };

//   return (
//     <div className="container">
//       <FormikStepper
//         /// Accept all Formik props
//         onSubmit={onSubmit} /// onSubmit Function
//         initialValues={{
//           firstName: "",
//           lastName: "",
//           email: "",
//           password: "",
//           privacy: false,
//         }}
//         validationSchema={validationSchema}
//         withStepperLine /// false as default and If it is false, it hides stepper line
//         nextButton={{ label: "Next", style: { background: "blue" } }}
//         prevButton={{ label: "Back", style: { background: "blue" } }}
//         submitButton={{ label: "Done", style: { background: "blue" } }}
//       >
//         <FormikStep
//           label="Choose standard"
//           labelColor="#8574e2"
//           circleColor="#8574e2"
//         >
//           <div className="row">
//             <div className="col-md-8">
//               <h2>Choose Fraction Standard</h2>
//               <div className="choose-fraction-div flex">
//                 <img className="choose-fraction-logo" src="/img/logo-3.png" />
//                 <div>
//                   <p className="p-0 mb-2 font-semibold">
//                     Mint new NFTs (ERC-1155)
//                   </p>
//                   <p className="p-0 m-0">
//                     Create individual, non-fungible fractions that can be sold
//                     directly on SegMint marketplaces.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </FormikStep>
//         <FormikStep
//           label="Choose standard"
//           labelColor="#8574e2"
//           circleColor="#8574e2"
//         >
//           <div className="row">
//             <div className="col-md-8">
//               <h2>Select your NFT to Fractionalize</h2>
//               <p className="p-0 mb-2 ">
//                 Choose your NFT from your wallet to fractionalize. Once
//                 complete, your NFT will be locked by SegMint app in your wallet.
//                 The fractions can be further available in the marketplace to
//                 sell based on your selection. Read our guide for more
//                 information.
//               </p>
//               <input placeholder="Search your NFTs" />
//             </div>
//             <div className="col-md-4 mb-5">
//               <h4>Fractionalization standard</h4>
//               <button className="border-2 width-100-per rounded-full">
//                 ERC-1155
//               </button>
//               <div className="form-box mt-4">
//                 <div>
//                   <label>SegMint NAME</label>
//                 </div>
//                 <div>
//                   <input
//                     className="form-control"
//                     placeholder="e.g. Cryptopunk Frenzy"
//                   />
//                 </div>
//                 <div>
//                   <label>NUMBER OF FRACTIONS TO CREATE</label>
//                 </div>
//                 <div>
//                   <input className="form-control" placeholder="25" />
//                 </div>
//                 <div>
//                   <label>Category</label>
//                 </div>
//                 <Select
//                   menuContainerStyle={{ zIndex: 999 }}
//                   defaultValue={optionCategories[0]}
//                   options={optionCategories}
//                 />
//                 <button
//                   className="btn btn-main mt-4"
//                   type="submit"
//                   value="Submit"
//                 >
//                   Continue
//                 </button>
//               </div>
//             </div>
//           </div>
//         </FormikStep>
//         <FormikStep
//           label="Distribution"
//           labelColor="#8574e2"
//           circleColor="#8574e2"
//         >
//           <div className="row">
//             <h2>Choose a distribution type</h2>
//             <div className="col-md-8 choose-fraction-div">
//               <div className="flex">
//                 <img className="choose-fraction-logo" src="/img/logo-3.png" />
//                 <div>
//                   <p className="p-0 mb-2 font-semibold">
//                     Sell / Distribute SegMints through fractional
//                   </p>
//                   <p className="p-0 m-0">
//                     Once you create your SegMints, you will be able to
//                     distribute your fractions directly on the SegMint site.
//                   </p>
//                 </div>
//               </div>
//               <div className="distribution-div ">
//                 <p className="p-0 m-0 font-semibold">
//                   Fixed price distribution
//                 </p>
//                 <p className="p-0 m-0">
//                   Set the price you want to receive per fraction. SegMints are
//                   distributed in real time.
//                 </p>
//                 <button className="border-2 width-100-per rounded-full">
//                   Choose fixed price
//                 </button>
//               </div>
//             </div>
//           </div>
//         </FormikStep>
//         <FormikStep
//           label="Distribution Setup"
//           labelColor="#8574e2"
//           circleColor="#8574e2"
//         >
//           <div className="row">
//             <div className="col-md-8">
//               <h2>Setup fixed price distribution</h2>
//               <h4 mt-5>Amount enabled for distribution:</h4>
//               <h4 mt-5>Number of Net Fractions you wish to Distribute</h4>
//               <div>
//                 <label>PRICE PER FRACTION (AVAX)</label>
//               </div>
//               <div>
//                 <input className="form-control" placeholder="1000" />
//               </div>
//             </div>
//           </div>
//         </FormikStep>
//         <FormikStep
//           label="Fractionalize Vault"
//           labelColor="#8574e2"
//           circleColor="#8574e2"
//         >
//           <div className="row">
//             <div className="col-md-2"></div>
//             <div className="col-md-5">
//               <h2>Follow steps to create your fractionalize NFTs</h2>
//               <div className="form-box flex">
//                 <img className="choose-fraction-logo" src="/img/logo-3.png" />
//                 <div>
//                   <p className="p-0 mb-2 font-semibold">
//                     Authorize SegMint App as an Approver to Locking Contract
//                   </p>
//                   <span className="p-0 m-0">
//                     Authorize SegMint App as an Approver to Locking Contract
//                   </span>
//                 </div>
//               </div>
//               <div className="form-box flex">
//                 <img className="choose-fraction-logo" src="/img/logo-3.png" />
//                 <div>
//                   <p className="p-0 mb-2 font-semibold">
//                     SegMint App to Lock your NFTSegMint App to Lock your NFT
//                   </p>
//                   <span className="p-0 m-0">SegMint App to Lock your NFT</span>
//                 </div>
//               </div>
//               <div className="form-box flex">
//                 <img className="choose-fraction-logo" src="/img/logo-3.png" />
//                 <div>
//                   <p className="p-0 mb-2 font-semibold">Fractionalize NFT(s)</p>
//                   <span className="p-0 m-0">
//                     You may now fractionalize your NFT(s)
//                   </span>
//                 </div>
//               </div>
//               <div className="form-box flex">
//                 <img className="choose-fraction-logo" src="/img/logo-3.png" />
//                 <div>
//                   <p className="p-0 mb-2 font-semibold">Distribute</p>
//                   <span className="p-0 m-0">List your fractions!</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </FormikStep>
//       </FormikStepper>
//     </div>
//   );
// };
// export default SegmintNft;

import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Select from "react-select";

const optionCategories = [
  { value: "Featured Artists", label: "Featured Artists" },
  { value: "Pay to Earn Assets", label: "Pay to Earn Assets" },
  { value: "Utility Assets", label: "Utility Assets" },
  { value: "Land Assets", label: "Land Assets" },
];

const SegmintNft = () => {
  const [key, setKey] = useState(1);
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
                <h1>Segmint NFT</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row segmint-tab">
          <div className="col-md-12 mt-3">
            <h3>Tab Style 1</h3>
            <div id="tabs1">
              <Tabs
                fill
                defaultActiveKey="1"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab eventKey="1" title="Choose standard">
                  <div className="row">
                    <div className="col-md-8">
                      <h2>Choose Fraction Standard</h2>
                      <div className="choose-fraction-div flex">
                        <img
                          className="choose-fraction-logo"
                          src="/img/logo-3.png"
                        />
                        <div>
                          <p className="p-0 mb-2 font-semibold">
                            Mint new NFTs (ERC-1155)
                          </p>
                          <p className="p-0 m-0">
                            Create individual, non-fungible fractions that can
                            be sold directly on SegMint marketplaces.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setKey(parseInt(key)+1)}>Continue</button>
                </Tab>
                <Tab eventKey="2" title="Select your NFTs">
                  <div className="row">
                    <div className="col-md-8">
                      <h2>Select your NFT to Fractionalize</h2>
                      <p className="p-0 mb-2 ">
                        Choose your NFT from your wallet to fractionalize. Once
                        complete, your NFT will be locked by SegMint app in your
                        wallet. The fractions can be further available in the
                        marketplace to sell based on your selection. Read our
                        guide for more information.
                      </p>
                      <input placeholder="Search your NFTs" />
                    </div>
                    <div className="col-md-4 mb-5">
                      <h4>Fractionalization standard</h4>
                      <button className="border-2 width-100-per rounded-full">
                        ERC-1155
                      </button>
                      <div className="form-box mt-4">
                        <div>
                          <label>SegMint NAME</label>
                        </div>
                        <div>
                          <input
                            className="form-control"
                            placeholder="e.g. Cryptopunk Frenzy"
                          />
                        </div>
                        <div>
                          <label>NUMBER OF FRACTIONS TO CREATE</label>
                        </div>
                        <div>
                          <input className="form-control" placeholder="25" />
                        </div>
                        <div>
                          <label>Category</label>
                        </div>
                        <Select
                          menuContainerStyle={{ zIndex: 999 }}
                          defaultValue={optionCategories[0]}
                          options={optionCategories}
                        />
                        <button
                          className="btn btn-main mt-4"
                          type="submit"
                          value="Submit"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setKey(parseInt(key)-1)}>Back</button>
                  <button onClick={() => setKey(parseInt(key)+1)}>Continue</button>
                </Tab>
                <Tab eventKey="3" title="Distribution">
                  <div className="row">
                    <h2>Choose a distribution type</h2>
                    <div className="col-md-8 choose-fraction-div">
                      <div className="flex">
                        <img
                          className="choose-fraction-logo"
                          src="/img/logo-3.png"
                        />
                        <div>
                          <p className="p-0 mb-2 font-semibold">
                            Sell / Distribute SegMints through fractional
                          </p>
                          <p className="p-0 m-0">
                            Once you create your SegMints, you will be able to
                            distribute your fractions directly on the SegMint
                            site.
                          </p>
                        </div>
                      </div>
                      <div className="distribution-div ">
                        <p className="p-0 m-0 font-semibold">
                          Fixed price distribution
                        </p>
                        <p className="p-0 m-0">
                          Set the price you want to receive per fraction.
                          SegMints are distributed in real time.
                        </p>
                        <button className="border-2 width-100-per rounded-full">
                          Choose fixed price
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setKey(parseInt(key)-1)}>Back</button>
                  <button onClick={() => setKey(parseInt(key)+1)}>Continue</button>
                </Tab>
                <Tab eventKey="4" title="Distribution Setup">
                  <div className="row">
                    <div className="col-md-8">
                      <h2>Setup fixed price distribution</h2>
                      <h4 >Amount enabled for distribution:</h4>
                      <h4>
                        Number of Net Fractions you wish to Distribute
                      </h4>
                      <div>
                        <label>PRICE PER FRACTION (AVAX)</label>
                      </div>
                      <div>
                        <input className="form-control" placeholder="1000" />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setKey(parseInt(key)-1)}>Back</button>
                  <button onClick={() => setKey(parseInt(key)+1)}>Continue</button>
                </Tab>
                <Tab eventKey="5" title="Fractionalize Vault">
                  <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                      <h2>Follow steps to create your fractionalize NFTs</h2>
                      <div className="form-box flex">
                        <img
                          className="choose-fraction-logo"
                          src="/img/logo-3.png"
                        />
                        <div>
                          <p className="p-0 mb-2 font-semibold">
                            Authorize SegMint App as an Approver to Locking
                            Contract
                          </p>
                          <span className="p-0 m-0">
                            Authorize SegMint App as an Approver to Locking
                            Contract
                          </span>
                        </div>
                      </div>
                      <div className="form-box flex">
                        <img
                          className="choose-fraction-logo"
                          src="/img/logo-3.png"
                        />
                        <div>
                          <p className="p-0 mb-2 font-semibold">
                            SegMint App to Lock your NFTSegMint App to Lock your
                            NFT
                          </p>
                          <span className="p-0 m-0">
                            SegMint App to Lock your NFT
                          </span>
                        </div>
                      </div>
                      <div className="form-box flex">
                        <img
                          className="choose-fraction-logo"
                          src="/img/logo-3.png"
                        />
                        <div>
                          <p className="p-0 mb-2 font-semibold">
                            Fractionalize NFT(s)
                          </p>
                          <span className="p-0 m-0">
                            You may now fractionalize your NFT(s)
                          </span>
                        </div>
                      </div>
                      <div className="form-box flex">
                        <img
                          className="choose-fraction-logo"
                          src="/img/logo-3.png"
                        />
                        <div>
                          <p className="p-0 mb-2 font-semibold">Distribute</p>
                          <span className="p-0 m-0">List your fractions!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setKey(key-1)}>Back</button>
                  <button>Submit</button>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SegmintNft;
