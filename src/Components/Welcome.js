import React from 'react'

class Welcome extends React.Component {
  render () {
    const {name, handleChange, handleClick} = this.props
    return (
      <section>
        <h1>¡Bienvenida!</h1>
        <label htmlFor="userName">Ingresa tu nombre</label>
        <input id="userName" name="name" type="text" onChange={handleChange} />
        <button disabled={name.length <= 0} onClick={handleClick}>Comenzar</button>
      </section>
    )
  }
}

export default Welcome