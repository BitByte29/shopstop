import React from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center justify-center min-h-[10vh] py-4 bg-dp">
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/hritik-pal-472550190/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="text-3xl hover:text-blue-700" />
          </a>
          <a
            href="https://github.com/BitByte29"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="text-3xl hover:text-slate-600" />
          </a>
          <a
            href="https://github.com/BitByte29"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="text-3xl hover:text-red-600" />
          </a>
        </div>
        <div className="font-semibold">
          <p>&copy; 2023 All Rights Reserverd.</p>
          <p>
            Developed by{" "}
            <span className="bg-yellow-300 text-black">Hritik Pal</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
