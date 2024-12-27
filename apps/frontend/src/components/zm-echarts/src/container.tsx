import { ElCard } from 'element-plus'
import { isNumber } from 'lodash-es'

/**
 * 图标容器
 */
export const ZmChartContainer = defineComponent({
  name: 'ZmChartContainer',
  props: {
    // 是否展示卡片效果
    card: {
      type: Boolean,
      default: true
    },
    // ElCard 属性，仅 card 为 true 时生效
    cardProps: {
      type: Object,
      default: () => ({})
    }
  },
  render() {
    // card 模式
    const cardWrapper = (
      <ElCard
        {...this.cardProps}
        v-slots={{
          default: this.$slots.default,
          header: this.$slots.header,
          footer: this.$slots.footer
        }}
      ></ElCard>
    )

    // div 模式
    const divWrapper = <div>{this.$slots.default?.()}</div>

    return this.card ? cardWrapper : divWrapper
  }
})
