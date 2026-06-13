import { Link } from 'react-router-dom'

function Navbar({ onLogout }) {
  return (
    <nav className="bg-slate-800 px-6 py-4 flex items-center justify-between shadow-lg">
      <h1 className="text-xl font-bold text-sky-400">🛒 ShopSense AI</h1>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-white hover:text-sky-400 font-medium">Dashboard</Link>
        <Link to="/inventory" className="text-white hover:text-sky-400 font-medium">Inventory</Link>
        <Link to="/sales" className="text-white hover:text-sky-400 font-medium">Sales</Link>
        <Link to="/udhaar" className="text-white hover:text-sky-400 font-medium">Udhaar</Link>
        <Link to="/reports" className="text-white hover:text-sky-400 font-medium">Reports</Link>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar