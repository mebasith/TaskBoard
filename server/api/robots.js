const { Robot, Project } = require('../db');

const router = require('express').Router();

// GET /api/robots
router.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll({
      attributes: ['id', 'name', 'fuelType', 'fuelLevel', 'imageUrl'],
    });
    res.json(robots);
  } catch (error) {
    next(error);
  }
});

//GET /api/robots/:robotId
router.get('/:robotId', async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.robotId, {
      include: [{ model: Project }],
    });
    res.json(robot);
  } catch (error) {
    next(error);
  }
});

// POST /api/robots
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Robot.create(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/robots/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    await robot.destroy();
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

// PUT /api/robots/:id
router.put('/:id', async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    res.send(await robot.update(req.body));
  } catch (error) {
    next(error);
  }
});

// PUT /api/robots/:id/:project
router.put('/:id/:project', async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    const project = await Project.findByPk(req.params.project);
    await robot.removeProject(project);
    res.send(await robot.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
