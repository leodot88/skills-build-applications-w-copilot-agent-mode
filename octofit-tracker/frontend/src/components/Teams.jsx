import { useCollection } from './api'

function Teams() {
  const { data, loading, error } = useCollection('teams')

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{data.length} teams</span></div><div className="card-grid">{loading && <p className="state-message">Loading teams...</p>}{error && <p className="state-message error-message">{error}</p>}{!loading && !error && data.length === 0 && <p className="state-message">No teams have been created yet.</p>}{data.map((team) => <article className="info-card" key={team._id}><div className="card-mark">{team.name?.slice(0, 2).toUpperCase() || 'TM'}</div><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'A team ready to move together.'}</p><span className="muted-label">{team.members?.length ?? 0} members</span></article>)}</div></section>
}

export default Teams
