import './TermsConditions.css';

import React from 'react';

function TermsAndConditions() {
  return (
    <div className="term-and-condition">
      <h1>Fantasycricket4u Terms and Conditions</h1>

      <p>
        Welcome to www.fantasycricket4u.com! These Terms and Conditions ("Terms")
        govern your use of our fantasy platform and related services. By
        accessing or using our services, you agree to comply with and be bound
        by these Terms. If you do not agree with these Terms, please do not
        use our platform.
      </p>

      <ol>
        <li>
          <p>
            <strong>Account Registration</strong>
          </p>
          <p>
            1.1 Eligibility: To use our fantasy platform, you must be at least
            18 years old or the legal age of majority in your jurisdiction. By
            creating an account, you confirm that you meet these eligibility
            requirements.
          </p>
          <p>
            1.2 Account Information: You are responsible for providing
            accurate and up-to-date information when creating your account.
            Keep your login credentials secure and do not share them with
            others.
          </p>
        </li>

        <li>
          <p>
            <strong>Fantasy Gameplay</strong>
          </p>
          <p>
            2.1 Fair Play: Engage in fair and sportsmanlike behavior while
            participating in fantasy sports. Any form of cheating,
            manipulation, or violation of fair play principles may result in
            account suspension or termination.
          </p>
          <p>
            2.2 Team Management: You have the freedom to manage your fantasy
            team by selecting players, making transfers, and strategizing.
            However, you must comply with our platform's rules and guidelines.
          </p>
        </li>

        <li>
          <p>
            <strong>User Content</strong>
          </p>
          <p>
            3.1 Ownership: Any content you submit, such as team names, logos,
            or comments, remains your property. However, by providing content,
            you grant us a non-exclusive, worldwide, royalty-free license to
            use, display, and distribute such content on our platform.
          </p>
          <p>
            3.2 Prohibited Content: You agree not to submit any content that
            is unlawful, defamatory, obscene, offensive, or infringes on the
            rights of others. We reserve the right to remove any content that
            violates these Terms.
          </p>
        </li>

        <li>
          <p>
            <strong>Termination</strong>
          </p>
          <p>
            We reserve the right to terminate or suspend your account at our
            discretion, with or without notice, for any reason, including but
            not limited to violation of these Terms or engaging in activities
            that compromise the integrity of our platform.
          </p>
        </li>

        <li>
          <p>
            <strong>Intellectual Property</strong>
          </p>
          <p>
            All intellectual property rights related to our fantasy platform,
            including but not limited to trademarks, copyrights, and logos,
            are owned by us or our licensors. You may not use, reproduce, or
            distribute any content from our platform without our express
            permission.
          </p>
        </li>

        <li>
          <p>
            <strong>Privacy</strong>
          </p>
          <p>
            Your use of our platform is also governed by our Privacy Policy.
            Please review the Privacy Policy to understand how we collect,
            use, and protect your personal information.
          </p>
        </li>

        <li>
          <p>
            <strong>Changes to Terms</strong>
          </p>
          <p>
            We may update these Terms from time to time. We will notify you of
            any significant changes through our platform or other
            communication channels. Your continued use of our services after
            such modifications constitutes acceptance of the updated Terms.
          </p>
        </li>

        <li>
          <p>
            <strong>Contact Us</strong>
          </p>
          <p>
            If you have any questions or concerns about these Terms, please
            contact us at
            {' '}
            <a href="mailto:info@fantasycricket4u.com">info@fantasycricket4u.com</a>
            .
          </p>
        </li>
      </ol>

      <p>Thank you for being part of our fantasy community!</p>
    </div>
  );
}

export default TermsAndConditions;
