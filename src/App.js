import React from 'react';
import './App.css';

// Components
import Welcome from './Components/Welcome'
import Ranking from './Components/Ranking'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {'categoria':'gatos', 'image':'http://i63.tinypic.com/2zqzyv6.jpg'},
        {'categoria': 'perros', 'image': 'http://i65.tinypic.com/23r3c61.jpg' },
        {'categoria':'loros', 'image': 'http://i68.tinypic.com/2mqti5z.jpg'}
      ],
      name: '',
      next: false,
      positions: [1,2,3],
      ranking:{}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
    this.assignPosition = this.assignPosition.bind(this)
    this.styleWithPosition = this.styleWithPosition.bind(this)
    this.stringToSheets = this.stringToSheets.bind(this)
  }

  handleChange(e) {
    const {value, name} = e.target
    this.setState({ [name]: value})
  }

  handleClick() {
    this.setState({next: true})
  }

  toggleSelected(e) {
    const elem = e.target
    elem.classList.toggle('selected')
    this.assignPosition(elem)
  }

  assignPosition (elem) {
    const selected = elem.classList.contains('selected')
    const categoria = elem.dataset.categoria
    const {positions,ranking} = this.state
    if(selected) {
      let position =  positions.shift()
      this.setState({
        ranking: {
          ...ranking,
          [categoria]: position
        },
        positions
      })
      this.styleWithPosition(elem,position)
    } else {
      let position = ranking[categoria]
      positions.push(position)
      positions.sort()
      delete ranking[categoria]
      this.setState({
        positions,
        ranking
      })
      this.styleWithPosition(elem,position)
    }
  }

  styleWithPosition(elem,position) {
    elem.classList.toggle('position-' + position)
  }

  stringToSheets() {
    const {name, ranking} = this.state
    let string = ''
   
    for(const key in ranking) {
      string += key + '=' + ranking[key] + ', '
    }

    console.log(string + 'name=' + name)
  }

  render() {
    const {next, name, positions, items} = this.state
    return (
      <div className="App">
        {
          next
          ? <Ranking
              items={items}
              positions={positions}
              stringToSheets={this.stringToSheets}
              toggleSelected={this.toggleSelected} />
          : <Welcome
              name={name}
              handleChange={this.handleChange}
              handleClick={this.handleClick} />
        }
      </div>
    )
  }
}

export default App;
