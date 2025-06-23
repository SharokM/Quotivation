import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import "./App.css";
import { use } from "react";
import Quotes from "./components/quotes/Quotes";

function App() {
const [quotes, setQuotes] = useState([]);
const [loading, setLoading] = useState(false);
const [category, setCategory] = useState("All");

  // url to the quotes API
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";


  const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];


    const fetchQuotes = async() => {

      // console.log(fetchQuotes);
      try {
        setLoading(true);
        const request = await fetch(quotesUrl);
        // console.log(request);
        const results = await request.json();
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


    const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;


    const handleCategoryChange = (e) => {
      setCategory(e.target.value)
    }

    
   

  return (
    <div className='App'>
      
      <Header />
      <main>
        {loading ? (
        <Loader/> ) : ( 
        <Quotes 
        filteredQuotes={filteredQuotes} 
        categories={categories} 
        category={category} 
        handleCategoryChange={handleCategoryChange}
        />
      )}
        </main>
      <Footer />
    </div>
  );
}

export default App;
