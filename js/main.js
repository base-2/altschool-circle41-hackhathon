// getting the submit, search and results elements
let button = document.getElementById("button");
let search = document.getElementById("phone");
let results = document.getElementById("result");
let image = document.getElementById("image");

//creating the function
function FindProvider (number){

    //formatting the number and making it 4 digits long
    let nNumber = number.replace('+234', '0').substring(0, 4);

    // fetching the numbers and providers
    fetch("/js/data.json")
    .then(response => {
       return response.json();
    })
    //looping through the numbers and providers in the Json to find the one that matches the user input
    .then(data => {
        let newProvider = data.find(item => item.number === nNumber);
        
        // handling the case where the number is not found
        if(!newProvider){
            console.log("Provider not found");
            results.innerHTML = "Provider not found";
            image.src = '/img/PHONIE.webp';
        }
        // handling the case where the number is found
        else{
            console.log(`${number} is a ${newProvider.provider} number`);
            results.innerHTML = `${number} is a ${newProvider.provider} number`;
            image.src = `/img/${newProvider.provider}.webp`;
        }
    });
}

//adding the event listener to the enter key
search.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let value = search.value;
        return FindProvider(value);
   }
});

//adding the event listener to the submit button
button.addEventListener('click', function (e) {
        e.preventDefault();
        let value = search.value;
        return FindProvider(value);
});


