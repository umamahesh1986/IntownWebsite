import React from "react";
import "./Privacy.css";
import Header from "./Header";
import Footer from "./Footer";

const Refund = () => {
  return (
    <>
    <Header />
    <section className="legal-container">
      <h1>Refund Policy – INtown</h1>
      
      <p>
        At INtown, our goal is to help you save more at local stores through INtown Privilege. 
        We believe in transparency and want you to clearly understand our refund process before making a purchase.
      </p>

      <h2>1. Digital Privilege Access</h2>
      <p>
        INtown Privilege is a digital product that enables special saving benefits inside the INtown app. 
        Once activated, the product is considered delivered.
      </p>

      <h2>2. No Refund After Activation</h2>
      <p>
        Once your INtown Privilege is activated, the purchase becomes non-refundable, as saving benefits 
        are immediately unlocked and available for use.
      </p>

      <h2>3. Refund in Case of Technical Issues</h2>
      <p>A refund will be considered only if:</p>
      <ul>
        <li>Payment is successful but INtown Privilege Access is not activated, or</li>
        <li>You are unable to use INtown Privilege due to a technical issue from our side, and</li>
        <li>The issue is reported within 48 hours of purchase.</li>
      </ul>
      <p>
        If the total savings achieved by a user within one year are less than the subscription amount, 
        INtown will refund the difference.
      </p>

      <h2>4. How to Request a Refund</h2>
      <p>To request a refund, please email us with:</p>
      <ul>
        <li>Registered mobile number</li>
        <li>Transaction ID</li>
        <li>Reason for refund</li>
      </ul>
      <p>📧 <strong>support@intownlocal.com</strong></p>
      <p>Our support team will review your request and respond within 5–7 working days.</p>

      <h2>5. Refund Processing Time</h2>
      <p>
        If approved, the refund will be credited to the original payment method within 7–10 business days, 
        depending on your bank or payment provider.
      </p>

      <h2>6. Policy Updates</h2>
      <p>
        INtown reserves the right to modify or update this refund policy at any time. 
        Any changes will be reflected on this page.
      </p>
    </section>
    <Footer />
    </>
  );
};

export default Refund;
