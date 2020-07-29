import { parse as parseQs } from "qs";
import * as React from "react";
import { RouteComponentProps } from "react-router";

// import useNavigator from "@saleor/hooks/useNavigator";
// import useNotifier from "@saleor/hooks/useNotifier";
import { TypedAccountConfirmMutation } from "../mutations";
import { AccountConfirmUrlQueryParams } from "../urls";

class AccountConfirm extends React.Component<RouteComponentProps> {
  [x: string]: any;
  params: AccountConfirmUrlQueryParams = parseQs(this.props.history.location.search.substr(1));
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
            : "Account confirmed. You can now log in",
        // title: anyErrors.length > 0 ? "Error" : "Account confirmed",
      // },
      // { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 }
    );
  };

  componentDidMount() {
    this.accountManagerFn({
      variables: { email: this.params.email, token: this.params.token },
    })
      .then(result => {
        const possibleErrors = result.data.confirmAccount.errors;
        this.displayConfirmationAlert(possibleErrors);
      })
      .catch(() => {
        const errors = [
          {
            message: "Something went wrong while activating your account.",
          },
        ];
        this.displayConfirmationAlert(errors);
      })
      .finally(() => {
        this.props.history.push("/");
      });
  }
  render (){
  return (
    <TypedAccountConfirmMutation>
      {accountConfirm => {
        this.accountManagerFn = accountConfirm;
        return <div></div>;
      }}
    </TypedAccountConfirmMutation>
    );
  }
};

// AccountConfirm.displayName = "AccountConfirm";
export default AccountConfirm;
