import prompts from "prompts";
import chalk from "chalk";
import crypto from 'node:crypto';
import fs from 'fs';

const max = 3;
function loghelper(message){
    console.log(message);
    fs.appendFileSync('messagelog.txt', message + '\n');
}
async function game() {
    loghelper(chalk.magenta.bold("Guess The Number!"));
    loghelper(chalk.blue.bold("Guess a number between 1 and 10"));
    loghelper(chalk.yellow.bold("You have 3 tries"));


    const answer = crypto.randomInt(1, 11);
    let tries = 0;
    let correct = false;
    while (tries < max){
        tries++;
        const guess = await prompts({
            type: 'text',
            name: 'num',
            message: `Attempt ${tries}/3: Enter your guess...`
    });
        const input = guess.num;

        try{
            if(!input || input.trim() === '') throw new Error("A guess is required");
            const num = Number(input.trim());
            if(!Number.isInteger(num)) throw new Error("Must be a whole number");
            if (num < 1) throw new Error("Guess must be at least 1");
            if (num > 10) throw new Error("Guess cannot exceed 10");

            if (num === answer) {
                correct = true;
                break;
            }
            else if(num < answer){
                loghelper(chalk.yellow("Too low!"));
            }
            else if(num > answer){
                loghelper(chalk.yellow("Too high!"));
            }
        }
        catch (error){
            loghelper(chalk.red(error.message));
            tries--;
        }
}
    if (correct){
        loghelper(chalk.green("YOU WIN!"));
    }
    else{
        loghelper(chalk.red(`YOU LOST, THE SECRET NUMBER WAS ${answer}`))
    }}
game();