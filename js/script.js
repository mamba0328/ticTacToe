// factory for players
const player = function(name, marker){ 
  return {name, marker}
}

let xPlayer = player('Xavier', 'X');
let oPlayer = player('Oliver', 'O');


// creats gameField and shows the array keys value
const gamefield = (() => {
  const board = [1,1,1,1,1,1,1,1,1];
  const restart = document.getElementById('restart')
  const grid = document.getElementById('gameGrid'); //main gamefield
  restart.style.display = 'none';
  const create = function () { //generates 9 divs and shows gameboard values, also each has it own id to track then in the array
   
    for(i=0;i<board.length; i++){ 
      const square = document.createElement('div'); 
      square.setAttribute('id',i);
      square.classList.add('square');
      grid.appendChild(square);

      //changes borders color on mouseover
      square.addEventListener('mouseover', function(e){ 
          e.target.style.border = 'solid 3px rgb(0, 153, 255)'
          })
      square.addEventListener('mouseleave', function(e){ 
              e.target.style.border = 'solid 1px black'
          })
    }
  }

  const refresh = function () { //will be called after evry choise to display X or O; 
      const squares = Array.from(grid.children)
      
      for(i=0; i<squares.length; i++){ 
          if(gamefield.board[i] !=1 && restart.style.display === 'none'){
          squares[i].innerText= gamefield.board[i]
       }
      }
  }

  const clear = function(){
    for (i=0; i<board.length; i++){
      board[i]= 1; 
      const squares = Array.from(grid.children);
      squares[i].innerText = '';
     }
  }
  
  const oName = document.getElementById('oName')
  const xName = document.getElementById('xName')
  oName.innerText = oPlayer.name;
  xName.innerText = xPlayer.name;

  oName.addEventListener('mouseenter', () => oName.style.color = 'rgb(0, 153, 255)')
  xName.addEventListener('mouseenter', () => xName.style.color = 'rgb(0, 153, 255)')

  oName.addEventListener('mouseleave', () => oName.style.color = 'black')
  xName.addEventListener('mouseleave', () => xName.style.color = 'black')

  oName.addEventListener('click', () => {
    let newName = prompt('Enter your name')

    if(newName != '' || newName != null){
      oName.innerText = newName;
    }
  }, {once:true})

  xName.addEventListener('click', () => {
    let newName = prompt('Enter your name')

    if(newName != '' || newName != null){
      xName.innerText = newName;
    }
  }, {once:true})


  return { refresh, create, board, grid, clear, restart }
})();

//game core 
const game = (() => {

  //displays results
  let oCounter = 0; 
  let xCounter = 0;
  // 
  let currentPlayer = 'xPlayer';//needed toggle players between 
  //
  const results = document.querySelector('#results');
  results.style.display = 'none';

  let chekXResults = function() { //cheks either Xplayer win or not
    const xWinCondts = [["X","X","X",0,0,0,0,0,0], //pack of win conditions for xPlayer
    [0,0,0,"X","X","X",0,0,0],
    ["X",0,0,"X",0,0,"X",0,0], 
    [0,"X",0,0,"X",0,0,"X",0],
    [0,0,"X",0,0,"X",0,0,"X"],
    ["X",0,0,0,"X",0,0,0,"X"],
    [0,0,"X",0,"X",0,"X",0,0]
  ];
    const xScore= document.getElementById("xScore")
     
    xScore.innerText = xCounter;

    for(i=0; i<gamefield.board.length; i++){ 
      let matchCount = 0; 
      let tieCount = 0;

      for(j=0; j<gamefield.board.length; j++){ 
        
        if(gamefield.board[j] === xWinCondts[i][j]){
          matchCount+=1; 
        } 
  
        if(matchCount === 3){
          const xName = document.getElementById('xName')
          const oName = document.getElementById('oName')
          xCounter+=1; 
          xScore.innerText = xCounter;
          results.style.display = 'flex';
          results.innerText = `${xName.innerText} smashed ${oName.innerText}`
          return true
        }

        if(gamefield.board[j]!= 1) { 
          tieCount+=1;
        }

      }

      if(tieCount===9){
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
    
    const oScore= document.getElementById("oScore")
    
    oScore.innerText = oCounter;

    for(i=0; i<gamefield.board.length; i++){ 
      let matchCount = 0; 
      for(j=0; j<gamefield.board.length; j++){ 
        if(gamefield.board[j] === oWinCondts[i][j]){
          matchCount+=1; 
          
        } 
  
        if(matchCount === 3){ 
          const xName = document.getElementById('xName')
          const oName = document.getElementById('oName')
          oCounter += 1; 
          oScore.innerText = oCounter;
          results.style.display = 'flex';
          results.innerText = `${oName.innerText} smashed ${xName.innerText} `
          return true
        }
      }
    }
  }
  
  const start = function() { 
    const squares = Array.from(gamefield.grid.children);
    squares.forEach(square => { //let players leave their marker on decided sqaure
    square.addEventListener('click', e => { 
        if(gamefield.board[e.target.id] === 1){//cheks either square is empty or not 
            if(currentPlayer === 'xPlayer'){
              gamefield.board[e.target.id] = xPlayer.marker; //founds exact spot in the array and changes it's value 
              gamefield.refresh();
              currentPlayer = 'oPlayer';//toggle players

              if(chekXResults()){ // cheks the results of the game
                endGame();
              }
            } else if(currentPlayer === 'oPlayer'){
              gamefield.board[e.target.id] = oPlayer.marker; 
              gamefield.refresh();
              currentPlayer = 'xPlayer';

                if(chekOResults()){  // cheks the results of the game
                  endGame();
              }
          }
        } 
      })
  })
  }
  
  const first = function() { 
    gamefield.grid.replaceChildren();
    gamefield.create(); 
    start();
  }
  
  const endGame = function() { 
    currentPlayer = 'xPlayer'
    gamefield.restart.style.display ='flex';
    gamefield.restart.addEventListener('click', ()=> {
      gamefield.clear();
      gamefield.restart.style.display ='none';
      results.style.display = 'none';
      start();
    })
  }

  gamefield.grid.addEventListener('click', () => {
    if(gamefield.grid.children.length < 5){
    first();
   } 
  }) 

  return {start}
})(); 

