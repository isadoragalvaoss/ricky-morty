import React, { useState, ChangeEvent, useEffect } from "react";
import Service from "../services/services";
import charactersData from "../types/types";
import notfound from "../images/not-found.png";

const GetCharacter: React.FC = () => {
  const [character, setCharacter] = useState<Array<charactersData>>([]);
  const [favorite, setFavorite] = useState<Array<charactersData>>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  const newFavorite = () => {
    Service.getAll()
      .then((response) => {
        const favoritos = response.data.results;
        console.log(favoritos);
        const salvar = JSON.stringify(favoritos);
        localStorage.setItem("favoritos", salvar);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveCharacter();
  }, []);

  const retrieveCharacter = () => {
    setLoading(true);
    setTimeout(() => {
      Service.getAll().then((response) => {
        setCharacter(response.data.results);
        setLoading(false);
      });
    }, 400);
  };

  useEffect(() => {
    retriCharacter();

    // eslint-disable-next-line
  }, [searchName]);

  const retriCharacter = () => {
    Service.get(searchName)
      .then((response) => {
        setCharacter(response.data.results);
        setSearch(false);
      })
      .catch((e) => {
        setLoading(false);
        setSearch(true);
      });
  };

  return (
    <div className="list ">
      <div className="row">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar pelo nome"
            value={searchName}
            onChange={onChangeSearchName}
          />
        </div>
      </div>

      {loading ? (
        <div>
          <h3 style={{ color: "white" }}>
            Loading...
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-hourglass"
              viewBox="0 0 16 16"
            >
              <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z" />
            </svg>
          </h3>
        </div>
      ) : (
        <div className="row">
          {character &&
            character
              //eslint-disable-next-line
              .filter((characte, index) => {
                if (searchName === "") {
                  return characte;
                } else if (
                  characte.name.toLowerCase().includes(searchName.toLowerCase())
                ) {
                  return characte;
                }
              })

              .map((characte, index) => (
                <div style={{}} key={index}>
                  <div
                    className="card"
                    style={{
                      width: 250,
                      height: 470,
                      margin: 50,
                      borderRadius: 5,
                      backgroundColor: "rgb(0, 180, 191)",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={characte.image}
                      alt="imag"
                      style={{}}
                    />

                    <button
                      style={{
                        width: 50,
                        border: "white",
                        borderRadius: 10,
                        marginTop: -15,
                        marginLeft: 10,
                      }}
                      onClick={newFavorite}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bookmark-heart"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
                        />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                      </svg>
                    </button>

                    <div className="card-body" style={{}}>
                      <div
                        className="card-title"
                        style={{
                          fontWeight: "bold",
                          fontFamily: "OCR A Std, monospace",
                        }}
                      >
                        <h4>
                          <div
                            style={{
                              color: "green",
                              fontWeight: "bold",
                              fontFamily: "OCR A Std, monospace",
                            }}
                          >
                            {characte.name}
                          </div>
                        </h4>
                        <h5>
                          <div
                            style={{
                              margin: 20,
                            }}
                          >
                            {characte.status}
                          </div>
                          <div
                            style={{
                              margin: 20,
                            }}
                          >
                            {characte.species}
                          </div>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          {search ? (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  className="card-img-top"
                  src={notfound}
                  alt="notfound"
                  style={{ width: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5%",
                }}
              >
                <h4 style={{ color: "white" }}>Não foi encontrado</h4>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetCharacter;
