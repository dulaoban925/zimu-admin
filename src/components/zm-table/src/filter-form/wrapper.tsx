/**
 * filter-form wrapper
 */
import type { CardProps } from 'element-plus'
import type { PropType } from 'vue'

export const Wrapper = defineComponent({
  name: 'FilterFormWrapper',
  props: {
    // 是否 card 模式
    card: {
      type: Boolean,
      default: true
    },
    // el-card 属性
    cardProps: {
      type: Object as PropType<CardProps>,
      default: () => ({})
    }
  },
  render() {
    const cardWrapper = (
      <el-card
        {...this.cardProps}
        v-slots={{
          default: this.$slots.default,
          header: this.$slots.header,
          footer: this.$slots.footer
        }}
      ></el-card>
    )

    const divWrapper = (
      <div
        v-slots={{
          default: this.$slots.default
        }}
      ></div>
    )
    return this.card ? cardWrapper : divWrapper
  }
})
