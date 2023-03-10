db.students.find({
  $or: [{ score: { $gt: 60 } }, { group: "B" }],
});
