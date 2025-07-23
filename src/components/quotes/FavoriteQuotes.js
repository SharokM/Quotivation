import React from "react";
import FavoriteQuoteCard from "./FavoriteQuoteCard";
// import Quotes from "./Quotes";

const FavoriteQuotes= ({favoriteQuotes, maxFavs, removeFromFavorites}) => {


    return (
        <section className="favorite-quotes">
        <div className="wrapper quotes">
          <h3>Top 3 Favorite Quotes </h3>
          {favoriteQuotes.length > 0 && 
          <ul>
            {favoriteQuotes.map((quote, index) => (
                <FavoriteQuoteCard quote={quote} listPosition={index + 1} key={quote.id} removeFromFavorites={removeFromFavorites}
            />
            ))}
          </ul>}
          {favoriteQuotes.length < maxFavs && (
                      <div className="favorite-quotes-description">
                      <p>
                      Add up to {maxFavs-favoriteQuotes.length} more {maxFavs - favoriteQuotes.length === 1 ? "quote" : "quotes"} by selecting from the options below!
                      </p>
            
                      <p>
                          Once chosen, your quotes will appear here.  
                      </p>
                </div>
          )}
          
        </div>
      </section>
    )
}

 
export default FavoriteQuotes;