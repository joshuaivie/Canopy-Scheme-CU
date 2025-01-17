import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { ResendVerificationEmailContext } from "pages/Dashboard";
import { BtnLoadingSpinner } from "components/spinners";

const FeatureLock = () => (
  <ResendVerificationEmailContext.Consumer>
    {context => (
      <div className="feature-lock-container">
        <FontAwesomeIcon icon="lock" size="6x" />
        <br />
        <br />
        <p>
          This feature is locked because your account is not yet verified. If you have
          not received the verification email, click the button below.
        </p>
        <Button
          onClick={context.resendEmailVerificationLink}
          disabled={
            context.verificationEmailSent || context.resendVerificationEmailIsLoading
          }
        >
          {context.resendVerificationEmailIsLoading ? <BtnLoadingSpinner /> : "Resend"}
        </Button>
      </div>
    )}
  </ResendVerificationEmailContext.Consumer>
);
export default FeatureLock;
