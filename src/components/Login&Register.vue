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
      <sui-tab id="tabs" active-index="2">
      <sui-tab-pane title="Registration">
        <h1>Create an Account</h1>
      <sui-input type="text"  required placeholder="Name..." v-model="register.name" icon-position="left"
      icon="id badge outline icon" focus /> <br> <br> 
      <sui-input  type="email" required placeholder="Email..." v-model="register.email" icon-position="left"
      icon="at icon" focus /> <br> <br> 
      <sui-input type="password" placeholder="Create Password..." v-model="register.password" icon-position="left"
      icon="lock" focus /> <br> <br> 
      <sui-input type="password" placeholder="Confirm Password..." icon-position="left"
      icon="lock" focus /> <br> <br>
      <sui-button type="button" v-on:click.prevent="handleRegister" basic positive>Register</sui-button>
      <div v-if="submitted">
            <h3>You have been successfully Registered</h3>
        </div>
      </sui-tab-pane>
      <sui-tab-pane title="Login">
        <h1>Login</h1>
      <sui-input type="email" placeholder="Email..." v-model="register.email" icon-position="left"
      icon="at icon" focus /> <br> <br> 
      <sui-input type="password" placeholder="Password..." v-model="register.password"  icon-position="left"
      icon="lock" focus /> <br> <br> 
      <sui-button type="button" v-on:click.prevent="handleLogin" basic positive>Login</sui-button>
      <!-- <router-link  v-bind:to="'/Home'" v-if="submitted">
      </router-link> -->
      </sui-tab-pane>
    </sui-tab>
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
      submitted: false,
      next: false,
      register:{
          name: '',
          email: '',
          password: '',
      },
      login:{
          email: '',
          password: '',
      },
    };
    
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
    handleRegister() {
            let URL = "https://contact-keepr1-api.herokuapp.com/api/users";
            let _data = this.register;
            console.log('data-> ', JSON.stringify(_data));
            fetch(URL, {
                method:"POST",   
                body:  JSON.stringify(_data),
                mode: 'cors',
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(response => response.json())
                .then(json => {
                    // console.log('json->', json);
                    window.localStorage.setItem('token',json.token);
                })
                .catch(err => console.log('err->', err))
        },
        async handleLogin() {
            let URL = "https://contact-keepr1-api.herokuapp.com/api/auth";
            let _data = this.register;
            console.log(JSON.stringify(_data));
            fetch(URL, {
                method:"POST",   
                body:  JSON.stringify(_data),
                mode: 'cors',
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(response => response.json())
                .then(json => {
                  // this.$router.push("/Home")
                  console.log('json->', json.token);
                  window.localStorage.setItem('token',json.token);     
                    // if(localStorage.getItem('token').length > 0 && localStorage.getItem('item') === undefined) {
                    //   this.$router.push("/Home")
                    // }
                })
                .catch(err => console.log('err->', err))
        }
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