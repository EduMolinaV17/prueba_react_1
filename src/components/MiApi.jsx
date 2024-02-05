import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Buscador from "./Buscador";
const MiApi = () => {
  //Se declaran los Estados para almacenar la información
  const [datos, setDatos] = useState([]);
  const [pokemon, setPokemon] = useState(datos);
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState(false);
  //Funcion asincrona para obtener los datos de la Api
  const obtenerDatos = async () => {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Hay un error en la Api");
      }
      const data = await res.json();
      const promesaPokemon = data.results.map(async (pokemon) => {
        const respuesta = await fetch(pokemon.url);
        const pokeDatos = await respuesta.json();
        return pokeDatos;
      });
      const datosPokemon = await Promise.all(promesaPokemon);
      setDatos(datosPokemon);
      setPokemon(datosPokemon);
    } catch (error) {
      console.error({ message: error });
    }
  };
  useEffect(() => {
    obtenerDatos();
  }, []);
  const mayus = (tipo) => {
    let primerElemento = tipo.charAt(0).toUpperCase();
    let restoDelElemento = tipo.slice(1);
    let stringCompleto = primerElemento + restoDelElemento;
    return stringCompleto;
  };
  //funcion para buscar
  const buscar = (evento) => {
    const buscarEnTexto = evento.target.value;
    const aBuscar = datos.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(buscarEnTexto.toLowerCase()) ||
        pokemon.id.toString().includes(buscarEnTexto.toString()) ||
        pokemon.types[0].type.name.toLowerCase().includes(buscarEnTexto.toLowerCase())
      );
    });
    setBusqueda(buscarEnTexto);
    setPokemon(aBuscar);
  };
  const ordenarAlfAz = () => {
    const ordenAlfAZ = [...pokemon];
    if (ordenar == false) {
      ordenAlfAZ.sort((nombre1, nombre2) =>
        nombre1.name.localeCompare(nombre2.name)
      );
      setOrdenar(true);
      setPokemon(ordenAlfAZ);
    } else {
      setOrdenar(false);
      setPokemon(pokemon.reverse());
    }
  };
  const ordenarAlfZa = () => {
    const ordenAlfAZ = [...pokemon];
    if (ordenar == false) {
      ordenAlfAZ.sort((nombre1, nombre2) =>
        nombre1.name.localeCompare(nombre2.name)
      );
      setOrdenar(true);
      setPokemon(ordenAlfAZ.reverse());
    } else {
      setOrdenar(false);
      setPokemon(pokemon.reverse());
    }
  };
  const ordenarNumFirstLast = () => {
    const ordenNumFirstLast = [...pokemon];
    if (ordenar == false) {
      ordenNumFirstLast.sort((id1, id2) => id1.id - id2.id);
      setOrdenar(true);
      setPokemon(ordenNumFirstLast);
    } else {
      setOrdenar(false);
      setPokemon(pokemon.reverse());
    }
  };
  const ordenarNumLastFirst = () => {
    const ordenNumLastFirst = [...pokemon];
    if (ordenar == false) {
      ordenNumLastFirst.sort((id1, id2) => id1.id - id2.id);
      setOrdenar(true);
      setPokemon(ordenNumLastFirst.reverse());
    } else {
      setOrdenar(false);
      setPokemon(pokemon.reverse());
    }
  };
  return (
    <>
      <Buscador
        busqueda={busqueda}
        buscar={buscar}
        ordenarAlfAz={ordenarAlfAz}
        ordenarAlfZa={ordenarAlfZa}
        ordenarNumFirstLast={ordenarNumFirstLast}
        ordenarNumLastFirst={ordenarNumLastFirst}
      />
      <div className="container">
        <div className="row mt-5 mb-5 justify-content-center">
          {pokemon.map((pokemon) => (
            <div key={pokemon.id} className="col-md-4">
              <div className="card" style={{ width: "280px", height:'410px', margin: "10px" }}>
                <img
                  src={pokemon.sprites.front_default}
                  className="card-img-top"
                  alt={`imagen de ${pokemon.name}`}
                />
                <div className="card-body">
                  <p className="card-text">
                    {"N°"}
                    {pokemon.id}
                  </p>
                  <h5 className="card-title">{mayus(pokemon.name)}</h5>
                  {"Type: "}
                  {pokemon.types.map((tipo) => (
                    <span key={tipo.slot}>{mayus(tipo.type.name)} </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <h5>Buscador Pokemon. Eduardo Molina Villarroel</h5>
      </footer>
    </>
  );
};

export default MiApi;
