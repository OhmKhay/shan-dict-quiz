import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center m-4 mt-auto bg-white rounded-lg dark:bg-gray-800">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://shandictionary.com/" className="hover:underline">
            Shan Dictionary
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/credit" className="mr-4 hover:underline md:mr-6">
              ❤️ Credit
            </a>
          </li>
          <li>
            <a
              href="https://www.shandictionary.com/about-us"
              className="mr-4 hover:underline md:mr-6 "
            >
              About
            </a>
          </li>
          <li>
            <a
              href="https://www.shandictionary.com/privacy-policy"
              className="mr-4 hover:underline md:mr-6"
            >
              Privacy Policy
            </a>
          </li>

          <li>
            <a
              href="https://www.shandictionary.com/about-us"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
