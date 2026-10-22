import prompts from "prompts";
import chalk from "chalk";
import crypto from 'node:crypto';
const max = 3;

async function game() {
    console.log(chalk.magenta.bold("Guess The Number!"));
    console.log(chalk.blue.bold("Guess a number between 1 and 10"))
    console.log(chalk.yellow.bold("You have 3 tries"))

    const answer = crypto.randomInt(1, 10);

    const guess = await prompts({
        type: 'text',
        name: 'num',
        message: `Attempt 1/3: Enter your guess...`
    });
}
game();