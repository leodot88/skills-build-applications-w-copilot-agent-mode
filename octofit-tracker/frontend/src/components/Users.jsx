import { useCollection } from './api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const { data, loading, error } = useCollection(usersEndpoint)

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your crew</p><h1>Members</h1></div><span className="count-badge">{data.length} members</span></div><div className="card-grid">{loading && <p className="state-message">Loading members...</p>}{error && <p className="state-message error-message">{error}</p>}{!loading && !error && data.length === 0 && <p className="state-message">No members found.</p>}{data.map((user) => <article className="info-card user-card" key={user._id}><div className="avatar">{user.name?.slice(0, 1).toUpperCase() || '?'}</div><div><h2>{user.name || 'Unnamed member'}</h2><p>{user.email || 'No email provided'}</p><span className="muted-label">{user.team?.name || 'No team'}</span></div></article>)}</div></section>
}

export default Users
