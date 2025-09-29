import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quotes from "./components/quotes/Quotes";
import { Loader } from "react-feather";
import "./App.css";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Message from "./components/Message";
// import { use } from "react";


function App() {
const [quotes, setQuotes] = useState([]);
const [loading, setLoading] = useState(false);
const [category, setCategory] = useState("All");
const [favoriteQuotes, setFavoriteQuotes] = useState(JSON.parse(window.localStorage.getItem("favoriteQuotes")) || []);
const [messageText, setMessageText] = useState("");
const [showMessage, setShowMessage] = useState(false);
const maxFavs = 3;



  // url to the quotes API
const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";


const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];


    const fetchQuotes = async() => {

      try {
        setLoading(true);
        const response = await fetch(quotesUrl);
        // console.log(response);
        const results = await response.json();
        setQuotes(results);
      } catch (e) {
        console.log("error found", e);
      }
      setLoading(false);
    };


    useEffect (() => {
      fetchQuotes();

    },[])

    useEffect(() => {
      window.localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
    }, [favoriteQuotes]);
      // JSON.parse(localStorage.getItem("favoriteQuotes"))


     const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;


     const handleCategoryChange = (e) => {
      setCategory(e.target.value)
    }


    const addToFavorites = (quoteId) => {
      // console.log(`favorite quote heart here ${quoteId}`)
      const selectedQuote = quotes.find((quote) => quote.id === quoteId);
      // console.log(selectedQuote)
      const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id)
      console.log(alreadyFavorite)
      
      if (alreadyFavorite) {
        setMessageText("already in favorites!!")
        setShowMessage(true);
      } else if (favoriteQuotes.length < maxFavs) {
        setFavoriteQuotes([...favoriteQuotes, selectedQuote])
        setMessageText("added to favorites")
        setShowMessage(true);
      } else {
        setMessageText("max number of quotes reached, please delete one to add another") 
        setShowMessage(true);
      }
    };


  const removeFromFavorites = (quoteId) => {
     const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteId)
     setFavoriteQuotes(updatedFavorites)
      }
   
     const removeMessage = () => {
        setShowMessage(false);
      }

       

   
  

  return (
    <div className='App'>
      {showMessage &&
      <Message 
      removeMessage={removeMessage}
      messageText={messageText}
      /> }
      <Header />
      <main>
        <FavoriteQuotes 
        favoriteQuotes={favoriteQuotes} 
        maxFavs={maxFavs}
        removeFromFavorites={removeFromFavorites}
        />

        {loading ? (
         <Loader/> 
        ) : ( 
        <Quotes 
        filteredQuotes={filteredQuotes} 
        categories={categories} 
        category={category} 
        handleCategoryChange={handleCategoryChange}
        addToFavorites={addToFavorites}
        favoriteQuotes={favoriteQuotes}
        />
      )}
        </main>
      <Footer />
    </div>
  );
}

export default App;
