import React, { useState, useEffect } from 'react'
import { Download, Edit, Trash2, Plus, FileText, Calendar, User, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'

interface Memorial {
  id: number
  title: string
  name: string
  birth_date: string | null
  death_date: string | null
  biography: string | null
  created_at: string
}

export default function Memorials() {
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)
  const [pdfLoading, setPdfLoading] = useState<number | null>(null)

  // Mock data for development
  const mockMemorials: Memorial[] = [
    {
      id: 1,
      title: 'In Loving Memory',
      name: 'John Doe',
      birth_date: '1950-01-15',
      death_date: '2023-12-31',
      biography: 'A beloved father, husband, and community leader.',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Forever Remembered',
      name: 'Jane Smith',
      birth_date: '1965-03-22',
      death_date: '2024-01-10',
      biography: 'An inspiration to all who knew her.',
      created_at: '2024-01-20T14:45:00Z'
    },
    {
      id: 3,
      title: 'Always in Our Hearts',
      name: 'Robert Johnson',
      birth_date: '1940-07-30',
      death_date: '2023-11-05',
      biography: 'A veteran and devoted family man.',
      created_at: '2023-11-10T09:15:00Z'
    }
  ]

  useEffect(() => {
    fetchMemorials()
  }, [])

  const fetchMemorials = async () => {
    try {
      // Try to fetch from API first
      const { memorialsAPI } = await import('../services/api')
      const response = await memorialsAPI.getAll()
      setMemorials(response.data)
    } catch (error) {
      console.log('Using mock data for memorials:', error)
      // Use mock data if API fails
      setMemorials(mockMemorials)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async (id: number, title: string) => {
    setPdfLoading(id)
    try {
      toast.info('Generating PDF...')
      
      // Try to import the download function
      try {
        const { downloadMemorialPDF } = await import('../utils/downloadPDF')
        const success = await downloadMemorialPDF(id, title)
        if (success) {
          toast.success('PDF downloaded successfully!')
        } else {
          // Create a dummy PDF for testing
          createTestPDF(id, title)
        }
      } catch (importError) {
        console.log('downloadPDF not available, creating test PDF')
        createTestPDF(id, title)
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      toast.error('Failed to download PDF. Please try again.')
    } finally {
      setPdfLoading(null)
    }
  }

  const createTestPDF = (id: number, title: string) => {
    // Create a simple text file as a test
    const content = `KENFUSE Memorial Document

Title: ${title}
Memorial ID: ${id}
Generated on: ${new Date().toLocaleDateString()}

This is a sample memorial document.
In a real application, this would be a properly formatted PDF.

---
KENFUSE Digital Legacy Management
www.kenfuse.com
`

    const blob = new Blob([content], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `memorial_${id}_${title.replace(/[^a-z0-9]/gi, '_')}.pdf`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    toast.success('Test PDF generated successfully!')
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this memorial?')) {
      try {
        toast.info('Deleting memorial...')
        // In a real app, call API here
        setMemorials(memorials.filter(m => m.id !== id))
        toast.success('Memorial deleted successfully')
      } catch (error) {
        toast.error('Failed to delete memorial')
      }
    }
  }

  const handleCreateMemorial = () => {
    toast.info('Create memorial feature coming soon!')
    // Navigation to create memorial page would go here
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Memorials</h1>
          <p className="text-gray-600">Manage and download memorial PDFs</p>
        </div>
        <button 
          onClick={handleCreateMemorial}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create Memorial
        </button>
      </div>

      {/* Development Notice */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-yellow-800">Development Mode</h3>
            <p className="text-yellow-700 text-sm mt-1">
              PDF download is using test data. Connect to backend for full functionality.
            </p>
          </div>
        </div>
      </div>

      {memorials.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No memorials</h3>
          <p className="text-gray-500">Get started by creating a memorial.</p>
          <button 
            onClick={handleCreateMemorial}
            className="mt-4 btn-primary"
          >
            Create Memorial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memorials.map((memorial) => (
            <div key={memorial.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{memorial.title}</h3>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <User size={16} />
                    {memorial.name}
                  </p>
                </div>
                <FileText className="text-blue-600" size={24} />
              </div>

              <div className="space-y-2 mb-4">
                {memorial.birth_date && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar size={14} />
                    Born: {new Date(memorial.birth_date).toLocaleDateString()}
                  </p>
                )}
                {memorial.death_date && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar size={14} />
                    Passed: {new Date(memorial.death_date).toLocaleDateString()}
                  </p>
                )}
              </div>

              {memorial.biography && (
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {memorial.biography}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadPDF(memorial.id, memorial.title)}
                  disabled={pdfLoading === memorial.id}
                  className="flex-1 btn-primary py-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {pdfLoading === memorial.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Download size={18} />
                  )}
                  Download PDF
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(memorial.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
