### 7. 保護查詢

指返回 `name` 欄位，其餘欄位不返回，`_id` 一定要設定成 `0`，不然預設會返回。

- `0` 表示不返回，`1` 表示返回。

```shell
db.rooms.find(
  { name: /華/ },
  { _id: 0, name: 1 }
);
```

### 8. 查詢 指定值是否存在於陣列中

下列會找出 payment: [ '信用卡', 'ATM' ] or [ 'ATM' ] or [ '信用卡' ]

```shell
db.rooms.find({
  payment: {
    $in: ["信用卡", "ATM"],
  },
});
```
