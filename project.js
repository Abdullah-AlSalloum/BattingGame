// 1. deposit some money.

const prompt = require("prompt-sync")();

const ROWS = 3
const CLOS = 3

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}





const Deposit = () =>{
    while(true){
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount)

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposited amount , Please try agian.");
    }else{
        return numberDepositAmount;
    }
}
};

// 2. Detemine the number of lines to bet on.

const getNumberOfLines = () =>{
    while(true){
    const lines = prompt("Enter a number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines)

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid nuber of lines , Please try agian.");
    }else{
        return numberOfLines;
    }
}
};

// 3. Collect the bet amount.

const getBet = (balance , lines) => {
    while(true){
        const bets = prompt("Enter the totle bet: ");
        const numberOfbets = parseFloat(bets)
    
        if(isNaN(numberOfbets) || numberOfbets <= 0 || numberOfbets > balance / lines ){
            console.log("Invalid bet , Please try agian.");
        }else{
            return numberOfbets;
        }
    }
}


// 4. Spin the slot machine.

const spin = () => {
   const Symbols = []
   for(const [Symbol , count] of Object.entries(SYMBOLS_COUNT)){
    for(let i = 0 ; i < count ; i++){
        Symbols.push(Symbol)
    }
   }
   
   const reels = []
   for(let i = 0 ; i < CLOS ; i++){
    reels.push([])
    const reelsymbols = [...Symbols]
    for(let j = 0; j < ROWS ; j++){
        const randomIndex = Math.floor(Math.random() * reelsymbols.length)
        const selectedsymbols = reelsymbols[randomIndex]
        reels[i].push(selectedsymbols)
        reelsymbols.splice(randomIndex , 1)
    }
   }
   return reels;
}


const transpose = (reels) => {
    const rows = []
    for(let i = 0 ; i < ROWS ; i++){
        rows.push([])
        for(let j = 0 ; j < CLOS ; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = ""
        for (const [i , symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}


// 5. Check if the user won.

const getWinnings = (rows ,bet , lines) => {
    let winnings = 0 ; 
    for(let row = 0 ; row < lines ; row++){
        const symbols = rows[row]
        let allSame = true;


        //this is the losing condition...
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winnings;
}




const game = () => {

    let balance = Deposit()

    while(true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance , numberOfLines)
        balance -= bet * numberOfLines
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)
        const winnings = getWinnings(rows , bet , numberOfLines)
        // 6. Give the user thier winnings.
        balance += winnings
        console.log("you won, $" + winnings.toString())
        // 7. Play again
        if(balance <= 0){
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)?")
        if(playAgain != "y") break;
    }

}

game()




