import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

function Udhaar() {
  const [entries, setEntries] = useState([])
  const [customer, setCustomer] = useState('')
  const [amount, setAmount] = useState('')
  const [item, setItem] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  async function fetchEntries() {
    const querySnapshot = await getDocs(collection(db, 'udhaar'))
    const items = []
    querySnapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() })
    })
    setEntries(items)
  }

  async function addUdhaar() {
    if (!customer || !amount || !item) {
      alert('Please fill all fields!')
      return
    }
    setLoading(true)
    await addDoc(collection(db, 'udhaar'), {
      customer,
      amount: Number(amount),
      item,
      date: new Date().toLocaleDateString(),
      status: 'Unpaid',
    })
    setCustomer('')
    setAmount('')
    setItem('')
    setLoading(false)
    fetchEntries()
  }

  async function markPaid(id) {
    await updateDoc(doc(db, 'udhaar', id), { status: 'Paid' })
    fetchEntries()
  }

  async function deleteEntry(id) {
    await deleteDoc(doc(db, 'udhaar', id))
    fetchEntries()
  }

  const totalUdhaar = entries
    .filter(e => e.status === 'Unpaid')
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Udhaar Manager</h1>
        <p className="text-slate-400 mt-1">Track who owes you money</p>
      </div>

      <div className="bg-orange-600 rounded-2xl p-6 mb-8">
        <p className="text-orange-100 text-sm">Total Unpaid Udhaar</p>
        <h2 className="text-4xl font-bold text-white mt-1">Rs.{totalUdhaar}</h2>
        <p className="text-orange-100 text-xs mt-1">
          {entries.filter(e => e.status === 'Unpaid').length} people owe you money
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Add Udhaar Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={e => setCustomer(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="Item Taken"
            value={item}
            onChange={e => setItem(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            placeholder="Amount (Rs.)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <button
          onClick={addUdhaar}
          disabled={loading}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          {loading ? 'Saving...' : '+ Add Udhaar'}
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Udhaar List</h2>
        {entries.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No udhaar entries yet!</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-700">
                <th className="pb-3">Customer</th>
                <th className="pb-3">Item</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e => (
                <tr key={e.id} className="border-b border-slate-700 text-white">
                  <td className="py-4 font-medium">{e.customer}</td>
                  <td className="py-4">{e.item}</td>
                  <td className="py-4 text-orange-400 font-bold">Rs.{e.amount}</td>
                  <td className="py-4 text-slate-400 text-sm">{e.date}</td>
                  <td className="py-4">
                    {e.status === 'Unpaid' ? (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Unpaid</span>
                    ) : (
                      <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">Paid</span>
                    )}
                  </td>
                  <td className="py-4 flex gap-3">
                    {e.status === 'Unpaid' && (
                      <button
                        onClick={() => markPaid(e.id)}
                        className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                      >
                        Mark Paid
                      </button>
                    )}
                    <button
                      onClick={() => deleteEntry(e.id)}
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

export default Udhaar