const express = require('express');
const { verifyToken } = require('../../middleware/auth');
const router = express.Router();

const {
  MyGroup,
  CreateGroup,
  EditGroup,
  DeleteGroup,
  GetGroupById,
  PromoteToCoowner,
  DemoteToMember,
  KickAMember,
  CheckIfUserInGroup,
} = require('./groupsService');

router.get('/mygroup', (req, res) => MyGroup(req, res));
router.get('/:id', (req, res) => GetGroupById(req, res));
router.get('/checkIfUserInGroup/:id', (req, res) => CheckIfUserInGroup(req, res));
router.post('/create', (req, res) => CreateGroup(req, res));
router.patch('/edit/:id', (req, res) => EditGroup(req, res));
router.delete('/delete/:id', (req, res) => DeleteGroup(req, res));
router.post('/promoteToCoowner/:id', (req, res) => PromoteToCoowner(req, res));
router.post('/demoteToMember/:id', (req, res) => DemoteToMember(req, res));
router.post('/kickAMember/:id', (req, res) => KickAMember(req, res));

module.exports = router;
