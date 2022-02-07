import React, { useCallback, useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { ListUsers } from "../../components/Users/ListUsers";
import { SearchBar } from "../../components/Users/SearchBar";
import { User_Interface } from "../../interfaces/User.interface";
import {
  getUserBySearchTerms,
  getUsers,
  self,
} from "../../services/user.service";

import { useNavigate } from "react-router-dom";

export const UserView: React.FunctionComponent = () => {
  const [users, setUsers] = useState<User_Interface[]>([]);
  const [currentUser, setCurrentUser] = useState<User_Interface>();
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    getUsers()
      .then((result) => {
        setUsers(result.filter((user) => user.user_id !== currentUser?.user_id));
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setUsers([]);
    getUserBySearchTerms(search).then((result) => {
      const listUsers = result.filter(
        (user) => user.user_id !== currentUser?.user_id
      );
      setIsLoading(false);
      setUsers(listUsers);
    });
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    const currentUserId = localStorage.getItem("user");
    if (!!currentUserId) {
      self()
        .then((loggedUser) => {
          setCurrentUser(loggedUser);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      return navigate("/home");
    }
  }, []);

  return (
    <div>
      {currentUser ? (
        <Container>
          <SearchBar setSearch={setSearch} />
          <ListUsers
            users={users}
            currentUser={currentUser}
            fetchUsers={fetchUsers}
          />
        </Container>
      ) : null}
      {error && (
        <div>
          <Alert variant="danger">An error has occured, sorry :/</Alert>
        </div>
      )}
    </div>
  );
};
