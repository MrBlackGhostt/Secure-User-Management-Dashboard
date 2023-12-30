interface DashboardProps {
  email: string
  onSignOut?: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ email, onSignOut }) => {
  const recentActivities = [
    "Completed Task A",
    "Updated Profile Information",
    "Read Notifications",
  ]

  const handleLogout = () => {
    if (onSignOut) {
      onSignOut()
    }
    console.log("Logging out...")
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Welcome, {email}!</h1>
      <p className='text-gray-600'>This is your Dashboard.</p>

      <section className='mt-8'>
        <h2 className='text-lg font-semibold mb-2'>Recent Activities</h2>
        <ul className='list-disc pl-4'>
          {recentActivities.map((activity, index) => (
            <li key={index} className='mb-2'>
              {activity}
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-8'>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          onClick={handleLogout}
        >
          Log Out
        </button>
      </section>
    </div>
  )
}

export default Dashboard
