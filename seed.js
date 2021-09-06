const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');
const fakeDeadline = new Date(2020, 12, 31)
const seed = async () => {
  try {
    await db.sync({ force: true });
    const robots = await Promise.all([
      Robot.create({
        name: 'R2D2',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/3/39/R2-D2_Droid.png',
        fuelType: 'electric',
        fuelLevel: 88.34,
      }),
      Robot.create({
        name: 'HAL 9000',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/f/f6/HAL9000.svg',
        fuelType: 'electric',
        fuelLevel: 88.34,
      }),
      Robot.create({
        name: 'Bender',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png',
        fuelType: 'electric',
        fuelLevel: 88.34,
      }),
    ]);
    // seed your database here!

    const projects = await Promise.all([
      Project.create({
        title: 'Make pizza',
        deadline: fakeDeadline,
        priority: 1,
        completed: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      }),
      Project.create({
        title: 'Build barn',
        deadline: fakeDeadline,
        priority: 2,
        completed: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      }),
      Project.create({
        title: 'Discover love',
        deadline: fakeDeadline,
        priority: 3,
        completed: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      }),
    ]);
    const [R2D2, Hal, Bender] = robots;
    const [Pizza, Barn, Love] = projects;
    await R2D2.addProjects(Pizza);
    await Hal.addProjects(Barn);
    await Bender.addProjects(Love);
    await R2D2.addProjects(Love);
    await Hal.addProjects(Love);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
