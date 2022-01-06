// creats gameField and shows the array keys value
const gamefield = (() => {

    const gameboard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];

    const createField = function () { 

        gameboard.forEach( element => {
            const gameGrid = document.getElementById('gameGrid'); 
            const square = document.createElement('div'); 
            square.innerText = element; 
            square.classList.add('square');
            gameGrid.appendChild(square);


            //changes borders color on mouseover
            square.addEventListener('mouseover', function(e){ 
                e.target.style.border = 'solid 1px blue'
                })
            
        
            square.addEventListener('mouseleave', function(e){ 
                    e.target.style.border = 'solid 1px black'
                })

        });

    }
    
    return { createField, gameboard }
 })();

 gamefield.createField();



// constructor for players
 const player = function(name, marker){ 
     return { 
         name, 
         marker
     }
 }

 const xPlayer = player('Xavier', 'X');
 const oPlayer = player('Oliver', 'O');


 //game core 
 const game = (() => {

 })();  


