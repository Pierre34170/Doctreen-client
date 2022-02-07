import React from "react";
import { ListGroup } from "react-bootstrap";
import { User_Interface } from "../../interfaces/User.interface";
import { User } from "./User";

export type ListUsersProps = {
  users: User_Interface[];
  currentUser: User_Interface;
  fetchUsers: ()=>void
};

export const ListUsers: React.FunctionComponent<ListUsersProps> = (
  props: ListUsersProps
) => {
  return (
    <div>
      <ListGroup>
        {props.users
          ? props.users.map((user) => (
              <ListGroup.Item >
                <User key={user.user_id} user={user} currentUser={props.currentUser} fetchUsers={props.fetchUsers}/>
              </ListGroup.Item>
            ))
          : null}
      </ListGroup>
    </div>
  );
};
