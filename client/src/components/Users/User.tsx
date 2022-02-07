import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { User_Interface } from "../../interfaces/User.interface";
import like from "../../img/like.png";
import warning from "../../img/warning.png";
import {
  updateInfoUser,
  updateRoleUser,
  deleteUser,
  signalUser,
  likeUser,
} from "../../services/user.service";

export type UserProps = {
  user: User_Interface;
  currentUser: User_Interface;
  fetchUsers: () => void;
};

export const User: React.FunctionComponent<UserProps> = (props: UserProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User_Interface>();
  const [newFirstname, setNewFirstname] = useState<string>(
    props.user.first_name
  );
  const [newLastname, setNewLastname] = useState<string>(props.user.last_name);
  const [newDescription, setNewDescription] = useState<string>(
    props.user.description
  );
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setUser(props.user);
  }, []);

  async function switchRoleUser() {
    setIsLoading(true);
    let role = "";
    if (user) {
      if (user.role === "USER") {
        role = "MODERATOR";
      } else if (user.role === "MODERATOR") {
        role = "USER";
      }
      updateRoleUser(user.user_id, role)
        .then((user) => {
          setUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }

  const handleSave = () => {
    setIsLoading(true);
    if (user) {
      updateInfoUser(user.user_id, newFirstname, newLastname, newDescription)
        .then((user) => {
          setUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          console.log("la");
          setIsLoading(false);
        });
      setShow(false);
    }
  };

  async function handleDelete() {
    setIsLoading(true);
    if (user) {
      deleteUser(user.user_id)
        .then(() => {
          props.fetchUsers();
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }

  async function handleSignal() {
    setIsLoading(true);
    if (user) {
      signalUser(user.user_id)
        .then((user) => {
          setUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }

  async function handleLike() {
    setIsLoading(true);
    if (user) {
      likeUser(user.user_id, user.nb_like + 1)
        .then((user) => {
          setUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      {user ?  (
        <Container>
          <Modal
            show={show}
            onHide={() => {
              setShow(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modifier les informations</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  value={newFirstname}
                  onChange={(event) => setNewFirstname(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={newLastname}
                  onChange={(event) => setNewLastname(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descritpion</Form.Label>
                <Form.Control
                  type="text"
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShow(false);
                }}
              >
                Annuler
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={isLoading}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>
          <Row>
            <Col>
              {user.first_name} {user.last_name} ({user.role})
              <div>
                <Button variant="light" onClick={handleLike}>
                  <img src={like} width="20" /> {user.nb_like}
                </Button>{" "}
                <Button
                  variant={user.signal === 1 ? "danger" : "light"}
                  onClick={handleSignal}
                  disabled={user.signal === 1}
                >
                  <img src={warning} width="20" />
                </Button>
              </div>
            </Col>
            <Col>
              {user.description ? (
                <div>description : {user.description}</div>
              ) : (
                <div>No description</div>
              )}
            </Col>
            {props.currentUser.role !== "USER" ? (
              <>
                <Col>
                  {props.user.role === "USER" ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShow(true);
                        }}
                        disabled={isLoading}
                      >
                        Modifier
                      </Button>
                      <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                        Supprimer
                      </Button>
                    </>
                  ) : null}

                  {props.currentUser.role === "ADMIN" ? (
                    user.role === "USER" ? (
                      <Button variant="success" onClick={switchRoleUser} disabled={isLoading}>
                        Promote
                      </Button>
                    ) : user.role === "MODERATOR" ? (
                      <Button variant="success" onClick={switchRoleUser} disabled={isLoading}>
                        Demote
                      </Button>
                    ) : null
                  ) : null}
                </Col>
              </>
            ) : null}
          </Row>
        </Container>
      ) : null}
      {error && (
        <div>
          <Alert variant="danger">An error has occured, sorry :/</Alert>
        </div>
      )}
    </>
  );
};
