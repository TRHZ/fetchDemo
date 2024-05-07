import { useState, useEffect } from "react";
import "./App.css";

/* const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server responds with error!")
        }
        return response.json()
      })
      .then((response) => setImageURL(response[0].url))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return { imageURL, error, loading }
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>
  if (error) return <p> a network error was encounterd !!!</p>

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"Placeholder text"} />
      </>
    )
  )
}; */

const useImageURLs = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }), //Fetch for the first image
      fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" }) //Fetch for the second image
    ])
    .then(responses => Promise.all(responses.map(response => {
      if (response.status >= 400) {
        throw new Error("Server error!!");
      }
      return response.json();
    })))
    .then(data => {
      // Actualizar los estados de las URLs de las imágenes
      setImageURLs(data.map(item => item.url)); //
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false));
  }, []);

  return { imageURLs, error, loading };
};

function App() {
  const { imageURLs, error, loading } = useImageURLs();
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondImage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p> A network error was encountered ! </p>

  return (
    <>
      <h1>Images</h1>
      <div>
        {imageURLs[0] && !showSecondImage && <img src={imageURLs[0]} alt="First image" />}
        {showSecondImage && imageURLs[1] && <img src={imageURLs[1]} alt="Second image" />}
      </div>
    </>
  )
}

export default App
