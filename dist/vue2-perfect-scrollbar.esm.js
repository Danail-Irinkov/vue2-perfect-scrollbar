import PerfectScrollbar from 'perfect-scrollbar';

var PerfectScrollbar$1 = {
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
      this.ps = new PerfectScrollbar(this.$refs.container, this.options);
    }
    console.log('mounted PS');
    window.EventBus.$on('update_perfect_scrollbar', (vm = this) => { vm.update(); });
  },
  updated () {
    this.update();
  },
  beforeDestroy () {
    this.destroy();
  },
  methods: {
    update () {
      console.log('updated PS');
      if (this.ps) {
        this.ps.update();
      }
    },
    destroy () {
      if (this.ps) {
        this.ps.destroy();
        this.ps = null;
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
};

function install (Vue, settings) {
  if (settings) {
    if (settings.name && typeof settings.name === 'string') {
      PerfectScrollbar$1.name = settings.name;
    }

    if (settings.options && typeof settings.options === 'object') {
      PerfectScrollbar$1.props.options.default = () => {
        return settings.options
      };
    }

    if (settings.tag && typeof settings.tag === 'string') {
      PerfectScrollbar$1.props.tag.default = settings.tag;
    }
  }

  Vue.component(
    PerfectScrollbar$1.name,
    PerfectScrollbar$1
  );
}

function update () {
  PerfectScrollbar$1.updated();
}
var index = {
  install: install,
  update: update
};

export default index;
export { install, update, PerfectScrollbar$1 as PerfectScrollbar };
