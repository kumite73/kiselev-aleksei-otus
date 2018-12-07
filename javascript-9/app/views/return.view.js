exports.successJson = (result, res) => { res.status(200).json(result) }

exports.errorJson = (error, res) => {
  console.log(error);
  res.status(500).json(error);
}
