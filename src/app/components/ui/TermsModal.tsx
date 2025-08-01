"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";

const markdown = `
**Welcome to BetGenieUK**


<br />


### 1. Your Consent and Liability:

<br/>


BetGenie is not gambling website nor are we a bookmaker. You can not place any bets on our website.  
BetGenie is a Software as a Service (SaaS) provider for Sports games, Risk and Data Management in one 
platform. We do not accept any liability for any losses or damages due to any outcome of our calculations 
or our data we store.

<br/>

By using this website you accept that betting involves risk, moreover you acknowledge that even 10% of chance 
of losing is a possible outcome that may happen. 

<br/>

We are an independent company and all predictions (calculations) are based on using our own data model and algorithms. 


<br/>


### 2. Age Restriction: 

<br/>

You must be 18 years of age or older to use our website. By ticking the box below, you confirm that you are 18 or over.

<br/>


### 3. Data and Intellectual Property

<br/>

All data, content, branding and tools provided by BetGenie UK are the intellectual property of the platform 
and are protected by UK and International Laws. Any distribution, duplication or resale of this is strictly prohibited.

<br/>

We respect your privacy  and we do not collect, store or share any personal data. To use our platform, 
you are not required to create an account

<br/>

By entering the website you agree to our T&Cs and you understand that odds/chances or predictions of any outcome are not guaranteed, 

<br/>



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
        <h2 className="text-xl font-bold mb-4">Terms of Use</h2>

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
            !accepted || !is18Plus
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#03BEC2]-700"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
