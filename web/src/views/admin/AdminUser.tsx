import { AxiosError } from "axios";
import {
  DataTableColumns,
  FormInst,
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NH2,
  NInput,
  NPopconfirm,
  useMessage,
} from "naive-ui";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { http, HttpResponse } from "../../shared/Http";
import { Model } from "../../shared/types/models";

type Response = {
  total: number;
  data: Model.User[];
};

const getUsers: (form: UserForm) => Promise<Response> = async (form: UserForm) => {
  const res = await http.get<Response>("/admin/user", {
    username: form.username,
    pageSize: form.pageSize + "",
    currentPage: form.currentPage + "",
  });
  return res.data.data;
};

type UserForm = {
  username: string;
  pageSize: number;
  currentPage: number;
};

export const AdminUser = defineComponent({
  setup() {
    const message = useMessage();
    const rForm = ref<FormInst | null>(null);
    const formValue = ref<UserForm>({
      username: "",
      pageSize: 20,
      currentPage: 1,
    });
    const modifyUserBtnOnClick = (row: Model.User) => {
      message.info(`修改 ${row.username} 数据`);
    };
    const deleteUserBtnOnClick = (row: Model.User) => {
      http
        .delete<void>(`/admin/user/${row.id}`)
        .then((res) => {
          message.success(`删除 ${row.username} 成功`);
          handlePageChange(1);
        })
        .catch((err) => {
          if (err instanceof AxiosError<HttpResponse<void>>) {
            message.error(err.response?.data.message);
          }
        });
    };
    const createColumns = ({
      modifyUser,
      deleteUser,
    }: {
      modifyUser: (row: Model.User) => void;
      deleteUser: (row: Model.User) => void;
    }): DataTableColumns<Model.User> => [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "用户名",
        key: "username",
      },
      {
        title: "真实姓名",
        key: "realName",
      },
      {
        title: "管理员",
        key: "admin",
        render(rowData, _rowIndex) {
          return rowData.admin ? "是" : "否";
        },
      },
      {
        title: "超级管理员",
        key: "superAdmin",
        render(rowData, _rowIndex) {
          return rowData.superAdmin ? "是" : "否";
        },
      },
      {
        title: "操作",
        key: "action",
        render(row) {
          return (
            <>
              <NButton size="small" style="margin: 2px" onClick={() => modifyUser(row)}>
                修改
              </NButton>
              <NPopconfirm onPositiveClick={() => deleteUser(row)}>
                {{
                  trigger: () => (
                    <NButton size="small" style="margin: 2px">
                      删除
                    </NButton>
                  ),
                  default: () => "确定删除吗？",
                }}
              </NPopconfirm>
            </>
          );
        },
      },
    ];
    const dataRef = ref<Model.User[]>([]);
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
          getUsers({
            username: formValue.value.username,
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
    const setDataToTable = (total: number, data: Model.User[]) => {
      paginationReactive.itemCount = total;
      dataRef.value = data;
    };
    onMounted(() => {
      getUsers({
        username: "",
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
      getUsers(formValue.value).then((data) => {
        setDataToTable(data.total, data.data);
        loadingRef.value = false;
      });
    };
    const handlePageChange = (currentPage: number) => {
      if (!loadingRef.value) {
        loadingRef.value = true;
        getUsers({
          username: formValue.value.username,
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
        <NH2>用户列表</NH2>
        <NCard size="medium" style="margin: 4px">
          <NForm ref="rForm" inline labelWidth={80} model={formValue.value} showLabel={false}>
            <NFormItem label="用户名" path="username">
              <NInput v-model={[formValue.value.username, "value"]} placeholder="输入用户名" />
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
          columns={createColumns({ modifyUser: modifyUserBtnOnClick, deleteUser: deleteUserBtnOnClick })}
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
