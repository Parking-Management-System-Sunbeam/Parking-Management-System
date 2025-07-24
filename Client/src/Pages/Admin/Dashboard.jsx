import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import AdminInsight from './Admininsight'
import Table2 from '../../Components/Admin/Table2'



function Dashboard() {
  return (
    <>
    <div className="flex h-screen">
      <aside className="w-64">
        <AdminSidebar/>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <AdminInsight/>
        <Table2/>
      </main>
    </div></>
  )
}

export default Dashboard