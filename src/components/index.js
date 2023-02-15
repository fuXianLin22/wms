import ToolInput from '@/components/ToolInput'
import ToolTable from '@/components/ToolTable'
const componentArr = [ToolInput, ToolTable]
export default {
  install(Vue) {
    componentArr.forEach((item) => Vue.component(item.name, item))
    // Vue.component(ToolInput.name, ToolInput)
  }
}
