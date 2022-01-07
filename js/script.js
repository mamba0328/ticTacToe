// creats gameField and shows the array keys value
const gamefield = (() => {

    const gameboard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    const gameGrid = document.getElementById('gameGrid'); //main gamefield

    const create = function () { //generates 9 divs and shows gameboard values, also each has it own id to track then in the array
      for(i=0;i<gameboard.length; i++){ 

        const square = document.createElement('div'); 
        square.setAttribute('id',i);
        square.innerText = gameboard[i]; 
        square.classList.add('square');
        gameGrid.appendChild(square);

        //changes borders color on mouseover
        square.addEventListener('mouseover', function(e){ 
            e.target.style.border = 'solid 1px blue'
            })
        
    
        square.addEventListener('mouseleave', function(e){ 
                e.target.style.border = 'solid 1px black'
            })
      }

    }

    const refresh = function () { //will be called after evry choise to display X or O; 
        const squares = Array.from(gameGrid.children)
        
        for(i=0; i<squares.length; i++){ 
            squares[i].innerText= gameboard[i]
        }
    }
    
    return { refresh,create, gameboard }
 })();

 gamefield.create();



 
// factory for players
 const player = function(name, marker){ 

    const choise = function() { 
        const gameGrid = document.getElementById('gameGrid');
        const squares = Array.from(gameGrid.children); 

        squares.forEach( square => { 
            square.addEventListener('click', (e) => { 
                gamefield.gameboard[e.target.id] = this.marker; 
                gamefield.refresh();
            })
        })
    }
    
     return { 
         choise,
         name, 
         marker
     }
 }

 const xPlayer = player('Xavier', 'X');
 const oPlayer = player('Oliver', 'O');


 //game core 
 const game = (() => {
    xPlayer.choise();
 })();  


