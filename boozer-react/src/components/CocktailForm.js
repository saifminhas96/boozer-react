import React from "react";
import Proportion from "./Proportion";
import { Form, Button, Input, TextArea } from "semantic-ui-react";

class CocktailForm extends React.Component {
  state = {
    name: "",
    description: "",
    instructions: "",
    proportions: [
      {
        ingredient: "",
        quantity: "",
      },
    ],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    const newCocktail = this.state;

    fetch(`http://localhost:3000/api/v1/cocktails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCocktail),
    })
      .then((resp) => resp.json())
      .then((cocktail) => this.props.addCocktail(cocktail))
      .catch((error) => error.message);
  };

  handleRemoveInput = (event) => {
    event.preventDefault();

    this.setState({
      proportions: this.state.proportions.slice(
        0,
        this.state.proportions.length - 1
      ),
    });
  };

  handleAddInput = (event) => {
    event.preventDefault();
    const newProportion = { ingredient: "", quantity: 0 };
    this.setState({ proportions: [...this.state.proportions, newProportion] });
  };

  handleInputChangeMain = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleInputChange = (key, newValue, index) => {
    const updatedArray = [...this.state.proportions];

    updatedArray[index][key] = newValue;

    this.setState({
      proportions: updatedArray,
    });
  };

  render() {
    return (
      <Form onSubmit={(event) => this.handleSubmit(event)}>
        <h2>Create a Cocktail</h2>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Name"
            type="text"
            name="name"
            placeholder="cocktail's name..."
            onChange={this.handleInputChangeMain}
            value={this.state.name}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={TextArea}
            label="Description"
            type="text"
            name="description"
            placeholder="description..."
            onChange={this.handleInputChangeMain}
            value={this.state.description}
          />

          <Form.Field
            control={TextArea}
            label="Instruction"
            type="text"
            name="instructions"
            placeholder="instructions..."
            onChange={this.handleInputChangeMain}
            value={this.state.instructions}
          />
        </Form.Group>
        <hr />

        <br />
        <Proportion
          proportions={this.state.proportions}
          handleInputChange={this.handleInputChange}
          ingredient={this.state.proportions.ingredient}
          quantity={this.state.proportions.quantity}
          handleAddInput={this.handleAddInput}
          handleRemoveInput={this.handleRemoveInput}
        />
        <hr />
        <Form.Field control={Button}>Create Cocktail</Form.Field>
      </Form>
    );
  }
}

export default CocktailForm;
