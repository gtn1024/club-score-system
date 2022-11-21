import { NCard } from "naive-ui";
import { defineComponent } from "vue";
import { Model } from "../../shared/types/models";
import defaultTeamPic from "../../assets/team/default.jpg";

export const TeamItem = defineComponent({
  props: {
    team: {
      type: Object as () => Model.Team,
      required: true,
    },
  },
  setup(props) {
    const team = props.team;
    return () => (
      <>
        <NCard title={team.name}>
          {{
            cover: () => (
              <img src={team.picture ? team.picture : defaultTeamPic} alt={team.name} width="100%" height={200} />
            ),
            default: () => (
              <>
                {team.memberCount} {team.memberCount > 1 ? "members" : "member"}
              </>
            ),
          }}
        </NCard>
      </>
    );
  },
});
