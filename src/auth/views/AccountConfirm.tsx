import { parse as parseQs } from "qs";
import React from "react";
import { RouteComponentProps } from "react-router";

import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { TypedAccountConfirmMutation } from "../mutations";
import { AccountConfirmUrlQueryParams } from "../urls";

const AccountConfirm: React.FC<RouteComponentProps> = ({ location }) => {
  const navigate = useNavigator();

  const params: AccountConfirmUrlQueryParams = parseQs(location.search.substr(1));
  const notify = useNotifier();
  const displayConfirmationAlert = anyErrors => {
    notify(
      {
        text:
          anyErrors.length > 0
            ? anyErrors.map(error => error.message).join(" ")
            : "You can now log in",
        title: anyErrors.length > 0 ? "Error" : "Account confirmed",
      },
      // { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 }
    );
  };

  React.useEffect(() => {
    this.accountManagerFn({
      variables: { email: params.email, token: params.token },
    })
      .then(result => {
        const possibleErrors = result.data.confirmAccount.errors;
        displayConfirmationAlert(possibleErrors);
      })
      .catch(() => {
        const errors = [
          {
            message: "Something went wrong while activating your account.",
          },
        ];
        displayConfirmationAlert(errors);
      })
      .finally(() => {
        navigate("/", true);
      });
  }, []);
  return (
    <TypedAccountConfirmMutation>
      {accountConfirm => {
        // this.accountManagerFn = accountConfirm;
        accountConfirm({
          variables: { email: params.email, token: params.token },
        })
          .then(result => {
            const possibleErrors = result.data.confirmAccount.errors;
            displayConfirmationAlert(possibleErrors);
          })
          .catch(() => {
            const errors = [
              {
                message: "Something went wrong while activating your account.",
              },
            ];
            displayConfirmationAlert(errors);
          })
          .finally(() => {
            navigate("/", true);
          });
        return <div></div>;
      }}
    </TypedAccountConfirmMutation>
  );
};

AccountConfirm.displayName = "AccountConfirm";
export default AccountConfirm;
