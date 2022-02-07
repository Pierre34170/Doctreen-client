import axios from "axios";
import { User_Interface } from "../interfaces/User.interface";

export async function login(
  email_address: string,
  password_user: string
): Promise<User_Interface> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/login`;
      axios
        .post(
          url,
          {
            email_address,
            password_user,
          },
          {
            withCredentials: true,
          }
        )
        .then(
          (user) => {
            const loggedUser: User_Interface = user.data.data;
            resolve(loggedUser);
          },
          (err) => reject(err)
        );
    } catch (err) {
      reject(err);
    }
  });
}

export async function signup(
  email_address: string,
  password_user: string,
  first_name: string,
  last_name: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/signup`;
      axios
        .post(url, {
          email_address,
          password_user,
          first_name,
          last_name,
        })
        .then(
          () => {
            resolve();
          },
          (err) => reject(err)
        );
    } catch (err) {
      reject(err);
    }
  });
}