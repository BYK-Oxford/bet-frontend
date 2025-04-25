"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";

const markdown = `
**Welcome to BetGenieUK**


<br />


### 1. Age Restriction

<br/>


By using this service, you confirm that you are 18 years of age or older. 
BetGenieUK does not permit users under the age of 18 to use its services in any capacity.


<br/>


### 2. Consent & Personal Responsibility

<br/>

BetGenieUK provides betting odds comparisons and predictions based on statistical value calculations.
All predictions and suggestions are made using our own data models and algorithms.

<br/>

By using our service, you acknowledge and accept that betting involves risk and that you are responsible 
for any losses incurred. BetGenieUK is not liable for any financial loss or betting outcomes.

<br/>

### 3. How BetGenie Works

<br/>

We analyze past games and compare odds across bookmakers to help find value bets—those 
with a better return relative to the actual chance of success.

<br/>

We do not offer bets ourselves; we only provide data, odds, and 
insights collected from publicly available sources.

<br/>

Our goal is to increase your edge, not promise guaranteed wins.

<br/>

### 4. Data & Intellectual Property
<br/>

All data, content, branding, and tools provided by BetGenieUK are the intellectual 
property of the platform and are protected by law. Any redistribution, duplication, 
or resale is strictly prohibited.

<br/>


### 5. No Data Collection

<br/>

We respect your privacy.

<br/>

BetGenieUK does not collect, store, or share any personal data from users.

<br/>

You do not need to create an account or provide any information to use our service. 
Everything we show is based on publicly available odds and our internal calculations.

<br/>


### 6. Final Note

<br/>

By continuing to use BetGenieUK, you agree to our Terms and acknowledge:

<br/>

<li>You are 18+ of age</li>

<li>You accept full responsibility for any use of betting information</li>

<li>You understand that odds and outcomes are not guaranteed</li>

<li>You bet at your own risk</li>

`;

export default function TermsModal({ onAccept }: { onAccept: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [is18Plus, setIs18Plus] = useState(false); // New state for 18+ checkbox
  const html = marked(markdown);

  useEffect(() => {
    // Check if the terms have already been accepted in the session or if "Don't Ask Again" is selected
    const termsAcceptedInSession = sessionStorage.getItem("termsAccepted");
    const dontAskAgainSelected = localStorage.getItem("dontAskAgain");

    if (termsAcceptedInSession === "true" || dontAskAgainSelected === "true") {
      // If the terms have been accepted in this session or the user selected "Don't Ask Again", close the modal
      onAccept();
    }
  }, []);

  const handleSubmit = () => {
    if (accepted && is18Plus) {
      if (dontAskAgain) {
        // Store in localStorage to remember the choice across sessions
        localStorage.setItem("dontAskAgain", "true");
      }
      // Store in sessionStorage to remember it for the current session
      sessionStorage.setItem("termsAccepted", "true");
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-black p-8 rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>

        <div
          className="text-xs prose prose-invert h-64 overflow-y-auto mb-4 pr-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="accept"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="accept">I accept the terms & conditions</label>
        </div>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="is18Plus"
            checked={is18Plus}
            onChange={(e) => setIs18Plus(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="is18Plus">I am 18 years or older</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="dontAsk"
            checked={dontAskAgain}
            onChange={(e) => setDontAskAgain(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="dontAsk">Don't ask me again</label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!accepted || !is18Plus} // Disable button if either checkbox is not selected
          className={`w-full py-2 rounded bg-[#03BEC2] text-white transition ${
            !accepted || !is18Plus ? "opacity-50 cursor-not-allowed" : "hover:bg-[#03BEC2]-700"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}