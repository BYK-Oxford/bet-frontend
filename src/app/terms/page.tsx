import { marked } from "marked";

const markdown = `
**BetGenie GENERAL TERMS AND CONDITIONS**


<br />

## <u>Introduction</u>
<br />

www.betgenieuk.com(the "Website") is operated and managed by BYK Oxford Ltd, a company incorporated and registered under the laws of England and Wales, with Company Registration No 16031597 , and having its registered office and business address at 128 City Road, London, United Kingdom, EC1V 2NX.

<br />

<br />

References in these Terms to "BetGenie", "we", "us" and "our" are references to BYK Oxford Limited.

<br />

<br />

Bet Genie is a Software as a Service (SAAS) provider in Data Management for Sports Games, helping users to view pre-game or in-play analysis, risk and operations management in one platform. Bet Genie is not a gambling website or a bookmaker. Our Software is not designed for placing a bet. We do not accept bets on any games on our website or we do not take payments for an outcome of any competition. We share our database with visual risk management tools with sports fans, we have no influence on their decisions whether they would like to use our database for betting purposes or otherwise. As a result We do not accept any responsibility on the outcome of their choices.

<br />

### <u>These Terms and Conditions</u>
<br />
These General Terms and Conditions together with the documents referred to in them (the "Terms") apply to you – and are binding on you – when you access and/or use the Website, open and use a BetGenie Account, and/or use any of the products and Services we offer.

<br />

<br />
Please read these Terms carefully. We aim to make these Terms as clear and fair as possible. However, should you need any explanation regarding any aspect of these Terms or any part of our Services, please contact us using any of the contact details listed in Section 17 below.

<br />

<br />

### <u>Changes to these Terms</u>
<br />

BetGenie may update, amend, edit and supplement these Terms at any time but any material amendment to these Terms will be updated on our website, by means of a pop-up notification on your next visit to the website and you will be asked to actively confirm your acceptance of the amended Terms before continuing to use the Website, or any of the products or Services we offer.

<br />


<br />

### <u>Other Important Terms</u>
<br />

These Terms include and incorporate various other terms, as follows:

<br />



### a.  Our Privacy Policy; We respect your privacy and your data. We do not collect any data from you. You can use BetGenie without registration. However by entering our website you confirm that you are 18 years old or over. We reserve our right to amend or change this policy.
<br />

### b.  Our Pricing Policy; using BetGenie and our service is currently free of charge. BetGenie reserves its right to amend or change this in the future.

<br />

<br />

### <u>Changes to the Website/Service</u>
<br />

We may at any time modify or remove or add content to the Website (other than these Terms) and/or any of our Services.

<br />


### <u>Limitation of Liability</u>
<br />

BetGenie cannot guarantee the correctness of information contained within, or of information obtained from third parties linked to our website. Any information appearing on the BetGenie website is not meant in any way to be a source of professional advice or recommendation to in any way bet or gamble.

<br />


Betgenie accepts no responsibility or liability for any betting or gambling losses or damages which may be incurred by any person or persons using any of the data services, other information contained on this website, third party links, sponsors and affiliates, and any email correspondence. Users of Betgenie should accept that they bet or gamble at their own risk.

<br />

No betting or gambling of any form occurs on the BetGenie website. In a region where betting or gambling is not permitted this site should be used for informational purposes only, and not with a view to betting or gambling via a third party website, including those sponsors and affiliates promoted by BetGenie, where betting or gambling is facilitated. It is the individual's responsibility to ensure that any activity with a third party which facilitates the placement of bets and/or wagers does not breach the laws relating to betting or gambling of the country or state where the individual is based. Under no circumstances will BetGenie be liable for any breach of state or country law that may occur as a result of an individual's usage of this website, or of any other third party website. It is the individual's responsibility to comply with their local laws.

<br />

Users of Betgenie must also understand that it is illegal for anyone under the age of 18 to bet or gamble. Betgenie advises that if your computer is used by children that you should consider the use of parental control software.

<br />

We accept no liability for any damages or losses which arise out of or in connection with your use of the Services or the Website; and

<br />

Our maximum liability to you arising under these Terms will not exceed the value of your account’s monthly subscription which is currently free of charge

<br />

The Services and the Website are provided for personal use only. If you use the Services or the Website for any commercial or business purpose, we will have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.

<br />


The Services and the Website are provided on an “as is” basis and to the fullest extent permitted by law, we make no warranty or representation in relation to the satisfactory quality, fitness for purpose, completeness or accuracy of the Services or the Website.

<br />


### <u>Errors and Interruptions in Play</u>
<br />

If your participation in the Services is interrupted by an internet or system malfunction and that interruption prevents you from continuing to use the Services, your service will continue once you manage to connect to the internet again.

<br />

Although we will take all reasonable measures to ensure that the Website and Services are free from computer viruses we cannot and do not guarantee that the Website and Services are free of such problems. It is your responsibility to protect your systems and have in place the ability to reinstall any data or programs lost due to a virus.

<br />



### 3.  Heads: 9/10 and Tails: 11/10

`;

const Terms = () => {
  const html = marked(markdown);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-left align-left py-10">
      {/* Logo Section */}
      <img
        src="/mainLogo.png"
        alt="BetGenie Logo"
        width={150}
        height={150}
        className="rounded-full mb-6"
      />

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
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default Terms;
