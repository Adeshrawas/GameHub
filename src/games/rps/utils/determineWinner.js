/**
 * Determines the winner of a Rock Paper Scissors round.
 * 
 * @param {string} playerChoice - 'rock', 'paper', or 'scissors'
 * @param {string} computerChoice - 'rock', 'paper', or 'scissors'
 * @returns {'win' | 'lose' | 'draw'}
 */
export function determineWinner(playerChoice, computerChoice) {
  if (!playerChoice || !computerChoice) {
    throw new Error('Both playerChoice and computerChoice must be provided');
  }

  const player = playerChoice.toLowerCase();
  const computer = computerChoice.toLowerCase();

  if (player === computer) {
    return 'draw';
  }

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }

  return 'lose';
}

export const CHOICES = ['rock', 'paper', 'scissors'];
