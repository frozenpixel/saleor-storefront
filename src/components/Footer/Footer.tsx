import "./scss/index.scss";

import * as React from "react";

import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";


const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
      <a href="//www.securitymetrics.com/site_certificate?id=285679&tk=a4d8b3616f1a0ffd00a37df5ff975299"
        target="_blank" rel="noopener noreferrer">
        <img src="https://www.securitymetrics.com/static/apps/super/assets/img/Credit_Card_Safe_light.png"
          alt="SecurityMetrics Credit Card Safe" />
      </a>
    </div>
    <Nav />
    <footer className="footer__copyright">
      <div className="container">
        <span>© Copyright 2001-2020 Celletech, Ltd.</span>
      </div>
    </footer>
  </div>
);

export default Footer;
