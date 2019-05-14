import React from 'react'

class Welcome extends React.Component {
  render () {
    const {name, handleChange, handleClick} = this.props
    return (
      <section id="welcomeSection">
        <div className="infoContainer">
          <h2>¡Hola!</h2>
          <p>diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta</p>
          <div className="formFake">
            <label htmlFor="userName">Ingresa tu nombre</label>
            <input id="userName" name="name" type="text" onChange={handleChange} />
            <button class="btn start" disabled={name.length <= 0} onClick={handleClick}>Comenzar</button>
          </div>
        </div>
      </section>
    )
  }
}

export default Welcome