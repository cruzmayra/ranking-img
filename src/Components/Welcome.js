import React from 'react'

class Welcome extends React.Component {
  render () {
    const {name, handleChange, handleClick} = this.props
    return (
      <section id="welcomeSection">
        <div className="infoContainer">
          <h2>¡Hola!</h2>
          <p className="indications">Lorem ipsum dolor amet bespoke street art subway tile, YOLO banjo vexillologist cardigan vape air plant twee pinterest butcher.</p>
          <div className="formFake">
            <label htmlFor="userName">Ingresa tu nombre</label>
            <input id="userName" name="name" type="text" onChange={handleChange} />
            <button className="btn" disabled={name.length <= 0} onClick={handleClick}>Comenzar</button>
          </div>
        </div>
      </section>
    )
  }
}

export default Welcome