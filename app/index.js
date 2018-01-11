
const app = {
  template: `
    <div class="form-body">
      <div class="header-bar">
        <label>
          Enter a name to make it more personal
          <h2> Please complete this sentence for <input type="text"/></h2>
        </label>
      </div>
      <div class="main-body-bar">
        I like to ...
      </div>
      <div class="bottom-bar">
        <button>DONE</button>
      </div>
    </div>
  `,
  name: "app",
};


Vue.component('app', app);

new Vue({
  el: "#app",
  template: "<app/>"
});
