# 路由配置相关规则(持续完善中)

## route.name 赋值规则

与 `@/views` 目录下文件路径保持一致，多级目录名间以 **下滑线”_“** 连接；

若文件名称为 `index.vue`，可省略；

若父路由与子路由 `name` 相同，则 父路由 `name` 采用**大驼峰形式**

### 例1

视图文件路径为 `”@/views/system-setting/user-manage/index.vue“`
**route.name** 应定义为 `”system-setting_user-manage“`

### 例2

视图文件路径为 `”@/views/system_setting/user_manage/detail.vue“`
**route.name** 应定义为 `”system-setting_user-manage_detail“`

## route.component 赋值规则

若 `component` 赋值的是布局组件，不允许直接赋值 `import` 的组件对象，赋值范围见 `@/constants/router.ts` 定义的 **ROUTE_COMPONENT_LAYOUT_VALUE** 常量。

若 `component` 赋值的是页面组件，则直接使用懒加载模式引入。

### 例1（不推荐）

```javascript
import BasicLayout from '@/layouts/index.vue'
import DashBoard from '@/layouts/dashboard/index.vue'

const dashboardRoute = {
  component: BasicLayout
  ...,
  children: [{
    component: Dashboard
  }]
}
```

### 例2（推荐）

```javascript
const DashboardModules = {
  Dashboard: () => import(@/layouts/dashboard/index.vue)
}
const dashboardRoute = {
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
  ...,
  children: [{
    component: DashboardModules.Dashboard
  }]
}
```

## route.meta 赋值规则

### keepAlive: boolean

是否缓存当前页面

### title: string

当前页面标签标题
