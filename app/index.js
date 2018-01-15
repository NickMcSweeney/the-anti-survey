const app = {
  template: `
    <div class="form-body">
      <div class="header-bar">
        <label>
          Enter a name to make it more personal
          <h2> Please complete this sentence for <input type="text" name="name" v-model="name" placeholder="name" :size="inputLength"/></h2>
        </label>
      </div>
      <div class="main-body-bar">
        <div class="survey-tree">
          {{ fakeJson.start }}
          <survey-selection :dataObj="fakeJson.inputs"></survey-selection>
        </div>
      </div>
      <div class="bottom-bar">
        <button>DONE</button>
      </div>
    </div>
  `,
  name: "app",
  data() {
    return {
      name: "",
      fakeJson: {
        start: "I like to",
        inputs: {
          volunteer: {
            label: "volunteer",
            next: "by",
            inputs: {
              elderly: {
                label: "helping the elderly",
              },
              kitchens: {
                label: "going to soup kitchens",
              },
              running: {
                label: "running charity races",
              },
              other: {
                label: "giving my time in other ways",
              },
            },
          },
          donate: {
            label: "donate",
            next: "by giving",
            inputs: {
              books: {
                label: "books",
                next: "to",
                inputs: {
                  children: {
                    label: "homless children",
                  },
                  people: {
                    label: "blind people",
                  },
                  dogs: {
                    label: "rescue dogs",
                  },
                },
              },
              food: {
                label: "food",
                next: "to",
                inputs: {
                  children: {
                    label: "homless children",
                  },
                  people: {
                    label: "blind people",
                  },
                  dogs: {
                    label: "rescue dogs",
                  },
                },
              },
              money: {
                label: "money",
                next: "to",
                inputs: {
                  children: {
                    label: "homless children",
                  },
                  people: {
                    label: "blind people",
                  },
                  dogs: {
                    label: "rescue dogs",
                  },
                },
              },
            },
          },
        },
      },
    };
  },
  computed: {
    inputLength() {
      const len = this.name.length;
      if (len < 5) {
        return 5;
      }
      return len;
    },
  },
  methods: {
    selected(key) {
      return this.results.find(res => res === key);
    },
  },
};

const surveySelection = {
  template: `
    <div class="option-list">
      <div class="option-block">
        <div v-for="(n, index) in topSpacers" :key="index"><div class="hidden-input">SPACER</div></div>
        <div v-for="(input, key, index) in dataObj" :key="key+index">
          <div v-if="selected(key) && input.inputs" class="selected-input">
            <div class="center-selection">{{ input.label }} {{input.next}}</div>
            <survey-selection :dataObj="input.inputs"></survey-selection>
          </div>
          <div v-else-if="selected(key) && !input.inputs" class="selected-input">
            <div>{{ input.label }}</div>
          </div>
          <div v-else @click="add(key, index)" :class="{'disabled-input': disableOthers, 'unselected-inputs': !disableOthers}">
            {{ input.label }}
          </div>
        </div>
        <div v-for="(n, index) in bottomSpacers" :key="index"><div class="hidden-input">SPACER</div></div>
      </div>
    </div>
  `,
  name: "survey-selection",
  data() {
    return {
      results: [],
      topSpacers: null,
      bottomSpacers: null,
      disableOthers: false,
    }
  },
  props: {
    dataObj: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selected(key) {
      return this.results.find(res => res === key);
    },
    add(key, index) {
      this.results = [];
      this.results.push(key);
      this.disableOthers = true;
      this.scrollOptions(index);
    },
    scrollOptions(index) {
      this.bottomSpacers = [];
      this.topSpacers = [];
      const len = Object.keys(this.dataObj).length;
      if (len % 2 === 0) {
        const half = len / 2;
        if (index < half) {
          let num = Math.abs(index - half) * 2 - 1;
          while (num > 0) {
            this.topSpacers.push("SPACER");
            num = num - 1;
          }
        } else if (index >= half) {
          let num = Math.abs(index - half) * 2 + 1;
          while (num > 0) {
            this.bottomSpacers.push("SPACER");
            num = num - 1;
          }
        } else {
        }
      } else {
        const half = Math.floor(len / 2);
        if (index < half) {
          let num = Math.abs(index - half) * 2;
          while (num > 0) {
            this.topSpacers.push("SPACER");
            num = num - 1;
          }
        } else if (index > half) {
          let num = Math.abs(index - half) * 2;
          while (num > 0) {
            this.bottomSpacers.push("SPACER");
            num = num - 1;
          }
        }
      }
    },
  },
};

Vue.component("app", app);
Vue.component("survey-selection", surveySelection);

new Vue({
  el: "#app",
  template: "<app/>",
});
