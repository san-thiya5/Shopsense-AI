import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [totalSales, setTotalSales] = useState(0)
  const [totalUdhaar, setTotalUdhaar] = useState(0)
  const [lowStock, setLowStock] = useState(0)
  const [recentSales, setRecentSales] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    // Fetch Sales
    const salesSnap = await getDocs(collection(db, 'sales'))
    const salesData = []
    let revenue = 0
    salesSnap.forEach(doc => {
      const d = { id: doc.id, ...doc.data() }
      salesData.push(d)
      revenue += d.total
    })
    setTotalSales(revenue)
    setRecentSales(salesData.slice(-5).reverse())

    // Fetch Udhaar
    const udhaarSnap = await getDocs(collection(db, 'udhaar'))
    let udhaarTotal = 0
    udhaarSnap.forEach(doc => {
      const d = doc.data()
      if (d.status === 'Unpaid') udhaarTotal += d.amount
    })
    setTotalUdhaar(udhaarTotal)

    // Fetch Inventory
    const inventorySnap = await getDocs(collection(db, 'inventory'))
    let lowCount = 0
    inventorySnap.forEach(doc => {
      const d = doc.data()
      if (d.quantity <= 5) lowCount++
    })
    setLowStock(lowCount)

    setLoading(false)
  }

  if (loading) {
    return <p className="text-white text-center mt-20">Loading dashboard...</p>
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back! 👋</h1>
        <p className="text-slate-400 mt-1">Here is your shop summary</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Revenue</p>
          <h2 className="text-4xl font-bold text-sky-400 mt-2">Rs.{totalSales}</h2>
          <p className="text-slate-500 text-xs mt-2">From all sales</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Udhaar</p>
          <h2 className="text-4xl font-bold text-orange-400 mt-2">Rs.{totalUdhaar}</h2>
          <p className="text-slate-500 text-xs mt-2">Unpaid credit</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Low Stock Items</p>
          <h2 className="text-4xl font-bold text-red-400 mt-2">{lowStock}</h2>
          <p className="text-slate-500 text-xs mt-2">Items running low</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/inventory')}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl p-4 text-center font-medium transition"
          >
            Add Stock
          </button>
          <button
            onClick={() => navigate('/sales')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl p-4 text-center font-medium transition"
          >
            Log Sale
          </button>
          <button
            onClick={() => navigate('/udhaar')}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-4 text-center font-medium transition"
          >
            Add Udhaar
          </button>
          <button
            onClick={() => navigate('/reports')}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 text-center font-medium transition"
          >
            View Report
          </button>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Recent Sales</h2>
        {recentSales.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No sales yet. Start by logging a sale!</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-700">
                <th className="pb-3">Product</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map(s => (
                <tr key={s.id} className="border-b border-slate-700 text-white">
                  <td className="py-4 font-medium">{s.product}</td>
                  <td className="py-4">{s.quantity} {s.unit}</td>
                  <td className="py-4 text-emerald-400 font-bold">Rs.{s.total}</td>
                  <td className="py-4 text-slate-400 text-sm">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

export default Dashboard