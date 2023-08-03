# ZM-TABLE

## 功能点

* `zm-table` 完全兼容 `ElementPlus` 的 `ElTable` 属性及事件；
* 内置分页，完全兼容 `ElPagination`  属性及事件；
* `zm-table-column` 完全兼容 `ElementPlus` 的 `ElTableColumn` 属性及事件的基础上扩展；
* 内置搜索模块，可插槽自定义或通过 * `zm-table-column` 的 `query` 属性自动生成；
* 内置基础的操作按钮、接口请求及相关钩子（增删改查、导入/导出、更多等）
* 自定义字段排序、显隐并输出结果（以支持持久化）

## 开发文档

### 1.zm-table

#### 1.1 属性

| 名称       | 说明                      | 类型                       | 默认值 | 是否必需 |
| ---------- | -------------------------------- | -------------------------- | ------- | -------- |
| pageable | 是否可分页 | boolean | true | false |
| columnConfigurable | 表格列是否可配置，为 true 时显示配置按钮，可对表格列进行 `排序`、`显隐控制` 等操作 | boolean | false | false |
| tableProps | 表格属性对象，完全兼容 [ElTable](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) | object | { border: true } | false |
| paginationProps | 分页器属性对象，完全兼容 [ElPagination](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7) | object | { total: 0, layout: 'total, sizes, prev, pager, next, jumper' } | false |

#### 1.2 方法

#### 1.3 事件

完全兼容 [ElTable](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)、[ElPagination](https://element-plus.org/zh-CN/component/pagination.html#%E4%BA%8B%E4%BB%B6) 所有事件

| 名称     | 说明                        | 类型                                                                |
| -------- | ---------------------------------- | ------------------------------------------------------------------- |

#### 1.4 插槽

| 名称      | 说明                | 子标签 |
| --------- | -------------------------- | --------|
| - | 自定义 table 主体内容 | zm-table-column |
| filter | 自定义筛选内容 | - |
| operation | 自定义操作按钮栏 | - |
| left-operation | 自定义操作按钮栏左侧内容。若使用了 `operation` 插槽，则 `left-operation 插槽无效 | - |
| right-operation | 自定义操作按钮栏右侧内容。若使用了 `operation` 插槽，则 `right-operation` 插槽无效 | - |

## 2.zm-table-column

### 2.1 属性

完全兼容 [ElTableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的所有属性

| 名称       | 说明                      | 类型                       | 默认值 | 是否必需 |
| ---------- | -------------------------------- | -------------------------- | ------- | -------- |
| filter | 是否自动添加到筛选表单。默认 input 类型，若需要其他类型表单项，可通过传递对象实现详见 [filter](#filter) 部分。在使用 `filter` 插槽时无效| boolean / object | false | false |

### 2.2 插槽

| 名称      | 说明                |
| --------- | -------------------------- |
| - | 自定义列的内容 作用域参数为 { row, column, $index } |
| header | 自定义表头的内容， 作用域参数为 { column, $index } |

### filter

`zm-table-column` `filter` 对象参数详情：

| 表单类型       | 参数                      | 说明 |
| ---------- | -------------------------------- | -------------------------- |
| input | true / { tag: 'input' } | 除参数部分属性外，支持 [ElInput](https://element-plus.org/zh-CN/component/input.html#attributes) 全部配置性属性，如 `type`、`clearable` 等 |
| select | { tag: 'select', options: [] } | 除参数部分属性外，支持 [ElSelect](https://element-plus.org/zh-CN/component/select.html#select-attributes) 全部配置性属性，如 `filterable`、`clearable` 等 |
