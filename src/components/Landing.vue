<template>
  <div id="main">
    <sui-menu >
      <a
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item)"
        :key="item"
        :content="item"
        @click="select(item)"
      />
    </sui-menu>

    <sui-segment>
       <div id="start">
      <div>
    <h2 is="sui-header" icon text-align="center">
      <sui-icon name="users" circular />
      <sui-header-content>Contact Keeper</sui-header-content>
    </h2>
    <h3 is="sui-header" icon text-align="center">
      <sui-header-content>Welcome To the Contact Keeper <br> Save all Contacts here </sui-header-content>
    </h3>
    <router-link v-bind:to="'/R&L'">
    <sui-button color="green" inverted id="button">Get Started</sui-button>
    </router-link>
    
  </div>
    </div>
    </sui-segment>
   
  </div>
</template>

<script>


export default {
   data() {
    return {
      active: 'Contact Keeper',
      items: ['Contact Keeper'],
    };
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
  },
}
</script>

<style>
#start{
    background: #d9d9d9;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    margin-left: 28%;
    padding: 10px 20px;
    width: 40%;
    height: 90%;
}
#button{
  margin-left: 39%;
}
#tabs{
  width: 50%;
   margin-left: 25%;
}
@media only screen and (max-width: 600px) {
  #start{
    background: #d9d9d9;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    margin-left: 0%;
    width: 100%;
}
#tabs{
  width: 100%;
   margin-left: 0%;
}
}


</style>