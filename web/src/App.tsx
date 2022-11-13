import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import { Navbar } from "./components/navbar/Navbar";

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
