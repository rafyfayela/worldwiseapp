import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const apiUrl = "http://localhost:3500";

  async function getCity(id) {
    try {
      SetIsLoading(true);
      const res = await fetch(`${apiUrl}/cities/${id}`);
      const data = await res.json();
      // console.log(data);
      setCurrentCity(data);
    } catch {
      alert("error during fetching data");
    } finally {
      SetIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      SetIsLoading(true);
      const res = await fetch(`${apiUrl}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      // console.log(data);
      setCities((cities) => [...cities, data]);
    } catch {
      alert("error during Creating data");
    } finally {
      SetIsLoading(false);
    }
  }

  async function DeleteCity(id) {
    try {
      SetIsLoading(true);
      await fetch(`${apiUrl}/cities/${id}`, {
        method: "DELETE",
      });
      // console.log(data);
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("error during Deleting data");
    } finally {
      SetIsLoading(false);
    }
  }

  useEffect(function () {
    async function fetchCities() {
      try {
        SetIsLoading(true);
        const res = await fetch(`${apiUrl}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("error during fetching data");
      } finally {
        SetIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("context used outside the provider ");

  return context;
}

export { CitiesProvider, useCities };
