import { NMessageProvider } from "naive-ui";
import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";

export const App = defineComponent({
  setup() {
    return () => (
      <NMessageProvider>
        <header>
          <Navbar />
        </header>
        <main>
          <RouterView />
        </main>
        <footer>
          <Footer />
        </footer>
      </NMessageProvider>
    );
  },
});
