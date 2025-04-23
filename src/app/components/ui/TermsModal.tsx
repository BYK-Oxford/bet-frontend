"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";

const markdown = `

Welcome to our app. Please read carefully.

### 1. Usage Restrictions
You agree not to misuse the service or help anyone else do so.

### 2. Intellectual Property
All content, trademarks, and data on this app are protected.

### 3. Privacy Policy
We collect and use personal data as described in our policy.

...you get the idea.

Welcome to our app. Please read carefully.

### 1. Usage Restrictions
You agree not to misuse the service or help anyone else do so.

### 2. Intellectual Property
All content, trademarks, and data on this app are protected.

### 3. Privacy Policy
We collect and use personal data as described in our policy.

...you get the idea.


Welcome to our app. Please read carefully.

### 1. Usage Restrictions
You agree not to misuse the service or help anyone else do so.

### 2. Intellectual Property
All content, trademarks, and data on this app are protected.

### 3. Privacy Policy
We collect and use personal data as described in our policy.

...you get the idea.


Welcome to our app. Please read carefully.

### 1. Usage Restrictions
You agree not to misuse the service or help anyone else do so.

### 2. Intellectual Property
All content, trademarks, and data on this app are protected.

### 3. Privacy Policy
We collect and use personal data as described in our policy.

...you get the idea.

Welcome to our app. Please read carefully.

### 1. Usage Restrictions
You agree not to misuse the service or help anyone else do so.

### 2. Intellectual Property
All content, trademarks, and data on this app are protected.

### 3. Privacy Policy
We collect and use personal data as described in our policy.

...you get the idea.
`;

export default function TermsModal({ onAccept }: { onAccept: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const html = marked(markdown);

  const handleSubmit = () => {
    if (accepted) {
      if (dontAskAgain) {
        localStorage.setItem("termsAccepted", "true");
      }
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
        <div className="bg-black p-8 rounded-2xl shadow-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>

            <div
            className="text-sm prose prose-invert h-64 overflow-y-auto mb-4 pr-2"
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
            disabled={!accepted}
            className={`w-full py-2 rounded bg-[#03BEC2] text-white transition ${
                !accepted ? "opacity-50 cursor-not-allowed" : "hover:bg-[#03BEC2]-700"
            }`}
            >
            Continue
            </button>
        </div>
        </div>



  );
}
