function getRecipes() {
    const searchKeyword = document.getElementById('searchInput').value;
    const foodCart = document.getElementById('foodCart');
    const link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`;
    fetch(link)
        .then(response => response.json())
        .then(data => {
            const recipes = data.meals;
            if (recipes == null){
                document.getElementById('errorMsg').style.display = 'flex';
            } else{
                recipes.forEach(recipe => {
                    const recipeName = recipe.strMeal;
                    const recipeImgLink = recipe.strMealThumb;
                    const newCard = document.createElement('div');
                    newCard.className = 'recipeCard';
                    newCard.id = recipe.idMeal;
                    newCard.innerHTML = `<div class="card rounded m-3" style="width: 18rem;">
                    <img src=${recipeImgLink} class="card-img-top" alt="Food  image">
                    <h5 class="card-body card-title text-center"> ${recipeName} </h5>
                    </div>`
                    foodCart.appendChild(newCard)
                });
            }
        })
}

function searchNew() {
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('detailRecipe').style.display = 'none';
    document.getElementById('foodCart').style.display = 'flex';
    //clearing the previous search (if any)
    document.getElementById('foodCart').innerHTML = "";
    getRecipes();
}

function showIngredients() {
    //set Time out to wait till the data is loaded from api
    setTimeout(() => {
        const cards = document.getElementsByClassName('recipeCard');
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            card.addEventListener('click', (event) => {
                const recipeID = event.target.parentElement.parentElement.id;
                const link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
                fetch(link)
                    .then(res => res.json())
                    .then(data => {
                        const desiredRecipe = data.meals[0];
                        const maxIngredientNumber = 20;
                        document.getElementById('recipeName').innerText = desiredRecipe.strMeal;
                        document.getElementById('recipeImg').src = desiredRecipe.strMealThumb;
                        const ingredientsList = document.getElementById('ingredientsList');
                        //clearing previous ingredients (if any)
                        ingredientsList.innerHTML = "";
                        for (let i = 1; i <= 20; i++) {
                            const keyName = `strIngredient${i}`;
                            const keyMeasure = `strMeasure${i}`;
                            const ingredient = desiredRecipe[keyName];
                            const measurement = desiredRecipe[keyMeasure];
                            if (ingredient != "" && ingredient != null) {
                                const newIngredient = document.createElement('li');
                                newIngredient.innerText = `${ingredient} - ${measurement}`;
                                ingredientsList.appendChild(newIngredient);
                            }
                        }
                    })
                document.getElementById('foodCart').style.display = 'none';
                document.getElementById('detailRecipe').style.display = 'flex';
            })
        }
    }, 650);
}

function back(){
    document.getElementById('foodCart').style.display = 'flex';
    document.getElementById('detailRecipe').style.display = 'none';
}
//event: search button press
document.getElementById('searchBtn').addEventListener('click', () => {
    searchNew();
    showIngredients();

})
//event: search input change
document.getElementById('searchInput').addEventListener('change', () => {
    searchNew();
    showIngredients();
})