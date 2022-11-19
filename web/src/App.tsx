import { NLayout, NLayoutFooter, NLayoutHeader, NLayoutSider, NMessageProvider, NNotificationProvider } from "naive-ui";
import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";

export const App = defineComponent({
  setup() {
    return () => (
      <NMessageProvider>
        <NNotificationProvider>
          <NLayout style="height: 100vh" position="absolute">
            <NLayoutHeader style="height: 64px" bordered>
              <Navbar />
            </NLayoutHeader>
            <RouterView />
            <NLayoutFooter bordered position="absolute" style="height: 64px">
              <Footer />
            </NLayoutFooter>
          </NLayout>
        </NNotificationProvider>
      </NMessageProvider>
    );
  },
});
