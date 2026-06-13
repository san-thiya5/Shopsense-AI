import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

function Reports() {
  const [sales, setSales] = useState([])
  const [inventory, setInventory] = useState([])
  const [udhaar, setUdhaar] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    const salesSnap = await getDocs(collection(db, 'sales'))
    const salesData = []
    salesSnap.forEach(doc => salesData.push({ id: doc.id, ...doc.data() }))
    setSales(salesData)

    const inventorySnap = await getDocs(collection(db, 'inventory'))
    const inventoryData = []
    inventorySnap.forEach(doc => inventoryData.push({ id: doc.id, ...doc.data() }))
    setInventory(inventoryData)

    const udhaarSnap = await getDocs(collection(db, 'udhaar'))
    const udhaarData = []
    udhaarSnap.forEach(doc => udhaarData.push({ id: doc.id, ...doc.data() }))
    setUdhaar(udhaarData)

    setLoading(false)
  }

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0)
  const totalUdhaar = udhaar.filter(e => e.status === 'Unpaid').reduce((sum, e) => sum + e.amount, 0)
  const lowStockItems = inventory.filter(p => p.quantity <= 5)

  // Group sales by product
  const productSales = {}
  sales.forEach(s => {
    if (productSales[s.product]) {
      productSales[s.product] += s.total
    } else {
      productSales[s.product] = s.total
    }
  })
  const productList = Object.entries(productSales).map(([product, total]) => ({ product, total }))
  const bestSeller = productList.length > 0 ? productList.reduce((a, b) => a.total > b.total ? a : b) : null
  const lowSeller = productList.length > 0 ? productList.reduce((a, b) => a.total < b.total ? a : b) : null

  if (loading) {
    return <p className="text-white text-center mt-20">Loading reports...</p>
  }

  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <p className="text-slate-400 mt-1">Your shop insights based on real data</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Revenue</p>
          <h2 className="text-4xl font-bold text-sky-400 mt-2">Rs.{totalRevenue}</h2>
          <p className="text-slate-500 text-xs mt-2">{sales.length} sales recorded</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-orange-700">
          <p className="text-slate-400 text-sm">Total Unpaid Udhaar</p>
          <h2 className="text-4xl font-bold text-orange-400 mt-2">Rs.{totalUdhaar}</h2>
          <p className="text-slate-500 text-xs mt-2">{udhaar.filter(e => e.status === 'Unpaid').length} unpaid entries</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-red-700">
          <p className="text-slate-400 text-sm">Low Stock Items</p>
          <h2 className="text-4xl font-bold text-red-400 mt-2">{lowStockItems.length}</h2>
          <p className="text-slate-500 text-xs mt-2">Items running low</p>
        </div>
      </div>

      {/* Sales Breakdown */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Sales Breakdown</h2>
        {productList.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No sales data yet. Start logging sales!</p>
        ) : (
          <div className="space-y-4">
            {productList.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-white mb-1">
                  <span>{s.product}</span>
                  <span className="text-sky-400 font-bold">Rs.{s.total}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-sky-500 h-3 rounded-full transition-all"
                    style={{ width: `${(s.total / totalRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-900 rounded-2xl p-6 border border-red-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Low Stock Alert</h2>
          <div className="space-y-2">
            {lowStockItems.map(p => (
              <div key={p.id} className="flex justify-between text-white">
                <span>{p.name}</span>
                <span className="text-red-300 font-bold">Only {p.quantity} {p.unit} left!</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-800 rounded-2xl p-6 border border-sky-700">
        <h2 className="text-xl font-bold text-white mb-3">AI Insight</h2>
        {bestSeller ? (
          <p className="text-sky-200 text-sm leading-relaxed">
            Your best selling product is <span className="text-white font-bold">{bestSeller.product}</span> with Rs.{bestSeller.total} in revenue.
            Keep extra stock of {bestSeller.product} to avoid running out.
            {lowSeller && bestSeller.product !== lowSeller.product && (
              <span> <span className="text-white font-bold">{lowSeller.product}</span> is your lowest seller — consider reducing its stock to avoid wastage.</span>
            )}
            {totalUdhaar > 0 && (
              <span> You have Rs.{totalUdhaar} in unpaid udhaar — consider sending reminders to customers.</span>
            )}
          </p>
        ) : (
          <p className="text-sky-200 text-sm">No sales data yet. Start logging sales to see AI insights!</p>
        )}
      </div>

    </div>
  )
}

export default Reports