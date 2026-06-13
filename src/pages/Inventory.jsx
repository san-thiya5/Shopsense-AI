import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import VoiceInput from '../components/VoiceInput'

function Inventory() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('kg')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, 'inventory'))
    const items = []
    querySnapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() })
    })
    setProducts(items)
  }

  async function addProduct() {
    if (!name || !quantity || !price) {
      alert('Please fill all fields!')
      return
    }
    setLoading(true)
    await addDoc(collection(db, 'inventory'), {
      name,
      quantity: Number(quantity),
      price: Number(price),
      unit,
    })
    setName('')
    setQuantity('')
    setPrice('')
    setLoading(false)
    fetchProducts()
  }

  async function deleteProduct(id) {
    await deleteDoc(doc(db, 'inventory', id))
    fetchProducts()
  }

  function handleVoiceResult(text) {
    alert('You said: ' + text + '\nWe will connect this to Gemini AI next!')
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Inventory</h1>
        <p className="text-slate-400 mt-1">Add and track your stock here</p>
      </div>

      {/* Voice Input */}
      <VoiceInput onResult={handleVoiceResult} />

      {/* Add Product Form */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
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
            className="bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <button
          onClick={addProduct}
          disabled={loading}
          className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          {loading ? 'Adding...' : '+ Add Product'}
        </button>
      </div>

      {/* Product List */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Stock List</h2>
        {products.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No products added yet!</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-700">
                <th className="pb-3">Product</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Price/Unit</th>
                <th className="pb-3">Total Value</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-slate-700 text-white">
                  <td className="py-4 font-medium">{p.name}</td>
                  <td className="py-4">{p.quantity} {p.unit}</td>
                  <td className="py-4">Rs.{p.price}</td>
                  <td className="py-4">Rs.{p.quantity * p.price}</td>
                  <td className="py-4">
                    {p.quantity <= 5 ? (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Low Stock</span>
                    ) : (
                      <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">In Stock</span>
                    )}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => deleteProduct(p.id)}
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

export default Inventory