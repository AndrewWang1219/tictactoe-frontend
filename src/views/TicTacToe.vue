<!--
*@author andrew
*@date 2023/11/19 0:43
-->
<script setup>
import { useDecisionStore } from "@/stores/checkerboard";
import {computed, ref} from "vue";
const decisionStore = useDecisionStore()
// const chosenRow = ref(null)
// const chosenCol = ref(null)

const blank = computed(()=>{
  let flag = true
  for(let i=0;i<3;++i){
    for(let j=0;j<3;++j){
      if(decisionStore.state[i][j] !== 0){
        flag = false
      }
    }
  }
  return flag
})
const filled= computed(()=>{
  let flag = true
  for(let i=0;i<3;++i){
    for(let j=0;j<3;++j){
      if(decisionStore.state[i][j] === 0){
        flag = false
      }
    }
  }
  return flag
})

</script>

<template>
  <div class="ttt-container">
    <div class="row" v-for="row of 3" >
      <div class="ele"
           v-for="col of 3"
           @click="decisionStore.choose(row, col)"
          >
        <div class="close"
             v-if="decisionStore.state[row-1][col-1] === 1
              || (decisionStore.agent===1 && decisionStore.chosenRow === row && decisionStore.chosenCol === col)"
        ></div>
        <div class="circle"
             v-if="decisionStore.state[row-1][col-1] === 2
             || (decisionStore.agent===2 && decisionStore.chosenRow === row && decisionStore.chosenCol === col)"
        ></div>
      </div>

    </div>
  </div>
  <div class="op-container">
    <el-space direction="vertical">
      <div v-if="decisionStore.terminate">
        {{ decisionStore.agent===1?'you':'ai' }} win!
      </div>
      <div v-else-if="filled">
        no one wins
      </div>
      <div v-else>
        <div class="my-turn" v-if="decisionStore.agent===1">
          <div>It's your turn!</div>
        </div>
        <div class="ai-turn" v-if="decisionStore.agent===2">
          <div>It's AI's turn!</div>
        </div>
        <br><br>
      </div>
      <el-button
          size="large"
          type="primary"
          v-if="decisionStore.agent===1 && !decisionStore.terminate && !filled"
          @click="decisionStore.confirm"
      >确认</el-button>
      <el-button
          size="large"
          type="primary"
          v-if="decisionStore.agent===2 && !decisionStore.terminate && !filled"
          @click="decisionStore.confirm"
      >AI确认</el-button>
      <el-button
          size="large"
          type="danger"
          @click="decisionStore.reset"
      >重置</el-button>
      <el-button
          size="large"
          v-if="blank"
          @click="decisionStore.change"
      >切换先手</el-button>
    </el-space>
  </div>
</template>

<style scoped>
.ttt-container{
  position: absolute;
  margin-left: 30%;
  margin-top: 10%;
  width: 400px;
  height: 400px;
  border-radius: 25px;
  .row{
    width: 100%;
    height: 33.3%;
    .ele{
      text-align: center;
      width: 32.9%;
      height: 100%;
      border-radius: 25px;
      border: 0.2px solid #181818;
      float: left;
      cursor: pointer;
    }
  }
}
.op-container{
  position: absolute;
  font-size: larger;
  margin-left: 60%;
  margin-top: 15%;
  width: 300px;
  height: 400px;
  border-radius: 25px;
}


.close {
  position: relative;
}
.close::before,
.close::after{
  position: absolute;
  content: ' ';
  background-color: #000;
  top: 25px;
  left: 68px;
  width: 5px;
  height: 80px;
  transition: 2s;
}
.close::before{
  transform: rotate(-45deg);
}
.close::after{
  transform: rotate(45deg);
}

.circle{
  position: relative;
  width: 60px;
  height: 60px;
  line-height: 80px;
  border-radius: 50%;
  text-align: center;
  margin: 0 auto;
  margin-top: 36px;
  background-color: rgb(157,186,220);
}
.circle::after {
  position: absolute;
  background-color: #181818;
  content: '';
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: -1;
  transform: scale(1.2);
  border-radius: 50%;
}
</style>

