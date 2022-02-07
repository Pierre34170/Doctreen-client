import React, { useEffect, useState } from "react";
import { User_Interface } from "../../interfaces/User.interface";
import {
  Button,
  Container,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { self, updateDescriptionUser } from "../../services/user.service";
import { useNavigate } from "react-router-dom";

export const ProfileView: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useState<User_Interface>();
  const [description, setDescritpion] = useState<string>("");
  const [modification, setModification] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const currentUserId = localStorage.getItem("user");
    if (!!currentUserId) {
      self()
        .then((loggedUser) => {
          setCurrentUser(loggedUser);
          setDescritpion(loggedUser.description);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      return navigate("/home");
    }
    setIsLoading(false);
  }, []);

  const handleCancel = () => {
    setIsLoading(true);
    const oldDesrciption = currentUser?.description;
    if (oldDesrciption != undefined) {
      setDescritpion(oldDesrciption);
    } else {
      setDescritpion("");
    }
    setModification(false);
    setIsLoading(false);
  };

  async function handleSave() {
    setIsLoading(true);
    if (currentUser) {
      updateDescriptionUser(currentUser.user_id, description)
        .then((user) => {
          setCurrentUser(user);
          setModification(false);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setModification(false);
          setIsLoading(false);
        });
    }
  }

  return (
    <Container>
      <div>
        <h1>Profile</h1>
      </div>
      {error && (
        <div>
          <Alert variant="danger">An error has occured, sorry :/</Alert>
        </div>
      )}
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              placeholder="Disabled input"
              value={currentUser?.first_name}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              placeholder="Disabled input"
              value={currentUser?.last_name}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresse mail</Form.Label>
            <Form.Control
              placeholder="Disabled input"
              value={currentUser?.email_address}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(event) => setDescritpion(event.target.value)}
              disabled={!modification}
            />
          </Form.Group>
          {modification ? (
            <div>
              <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>
                Annuler
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={isLoading}>
                Enregistrer
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              type="submit"
              onClick={() => setModification(true)}
              disabled={isLoading}
            >
              Modifier ma description
            </Button>
          )}
          <div>
            <h2>Nombre de like : {currentUser?.nb_like}</h2>
          </div>
        </>
      )}
    </Container>
  );
};
