# Day 4 - MongoDB 基本操作：修改、刪除

[HackMD 連結](https://hackmd.io/QJXymF93QpKxPATRkdwKxw?view)

### 1. Update the group to 0 for the data in the "students" collection where the \_id is equal to the specified id.

```shell
db.students.updateOne(
  { _id: ObjectId("640aa67c7a6c739ddcd06433") },
  { $set: { group: 0 } }
);
db.students.find({ _id: ObjectId("640aa67c7a6c739ddcd06433") });
```

### 2. Update the "isPaid" field to "true" for the data in the "students" collection where the "group" field contains "B".

```shell
db.students.updateMany(
  {
    group: "B",
  },
  { $set: { isPaid: true } }
);
db.students.find({ group: "B" });
```

### 3. Delete the field "studentName" where its value is "Brennan" from the "students" collection.

```shell
db.students.deleteMany({ studentName: "Brennan" });
```

### 4. Delete the field "isPaid" where its value is true from the "students" collection.

```shell
db.students.deleteMany({ isPaid: true });
```
