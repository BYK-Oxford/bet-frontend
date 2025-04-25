import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
      <footer className=" text-gray-400 text-sm text-center py-5 border-t border-[rgba(255,255,255,0.1)]">
        {/* <nav className="flex justify-center flex-wrap gap-6 mb-6 text-[12px] font-medium">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/jobs" className="hover:text-white">Jobs</Link>
        </nav> */}

      {/* Centered Logo */}
      <div className="flex justify-center mb-6">
        <Image
          // src="/BetGenieLogo.png"
          src="/logo2.png"
          alt="Bet Genie Logo"
          width={80}
          height={80}
          className="opacity-70 hover:opacity-100 transition"
        />
      </div>

      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} Bet Genie. All rights reserved.
      </p>
      </footer>
    );
  };
  
  export default Footer;
  