# 第一週主線任務

[HackMD 連結](https://hackmd.io/@hexschool/HJOX15NZ9)

## 自主研究題

### 1. posts 所有 document 數量為？(回傳數字)

```shell
db.posts.countDocuments({});
```

### 2. 請查詢 `name` 為 `Ray Xu` 的 document 列表，排序為由新到舊

```shell
db.posts.find({ name: "Ray Xu" }).sort({ _id: -1 });
```

### 3. 請查詢 `name` 為 `Ray Xu` 的 document 列表，顯示前 30 筆資料

```shell
db.posts.find({ name: "Ray Xu" }).limit(30);
```

### 4. 請查詢 `name` 為 `Ray Xu` ，顯示 100(含) 個讚以上的前 30 筆 document 列表，時間排序由新到舊

```shell
db.posts.find({ name: "Ray Xu", likes: { $gte: 100 } }).limit(30);
```

### 5. 請查詢 `comments` 超過 `100` 的 document 列表，跳過前 30 筆資料，再顯示 30 筆資料

```shell
db.posts.find({ comments: { $gt: 100 } }).skip(30).limit(30);
```

### 6. 尋找超夯熱門貼文，請查詢 `likes` **且(and)** `comments` 都 `1,500(含)`以上的 document 列表

```shell
db.posts.find({ likes: { $gte: 1500 },comments: { $gte: 1500 } });
```

### 7. 尋找普通熱門貼文，請查詢 `likes` **或(or)** `comments` ， `1,000(含)`以上 的 document 列表

```shell
db.posts.find({
  $or: [{ likes: { $gte: 1000 } }, { comments: { $gte: 1000 } }],
});
```

### 8. 查詢 `image` 欄位為 `null` 的 document 列表

```shell
db.posts.find({ image: null });
```

### 9. 隨意找一筆 document 資料，將 `tags` 欄位裡的陣列，新增一個新 tags 為 `遊記`

```shell
const post = db.posts.findOne();
post.tags.push("遊記");
db.posts.updateOne({ _id: post._id }, { $set: { tags: post.tags } });
```

### 10. 將所有 `tags` 陣列裡的 `感情` 都移除

```shell
db.posts.updateMany({ tags: "感情" }, { $pull: { tags: "感情" } });
```
