import { FormInst, NButton, NCard, NCheckbox, NDataTable, NForm, NFormItem, NH2, NInput } from "naive-ui";
import { InternalRowData, TableColumns } from "naive-ui/es/data-table/src/interface";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { http } from "../../shared/Http";
import { Model } from "../../shared/types/models";

type Response = {
  total: number;
  data: Model.Team[];
};

const getTeams: (form: TeamForm) => Promise<Response> = async (form: TeamForm) => {
  const res = await http.get<Response>("/admin/team", {
    name: form.name,
    mine: form.mine ? "true" : "false",
    pageSize: form.pageSize + "",
  });
  return res.data.data;
};

type TeamForm = {
  name: string;
  mine: boolean;
  pageSize: number;
};

export const Team = defineComponent({
  setup() {
    const rForm = ref<FormInst | null>(null);
    const formValue = ref<TeamForm>({
      name: "",
      mine: false,
      pageSize: 20,
    });

    const columns: TableColumns = [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "名称",
        key: "name",
      },
      {
        title: "所有者",
        key: "owner.realName",
      },
      {
        title: "操作",
        key: "action",
        render(row) {
          return (
            <>
              <NButton size="small" style="margin: 2px">
                查看管理员
              </NButton>
              <NButton size="small" style="margin: 2px">
                查看学生
              </NButton>
            </>
          );
        },
      },
    ];
    const dataRef = ref<Model.Team[]>([]);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 20,
      itemCount: 0,
      prefix({ itemCount }) {
        return `Total is ${itemCount}.`;
      },
    });
    const loadingRef = ref(true);
    const setDataToTable = (total: number, data: Model.Team[]) => {
      paginationReactive.itemCount = total;
      dataRef.value = data;
    };
    onMounted(() => {
      getTeams({
        name: "",
        mine: false,
        pageSize: 20,
      }).then((data) => {
        setDataToTable(data.total, data.data);
        loadingRef.value = false;
      });
    });
    const onSubmit = (e: MouseEvent) => {
      e.preventDefault();
      getTeams(formValue.value).then((data) => {
        loadingRef.value = true;
        setDataToTable(data.total, data.data);
        loadingRef.value = false;
      });
    };
    return () => (
      <>
        <NH2>团队列表</NH2>
        <NCard size="medium">
          <NForm ref="rForm" inline labelWidth={80} model={formValue.value} showLabel={false}>
            <NFormItem label="名称" path="name">
              <NInput v-model={[formValue.value.name, "value"]} placeholder="输入名称" />
            </NFormItem>
            <NFormItem label="只看我创建或管理的" path="mine">
              <NCheckbox v-model={[formValue.value.mine, "checked"]}>只看我创建或管理的</NCheckbox>
            </NFormItem>
            <NFormItem>
              <NButton type="primary" onClick={onSubmit}>
                查询
              </NButton>
            </NFormItem>
          </NForm>
        </NCard>
        <NDataTable
          remote
          bordered
          columns={columns}
          loading={loadingRef.value}
          data={dataRef.value}
          pagination={paginationReactive}
        />
      </>
    );
  },
});
