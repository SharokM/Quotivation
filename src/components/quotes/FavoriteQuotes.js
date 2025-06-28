import React from "react";
import FavoriteQuoteCard from "./FavoriteQuoteCard";
import Quotes from "./Quotes";

const FavoriteQuotes= ({favoriteQuotes, maxFavs, removeFromFavorites}) => {


    return (
        <section className="favorite-quotes">
        <div className="wrapper quotes">
          <h3>Top 3 Favorite Quotes </h3>
          {favoriteQuotes.length > 0 && 
          <ul>
            {favoriteQuotes.map((quote) => (
                <FavoriteQuoteCard quote={quote} key={quote.id} maxFavs={maxFavs} removeFromFavorites={removeFromFavorites}
            />
            ))}
          </ul>}
        </div>
      </section>
    )
}

 
export default FavoriteQuotes;