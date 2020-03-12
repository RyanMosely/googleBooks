import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import API from "../../utils/API";
//import SaveButton from "../SaveButton";

// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function RecipeList({ children }) {
  return <ul className="list-group">{children}</ul>;
}




// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function RecipeListItem({
  thumbnail,
  title,
  author,
  description,
  ingredients,
  href
}) {


function saveBook () {
  console.log("hi");

  /*

  if (title && author) {
    API.saveBook({
      title: formObject.title,
      author: formObject.author,
      synopsis: formObject.synopsis
    })
      .then(() => setFormObject({
        title: "",
        author: "",
        synopsis: ""
      }))
      .then(() => loadBooks())
      .catch(err => console.log(err));
  }

  */

 API.getRecipes("sausage")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  
};

  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail || "https://placehold.it/300x300"} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <h4>{author}</h4>
            <p>Description: {description}</p>
            <button onClick={() => saveBook()}> Save Book </button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
