import React, { useState } from "react";
import "./Privacy.css";
import "./DeleteAccount.css";
import Header from "./Header";
import Footer from "./Footer";

const DeleteAccount = () => {
  const [accountType, setAccountType] = useState("customer");
  const [email, setEmail] = useState("");
  const [accountId, setAccountId] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const trimmedId = accountId.trim();
    if (!trimmedId) {
      setStatus({ type: "error", message: "Please enter a valid ID." });
      return;
    }

    setIsSubmitting(true);
    try {
     let endpoint = "";

if (accountType === "merchant") {
  endpoint = `https://api.intownlocal.com/IN/merchant/${trimmedId}`;
} 
else if (accountType === "customer") {
  endpoint = `https://api.intownlocal.com/IN/customer/${trimmedId}`;
} 
else if (accountType === "mobile") {
  endpoint = `https://api.intownlocal.com/IN/user/${trimmedId}`;
}

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { accept: "*/*" }
      });

      if (response.status === 204) {
        setStatus({
          type: "success",
          message:
            "Your deletion request has been submitted. If the account exists, it will be removed."
        });
        setAccountId("");
        return;
      }

      const data = await response.json().catch(() => null);
      const apiMessage =
        data && data.error
          ? data.error
          : "Unable to process the request right now.";

      setStatus({
        type: "error",
        message: `${apiMessage} (Status ${response.status}).`
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please try again in a moment."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Header />
    <section className="legal-container">
      <h1>Account Deletion - INtown</h1>

      <p>
        We value your privacy and data rights. Use this form to permanently
        remove your account and data from INtown.
      </p>

      <h2>What will happen</h2>
      <ul>
        <li>Permanent account deletion</li>
        <li>Removal of profile information</li>
        <li>Deletion of chat messages</li>
        <li>Wiping of preferences data</li>
        <li>Removal of matching history</li>
      </ul>

      <h2>Data Retention</h2>
      <p>
        We retain no personal data after deletion except information that must
        be kept for security, fraud prevention, or legal compliance. All such
        information is automatically deleted within 90 days.
      </p>

      <h2>Deletion Request</h2>
      <p>Enter your details to initiate the process.</p>

      <form className="delete-account-form" onSubmit={handleSubmit}>
        
        {/* <label className="delete-account-field">
          <span>Email Address</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label> */}

        <div className="delete-account-field">
          <span>Account Type</span>
          <div className="delete-account-toggle">
            <label className="delete-account-option">
              <input
                type="radio"
                name="accountType"
                value="customer"
                checked={accountType === "customer"}
                onChange={() => setAccountType("customer")}
              />
              Customer (CustomerID)
            </label>
            <label className="delete-account-option">
              <input
                type="radio"
                name="accountType"
                value="merchant"
                checked={accountType === "merchant"}
                onChange={() => setAccountType("merchant")}
              />
              Merchant (MerchantID)
            </label>
           <label className="delete-account-option">
  <input
    type="radio"
    name="accountType"
    value="mobile"
    checked={accountType === "mobile"}
    onChange={() => setAccountType("mobile")}
  />
  User (Mobile Number)
</label>
          </div>
        </div>

        <label className="delete-account-field">
         <span>
  {accountType === "merchant"
    ? "MerchantID"
    : accountType === "mobile"
    ? "Mobile Number"
    : "CustomerID"}
</span>
          <input
           type={accountType === "mobile" ? "tel" : "text"}
            name="accountId"
            value={accountId}
            onChange={(event) => setAccountId(event.target.value)}
           placeholder={
  accountType === "merchant"
    ? "e.g. 100096"
    : accountType === "mobile"
    ? "e.g. 9876543210"
    : "e.g. 10069"
}
            required
          />
        </label>

        <button type="submit" className="delete-account-button">
          {isSubmitting ? "Submitting..." : "Send Deletion Request"}
        </button>
        {status.message && (
          <p className={`delete-account-status ${status.type}`}>
            {status.message}
          </p>
        )}
      </form>

      <p className="legal-note">
        Need help? Contact us at <strong>support@intownlocal.com</strong>
      </p>
    </section>
    <Footer />
    </>
  );
};

export default DeleteAccount;
