<template>
  <div class="rst-activity">
    <div class="activity-txt">
      <span :style="{background: '#'+activities[0].icon_color }">{{activities[0].icon_name}}</span>
      <span>{{activities[0].description}}</span>
    </div>
    <div class="activity-count">
      <span @click="showSheet = true">{{activities.length}}个优惠</span>
      <i class="fa fa-caret-down"></i>
    </div>
    <transition name="fade">
      <div class="act-momdel" v-show="showSheet">
        <div class="activity-sheet" >
          <i class="fa fa-remove" @click="showSheet = false"></i>
          <h2>优惠活动</h2>
          <ul>
            <li v-for="(item, index) in activities" :key="index">
              <span :style="{background: '#' + item.icon_color}">{{item.icon_name}}</span>
              <span>{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name:"Active",
  props: {
    activities: Array
  },
  data() {
    return {
      showSheet: false
    }
  }
}
</script>

<style scoped>
  .rst-activity {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    overflow: hidden;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    padding: 0 10vw;
  }
  .activity-txt span:first-child {
    display: inline-block;
    padding: 0.15rem;
    color: aliceblue;
  }
  .activity-count {
    color: rgb(131, 131, 131);
    display: inline-block;
    line-height: 1.1rem;
  }
  .act-momdel {
    position: fixed;
    bottom: 0;
    left: 0;
    height:15rem;
    width: 100%;
    color: rgb(61, 61, 61);
    box-sizing: border-box;
    box-shadow: 0px 2px 30px 5px rgb(133, 133, 133);
    z-index: 999;
    background-color: #fff;
  }
  .act-momdel::before {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    content: '';
    width: 100vw;
    height: calc(100vh - 15rem);
    background-color: rgba(8, 8, 8, 0.4);
  }
  .activity-sheet  {
    width: 100%;
    /* height: ; */
  }
  .activity-sheet i {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
    color: rgb(110, 110, 110);
  }
  .activity-sheet h2 {
    display: inline-block;
    margin: 1rem 0;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
  }
  .activity-sheet ul {
    width: 100%;
    margin-left: 3rem;
  }
  .activity-sheet ul li {
    margin-bottom: 1rem;
  }
  .activity-sheet ul li span:first-child {
    color: aliceblue;
    padding: 0.15rem;
    margin-right: 0.4rem;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>