import React, { useState } from "react";
import { login } from "../../services/auth.service";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const LoginView: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = function (e:React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    login(email, password)
      .then((loggedUser) => {
        console.log(loggedUser)
        localStorage.setItem("user", loggedUser.user_id.toString());
        setIsLoading(false);
        return navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setError(error.response.data.message);
        } else {
          setError("Error in system, please try later");
        }
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Form onSubmit={(e)=>{handleLogin(e)}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Adresse mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            onChange={(event) => setEmail(event.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          Se connecter
        </Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container>
  );
};
