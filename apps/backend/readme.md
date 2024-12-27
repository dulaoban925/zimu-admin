# Server

## 接口设计

### 查询

- 所有数据

  - url: **/list**
  - method: **GET**

- 分页数据

  - url: **/listByPage**
  - method: **GET**

- 单条详情

  - url: **/:id**
  - method: **GET**

### 修改

- 新增

  - url: **/insert**
  - method: **POST**

- 修改

  - url: **/update**
  - method: **PUT**

- 删除

  - url: **/:id**
  - method: **DELETE**
