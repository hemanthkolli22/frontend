import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react"; // icons

export default function Navbar() {
  const userInfo = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (path) =>
    `${location.pathname === path ? "text-yellow-300 font-semibold" : "text-white"} hover:text-yellow-200 transition duration-200`;

  return (
    <nav className="bg-purple-600/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-white font-extrabold text-2xl tracking-wide"
          >
            JobFinder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/jobs" className={linkClass("/jobs")}>Jobs</Link>

            {role === "jobseeker" && (
              <Link to="/my-applications" className={linkClass("/my-applications")}>
                My Applications
              </Link>
            )}
            {role === "recruiter" && (
              <Link to="/post-job" className={linkClass("/post-job")}>
                Post Job
              </Link>
            )}
            {role === "admin" && (
              <>
                <Link to="/manage-users" className={linkClass("/manage-users")}>
                  Manage Users
                </Link>
                <Link to="/manage-jobs" className={linkClass("/manage-jobs")}>
                  Manage Jobs
                </Link>
              </>
            )}

            {!userInfo ? (
              <>
                <Link
                  to="/login"
                  className="ml-2 bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-500 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-500 transition duration-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:opacity-90 transition"
                >
                  <img
                    src={`https://up.yimg.com/ib/th/id/OIP.tY95ngxkRp1RDhbc4i3t3QHaHa?pid=Api&rs=1&c=1&qlt=95&w=107&h=107name=${encodeURIComponent(
                      userInfo.name
                    )}&background=6B21A8&color=fff`}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-white shadow"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <User size={16}/> My Profile
                    </Link>
                    {role === "jobseeker" && (
                      <Link
                        to="/my-applications"
                        onClick={closeMenu}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Applications
                      </Link>
                    )}
                    {role === "recruiter" && (
                      <Link
                        to="/post-job"
                        onClick={closeMenu}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Post Job
                      </Link>
                    )}
                    {role === "admin" && (
                      <>
                        <Link
                          to="/manage-users"
                          onClick={closeMenu}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Manage Users
                        </Link>
                        <Link
                          to="/manage-jobs"
                          onClick={closeMenu}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Manage Jobs
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16}/> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={26}/> : <Menu size={26}/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-2 bg-purple-600/90 backdrop-blur-md shadow-lg">
          <Link to="/" onClick={closeMenu} className={linkClass("/")}>
            Home
          </Link>
          <Link to="/jobs" onClick={closeMenu} className={linkClass("/jobs")}>
            Jobs
          </Link>
          {role === "jobseeker" && (
            <Link to="/my-applications" onClick={closeMenu} className={linkClass("/my-applications")}>
              My Applications
            </Link>
          )}
          {role === "recruiter" && (
            <Link to="/post-job" onClick={closeMenu} className={linkClass("/post-job")}>
              Post Job
            </Link>
          )}
          {role === "admin" && (
            <>
              <Link to="/manage-users" onClick={closeMenu} className={linkClass("/manage-users")}>
                Manage Users
              </Link>
              <Link to="/manage-jobs" onClick={closeMenu} className={linkClass("/manage-jobs")}>
                Manage Jobs
              </Link>
            </>
          )}

          {!userInfo ? (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-100 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-400 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="block hover:text-yellow-200 text-white font-medium"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
