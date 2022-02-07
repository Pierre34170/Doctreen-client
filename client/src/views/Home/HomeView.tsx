import React, { useState, useEffect } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { User_Interface } from "../../interfaces/User.interface";
import { self } from "../../services/user.service";

export const HomeView: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useState<User_Interface>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    const currentUserId = localStorage.getItem("user");
    if (!!currentUserId) {
      self()
        .then((loggedUser) => {
          setCurrentUser(loggedUser);
        })
        .catch((error) => {
          setError(error);
        });
    }
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <div>
        {isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <div>
            {currentUser ? (
              <>
                <div>
                  <h2>Bonjour {currentUser?.first_name}</h2>
                </div>
                <div>
                  <h2>Ton role est : {currentUser?.role}</h2>
                </div>
                {currentUser.signal !== 0 ? (
                  <Alert variant="danger">Vous avez été signalé :/</Alert>
                ) : null}
              </>
            ) : (
              <div>
                <h2>Vous n'êtes pas connecté</h2>
                {console.log("lala")}
              </div>
            )}
          </div>
        )}
        {error && (
          <div>
            <Alert variant="danger">An error has occured, sorry :/</Alert>
          </div>
        )}
      </div>
    </Container>
  );
};
