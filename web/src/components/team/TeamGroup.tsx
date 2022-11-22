import { NCard, NGi, NGrid, NH2 } from "naive-ui";
import { defineComponent, onMounted, ref } from "vue";
import { http } from "../../shared/Http";
import { Model } from "../../shared/types/models";
import { TeamItem } from "./TeamItem";
import defaultTeamPic from "../../assets/team/default.jpg";
import addTeamPic from "../../assets/team/add.jpg";

type TeamScope = "joined" | "created" | "managed" | "all";

export const TeamGroup = defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    scope: {
      type: String as () => TeamScope,
      required: true,
    },
  },
  setup(props) {
    const title = props.title;
    const teams = ref<Model.Team[]>([]);
    const getTeams = async (scope: TeamScope): Promise<Model.Team[]> => {
      const res = await http.get<Model.Team[]>("/team", { scope });
      return res.data.data;
    };
    onMounted(() => {
      getTeams(props.scope).then((data) => {
        teams.value = data;
      });
    });
    return () => (
      <>
        <NH2>{title}</NH2>
        <NGrid xGap={12} cols={4}>
          {teams.value.map((team) => (
            <NGi style="padding: 16px">
              <TeamItem team={team} picture={defaultTeamPic} />
            </NGi>
          ))}
          {props.scope === "created" ? (
            <NGi style="padding: 16px">
              <NCard title="创建团队">
                {{
                  cover: () => <img src={addTeamPic} alt="创建团队" width="100%" height={200} />,
                  default: () => <>快来创建自己的团队吧</>,
                }}
              </NCard>
            </NGi>
          ) : null}
        </NGrid>
      </>
    );
  },
});
