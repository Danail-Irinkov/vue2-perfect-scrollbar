import PerfectScrollbar from 'perfect-scrollbar'
export default {
  name: 'PerfectScrollbar',
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    tag: {
      type: String,
      required: false,
      default: 'div'
    }
  },
  data () {
    return {
      ps: null
    }
  },
  mounted () {
    if (!(this.ps && this.$isServer)) {
      this.ps = new PerfectScrollbar(this.$refs.container, this.options)
    }
    console.log('mounted PS')
    window.EventBus.$on('update_perfect_scrollbar', (vm = this) => { vm.update() })
  },
  updated () {
    this.update()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    update () {
      console.log('updated PS')
      if (this.ps) {
        this.ps.update()
      }
    },
    destroy () {
      if (this.ps) {
        this.ps.destroy()
        this.ps = null
      }
    }
  },
  render (h) {
    return h(this.tag,
      {
        ref: 'container',
        on: this.$listeners
      },
      this.$slots.default)
  }
}
