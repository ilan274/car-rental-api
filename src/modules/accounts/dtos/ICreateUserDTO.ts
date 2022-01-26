interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_licence: string;
  avatar?: string;
}
export { ICreateUserDTO };
