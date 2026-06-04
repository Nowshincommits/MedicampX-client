import { NavLink } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaGithubAlt } from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Logo></Logo>

            <p className="mt-5 text-slate-600 leading-relaxed max-w-md">
              MediCampX helps organizers and participants manage medical camps efficiently.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <NavLink
                to="/"
                className="p-2 rounded-full bg-white border border-slate-200 hover:bg-primary hover:text-white transition"
              >
                <FaFacebook size={18} />
              </NavLink>

              <NavLink
                to="/"
                className="p-2 rounded-full bg-white border border-slate-200 hover:bg-primary hover:text-white transition"
              >
                <FaTwitter size={18} />
              </NavLink>

              <NavLink
                to="/"
                className="p-2 rounded-full bg-white border border-slate-200 hover:bg-primary hover:text-white transition"
              >
                <FaInstagram size={18} />
              </NavLink>

              <NavLink
                to="/"
                className="p-2 rounded-full bg-white border border-slate-200 hover:bg-primary hover:text-white transition"
              >
                <FaGithubAlt size={18} />
              </NavLink>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Product
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <NavLink to="/" className="hover:text-teal-600 transition">
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-teal-600 transition">
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-teal-600 transition">
                  Solutions
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-teal-600 transition">
                  Tutorials
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <NavLink to="/about" className="hover:text-teal-600 transition">
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers" className="hover:text-teal-600 transition">
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink to="/press" className="hover:text-teal-600 transition">
                  Press
                </NavLink>
              </li>
              <li>
                <NavLink to="/news" className="hover:text-teal-600 transition">
                  News
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <NavLink to="/help" className="hover:text-teal-600 transition">
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-teal-600 transition">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className="hover:text-teal-600 transition">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="hover:text-teal-600 transition">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} MediCampX. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-500">
            <NavLink to="/privacy" className="hover:text-teal-600 transition">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="hover:text-teal-600 transition">
              Terms
            </NavLink>
            <NavLink to="/security" className="hover:text-teal-600 transition">
              Security
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;