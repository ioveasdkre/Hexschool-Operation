db.posts.find().populate({
  path: "user",
  select: "name photo",
});
