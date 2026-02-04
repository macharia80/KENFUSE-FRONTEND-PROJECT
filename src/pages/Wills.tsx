import React from 'react'
import { FileText, Download, Edit, Trash2, Plus } from 'lucide-react'

export default function Wills() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Wills</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Create Will
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="text-blue-600" size={24} />
              <h3 className="font-semibold">Will Document {i}</h3>
            </div>
            <p className="text-gray-600 mb-4">Created on 2024-01-15</p>
            <div className="flex gap-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Download size={18} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <Edit size={18} />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}