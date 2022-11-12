import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { Navbar } from "./components/Navbar";

export const App = defineComponent({
  setup() {
    return () => (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <RouterView />
        </main>
      </>
    );
  },
});
