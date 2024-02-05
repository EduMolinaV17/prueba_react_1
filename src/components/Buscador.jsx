const Buscador = ({busqueda, buscar, ordenarAlfAz, ordenarAlfZa, ordenarNumFirstLast, ordenarNumLastFirst}) => {
      return (
        <>
        <h1>Buscador Pokemon</h1>
        <h5>En esta aplicación puedes ver los 1025 pokemon existentes</h5>
        <input
                type="text"
                className="form-control mb-3 col-12 col-md-6"
                placeholder="Ingresa el nombre, número o tipo principal de pokemon que deseas revisar"
                onChange={buscar}
                value={busqueda}
        />
            <button type="button" className="btn btn-success m-1" onClick={ordenarAlfAz}>Ordenar Pokemon Alfabeticamente de A-Z</button>
            <button type="button" className="btn btn-primary m-1" onClick={ordenarAlfZa}>Ordenar Pokemon Alfabeticamente de Z-A</button>
            <button type="button" className="btn btn-warning m-1" onClick={ordenarNumFirstLast}>Ordenar Pokemon del 1 al 1025</button>
            <button type="button" className="btn btn-warning m-1" onClick={ordenarNumLastFirst}>Ordenar Pokemon del 1025 al 1</button>
        </>

    )
}

export default Buscador