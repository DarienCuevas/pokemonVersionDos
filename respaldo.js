        //usando .then() con metodos encadenados
        fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })

        //usando .then() .catch() en promesas encadenadas
        fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then(response => {                                 //gestiona la primera promesa
            return response.json();                         //devuelve otra promesa
        })
        .catch(error => {                                   //gestiona si ocurre un error
            console.error("error jeje", error);             
        })
        .then(data => {                                     //gestiona la segunda promesa
            const contenedor = document.getElementById("resultado");
            contenedor.textContent = JSON.stringify(data);  //devuelve el json como objeto
        })
        .catch(error => {
            console.error("error jeje", error);
        });

