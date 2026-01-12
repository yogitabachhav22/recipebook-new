import React from "react";
import Container from "react-bootstrap/Container";
import { FaInstagram, FaPinterest } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-custom mt-auto">
      <Container className="text-center">
        <hr />

        {/* Brand */}
        <h5 className="footer-brand">🍽️ YouChef</h5>

        <p className="footer-text">
          © {new Date().getFullYear()} YouChef. All rights reserved.
        </p>

        <p className="footer-text">
          Use of this site constitutes acceptance of our{" "}
          <a href="/terms">User Agreement</a>,{" "}
          <a href="/privacy">Privacy Policy</a> and{" "}
          <a href="/fulfillment">Fulfillment Policy</a>.
        </p>

        <p className="footer-small">
          This site may contain affiliate links. We may earn a commission at no
          extra cost to you.
        </p>

        {/* Social Icons */}
        <div className="footer-socials">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Pinterest">
            <FaPinterest />
          </a>
        </div>

        <div className="footer-links">
          <a href="/privacy-preferences">Update Privacy Preferences</a>
          <span> • </span>
          <a href="/content-terms">Terms of Content Use</a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
