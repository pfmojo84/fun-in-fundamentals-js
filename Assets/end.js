const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');


const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

//save button is disabled if no values have been added. if there is something input, the button is enabled
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

//save top five scores to local storage and add score to list
//sort list and cut off anything that does not meet minimum score of top scores
saveHighScore = (e) => {
    e.preventDefault();

//check if the user got no answers correct and if so, give 0 as score. if not, assign mostRecentScore
  const score = {
   score: (mostRecentScore === '0' ? 0 : parseInt(mostRecentScore)),
   name: username.value
};

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem('highScores',JSON.stringify(highScores));
  window.location.assign('/');

};
