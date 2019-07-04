import React from 'react';
import logo from './logo.svg';
import './App.css';
import './materialize.min.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = { countries: null };
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/name/united', {
        method: 'GET',
    })
    .then(results => results.json())
    .then(data => this.setState({ countries: data }))
    .catch(function(error) {console.log(error)});
  }

  _renderCountries(country, index) {
    return <li key={index}>{country.name} - {country.subregion}</li>
  }

    render() {
    const { countries } = this.state;

    return (
      <div>
        <div class="row">
          <div class="col s12 m12">
            <div class="card container">
              <h3>QUESTION 1: Fixed Countries</h3>
              <h6>LIST OF COUNTRIES:</h6>
              <ul>
                {
                countries ?
                countries.map(this._renderCountries)
                :
                "no data to display"
              }
              </ul>
            </div>
          </div>
        </div>
        <EssayForm />
        <SlotMachine />

      </div>
    );
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'write the word to search and click search'
    };
    this.state = { all_countries: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._renderQueryCountries = this._renderQueryCountries.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    fetch('https://restcountries.eu/rest/v2/all', {
        method: 'GET',
    })
    .then(results => results.json())
    .then(json => {console.log(json);
      this.setState({
        all_countries: json
      });
    })
    .catch(function(error) {console.log(error)});
  
    event.preventDefault();
  }

  _renderQueryCountries(country, index) {
    if((country.name.toUpperCase()).includes(this.state.value.toUpperCase())){
      return <li key={index}>{country.name} - {country.subregion}</li>
    }
  }

  render() {
    return (
      <div class="row">
        <div class="col s12 m12">
          <div class="card container">
            <h3>QUESTION 2 and 3: Search and show filters by name countries</h3>
            <form onSubmit={this.handleSubmit}>
              <label>
                Filter:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input class="waves-effect waves-light btn-large" type="submit" value="Search" />
            </form>
            <h6>LIST OF FILTERED COUNTRIES:</h6>
            <ul>
              {
              this.state.all_countries ?
              this.state.all_countries.map(this._renderQueryCountries)
              :
              "no data to display"
            }
            </ul> 
          </div>
        </div>
      </div>
    );
  }
}


class SlotMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reel1: ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon" ],
      reel2: ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
      reel3: ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"],
      coins: 20,
      result: null,
      dialog: "Press play!",
    };
    this.runSlot = this.runSlot.bind(this);

  }

  runSlot(event) {
    var reel_lenght = (this.state.reel1).length - 1
    console.log(reel_lenght)
    var rand = Math.floor(Math.random() * reel_lenght) + 0  
    var rand2 = Math.floor(Math.random() * reel_lenght) + 0  
    var rand3 = Math.floor(Math.random() * reel_lenght) + 0  
    var reel1_result = this.state.reel1[rand];
    var reel2_result = this.state.reel2[rand2];
    var reel3_result = this.state.reel3[rand3];
    var actual_coins = this.state.coins
    this.setState({coins: actual_coins - 1});
    var actual_coins = actual_coins - 1;
    var result2 = "The result is: | " + reel1_result + " | " + reel2_result + " | " + reel3_result + " | "
    this.setState({result: result2});

    if(reel1_result == "banana" && reel2_result == "banana" && reel3_result == "banana"){
      this.setState({coins: actual_coins + 15});
      this.setState({dialog: "Yay! You just earned 15 coins, you're doing great!"});
    }else if(reel1_result == "cherry" && reel2_result == "cherry" && reel3_result == "cherry"){
      this.setState({coins: actual_coins + 50});
      this.setState({dialog: "OMG! You just earned 50 coins, you're doing AMAZING!"});
    }else if(reel1_result == "apple" && reel2_result == "apple" && reel3_result == "apple"){
      this.setState({coins: actual_coins + 20});
      this.setState({dialog: "Yay! You just earned 20 coins, you're doing great!"});
    }else if(reel1_result == "lemon" && reel2_result == "lemon" && reel3_result == "lemon"){
      this.setState({coins: actual_coins + 3});
      this.setState({dialog: "Yay! You just earned 3 coins, you're doing great!"});
    }else if((reel1_result == "banana" && reel2_result == "banana" && reel3_result != "banana") || (reel1_result != "banana" && reel2_result == "banana" && reel3_result == "banana")){
      this.setState({coins: actual_coins + 5});
      this.setState({dialog: "Yay! You just earned 5 coins, you're doing great!"});
    }else if((reel1_result == "cherry" && reel2_result == "cherry" && reel3_result != "cherry") || (reel1_result != "cherry" && reel2_result == "cherry" && reel3_result == "cherry")){
      this.setState({coins: actual_coins + 40});
      this.setState({dialog: "Yay! You just earned 40 coins, you're doing great!"});
    }else if((reel1_result == "apple" && reel2_result == "apple" && reel3_result != "apple") || (reel1_result != "apple" && reel2_result == "apple" && reel3_result == "apple")){
      this.setState({coins: actual_coins + 10});
      this.setState({dialog: "Yay! You just earned 10 coins, you're doing great!"});
    }else{
      this.setState({dialog: "Aww, keep trying!"});
    }

    event.preventDefault();
  }

  render() {
    return (
      <div class="row">
        <div class="col s12 m12">
          <div class="card container">
            <h3>QUESTION 4: Slot Machine</h3>
            <h5>Coins: {this.state.coins}</h5>
            <h6>
              {
                this.state.result ?
                this.state.result
                :
                ""
              }
            </h6>
            <p>{this.state.dialog}</p>
            <form onSubmit={this.runSlot}>
              <input class="waves-effect waves-light btn-large" type="submit" value="Play" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
