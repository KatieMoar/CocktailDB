// //GETS SEARCHED DRINK
document.querySelector('#getCocktailButton').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`


  fetch(url)
      .then(res => res.json()) 
      .then(data => {

        if(choice !== '') {

          ingredientTitle = document.querySelector('#ingredientTitle')
          ingredientTitle.classList.remove('hidden')

          console.log(data)
          document.querySelector('h2').innerText = data.drinks[0].strDrink
          document.querySelector('.drinkImage').src = data.drinks[0].strDrinkThumb
          document.querySelector('h4').innerText = data.drinks[0].strInstructions


          let ul = document.querySelector('ul')
          function removeAllChildNodes(ul) {
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        }
        removeAllChildNodes(ul)

 
          for (let i = 1; i < 16; i++) {

            if(data.drinks[0][`strIngredient${i}`] == null || data.drinks[0][`strIngredient${i}`] == ""){
              break
            } else if (data.drinks[0][`strMeasure${i}`] == null) {
              data.drinks[0][`strMeasure${i}`] = " "
            }
              let ul = document.querySelector('ul')
              let ingredients = document.createElement('li')
              ingredients.innerHTML = data.drinks[0][`strMeasure${i}`] + "  " + data.drinks[0][`strIngredient${i}`]
              ul.appendChild(ingredients)
              
          }

        } 
        })

      .catch(err => {
          console.log(`error ${err}`)
      });
}

//GETS RANDOM ROTATING LIST OF DRINKS

document.querySelector('#getRandomCocktail').addEventListener('click', checkInterval)
document.querySelector('#stopCocktail').addEventListener('click', stopList)

let interval

function checkInterval (){
  if(!interval) {
    rotateList()
    interval = setInterval(rotateList, 6000)
  }
}

function rotateList () {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

  fetch(url)
      .then(res => res.json()) 
      .then(data => {

        ingredientTitle = document.querySelector('#ingredientTitle')
        ingredientTitle.classList.remove('hidden')

        console.log(data)
        document.querySelector('h2').innerText = data.drinks[0].strDrink
        document.querySelector('.drinkImage').src = data.drinks[0].strDrinkThumb
        document.querySelector('h4').innerText = data.drinks[0].strInstructions

        let ul = document.querySelector('ul')
        function removeAllChildNodes(ul) {
          while (ul.firstChild) {
              ul.removeChild(ul.firstChild);
          }
      }
      removeAllChildNodes(ul)

      for (let i = 1; i < 16; i++) {

        if(data.drinks[0][`strIngredient${i}`] == null || data.drinks[0][`strIngredient${i}`] == ""){
          break
        } else if (data.drinks[0][`strMeasure${i}`] == null) {
          data.drinks[0][`strMeasure${i}`] = " "
        }
          let ul = document.querySelector('ul')
          let ingredients = document.createElement('li')
          ingredients.innerHTML = data.drinks[0][`strMeasure${i}`] + "  " + data.drinks[0][`strIngredient${i}`]
          ul.appendChild(ingredients)
          
      }

      })

      

      .catch(err => {
          console.log(`error ${err}`)
      });

}



function stopList () {
  clearInterval(interval)
  interval = null
}