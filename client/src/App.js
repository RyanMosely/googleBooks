//import React, { Component } from "react";

import "./App.css";
import axios from "axios";

import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";


import React, { useState } from "react";


import API from "./utils/API";
import { RecipeList, RecipeListItem } from "./components/RecipeList";
import { Container, Row, Col } from "./components/Grid";






function App() {

  
  const [recipes, setRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  console.log(`howdy ${recipeSearch} partner`);

  const handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { value } = event.target;
    setRecipeSearch(value);
  };

  const handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();

    const URL = `https://www.googleapis.com/books/v1/volumes?q=${recipeSearch}`

console.log(URL);

    axios.get(URL)
    .then(response => {
        console.log(response.data.items[0].volumeInfo);
        setRecipes(response.data.items)
       
    })
    .catch(error => {
        console.log(error);
    });

    

    console.log("pewpewpew")
    /*
    API.getRecipes(recipeSearch)
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
      */
  };

  API.getRecipes();

  

 



  return (
    <div>
      <Nav />
      <Jumbotron />
      <Container>
        <Row>
          <Col size="md-12">
            <form>
              <Container>
                <Row>
                  <Col size="xs-9 sm-10">
                    <Input
                      name="RecipeSearch"
                      value={recipeSearch}
                      onChange={handleInputChange}
                      placeholder="Search For a Recipe"
                    />
                  </Col>
                  <Col size="xs-3 sm-2">
                    <Button
                      onClick={handleFormSubmit}
                      type="success"
                      className="input-lg"
                    >
                        Search
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            {!recipes.length ? (
              <h1 className="text-center">No Books to Display</h1>
            ) : (
              <RecipeList>
                {recipes.map(recipe => {


                  return (
                    <RecipeListItem
                   key={recipe.id}
                   title={recipe.volumeInfo.title}
                   author={recipe.volumeInfo.authors}
                   description={recipe.volumeInfo.description}
                   href={recipe.href}
                   ingredients={recipe.ingredients}
                   thumbnail={recipe.volumeInfo.imageLinks?recipe.volumeInfo.imageLinks.thumbnail:""}
               

                   /*
                   recipe.volumeInfo.title
                   title - Title of the book from the Google Books API
authors - The books's author(s) as returned from the Google Books API
description - The book's description as returned from the Google Books API
image - The Book's thumbnail image as returned from the Google Books API
link
                   */
                 /> 
                  
                  );
                })}
              </RecipeList>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default App;
