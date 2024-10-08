import React from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import UserTable from '../components/UserTable'

const Dashboard = () => {
  return (
    <Layout>
         <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card link="/new_user" icon="👤" title="New Users" value="8,267" />
      <Card link="/find_users" icon="📦" title="Find Users" value="" />
    </div>
    <UserTable />
  </div>
    </Layout>
  )
}

export default Dashboard