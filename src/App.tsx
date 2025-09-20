import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import IPTVPage from './components/IPTVPage'
import AndroidBoxesPage from './components/AndroidBoxesPage'
import AdminPanel from './components/AdminPanel'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  // Clear any messages after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Clear any global success/error messages
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentPage])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'iptv':
        return <IPTVPage />
      case 'android-boxes':
        return <AndroidBoxesPage />
      default:
        return <HomePage />
    }
  }

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onAdminLogin={() => setShowAdminPanel(true)}
      >
        {renderCurrentPage()}
      </Layout>

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </>
  )
}

export default App