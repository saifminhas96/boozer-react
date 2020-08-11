import React from "react";
import API from "../API";
import CocktailsCollection from "./CocktailsCollection";
import CocktailDetails from "../components/CocktailDetails";
import CocktailForm from "../components/CocktailForm";

class CocktailsContainer extends React.Component {
  state = {
    cocktails: [],
    cocktailId: null,
    userSearch: "",
  };

  updateUserSearch = (e) => {
    this.setState({ userSearch: e.target.value });
  };

  filterCocktails = () => {
    return this.state.cocktails.filter((cocktail) =>
      cocktail.name.includes(this.state.userSearch)
    );
  };

  addCocktail = (cocktail) => {
    this.setState({
      cocktails: [...this.state.cocktails, cocktail],
    });
  };

  handleClick = (id) => {
    this.setState({
      cocktailId: id,
    });
  };

  componentDidMount() {
    API.getAllCocktails()
      .then((data) => this.setState({ cocktails: data }))
      .catch((error) => console.log(error.message));
  }

  render() {
    return (
      <div>
        <div className="ui divided three column grid">
          <div className="column">
            <CocktailsCollection
              cocktails={this.filterCocktails()}
              handleClick={this.handleClick}
            />
          </div>

          <div className="column">
            {this.state.cocktailId && (
              <CocktailDetails cocktailId={this.state.cocktailId} />
            )}
          </div>

          <div className="column">
            <CocktailForm addCocktail={this.addCocktail} />
          </div>
        </div>
      </div>
    );
  }
}

export default CocktailsContainer;
