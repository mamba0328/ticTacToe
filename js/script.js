// creats gameField and shows the array keys value
const gamefield = (() => {

    const board = [1,1,1,1,1,1,1,1,1];
    const grid = document.getElementById('gameGrid'); //main gamefield

    const create = function () { //generates 9 divs and shows gameboard values, also each has it own id to track then in the array
      for(i=0;i<board.length; i++){ 

        const square = document.createElement('div'); 
        square.setAttribute('id',i);
        square.classList.add('square');
        grid.appendChild(square);

        //changes borders color on mouseover
        square.addEventListener('mouseover', function(e){ 
            e.target.style.border = 'solid 1px blue'
            })
        square.addEventListener('mouseleave', function(e){ 
                e.target.style.border = 'solid 1px black'
            })
      }
    }

    //
    const refresh = function () { //will be called after evry choise to display X or O; 
        const squares = Array.from(grid.children)
        
        for(i=0; i<squares.length; i++){ 
            if(gamefield.board[i] !=1){
            squares[i].innerText= gamefield.board[i]
         }
        }
    }
    
    return { refresh, create, board, grid }
 })();

 gamefield.create();
 
// factory for players
 const player = function(name, marker){ 
    
     return {name, marker}
 }

 const xPlayer = player('Xavier', 'X');
 const oPlayer = player('Oliver', 'O');


 //game core 
 const game = (() => {
    const squares = Array.from(gamefield.grid.children);
    let currentPlayer = 'xPlayer';//needed toggle players between 

    let chekXResults = function() { //cheks either Xplayer win or not
      const xWinCondts = [["X","X","X",0,0,0,0,0,0], //pack of win conditions for xPlayer
      [0,0,0,"X","X","X",0,0,0],
      ["X",0,0,"X",0,0,"X",0,0], 
      [0,"X",0,0,"X",0,0,"X",0],
      [0,0,"X",0,0,"X",0,0,"X"],
      ["X",0,0,0,"X",0,0,0,"X"],
      [0,0,"X",0,"X",0,"X",0,0]
    ];
      
      
      for(i=0; i<gamefield.board.length; i++){ 
        let matchCount = 0; 
        let tieCount = 0;

        for(j=0; j<gamefield.board.length; j++){ 
          
          if(gamefield.board[j] === xWinCondts[i][j]){
            matchCount+=1; 
          } 
    
          if(matchCount === 3){ 
            alert('X win');
            return true
          }

          if(gamefield.board[j]!= 1) { 
            tieCount+=1;
          }

        }

        if(tieCount===9){
          alert('This is a TIE')
          return true
        }
       
      } 
    }

    let chekOResults = function() { //cheks either Oplayer win or not
      const oWinCondts = [["O","O","O",0,0,0,0,0,0], //pack of win conditions for xPlayer
      [0,0,0,"O","O","O",0,0,0],
      ["O",0,0,"O",0,0,"O",0,0], 
      [0,"O",0,0,"O",0,0,"O",0],
      [0,0,"O",0,0,"O",0,0,"O"],
      ["O",0,0,0,"O",0,0,0,"O"],
      [0,0,"O",0,"O",0,"O",0,0]
    ];
      
      
      for(i=0; i<gamefield.board.length; i++){ 
        let matchCount = 0; 
        for(j=0; j<gamefield.board.length; j++){ 
          if(gamefield.board[j] === oWinCondts[i][j]){
            matchCount+=1; 
          } 
    
          if(matchCount === 3){ 
            alert('O win');
            return true
          }
        }
      }
    }
    
    squares.forEach(square => { //let players leave their marker on decided sqaure
        square.addEventListener('click', e => { 
          if(gamefield.board[e.target.id] === 1){//cheks either square is empty or not 
              if(currentPlayer === 'xPlayer'){
                gamefield.board[e.target.id] = xPlayer.marker; //founds exact spot in the array and changes it's value 
                gamefield.refresh();
                currentPlayer = 'oPlayer';//toggle players

                if(chekXResults()){ // cheks the results of the game
                  squares.forEach(square => { 
                    square.style.display = 'none';
                  })
                }
              } else if(currentPlayer === 'oPlayer'){
                gamefield.board[e.target.id] = oPlayer.marker; 
                gamefield.refresh();
                currentPlayer = 'xPlayer';

                  if(chekOResults()){  // cheks the results of the game
                  squares.forEach(square => {
                    square.style.display = 'none';
                  })
                }
            }

           

            
          } 
        })
    })

 })();  



