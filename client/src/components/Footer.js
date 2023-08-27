import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-footer text-center py-5">
      <div className="container px-5">
        <div className="text-white-50 small">
          <div className="mb-2">&copy; Your Website 2023. All Rights Reserved.</div>
          <a href="#!" className="text-white-50">Privacy</a>
          <span className="mx-1">&middot;</span>
          <a href="#!" className="text-white-50">Terms</a>
          <span className="mx-1">&middot;</span>
          <a href="#!" className="text-white-50">FAQ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
