<template>
  <div class="betting" @click="getBetItem(score, betItem.bet_id)"
       :class="score.is_bet == 1 ? 'win_orange' : 'normal_gray'">
    <p class="score fll">
      <i class="icon iconfont" v-if="score.is_bet == 1">&#xe6d5;</i>
      <span>{{ score.item_name}}</span>
    </p>
    <div class="odds flr"
         :class="score.is_bet == 1 ? 'win' : 'normal'">
      <p>赔率：{{ score.odds}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bet-item"
  }
</script>

<style scoped>

</style>
