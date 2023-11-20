import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import axios  from "axios";

const BACKEND_URL = 'http://127.0.0.1:8000/api/'
export const useDecisionStore = defineStore('decision', ()=>{
  const state  = ref([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
  const agent =  ref(1)
  const terminate = ref(false)
  const chosenRow = ref(4)
  const chosenCol = ref(4)
  function choose(row, col){
    if(agent.value === 2){
      alert("It's not your turn")
    }else if(state.value[row-1][col-1] === 0){
      chosenRow.value = row
      chosenCol.value = col
    }else{
      alert("This position is filled")
    }

  }
  async function confirm(){
    if(agent.value === 1){
      if(chosenRow.value === 4 && chosenCol.value === 4){
        alert('you have not chosen a position')
        return
      }
      state.value[chosenRow.value-1][chosenCol.value-1] = agent.value
    }
    chosenRow.value = 4
    chosenCol.value = 4
    const params = {
      'character': agent.value === 1?'me':'ai',
      'state': state.value,
      'agent': agent.value
    }
    const { data } = await axios.post(BACKEND_URL, params)
    const res = JSON.parse(data)
    console.log(res)
    if(res.state){
      state.value = res.state
    }
    if(res.terminate === true){
      terminate.value = true
    } else{
      agent.value = (agent.value === 1)?2:1
    }
  }
  function reset(){
    terminate.value = false
    chosenRow.value = 4
    chosenCol.value = 4
    for(let i=0;i<3;++i){
      for(let j=0;j<3;++j){
        state.value[i][j] = 0
      }
    }
  }
  function change(){
    agent.value = (agent.value === 1)?2:1
  }
  return { state, agent, terminate, chosenRow, chosenCol, choose, confirm, reset, change}
})
