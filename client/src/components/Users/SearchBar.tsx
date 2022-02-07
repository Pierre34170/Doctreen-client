import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export type SearchBarProps = {
    setSearch: (search:string) => void
  };

export const SearchBar: React.FunctionComponent<SearchBarProps> = (props: SearchBarProps) => {

  return (
    <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Recherche</Form.Label>
    <Form.Control placeholder="Rechercher un utilisateur" onChange={(event) => props.setSearch(event.target.value)} />
  </Form.Group>
  );
};
