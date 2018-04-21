/**
 * @name User
 * @description This class represent the definition of a user object.
 *
 * @author Yanick Masse
 */
export class User {
  public username: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public role: string;
  public isAdmin: boolean;
  public language : string;
  public _id?: string;

  constructor(username: string, 
    first_name: string,
    last_name: string, 
    email: string,
    role: string,
    isAdmin: boolean,
    language: string) {

      this.username = username;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.role = role;
      this.isAdmin = isAdmin;
      this.language = language;
  }
}

enum UserRoleEnum {
  Admin ="admin",
  Therapist = "therapist",
  Patient = "patient"
}
