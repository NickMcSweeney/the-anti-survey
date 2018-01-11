
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
        <div>
          {{ fakeJson.start }} {{ fakeJson.inputs.volunteer.label }}
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
              },
              food: {
                label: "food",
              },
              money: {
                label: "money",
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
    }
  },
};


Vue.component('app', app);

new Vue({
  el: "#app",
  template: "<app/>"
});
