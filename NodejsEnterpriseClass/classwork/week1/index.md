# 第一週主線任務

[HackMD 連結](https://hackmd.io/@hexschool/HJOX15NZ9)

## 課程範圍

### 1. 搜尋 name 欄位為 "Ray Xu" 的 document 列表

```shell
db.posts.find({ name: "Ray Xu" });
```

### 2. 新增一筆 document，請全部欄位皆填寫

```shell
db.posts.insertOne({
  name: "Riley Parker",
  tags: ["test", "test2", "test3"],
  type: "friend(摯友)]",
  image: "貼文圖片",
  createdAt: Date.now(),
  content: "貼文內容",
  likes: 575,
  comments: 5,
});
```

### 3. 新增多筆 document，請全部欄位皆填寫

```shell
db.posts.insertOne([
  {
    name: "Riley Parker",
    tags: ["test", "test2", "test3"],
    type: "friend(摯友)",
    image: "貼文圖片",
    createdAt: Date.now(),
    content: "貼文內容",
    likes: 575,
    comments: 5,
  },
  {
    name: "Riley Parker",
    tags: ["test", "test2", "test3"],
    type: "friend(摯友)]",
    image: "貼文圖片",
    createdAt: Date.now(),
    content: "貼文內容",
    likes: 575,
    comments: 5,
  },
]);
```

### 4. 修改一筆 document，filter 條件請用 \_id 指定其中一筆資料，content 欄位調整為測試資料

```shell
db.posts.updateOne(
  { _id: ObjectId("641b09dea74922403187aec3") },
  { $set: { content: "測試資料" } }
);
```

### 5. 修改多筆 name 欄位為 "Ray Xu" 的 document 列表，content 欄位都調整為哈哈你看看你

```shell
db.posts.updateMany({ name: "Ray Xu" }, { $set: { content: "哈哈你看看你" } });
```

### 6. 刪除一筆 document，filter 條件請用 `_id` 任意指定其中一筆資料

```shell
db.posts.deleteOne({ _id: ObjectId("641b09dea74922403187aec3") });
```

### 7. 刪除多筆 document，filter 條件請用 `type` 為 `group` 的值，刪除所有社團貼文

```shell
db.posts.deleteMany({ type: "group" });
```

### 8. 刪除多筆 document，filter 條件為以下條件

- a. name:`"Ray Xu"`
- b. likes: 500(含) 個讚以下

```shell
db.posts.deleteMany({ name: "Ray Xu", likes: { $lte: 500 } });
```

### 9.查詢全部 posts 的 document 列表

```shell
db.posts.find();
```

### 10. 關鍵字搜尋 `name` 裡面含有 `o` 的 document 列表

```shell
db.posts.find({ name: /o/ });
```

### 11. 查詢`name` 欄位為 `"Ray Xu"` ，filter 篩選出介於 500~1000(含) 個讚（大於等於 500、小於等於 1000）

```shell
db.posts.find({ name: "Ray Xu", likes: { $gte: 500, $lte: 1000 } });
```

### 12. 查詢 `comments` 有大於等於 500 以上的 document 列表

```shell
db.posts.find({ comments: { $gte: 500 } });
```

### 13. 查詢 `tags` 欄位，有 `謎因` **或(or)** `幹話` 的 document 列表

```shell
db.posts.find({
  tags: { $in: [/謎因/, /幹話/] },
});
```

### 14. 查詢 `tags` 欄位，有 `幹話` 的 document 列表，需隱藏 `_id` 欄位

```shell
db.posts.find(
  {
    tags: /幹話/,
  },
  { _id: 0 }
);
```

### 15. 請嘗試用 Mongo Shell 指令刪除全部 Documents

```shell
db.posts.deleteMany({});
```
