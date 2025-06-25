import React from "react";
import { Filter } from "react-feather";

const CategoryForm = ({categories, category, handleCategoryChange}) => {

    return(
        <div className="category-form">
            <form 
            className="category-filter"
            >


            <Filter/>
            <label htmlFor='category'>Filter Quotes:</label>
             <select id='category' name='category' value={category} onChange={handleCategoryChange}>
            {/* map over the categories array, and for each item inside the array, return an option that contains that item. */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option> 
            ))}
             </select>
            </form>
        </div>
    )

}

export default CategoryForm;