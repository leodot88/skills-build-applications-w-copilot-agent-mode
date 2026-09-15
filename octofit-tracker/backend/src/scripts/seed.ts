import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Workout.deleteMany({})]);

    const [alex, jordan] = await User.create([
      { name: 'Alex Rivera', email: 'alex@example.com', fitnessLevel: 'beginner' },
      { name: 'Jordan Lee', email: 'jordan@example.com', fitnessLevel: 'intermediate' },
    ]);
    const team = await Team.create({
      name: 'Mergington Movers',
      description: 'A friendly team for building consistent movement habits.',
      members: [alex._id, jordan._id],
    });
    await User.updateMany({ _id: { $in: [alex._id, jordan._id] } }, { team: team._id });
    await Activity.create([
      { user: alex._id, type: 'walking', durationMinutes: 30, points: 30 },
      { user: jordan._id, type: 'running', durationMinutes: 25, points: 50 },
    ]);
    await Workout.create([
      { title: 'Starter Walk', description: 'A steady walk to build a daily movement habit.', fitnessLevel: 'beginner', durationMinutes: 20, activityType: 'walking' },
      { title: 'Tempo Run', description: 'A short run with alternating easy and brisk intervals.', fitnessLevel: 'intermediate', durationMinutes: 25, activityType: 'running' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
