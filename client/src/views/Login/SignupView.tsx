import React, { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { signup } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const SignUpView: React.FunctionComponent = () => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignUp = function (e: React.FormEvent) {
    e.preventDefault();
    const decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!firstname) {
      setError("You should fill firstname before sign up!");
    } else if (!lastname) {
      setError("You should fill lastname before sign up!");
    } else if (!email) {
      setError("You should fill email before sign up!");
    } else if (!password) {
      setError("You should fill password before sign up!");
    } else if (confirmPassword !== password) {
      setError("Both passwords should be the same!");
    }
    else if (password.length < 8) {
      setError("Password length must be greater than 8!");
    } else if (!password.match(decimal)) {
      setError(
        "Your password must contain one special character, one numeric digit, one lowercase and one uppercase letter"
      );
    }

    if (error === "") {
      setIsLoading(true);
      signup(email, password, firstname, lastname).then(
        () => {
          setIsLoading(false);
          return navigate("/home");
        },
        (error) => {
          setIsLoading(false);
          if (error.response.status === 409) {
            setError(error.response.data.message);
          } else {
            setError("Error in system, try an other time");
          }
        }
      );
    }
  };

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          handleSignUp(e);
        }}
      >
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre prénom"
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Adresse mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre adresse mail"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordconfirm">
          <Form.Label>Confirmez votre mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmez votre mot de passe"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>
        {error ? (
          <div>
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : null}

        <Button variant="primary" type="submit" disabled={isLoading}>
          S'enregistrer
        </Button>
      </Form>
    </Container>
  );
};
