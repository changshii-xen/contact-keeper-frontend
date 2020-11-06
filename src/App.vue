<template>
  <div id="app">
      <!-- <login-register></login-register>
      <only-page> </only-page> -->
      <router-view></router-view>
  </div>
</template>

<script>
// import loginRegister from './components/Login&Register'
// import onlyPage from './components/Page'
export default {
    name: 'app',
    components: {
        // 'login-register': loginRegister,
        // 'only-page':onlyPage 
    }
}
</script>

<style>

</style>
