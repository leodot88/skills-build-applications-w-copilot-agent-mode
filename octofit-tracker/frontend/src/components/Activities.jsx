import { formatDate, useCollection } from './api'

function Activities() {
  const { data, loading, error } = useCollection('activities')

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Live feed</p><h1>Recent activities</h1></div>
        <span className="count-badge">{data.length} logged</span>
      </div>
      <div className="table-wrap">
        {loading && <p className="state-message">Loading activities...</p>}
        {error && <p className="state-message error-message">{error}</p>}
        {!loading && !error && data.length === 0 && <p className="state-message">No activities have been logged yet.</p>}
        {!loading && !error && data.length > 0 && <table><thead><tr><th>Member</th><th>Activity</th><th>Points</th><th>Recorded</th></tr></thead><tbody>{data.map((activity) => <tr key={activity._id}><td>{activity.user?.name || activity.user || 'Unknown member'}</td><td>{activity.type || activity.activityType || activity.name || 'Activity'}</td><td><strong>{activity.points ?? 0}</strong></td><td>{formatDate(activity.recordedAt || activity.createdAt)}</td></tr>)}</tbody></table>}
      </div>
    </section>
  )
}

export default Activities
