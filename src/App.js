import React from 'react';
import './App.scss';
import axios from 'axios'

// Components
import Welcome from './Components/Welcome'
import Ranking from './Components/Ranking'
import Thanks from './Components/Thanks';

const URL = 'https://script.google.com/macros/s/AKfycbyDlPAT_Sh269TKBB7-PQj3eIFkNSxlEpWkkrLhbR5Xi6GnHY4/exec?'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {'categoria':'loros', 'image': 'http://i68.tinypic.com/iwjddz.jpg'},
        {'categoria':'gatos', 'image':'http://i63.tinypic.com/2wpow9t.jpg'},
        {'categoria': 'perros', 'image': 'http://i65.tinypic.com/5eddvk.jpg' }
      ],
      name: '',
      next: false,
      thanks: false,
      positions: [1,2,3],
      ranking:{}
    }
  }

  componentDidMount () {
    this.calcHeight()

    window.addEventListener('resize', () => {
      this.calcHeight()
    })
  }

  calcHeight = () => {
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    document.querySelector('#root').style['min-height'] = height + 'px'
  }

  handleChange = (e) => {
    const {value, name} = e.target
    this.setState({ [name]: value})
  }

  handleClick = () => {
    this.setState({next: true})
  }

  toggleSelected = (e) => {
    e.stopPropagation()
    const elem = e.target
    elem.classList.toggle('selected')
    this.assignPosition(elem)
  }

  assignPosition = (elem) => {
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

  styleWithPosition = (elem,position) => {
    elem.classList.toggle('position-' + position)
  }

  sendData = () => {
    const {name, ranking} = this.state
    let string = ''

    for(const key in ranking) {
      string += key+ '=' + ranking[key] + '&'
    }
    
    const rankingFinal = string + 'nombre=' + name
    this.sendToGoogle(rankingFinal)
  }

  sendToGoogle = (rankingFinal) => {
    const _this = this
    axios.get(URL + rankingFinal)
      .then(function (response) {
        if (response.status === 200) {
          _this.setState({thanks: true})
        } else {
          console.log('ok, otro código')
        }
      })
      .catch(function (error) {
        console.log(error)
        alert('Oops! Intenta de nuevo')
      })
  }

  render() {
    const {next, name, positions, items, thanks} = this.state
    return (
      <div className="App">
        {
          thanks
          ? <Thanks />
          : next
            ? <Ranking
                items={items}
                positions={positions}
                sendData={this.sendData}
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
