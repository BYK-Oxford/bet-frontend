"use client"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use this instead of next/router

export default function Home() {
  const router = useRouter(); // Use the useRouter from next/navigation

  useEffect(() => {
    // Redirect to /home immediately when this page loads
    router.push("/home");
  }, [router]);

  return (
    <div className="flex flex-col gap-6">
      {/* Content aligned within the available space */}
      <h1 className="text-3xl font-bold">Redirecting to the Sports Betting App...</h1>
      <p>If you are not redirected automatically, click <a href="/home">here</a>.</p>
    </div>
  );
}
