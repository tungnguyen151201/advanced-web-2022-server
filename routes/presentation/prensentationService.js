const {
  getPresentationById,
  getPresentationForVoting,
  creatPresentation,
  editPresentaion,
  deletePresentation,
  loadMessage,
  addCoowner,
  getMyPresentations,
  createQuestion,
} = require('./presentationController');
async function GetMyPresentations(req, res) {
  try {
    const getGroupRes = await getMyPresentations(req.user.id);
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}
async function GetPresentationById(req, res) {
  try {
    const getGroupRes = await getPresentationById(req.params.id, req.user.id);
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}

async function GetPresentationForVoting(req, res) {
  try {
    const getGroupRes = await getPresentationForVoting(
      req.params.id,
      req.user.id
    );
    res.send(getGroupRes);
  } catch (error) {
    throw error;
  }
}

async function CreatPresentation(req, res) {
  try {
    const createGroupRes = await creatPresentation(req.body, req.user.id);
    res.send(createGroupRes);
  } catch (error) {
    throw error;
  }
}
async function EditPresentaion(req, res) {
  try {
    const editGroupRes = await editPresentaion(
      req.params.id,
      req.body,
      req.user.id
    );
    res.send(editGroupRes);
  } catch (error) {
    throw error;
  }
}
async function DeletePresentation(req, res) {
  try {
    const deleteGroupRes = await deletePresentation(req.user, req.params.id);
    res.send(deleteGroupRes);
  } catch (error) {
    throw error;
  }
}
async function LoadMessage(req, res) {
  try {
    const messageRes = await loadMessage(req.params.idPresent);
    res.send(messageRes);
  } catch (error) {
    throw error;
  }
}
async function AddCoowner(req, res) {
  const promoteToCoownerRes = await addCoowner(
    req.user,
    req.body.username,
    req.params.id
  );
  res.send(promoteToCoownerRes);
}
async function CreateQuestion(req, res) {
  try {
    const questionRes = await createQuestion(
      req.user.id,
      req.params.idPresent,
      req.body
    );
    res.send(questionRes);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  GetMyPresentations,
  GetPresentationById,
  CreatPresentation,
  EditPresentaion,
  LoadMessage,
  AddCoowner,
  DeletePresentation,
  GetPresentationForVoting,
  CreateQuestion,
};
