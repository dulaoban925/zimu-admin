# ZIMU-Admin（梓沐）

算是个管理系统，包含所有我想要写的东西。

而你，我的朋友，如果你有想做却一直没做的东西，那么欢迎来到这里，我们一起实现。

## 启动

### 前端工程

#### 1.拉取代码

```shell
git clone https://github.com/ying2gege/zimu-admin.git [project-name]
cd [project-name]
```

#### 2.安装依赖

```shell
npm run install
```

#### 3.启服务

```shell
npm run dev
```

### 后端

由于本人服务器正在规划中，暂未接入，所以需要在本地配置后端相关工具。

后端基于 `express`，`ORM` 采用 `typeorm`，数据库采用 `mysql`。

#### 1.数据库

1. 本地安装 `mysql` 环境。
  可百度/谷歌相关安装流程，`mac` 电脑可参考[Mac 使用 Mysql](https://juejin.cn/post/7314546931863535635)。

2. 安装 `mysql` 可视化工具，如 `datagrip`，`navicat` 等，可百度/谷歌搜索对应工具的安装步骤。

3. 启动 `mysql` 服务，并使用 `mysql` 工具连接到本地服务。
  本地服务默认 `Host` 为 `localhost`，端口为 `3306`，默认用户名为 `root`，默认密码为空。

4. 创建一个名为 `zimuadmin` 的数据库。
  可控制台执行以下命令：

  ```shell
  # 创建数据库
  CREATE DATABASE IF NOT EXISTS zimuadmin DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
  ```

  或在可视化工具中手动新建。

5. 修改服务端目录 `server` 数据库相关环境变量：DB_NAME、DB_USER、DB_PASSWORD。

6. 建表
   1. 角色表 `zm-role`

```sql
create table `zm-role`
(
  id        int auto_increment,
  code      varchar(100) not null comment '角色编码',
  name      varchar(100) not null comment '角色名称',
  status    varchar(50)  null comment '状态',
  createdBy varchar(100) null comment '创建人',
  createdAt datetime     null comment '创建时间',
  updatedBy varchar(100) null comment '更新人',
  updatedAt datetime     null comment '更新时间',
  constraint `zm-role_code_uindex`
    unique (code),
  constraint `zm-role_id_uindex`
    unique (id)
)
  comment '角色管理表';

alter table `zm-role`
  add primary key (id);
```

   2. 权限表 `zm-auth`

```sql
create table `zm-auth`
(
  id         int auto_increment,
  code       varchar(100) not null comment '权限编码',
  name       varchar(100) null comment '权限名称',
  status     varchar(50)  null comment '状态',
  created_by varchar(100) null comment '创建人',
  created_at datetime     null comment '创建人',
  updated_by varchar(100) null comment '更新人',
  updated_at datetime     null comment '更新时间',
  constraint `zm-auth_code_uindex`
    unique (code),
  constraint `zm-auth_id_uindex`
    unique (id)
)
  comment '权限表';

alter table `zm-auth`
  add primary key (id);
```

   3. 用户表 `zm-user`

```sql
create table `zm-user`
(
  id         int auto_increment,
  job_no     varchar(100) not null comment '工号',
  name       varchar(100) null comment '姓名',
  sex        varchar(1)   null comment '性别',
  tel        varchar(20)  null comment '手机号',
  email      varchar(50)  null comment '邮箱',
  address    varchar(200) null comment '地址',
  status     varchar(50)  null comment '状态',
  created_by varchar(100) null comment '创建人',
  created_at datetime     null comment '创建人',
  updated_by varchar(100) null comment '更新人',
  updated_at datetime     null comment '更新时间',
  constraint `zm-user_id_uindex`
    unique (id),
  constraint `zm-user_job_no_uindex`
    unique (job_no)
)
  comment '用户表';

alter table `zm-user`
  add primary key (id);
```

   4. 菜单表 `zm-menu`

```sql
create table `zm-menu`
(
  id         int auto_increment,
  code       varchar(100) not null comment '菜单编码',
  name       varchar(100) null comment '菜单名称',
  type       varchar(10)  null comment '菜单类型：菜单menu or 按钮button',
  level      int          null comment '层级',
  sort       int          null comment '排序',
  icon       varchar(50)  null comment '菜单图标',
  status     varchar(50)  null comment '状态',
  created_by varchar(100) null comment '创建人',
  created_at datetime     null comment '创建时间',
  updated_by varchar(100) null comment '更新人',
  updated_at datetime     null comment '更新时间',
  constraint `zm-menu_code_uindex`
    unique (code),
  constraint `zm-menu_id_uindex`
    unique (id)
)
  comment '菜单表';

alter table `zm-menu`
  add primary key (id);
```

   5. 角色-权限中间表 `zm-role-auth-relation`

```sql
create table `zm-role-auth-relation`
(
  id         int auto_increment,
  role_id    int          null comment '角色id',
  auth_id    int          null comment '权限id',
  created_by varchar(100) null comment '创建人',
  created_at datetime     null comment '创建时间',
  updated_by varchar(100) null comment '更新人',
  updated_at datetime     null comment '更新时间',
  constraint `zm-role-auth-relation_id_uindex`
    unique (id)
);

alter table `zm-role-auth-relation`
  add primary key (id);
```

   6. 角色-用户中间表 `zm-role-user-relation`

```sql
create table `zm-role-user-relation`
(
  id         int auto_increment,
  role_id    int          null comment '角色id',
  user_id    int          null comment '用户id',
  created_by varchar(100) null comment '创建人',
  created_at datetime     null comment '创建时间',
  updated_by varchar(100) null comment '更新人',
  updated_at datetime     null comment '更新时间',
  constraint `zm-role-user-relation_id_uindex`
    unique (id)
)
  comment '角色-用户中间表';

alter table `zm-role-user-relation`
  add primary key (id);
```

7. 创建期初数据
   1. 插入一个超级管理员用户（Super）（后门，默认赋予所有权限，不需要手动分配）。
```sql
```

   2. 插入系统管理菜单（系统管理 =》角色管理、权限管理、用户管理、菜单管理）。
```sql
```

8. 根目录下执行 `pnpm server`，启动后端服务。
