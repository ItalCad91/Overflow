import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <React.Fragment>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YB3J0KTX4D"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-YB3J0KTX4D');
          `}
        </script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div className="card">
          <div
            style={{
              borderRadius: "200px",
              height: "200px",
              width: "200px",
              background: "#F8FAF5",
              margin: "0 auto",
            }}
          >
            <i className="checkmark">✓</i>
          </div>
          <h1>Thank you</h1>
          <p>
            Your message has been sent!
            <br /> I will get back to you asap.
          </p>
          <a
            className="nav-link <%= (page == 'home') ? 'active' : ''; %>"
            href="/"
          >
            <button>Back To Home</button>
          </a>
        </div>
      </body>

      <style>
        {`
          body {
            text-align: center;
            margin: 0;
          }
          h1 {
            color: #88B04B;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-weight: 900;
            font-size: 40px;
            margin-bottom: 10px;
          }
          p {
            color: #404F5E;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-size: 20px;
            margin: 0;
          }
          i {
            color: #9ABC66;
            font-size: 100px;
            line-height: 200px;
            margin-left: -15px;
          }
          .card {
            background: white;
            padding: 60px;
            border-radius: 4px;
            box-shadow: 0 2px 3px #C8D0D8;
            display: inline-block;
            margin: 100px auto;
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default ThankYouPage;
