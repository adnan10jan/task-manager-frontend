import Navbar from "./Navbar.Jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navigation */}
      <Navbar />

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
