# 路由配置相关规则(持续完善中)

## route.name 赋值规则(必需)

**大驼峰格式**命名

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

## route.meta 赋值规则(仅设置末级路由即可)

### keepAlive: boolean

是否缓存当前页面

### title: string

当前页面标签标题

### affix: boolean

是否固定视图页签，为 true 的视图页签始终固定在页面上，且不允许关闭。

建议为看板类页面路由设置，不建议为功能页面设置该属性，否则可能发生不可预知的问题。
