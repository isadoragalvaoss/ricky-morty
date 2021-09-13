import React, { useState, ChangeEvent, useEffect } from "react";
import Service from "../services/services";
import charactersData from "../types/types";
import notfound from "../images/not-found.png";

const GetCharacter: React.FC = () => {
  const [character, setCharacter] = useState<Array<charactersData>>([]);

  const [searchName, setSearchName] = useState<string>("");

  const [search, setSearch] = useState<boolean>(false);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  useEffect(() => {
    retrieveCharacter();
  }, []);

  const retrieveCharacter = () => {
    Service.getAll().then((response) => {
      setCharacter(response.data.results);
    });
  };

  useEffect(() => {
    retriCharacter();
    // eslint-disable-next-line
  }, [searchName]);

  const retriCharacter = () => {
    Service.get(searchName).then((response) => {
      setCharacter(response.data.results);
      setSearch(false);
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

      <div className="row" style={{ width: "50%" }}>
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
      </div>
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
              style={{ width: "60%" }}
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
  );
};

export default GetCharacter;
