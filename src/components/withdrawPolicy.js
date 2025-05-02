import React from 'react';
import './WithdrawCashPage.css';

const WithdrawCashPage = () => {
  return (
    <div className="withdraw-page">
      <h1>Withdraw Cash</h1>

      <section>
        <h2>How do I withdraw cash?</h2>
        <p>You can Withdraw Cash at any time by going to My Account page and clicking on Withdraw Cash. You are then asked to enter an amount you would like to withdraw. You can only withdraw an amount less than or equal to your Withdrawable Balance. This will be shown to you on the Withdraw Cash page.</p>
        <p>For making a withdrawal, you need to be ID verified. If you are not ID verified, you will be prompted to upload a copy of your ID proof. Our customer service team will verify your document. You can also upload it from the Profile section under My Accounts.</p>
      </section>

      <section>
        <h2>What is the minimum amount I can withdraw?</h2>
        <p>The minimum withdrawal amount is ₹100.</p>
      </section>

      <section>
        <h2>What is the maximum amount I can withdraw?</h2>
        <p>You can withdraw your entire Withdrawable Account balance at any time. It includes all your winnings, bonuses earned while playing, and used deposit amounts.</p>
      </section>

      <section>
        <h2>Deposit and Withdrawable Accounts</h2>
        <p>If you are a cash player, your account is divided into:</p>
        <ul>
          <li><strong>Deposit Account:</strong> Amount deposited but not yet played with.</li>
          <li><strong>Withdrawable Account:</strong> Cash winnings and used deposits.</li>
        </ul>
        <p>Example: Deposit ₹100, play with ₹100, win ₹500 → Deposit Account = ₹0, Withdrawable = ₹900.</p>
      </section>

      <section>
        <h2>View Your Balances</h2>
        <p>Check your Deposit and Withdrawable balances under <strong>Account Overview</strong> in My Accounts.</p>
      </section>

      <section>
        <h2>Online Transfer Facility</h2>
        <p>Provide your Bank Account Number and MICR code to enable online transfers. Optionally add IFSC code, Bank Name, and Branch Area for faster processing.</p>
        <p>Transfers are processed every day except Sundays and bank holidays. With complete details, expect processing within 1-3 days; otherwise, 5-7 days.</p>
      </section>

      <section>
        <h2>TDS Deductions</h2>
        <p>As per Finance Act 2023, 30% tax is deducted on Net Winnings either during withdrawal or on 31st March.</p>

        <h3>Net Winnings = Total Withdrawals - Total Deposits</h3>
        <p>Example: ₹3000 withdrawn - ₹2000 deposited = ₹1000 Net Winnings → ₹300 TDS</p>

        <h3>No TDS if Withdrawal &lt; Deposit</h3>
        <p>Example: ₹2000 withdrawn - ₹4000 deposited = -₹2000 Net Winnings → No tax</p>

        <h3>Opening Balance Impact</h3>
        <p>If Opening Balance exists, Net Winnings = Withdrawals + Closing Balance - Deposits - Opening Balance</p>
        <p>Tax is 30% of the Net Winnings calculated.</p>
      </section>

      <section>
        <h2>TDS Refunds</h2>
        <p>If your Net Winnings go down during the year, excess tax paid can be claimed via IT Returns. Tax certificates will be issued each quarter to assist in filing.</p>
      </section>

      <section>
        <h2>Common Wallet Policy</h2>
        <p>If you play on both RummyCircle and fantasycricket4u (both run by Games24x7), your tax calculation will consider combined activity.</p>
      </section>

      <section>
        <h2>Tax Calculation Method Update</h2>
        <p>Earlier: Net Winnings = Total Winnings - Entry Fees</p>
        <p>Now (from 1st April 2023): Net Winnings = Total Withdrawals - Total Deposits</p>
      </section>

      <p className="support-note">
        For more queries, please contact our support at <a href="mailto:info@fantasycricket4u.com">info@fantasycricket4u.com</a>
      </p>
    </div>
  );
};

export default WithdrawCashPage;

