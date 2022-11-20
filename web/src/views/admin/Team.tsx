import {
  DataTableColumns,
  FormInst,
  NButton,
  NCard,
  NCheckbox,
  NDataTable,
  NForm,
  NFormItem,
  NH2,
  NInput,
  useMessage,
} from "naive-ui";
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
    currentPage: form.currentPage + "",
  });
  return res.data.data;
};

type TeamForm = {
  name: string;
  mine: boolean;
  pageSize: number;
  currentPage: number;
};

export const Team = defineComponent({
  setup() {
    const message = useMessage();
    const rForm = ref<FormInst | null>(null);
    const formValue = ref<TeamForm>({
      name: "",
      mine: false,
      pageSize: 20,
      currentPage: 1,
    });
    const teamAdminBtnOnClick = (row: Model.Team) => {
      message.info(`查看 ${row.name} 的管理员`);
    };
    const studentsBtnOnClick = (row: Model.Team) => {
      message.info(`查看 ${row.name} 的小朋友`);
    };
    const createColumns = ({
      showAdmins,
      showStudents,
    }: {
      showAdmins: (row: Model.Team) => void;
      showStudents: (row: Model.Team) => void;
    }): DataTableColumns<Model.Team> => [
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
              <NButton size="small" style="margin: 2px" onClick={() => showAdmins(row)}>
                查看管理员
              </NButton>
              <NButton size="small" style="margin: 2px" onClick={() => showStudents(row)}>
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
      showSizePicker: true,
      pageSize: 20,
      pageSizes: [20, 50, 100],
      onChange: (page: number) => {
        paginationReactive.page = page;
      },
      onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
        if (!loadingRef.value) {
          loadingRef.value = true;
          getTeams({
            name: formValue.value.name,
            mine: formValue.value.mine,
            pageSize: paginationReactive.pageSize,
            currentPage: paginationReactive.page,
          }).then((data) => {
            setDataToTable(data.total, data.data);
            loadingRef.value = false;
          });
        }
      },
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
        currentPage: 1,
      }).then((data) => {
        setDataToTable(data.total, data.data);
        loadingRef.value = false;
      });
    });
    const onSubmit = (e: MouseEvent) => {
      e.preventDefault();
      loadingRef.value = true;
      getTeams(formValue.value).then((data) => {
        setDataToTable(data.total, data.data);
        loadingRef.value = false;
      });
    };
    const handlePageChange = (currentPage: number) => {
      if (!loadingRef.value) {
        loadingRef.value = true;
        getTeams({
          name: formValue.value.name,
          mine: formValue.value.mine,
          pageSize: paginationReactive.pageSize,
          currentPage: currentPage,
        }).then((data) => {
          setDataToTable(data.total, data.data);
          loadingRef.value = false;
        });
      }
    };
    return () => (
      <>
        <NH2>团队列表</NH2>
        <NCard size="medium" style="margin: 4px">
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
          columns={createColumns({ showAdmins: teamAdminBtnOnClick, showStudents: studentsBtnOnClick })}
          loading={loadingRef.value}
          data={dataRef.value}
          pagination={paginationReactive}
          onUpdatePage={handlePageChange}
          style="margin: 4px"
        />
      </>
    );
  },
});
