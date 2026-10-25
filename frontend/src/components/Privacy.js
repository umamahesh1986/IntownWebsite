import React from "react";
import "./Privacy.css";
import Header from "./Header";
import Footer from "./Footer";

const Privacy = () => {
  return (
    <>
    <Header />
    <section className="legal-container">

      <h1>Privacy Policy – Intown</h1>

      <p><strong>Effective Date:</strong> 04 March 2026</p>

      <p>
        Intown (“we”, “our”, or “us”) operates the Intown mobile application (the “App”). 
        This Privacy Policy explains how we collect, use, disclose, and protect your information.
      </p>

      <h2>1. Information We Collect</h2>

      <p>
        <strong>Personal Information:</strong> Phone number (for OTP verification), 
        basic account info, and preferences.
      </p>

      <p>
        <strong>Location Information:</strong> Approximate location data to help 
        show nearby participating merchants.
      </p>

      <p>
        <strong>Usage Information:</strong> App activity, device info, and 
        performance data to improve the experience.
      </p>

      <h2>2. How We Use Your Information</h2>

      <ul>
        <li>To manage user accounts and OTP authentication</li>
        <li>To display nearby participating merchants</li>
        <li>To provide customer support and prevent misuse</li>
      </ul>

      <p>We do not sell your personal information to third parties.</p>

      <h2>3. Merchant Listings</h2>

      <p>
        Merchant information (business name, address, contact details) may be 
        visible to users to help discover services.
      </p>

      <h2>4. Data Sharing</h2>

      <p>
        We may share limited info with trusted service providers 
        (Cloud hosting, Auth, Analytics) who are required to protect user data.
      </p>

      <h2>5. Data Security</h2>

      <p>
        We take reasonable measures to protect user data, though no digital 
        platform is 100% secure.
      </p>

      <h2>6. Data Retention</h2>

      <p>
        We retain info as long as necessary for services or legal obligations. 
        Users may request account deletion.
      </p>

      <h2>7. Children's Privacy</h2>

      <p>
        Intown is not intended for children under 13. We do not knowingly 
        collect their info.
      </p>

      <h2>8. User Rights</h2>

      <p>
        Users may request access, correction, or deletion of their personal 
        information via the contact info below.
      </p>

      <h2>9. Third-Party Services</h2>

      <p>
        The app uses services like Firebase Authentication and Cloud 
        infrastructure which have their own privacy policies.
      </p>

      <h2>10. Changes to This Policy</h2>

      <p>
        Updates will be posted on this page and become effective immediately 
        upon publication.
      </p>

      <h2>11. Contact Us</h2>

      <div className="contact-box">
        <p><strong>Email:</strong> support@intownlocal.com</p>
        <p><strong>Company:</strong> Yagnavihar Lifestyle Private Limited</p>
        <p><strong>Location:</strong> Hyderabad, India</p>
      </div>

    </section>
    <Footer />
    </>
  );
};

export default Privacy;