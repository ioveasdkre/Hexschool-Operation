db.posts.updateMany({ tags: "感情" }, { $pull: { tags: "感情" } });
