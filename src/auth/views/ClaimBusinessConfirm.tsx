import { parse as parseQs } from "qs";
import * as React from "react";
import { RouteComponentProps } from "react-router";

// import useNavigator from "@saleor/hooks/useNavigator";
// import useNotifier from "@saleor/hooks/useNotifier";
import { TypedClaimBusinessConfirmMutation } from "../mutations";
import { ClaimBusinessConfirmUrlQueryParams } from "../urls";

class ClaimBusinessConfirm extends React.Component<RouteComponentProps> {
  [x: string]: any;
  params: ClaimBusinessConfirmUrlQueryParams = parseQs(
    this.props.history.location.search.substr(1)
  );
  constructor(props) {
    super(props);
  }
  // const notify = useNotifier();
  // const navigate = useNavigator();

  displayConfirmationAlert = anyErrors => {
    alert(
      // {
      //   text:
      anyErrors.length > 0
        ? anyErrors.map(error => error.message).join(" ")
        : "Claimed Business confirmed."
      // title: anyErrors.length > 0 ? "Error" : "Account confirmed",
      // },
      // { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 }
    );
  };

  componentDidMount() {
    this.accountManagerFn({
      variables: { business: this.params.business, email: this.params.email }
    })
      .then(result => {
        const possibleErrors = result.data.claimBusiness.businessErrors;
        this.displayConfirmationAlert(possibleErrors);
      })
      .catch(() => {
        const errors = [
          {
            message: "Something went wrong while activating your account."
          }
        ];
        this.displayConfirmationAlert(errors);
      })
      .finally(() => {
        this.props.history.push("/");
      });
  }
  render() {
    return (
      <TypedClaimBusinessConfirmMutation>
        {claimBusiness => {
          this.accountManagerFn = claimBusiness;
          return <div></div>;
        }}
      </TypedClaimBusinessConfirmMutation>
    );
  }
}

// AccountConfirm.displayName = "AccountConfirm";
export default ClaimBusinessConfirm;
