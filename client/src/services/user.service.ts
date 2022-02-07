import axios, { AxiosRequestConfig } from "axios";
import { User_Interface } from "../interfaces/User.interface";

export async function self(): Promise<User_Interface> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/self`;
      const config: AxiosRequestConfig = {
        method: "get",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      axios.get(url, config).then(
        (result) => {
          const user: User_Interface = result.data.data;
          resolve(user);
        },
        (err) => reject(err)
      );
    } catch (err) {
      reject(err);
    }
  });
}

export async function getUserById(id: number): Promise<User_Interface> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/users/${id}`;
      const config: AxiosRequestConfig = {
        method: "get",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      axios.get(url, config).then(
        (result) => {
          const user: User_Interface = result.data.data;
          resolve(user);
        },
        (err) => reject(err)
      );
    } catch (err) {
      reject(err);
    }
  });
}

export async function getUserBySearchTerms(search: string): Promise<User_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/users/search`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        params: {
          search: search,
        },
      };
      axios.get(url, config).then((users) => {
        const userList: User_Interface[] = new Array<User_Interface>();
        users.data.data.forEach((user: User_Interface) => {
          userList.push(user);
        });
        resolve(userList);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function getUsers(): Promise<User_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/users/`;
      const config: AxiosRequestConfig = {
        method: "get",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      axios.get(url, config).then(
        (result) => {
          const users: User_Interface[] = result.data.data;
          resolve(users);
        },
        (err) => reject(err)
      );
    } catch (err) {
      reject(err);
    }
  });
}

export async function updateDescriptionUser(id_user: number, description: string): Promise<User_Interface> {
    return new Promise((resolve, reject) => {
      try {
        const config: AxiosRequestConfig = {
          method: 'put',
          url: `${process.env.REACT_APP_SERV_HOST}/users/${id_user}`,
          withCredentials: true,
          data: { description },
        };
        axios(config).then((result) => {
          const user: User_Interface = result.data.data;
          resolve(user);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  export async function updateRoleUser(id_user: number, role: string): Promise<User_Interface> {
    return new Promise((resolve, reject) => {
      try {
        const config: AxiosRequestConfig = {
          method: 'put',
          url: `${process.env.REACT_APP_SERV_HOST}/users/${id_user}`,
          withCredentials: true,
          data: { role },
        };
        axios(config).then((result) => {
          const user: User_Interface = result.data.data;
          resolve(user);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  export async function updateInfoUser(id_user: number, first_name: string, last_name: string, description: string): Promise<User_Interface> {
    return new Promise((resolve, reject) => {
      try {
        const config: AxiosRequestConfig = {
          method: 'put',
          url: `${process.env.REACT_APP_SERV_HOST}/users/${id_user}`,
          withCredentials: true,
          data: { first_name, last_name, description},
        };
        axios(config).then((result) => {
          const user: User_Interface = result.data.data;
          resolve(user);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  export async function signalUser(id_user: number): Promise<User_Interface> {
    return new Promise((resolve, reject) => {
      try {
        const signal = 1;
        const config: AxiosRequestConfig = {
          method: 'put',
          url: `${process.env.REACT_APP_SERV_HOST}/users/${id_user}`,
          withCredentials: true,
          data: { signal },
        };
        axios(config).then((result) => {
          const user: User_Interface = result.data.data;
          resolve(user);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  export async function likeUser(id_user: number, nb_like: number): Promise<User_Interface> {
    return new Promise((resolve, reject) => {
      try {
        const config: AxiosRequestConfig = {
          method: 'put',
          url: `${process.env.REACT_APP_SERV_HOST}/users/${id_user}`,
          withCredentials: true,
          data: { nb_like },
        };
        axios(config).then((result) => {
          const user: User_Interface = result.data.data;
          resolve(user);
        });
      } catch (err) {
        reject(err);
      }
    });
  }



  export async function deleteUser(id: number): Promise<User_Interface> {
    return new Promise((resolve, reject) => {
      try {
        const url = `${process.env.REACT_APP_SERV_HOST}/users/${id}`;
        const config: AxiosRequestConfig = {
          method: 'delete',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        axios.delete(url, config).then((result) => {
          const user: User_Interface = result.data.data[0];
          resolve(user);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

