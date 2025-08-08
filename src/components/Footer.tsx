// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-black text-white py-10 mt-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div>
            <h4 className="font-bold mb-2">MyShop</h4>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="font-semibold mb-2">Links</h4>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>Home</li>
              <li>Shop</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  