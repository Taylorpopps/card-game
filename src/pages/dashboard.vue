<script setup>

import { ref, computed } from 'vue';
import { startGame, guess, scores} from '../api/game'; 
import { useTheme} from 'vuetify'

const username = ref('');
const session = ref(false);
const currentCard = ref(false);
const guessIsHigher = ref(true);
const score = ref(0);
const gameOver = ref(false)
const leaderBoard = ref(false);
const theme = useTheme()


//Todo this needs to be deleted after api's work
const otherPlayersScores = [
  { 
    username: "taylor", score: 5, 
  },
  {
    username: "sam", score: 5, 
  }, 
  {
    username: "tom", score: 5, 
  },
  {
    username: "jack", score: 5, 
  }
]

//TODO needs to be deleted after api's work
const cardRange = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


//TODO needs to be deleted after api's work
const pickRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * cardRange.length);
  
  return cardRange[randomIndex];
};

const higherString = computed(() => {
  if (guessIsHigher.value) {
    return "Higher";
  } else {
    return "Lower";
  }
});

const start = () => {
  if (
    !username.value
  ) {
    alert('Please insert a valid username');
    return;
  }

  let body = {
    username: username.value
  }

  // try {
  //   let newSession = startGame(body);
  //TODO need to delete line 44 after apis work
    let newSession = {"sessionUuid" : "231231-12312312-123123123", "currentCard" : pickRandomCard()};


  session.value = newSession.sessionUuid;
  currentCard.value = newSession.currentCard;
  
  // } catch (err) {
  //   alert('Could not start game');
  // }

};


const isLower = (card1, card2) => {
  const index1 = cardRange.indexOf(card1);
  const index2 = cardRange.indexOf(card2);


  console.log(card1);
  console.log(card2)

  if (index1 < index2) {  
    return true;
  } 
  
  return false;
};

const fetchOtherScores = () => {
  try {
    // let response = scores();
    // otherPlayersScores.value = response;
    leaderBoard.value=true;

  } catch (err) {
    alert("Could not get leaderboard")
  }





}

const guessNextCard = () => {
  let body = { guess: higherString.value, session: session.value};

  


  try {
    // let response = guess(body)
    // let status = response.status;
    // let drawnCard = response.drawnCard;
    // let score = response.score;

    let drawnCard = pickRandomCard();

    console.log(isLower(drawnCard, currentCard.value ))

    //THIS NEEDS TO GO AWAY AFTER API, because logic will be handled in the backend
    if (isLower(drawnCard, currentCard.value ) == !guessIsHigher.value ) {
      score.value =  score.value +1;
      currentCard.value = drawnCard;
    } else {
      //Game over]
      gameOver.value = true;
      fetchOtherScores();
    }
    
    if (score.value === 5 ) {
      gameOver.value = true;
      fetchOtherScores();
    }
  } catch (err) {
    alert('Could not guess the card');
  }
};

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem("theme", theme.global.name.value);
}


</script>

<template>
  <v-row class="match-height">
    <v-col cols="12" md="12">
      <v-card elevation="4" style="margin-top: 100px; margin-left: 100px; margin-right: 100px; padding: 50px; text-align: center;">
        <v-btn @click="toggleTheme" icon variant="text"  class="custom-hover-primary ml-0 ml-md-5 text-muted">
          <v-icon ize="x-large">mdi-weather-night</v-icon>
      </v-btn>
        
        <v-card-item>
            <div st>
                <h1 class="text-h1"> Welcome to Taylor's card game!</h1>

                <div v-if="!session">
                  <img src="@/assets/images/cardgame.png"/>
                  <br/>
                  <v-text-field variant="outlined" v-model="username" label="Enter a username" type="text"/>
                  <br/>
                  <v-btn @click="start" class="bg-primary">Start</v-btn>
                </div>
                <div v-if="session && !gameOver">
                    <h2>Score</h2>
                    <h3>{{ score }}</h3>
                    <br/>

                    <h2>Current card</h2>
                    <br/>
                    <v-card style="margin-left: auto; margin-right: auto;width: 80px; height: 80px">
                        <h1>{{ currentCard }}</h1>
                    </v-card>

                    <br/>
                    <br/>
                    <br/>
                    What will the next card be ?

                    <div style="width: 98px; margin-left: auto; margin-right: auto;">
                      
                      <v-switch v-model="guessIsHigher" :label="higherString"></v-switch>
                    </div>
                    <br/>
                    <v-btn @click="guessNextCard" class="bg-primary">Guess</v-btn>
                </div>
                <div v-if="gameOver">
                  <h1>Awww... Game over!</h1>
                  <h2>Your score was</h2>
                  <h3>{{ score }}</h3>
                  <br/>

                  <h1>Leaderboard:</h1>
                    <v-table>
                      <thead>
                        <tr style="font-weight: 700;">
                          <th style="text-align: center;">
                            Username
                          </th>
                          <th style="text-align: center;">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in otherPlayersScores"
                          :key="item.username"
                        >
                          <td>{{ item.username }}</td>
                          <td>{{ item.score }}</td>
                        </tr>
                      </tbody>
                    </v-table>

                </div>

            </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>