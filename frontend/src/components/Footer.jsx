export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h1 className="text-xl font-bold mb-2">JobFinder</h1>
          <p className="text-sm">Connecting talent with opportunities worldwide.</p>
        </div>

        
        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="/jobs" className="hover:text-white">Jobs</a></li>
            <li><a href="/companies" className="hover:text-white">Companies</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>


        <div>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
          <p className="mt-4 text-sm">Email: JobFinder@gmail.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
}
