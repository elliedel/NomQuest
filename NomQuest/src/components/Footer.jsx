import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-primary text-light py-8">
      <div className="container mx-auto px-4">
        {/*<p className="text-center mb-4">
          Discover delicious food options in your neighborhood with NomQuest!
        </p>*/}
        
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/about" className="hover:text-earth">About Us</Link>
          <Link to="/privacy" className="hover:text-earth">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-earth">Terms of Service</Link>
        </div>

        {/* <div className="text-center mb-4">
          <span className="text-lg font-semibold">Follow Us:</span>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="w-6 h-6 hover:text-earth">
                <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.66 9.12 8.44 9.88v-6.97H7.49V12h3.95V9.5c0-3.91 2.36-6.06 5.82-6.06 1.68 0 3.49.3 3.49.3v3.85h-1.97C17.41 7.59 16 8.78 16 10.49V12h3.44l-.55 3.91H16v6.97C20.34 21.12 22 17 22 12z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="w-6 h-6 hover:text-earth">
                <path d="M23.639 4.337c-.883.39-1.83.65-2.827.77 1.014-.608 1.794-1.568 2.165-2.724-.951.566-2.006.978-3.127 1.2-.895-.952-2.167-1.547-3.58-1.547-2.708 0-4.905 2.195-4.905 4.905 0 .385.043.76.127 1.124C7.691 8.091 4.066 6.235 1.64 3.394c-.426.73-.669 1.577-.669 2.488 0 1.713.871 3.22 2.188 4.105-.807-.025-1.566-.247-2.227-.616v.062c0 2.397 1.699 4.396 3.951 4.853-.414.111-.849.171-1.298.171-.318 0-.627-.031-.931-.089.631 1.963 2.463 3.394 4.629 3.43-1.698 1.327-3.84 2.115-6.162 2.115-.4 0-.792-.024-1.175-.071 2.177 1.39 4.771 2.202 7.557 2.202 9.051 0 13.981-7.487 13.981-13.981 0-.213-.004-.425-.014-.637.96-.693 1.795-1.558 2.454-2.548z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="w-6 h-6 hover:text-earth">
                <path d="M12 0c-3.313 0-3.745.013-5.06.073-1.317.061-2.264.271-3.063.577-.824.353-1.529.787-2.213 1.571-.684.684-1.218 1.389-1.571 2.213-.306.799-.516 1.746-.577 3.063C.013 8.255 0 8.687 0 12c0 3.313.013 3.745.073 5.06.061 1.317.271 2.264.577 3.063.353.824.787 1.529 1.571 2.213.684.684 1.389 1.218 2.213 1.571.799.306 1.746.516 3.063.577 1.315.061 1.747.073 5.06.073s3.745-.013 5.06-.073c1.317-.061 2.264-.271 3.063-.577.824-.353 1.529-.787 2.213-1.571.684-.684 1.218-1.389 1.571-2.213.306-.799.516-1.746.577-3.063C24 15.688 24 15.313 24 12c0-3.313-.013-3.745-.073-5.06-.061-1.317-.271-2.264-.577-3.063-.353-.824-.787-1.529-1.571-2.213C19.745.787 19.052.353 18.227 0 17.428-.306 16.481-.516 15.164-.577 13.845-.634 13.313-.647 12 0zm0 2.75c3.16 0 3.549.012 4.795.069 1.099.051 1.78.24 2.243.395.528.174.912.385 1.295.773.384.384.594.767.773 1.295.155.463.344 1.144.395 2.243.057 1.246.069 1.634.069 4.795 0 3.16-.012 3.549-.069 4.795-.051 1.099-.24 1.78-.395 2.243-.174.528-.385.912-.773 1.295-.384.384-.767.594-1.295.773-.463.155-1.144.344-2.243.395-1.246.057-1.634.069-4.795.069-3.16 0-3.549-.012-4.795-.069-1.099-.051-1.78-.24-2.243-.395-.528-.174-.912-.385-1.295-.773-.384-.384-.594-.767-.773-1.295-.155-.463-.344-1.144-.395-2.243C2.762 16.549 2.75 16.16 2.75 12c0-4.16.012-4.549.069-5.795.051-1.099.24-1.78.395-2.243.174-.528.385-.912.773-1.295.384-.384.767-.594 1.295-.773.463-.155 1.144-.344 2.243-.395C8.45 2.762 8.84 2.75 12 2.75zm0 5.25a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5zm0 10.25a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.25-10.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"/>
              </svg>
            </a>
          </div>
        </div> */}

        <p className="text-center text-sm">
          {new Date().getFullYear()} &copy; NomQuest by Ellaine Dela Cruz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
