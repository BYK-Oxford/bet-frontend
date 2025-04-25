'use client';

import { useEffect, useState } from 'react';
import TermsModal from './TermsModal';

export default function TermsWrapper({ children }: { children: React.ReactNode }) {
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const termsAcceptedInSession = sessionStorage.getItem("termsAccepted");
    const dontAskAgainSelected = localStorage.getItem("dontAskAgain");

    // Show the modal only if the terms were not accepted this session and 'dontAskAgain' isn't set
    if (!termsAcceptedInSession && dontAskAgainSelected !== "true") {
      setShowTerms(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("termsAccepted", "true"); // Mark as accepted for this session
    setShowTerms(false); // Hide the modal
  };

  return (
    <>
      {showTerms && <TermsModal onAccept={handleAccept} />}
      {!showTerms && children}
    </>
  );
}
