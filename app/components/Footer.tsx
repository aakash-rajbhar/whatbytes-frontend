import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#002c60] text-white py-6 md:py-8 mt-auto">
      <div className=" mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-6 md:gap-8">
          {/* Filters Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">Filters</h3>
            <ul className="space-y-2 text-sm">
              <li>All</li>
              <li>Electronics</li>
            </ul>
            <p className="text-xs mt-4">© 2024 American</p>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-[#0f62b4] p-2 rounded-full hover:bg-[#03498f] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-[#0f62b4] p-2 rounded-full hover:bg-[#03498f] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-[#0f62b4] p-2 rounded-full hover:bg-[#03498f] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
