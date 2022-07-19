import React, {Component} from 'react'
import Header from './Component/Header'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_departement=33&size=5&sort=desc&pretty")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result['data']);
          this.setState({
            isLoaded: true,
            items: result['data']
          });
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement...</div>;
    } else {
      
      return (
        <div>
          <Header />
          <ul>
            {items.map(item => (
              <li key={item.name}>
                {item.date_mesure_temp} à {item.heure_mesure_temp} =  {item.resultat} {item.symbole_unite}
              </li>
            ))}
          </ul>
        </div>
      );
      
    }
  }

}

export default App;
