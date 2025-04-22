'use client';

import { useEffect, useState } from 'react';
import TermsModal from './TermsModal';

export default function TermsWrapper({ children }: { children: React.ReactNode }) {
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted');
    if (!accepted) {
      setShowTerms(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowTerms(false);
  };

  return (
    <>
      {showTerms && <TermsModal onAccept={handleAccept} />}
      {!showTerms && children}
    </>
  );
}
