import { marked } from 'marked';

const markdown = `
**Welcome to BetGenie**


<br />

## <u>So, what’s the BetGenie Concept?</u>
<br />

In it’s simplest terms, BetGenie looks to find bets for the games at similar chances with higher odds, to maximise the return in your favour.


<br />

### <u>How does it work?</u>
<br />
Imagine if someone flips a coin and prior to this, you are given an option to bet on:

<br />

### 1.  Heads: @1/2 or Tails: @1/2
### 2.  Heads: @evens or Tails @evens

<br />

Which one would you bet knowing the probability of each is 50% vs 50% under normal circumstances?
Now imagine the odds are slightly changed to 

<br />

### 3.  Heads: 9/10 and Tails: 11/10

<br />

Has the probability changed? The answer is No, so why the odds have changed? They’ve changed because the bookmaker has received a higher demand for Heads.  Because of this; they  have reacted by offering increased odds on tails, to make the offer more attractive to you, enabling them  to “hedge their risk”
This is where the BetGenie comes to equation. We find the best value for money bets and compare the real chance vs market return with sophisticated calculations and risk management models, helping to give you more bang for your money.
The automated high-tech system can compare over 200 teams, over 10 leagues simultaneously.  Additionally, our user-friendly risk management platform, allows you to track previous games and stats for those teams. 
`;

const AboutUs = () => {

  const html = marked(markdown);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-left align-left py-10">
      {/* Logo Section */}
      <img src="/mainLogo.png" alt="BetGenie Logo" width={150} height={150} className="rounded-full mb-6" />

      {/* Render Markdown Content */}
      <div className="relative text-white text-sm text-center p-4 flex items-center justify-center min-h-[150px]">
        {/* Background watermark image */}
        <img
            // src="/BetGenieLogo.png"
            src="/logo2.png"
            alt="Bet Genie Logo"
            className="absolute inset-0 w-80 mx-auto my-auto object-contain opacity-20"
        />

        {/* Text content with background logo */}
        <div
            className="text-justify max-w-3xl px-1 relative z-10"
            dangerouslySetInnerHTML={{ __html: html }}/>
        </div>

    </div>
  );
};

export default AboutUs;
