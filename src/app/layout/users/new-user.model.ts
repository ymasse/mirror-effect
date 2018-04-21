import { User }  from "./user.model";

/**
 * @name User
 * @description This class represent the definition of a user object.
 *
 * @author Yanick Masse
 */
export class NewUser extends User {
  public password: string;

  constructor(username: string, 
    password: string,
    first_name: string,
    last_name: string, 
    email: string,
    role: string,
    isAdmin: boolean,
    language: string,) {
      super(username, first_name, last_name, email, role, isAdmin, language);

      this.password = password;
  }
}