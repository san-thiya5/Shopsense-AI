import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

function Sales() {
  const [sales, setSales] = useState([])
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('kg')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSales()
  }, [])

  async function fetchSales() {
    const querySnapshot = await getDocs(collection(db, 'sales'))
    const items = []
    querySnapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() })
    })
    setSales(items)
  }

  async function addSale() {
    if (!product || !quantity || !price) {
      alert('Please fill all fields!')
      return
    }
    setLoading(true)
    await addDoc(collection(db, 'sales'), {
      product,
      quantity: Number(quantity),
      unit,
      price: Number(price),
      total: Number(quantity) * Number(price),
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    })
    setProduct('')
    setQuantity('')
    setPrice('')
    setUnit('kg')
    setLoading(false)
    fetchSales()
  }

  async function deleteSale(id) {
    await deleteDoc(doc(db, 'sales', id))
    fetchSales()
  }

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0)

  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Sales Log</h1>
        <p className="text-slate-400 mt-1">Record every sale you make</p>
      </div>

      <div className="bg-emerald-600 rounded-2xl p-6 mb-8">
        <p className="text-emerald-100 text-sm">Total Revenue</p>
        <h2 className="text-4xl font-bold text-white mt-1">Rs.{totalRevenue}</h2>
        <p className="text-emerald-100 text-xs mt-1">{sales.length} sales recorded</p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Record a Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={product}
            onChange={e => setProduct(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="number"
            placeholder="Quantity Sold"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="kg">kg</option>
            <option value="litre">litre</option>
            <option value="piece">piece</option>
            <option value="packet">packet</option>
            <option value="box">box</option>
          </select>
          <input
            type="number"
            placeholder="Price per unit (Rs.)"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <button
          onClick={addSale}
          disabled={loading}
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          {loading ? 'Saving...' : '+ Record Sale'}
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Sales List</h2>
        {sales.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No sales recorded yet!</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-700">
                <th className="pb-3">Product</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Price/Unit</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id} className="border-b border-slate-700 text-white">
                  <td className="py-4 font-medium">{s.product}</td>
                  <td className="py-4">{s.quantity} {s.unit}</td>
                  <td className="py-4">Rs.{s.price}</td>
                  <td className="py-4 text-emerald-400 font-bold">Rs.{s.total}</td>
                  <td className="py-4 text-slate-400 text-sm">{s.date}</td>
                  <td className="py-4">
                    <button
                      onClick={() => deleteSale(s.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

export default Sales