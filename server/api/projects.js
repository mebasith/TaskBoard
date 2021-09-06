const { Project, Robot } = require('../db');

const router = require('express').Router();

// GET /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      attributes: [
        'id',
        'title',
        'deadline',
        'priority',
        'completed',
        'description',
      ],
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

//GET /api/projects/:projectId
router.get('/:projectId', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId, {
      include: [{ model: Robot }],
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// POST /api/projects
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Project.create(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await project.destroy();
    res.send(project);
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id
router.put('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    res.send(await project.update(req.body));
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id/:robotId
router.put('/:id/:robotId', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    const robot = await Robot.findByPk(req.params.robotId);
    await project.removeRobot(robot);
    res.send(await project.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
