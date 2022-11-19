export namespace Model {
  export type User = {
    id: number;
    username: string;
    realName: string;
    superAdmin: boolean;
    admin: boolean;
  };
  export type Team = {
    id: number;
    name: string;
    owner: User;
    admins: User[];
    students: User[];
  };
}
