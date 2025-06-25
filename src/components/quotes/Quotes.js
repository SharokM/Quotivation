import React from "react";
import QuoteCard from "./QuoteCard";
import CategoryForm from "./CategoryForm";

const Quotes = ({filteredQuotes, category, categories, handleCategoryChange, addToFavourites}) => {

    return(
        <section className="all-quotes">
        <div className="quotes wrapper">
            <div className="category-header">
                <h2>Pick Your Favourite Quotes Below</h2>
                <p>
                    Browse Through Your Collection Of Quotes
                </p>
                <CategoryForm categories={categories} category={category} handleCategoryChange={handleCategoryChange}/>
            </div>

            {filteredQuotes.map((quote) => (
             <QuoteCard key={quote.id} quote={quote} addToFavourites={addToFavourites}/>
            ))}
            </div>
        </section>

    );
}

export default Quotes;