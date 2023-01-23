import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import * as selectors from "../../../store/selectors";
import { toastSuccessObj, toastFailObj } from "../../components/toast";
import { useSelector } from "react-redux";
import auth from "../../../core/auth";

const FractionThirdStep = (props) => {
  const [loading, setLoading] = useState(false);
  const xummWalletDetails = useSelector(selectors.xummWalletDetails);

  const handleCreateByOffer = async () => {
    setLoading(true);
    try {
      axios({
        headers: {
          user_token: xummWalletDetails.walletToken,
        },
        method: "post",
        url: `${process.env.REACT_APP_BACK_END_HOST}/fractionalize/create_buy_offer`,
        data: { identifier: auth.get("identifier") },
      })
        .then((response) => {
          console.log(response);
          if (response.data.Message === "Signature not found") {
            toast.error("Declined successfully", toastSuccessObj);
          } else {
            toast.success("Trust Owner Set Successfully.", toastSuccessObj);
          }
          props.handleFractionalizeState();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something Went wrong", toastFailObj);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Something Went wrong", toastFailObj);
    }
  };
  return (
    <div className="form-box">
      <h3>Create by offer</h3>

      <div className="field-set">
        <button
          onClick={handleCreateByOffer}
          className="btn btn-main mt-4"
          type="submit"
          value="Submit"
          disabled={loading}
        >
          {!loading && <span className="indicator-label">Submit</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FractionThirdStep;
