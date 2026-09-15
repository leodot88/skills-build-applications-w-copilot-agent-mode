import { useCollection } from './api'

function Workouts() {
  const { data, loading, error } = useCollection('workouts')

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Train with intent</p><h1>Workouts</h1></div><span className="count-badge">{data.length} plans</span></div><div className="card-grid workout-grid">{loading && <p className="state-message">Loading workouts...</p>}{error && <p className="state-message error-message">{error}</p>}{!loading && !error && data.length === 0 && <p className="state-message">No workouts found.</p>}{data.map((workout) => <article className="info-card workout-card" key={workout._id}><div className="workout-top"><span className="difficulty">{workout.fitnessLevel || 'All levels'}</span><span aria-hidden="true">↗</span></div><h2>{workout.title || workout.name || 'Workout plan'}</h2><p>{workout.description || 'A focused session for your next move.'}</p><div className="workout-meta"><span>{workout.duration ? `${workout.duration} min` : 'Flexible duration'}</span><span>{workout.points ? `${workout.points} pts` : 'Build consistency'}</span></div></article>)}</div></section>
}

export default Workouts
