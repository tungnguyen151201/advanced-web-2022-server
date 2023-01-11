const {
  getGroupById,
  myGroup,
  createGroup,
  editGroup,
  deleteGroup,
  promoteToCoowner,
  demoteToMember,
  kickAMember,
  checkIfUserInGroup,
} = require('./groupsController');
async function GetGroupById(req, res) {
  const getGroupRes = await getGroupById(req.params.id);
  res.send(getGroupRes);
}

async function MyGroup(req, res) {
  const MyGroupRes = await myGroup(req.user.id);
  res.send(MyGroupRes);
}
async function CreateGroup(req, res) {
  const createGroupRes = await createGroup(req.body, req.user.id);
  res.send(createGroupRes);
}
async function EditGroup(req, res) {
  const editGroupRes = await editGroup(req.user, req.params.id, req.body);
  res.send(editGroupRes);
}
async function DeleteGroup(req, res) {
  const deleteGroupRes = await deleteGroup(req.user, req.params.id);
  res.send(deleteGroupRes);
}
async function PromoteToCoowner(req, res) {
  const promoteToCoownerRes = await promoteToCoowner(
    req.user,
    req.body.userId,
    req.params.id
  );
  res.send(promoteToCoownerRes);
}
async function DemoteToMember(req, res) {
  const demoteToMemberRes = await demoteToMember(
    req.user,
    req.body.userId,
    req.params.id
  );
  res.send(demoteToMemberRes);
}
async function KickAMember(req, res) {
  const kickAMemberRes = await kickAMember(
    req.user,
    req.body.userId,
    req.params.id
  );
  res.send(kickAMemberRes);
}
async function CheckIfUserInGroup(req, res) {
  const checkIfUserInGroupRes = await checkIfUserInGroup(
    req.user,
    req.params.id
  );
  res.send(checkIfUserInGroupRes);
}
module.exports = {
  GetGroupById,
  MyGroup,
  CreateGroup,
  EditGroup,
  DeleteGroup,
  PromoteToCoowner,
  DemoteToMember,
  KickAMember,
  CheckIfUserInGroup,
};
