import { useCollection } from './api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const { data, loading, error } = useCollection(leaderboardEndpoint)

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">The weekly climb</p><h1>Leaderboard</h1></div><span className="count-badge">Top {data.length}</span></div><div className="leaderboard-list">{loading && <p className="state-message">Loading rankings...</p>}{error && <p className="state-message error-message">{error}</p>}{!loading && !error && data.length === 0 && <p className="state-message">No scores yet. Log an activity to get on the board.</p>}{data.map((entry, index) => <article className={`rank-row rank-${index + 1}`} key={entry.user?._id || entry._id || index}><span className="rank-number">{String(index + 1).padStart(2, '0')}</span><div className="rank-name"><strong>{entry.user?.name || entry.name || 'Member'}</strong><small>{entry.activities ?? 0} activities</small></div><strong className="rank-points">{entry.points ?? 0}<small> pts</small></strong></article>)}</div></section>
}

export default Leaderboard
