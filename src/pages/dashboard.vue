<script setup>

import { ref, computed } from 'vue';
import { startGame, guess, scores} from '../api/game'; 
import { useTheme} from 'vuetify'

const username = ref('');
const session = ref(false);
const currentCard = ref(false);
const guessIsHigher = ref(true);
const score = ref(0);
const gameOver = ref(false);
const leaderBoard = ref(false);
const theme = useTheme();
const otherPlayersScores = ref([]);

const higherString = computed(() => {
  if (guessIsHigher.value) {
    return "Higher";
  } else {
    return "Lower";
  }
});

const start = async () => {
  if (
    !username.value
  ) {
    alert('Please insert a valid username');
    return;
  }

  let body = {
    username: username.value
  }

  try {
    let newSession = await startGame(body);

    session.value = newSession.sessionUuid;
    let cardValue = newSession.currentCard;

    if (cardValue == 11) {
      cardValue = "J";
    } 
    if (cardValue == 12) {
      cardValue = "Q";
    } 
    if (cardValue == 13) {
      cardValue = "K";
    } 
    if (cardValue == 14) {
      cardValue = "A";
    } 


    currentCard.value = cardValue;
  
  } catch (err) {
    alert('Could not start game');
  }

};

const fetchOtherScores = async () => {
  try {
    let response = await scores();
    otherPlayersScores.value = response.scores.sort((a, b) => b.score - a.score);
    leaderBoard.value=true;
  } catch (err) {
    alert("Could not get leaderboard")
  }
}

const guessNextCard = async () => {
  let body = { higher: guessIsHigher.value, sessionUuid: session.value};

  
  try {
    let response = await guess(body)
    let drawnCard = response.currentCard2;  
    let cardValue = drawnCard;

    if (cardValue == 11) {
      cardValue = "J";
    } 
    if (cardValue == 12) {
      cardValue = "Q";
    } 
    if (cardValue == 13) {
      cardValue = "K";
    } 
    if (cardValue == 14) {
      cardValue = "A";
    } 


    currentCard.value = cardValue;
    score.value = response.score;

    if (response.gameOver === true) {
      gameOver.value = true;
      await fetchOtherScores();
    }

  } catch (err) {
    console.log(err)
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
                    <v-card style="background-color: rgb(162 169 244); margin-left: auto; margin-right: auto;width: 80px; height: 80px">
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