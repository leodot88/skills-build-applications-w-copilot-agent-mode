import { Router } from 'express';
import { Activity, Team, User, Workout } from './models.js';

const router = Router();

router.get('/users', async (_request, response) => {
  response.json(await User.find().populate('team').sort({ name: 1 }));
});

router.post('/users', async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Unable to create user' });
  }
});

router.get('/teams', async (_request, response) => {
  response.json(await Team.find().populate('members').sort({ name: 1 }));
});

router.post('/teams', async (request, response) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Unable to create team' });
  }
});

router.get('/activities', async (request, response) => {
  const filter = request.query.user ? { user: request.query.user } : {};
  response.json(await Activity.find(filter).populate('user').sort({ recordedAt: -1 }));
});

router.post('/activities', async (request, response) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(await activity.populate('user'));
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Unable to create activity' });
  }
});

router.get('/leaderboard', async (_request, response) => {
  const leaderboard = await Activity.aggregate([
    { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
    { $sort: { points: -1 } },
    { $limit: 100 },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { _id: 0, user: { _id: '$user._id', name: '$user.name' }, points: 1, activities: 1 } },
  ]);
  response.json(leaderboard);
});

router.get('/workouts', async (request, response) => {
  const filter = request.query.fitnessLevel ? { fitnessLevel: request.query.fitnessLevel } : {};
  response.json(await Workout.find(filter).sort({ title: 1 }));
});

router.post('/workouts', async (request, response) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Unable to create workout' });
  }
});

export default router;