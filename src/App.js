import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quotes from "./components/quotes/Quotes";
import { Loader } from "react-feather";
import "./App.css";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
// import { use } from "react";


function App() {
const [quotes, setQuotes] = useState([]);
const [loading, setLoading] = useState(false);
const [category, setCategory] = useState("All");
const [favoriteQuotes, setFavoriteQuotes] = useState([]);

const maxFavs = 3;

  // url to the quotes API
const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";


const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];


    const fetchQuotes = async() => {

      // console.log(fetchQuotes);
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
      // const timeInterval = window.setInterval(() => {
      //   setTime(new Date());
      //   console.log("in timeInterval");
      //   // console.log("intvl");
      // }, 1000);
      // return () => window.clearInterval(timeInterval);
    },[])


    const handleCategoryChange = (e) => {
      setCategory(e.target.value)
    }

    const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;


    const addToFavorites = (quoteId) => {
      // console.log(`favorite quote heart here ${quoteId}`)
      const selectedQuote = quotes.find((quote) => quote.id === quoteId);
      // console.log(selectedQuote)
      // ORIGINAL 
      const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id)
      // TEST 
      // const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === quotes.id)
      console.log(alreadyFavorite)
      if (alreadyFavorite) {
        console.log("already in favorites!!")
      } else if (favoriteQuotes.length < maxFavs) {
        setFavoriteQuotes([...favoriteQuotes, selectedQuote])
        console.log("added to favorites")
      } else {
        console.log("max number of quotes reached, please delete one to add another")
      }
    };


  const removeFromFavorites = (quoteId) => {
     const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteId)
     setFavoriteQuotes(updatedFavorites)
      }
   
       

   
  

  return (
    <div className='App'>
      <Header />
      <main>
        <FavoriteQuotes 
        favoriteQuotes={favoriteQuotes} 
        maxFavs={maxFavs}
        removeFromFavorites={removeFromFavorites}
        />
        {/* <section className="favorite-quotes">
          <div className="wrapper quotes">
            <h3>Top 3 Favorite Quotes</h3>
            {favoriteQuotes.length >= 1 && JSON.stringify(favoriteQuotes)}
          </div>
        </section> */}
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
