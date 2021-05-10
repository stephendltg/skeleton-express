<template>
  <div class="view-login pas">

    <transition name="fade">

    <main v-if="!account && !toggle" id="main" role="main" class="main p-d-flex p-jc-center" style="height: 100vh">
      <section class="p-as-center" @click="toggle=true;app_autologin ? do_action('login'): null ">
        <h1 class="p-d-flex p-jc-center">
          <span class="p-as-center p-pr-3 animate__animated animate__fadeIn animate__delay-1s animate__slow" style="font-size:0.7em">EPYO</span>
          <img  class="p-as-center p-pb-3 animate__animated animate__flip animate__repeat-3 mbm" alt="Epyo Software logo" src="../assets/logo.png" width="80"/>
          <span class="p-as-center p-pl-3 animate__animated animate__fadeIn animate__delay-2s animate__slow" style="font-size:0.7em">{{app_name.toUpperCase()}}</span>
        </h1>
      </section>
    </main>

    <main v-else id="main" role="main" class="main p-d-flex p-jc-center p-text-center" style="height: 100vh">

      <transition name="fade">

      <section v-if="isConnected !== 1 " class="p-as-center">
        <h1 class="h3-like" v-html="__('INSTALLATION')"></h1>
        <hr>
        <form action="#" @submit.prevent="do_action('connect');" novalidate="true" class="p-pb-4">
          <br>
          <label for="api-server">{{__('Connect')}}</label>
          <div class="p-field p-input-filled p-mt-4 p-mb-6">
            <span class="p-input-icon-left">
              <i class="pi pi-globe" />
              <InputText type="url" v-model="apiUri" placeholder="http://epyo-api" id="api-server" @click="isConnected = 0"/>
            </span>
          </div>
          <Button 
            :icon="isConnected == 2 ? 'pi pi-arrow-left' : 'pi pi-arrow-right'" 
            iconPos="right" 
            type="submit" 
            class="p-button-rounded p-button-outlined"
            :class="isConnected == 2 ? 'p-button-danger' : 'p-button-primary'"
          />
        </form>
      </section>

      <form v-else autocomplete="off" action="" @submit.prevent="do_action('login');" novalidate="true" class="p-as-center p-shadow-10 p-p-4">
      
        <header>
            <Avatar icon="pi pi-user" size="xlarge" shape="circle" style="background-color:var(--primary-color,#2196F3); color: #ffffff"/>
        </header>
        <div class="p-pt-4">
          <div class="p-field p-input-filled p-mt-4 p-mb-6">
            <span class="p-input-icon-left p-float-label">
              <InputText type="text" v-model="username" id="username" required @click="error=false" :disabled="app_autologin" autocomplete="off"/>
              <label for="username">{{__('Username')}}</label>
            </span>
          </div>
          <div class="p-field p-input-filled p-mt-4 p-mb-6">
            <span class="p-input-icon-left p-float-label">
              <InputText type="password" v-model="password" id="password" required autocomplete="off" @click="error=false" :disabled="app_autologin" />
              <label for="username">{{__('Password')}}</label>
            </span>
          </div>
        </div>
        <div>
          <Button 
            :icon="error ? 'pi pi-arrow-left' : 'pi pi-arrow-right'" 
            iconPos="right" 
            type="submit" 
            class="p-button-rounded p-button-outlined p-button-info"
            :class="error ? 'p-button-danger' : 'p-button-info'"
          />
        </div>
        <footer class="footer">
          <div class="p-pt-3">
            <Message severity="error" v-for="msg of messages" :key="msg.content" :life="3000" :sticky="false">{{msg.content}}</Message>
          </div>
        </footer>
        </form>
      </transition>

    </main>

  </transition>

  </div>
</template>

<style scope>

</style>


<script>
import api from '../api'
import translate from '../plugins/i18n'
import { mapGetters } from 'vuex'
import SETTINGS  from '../settings'

export default {

  name: 'Login',

  components: {
  },

  data: () => ({
    toggle: false,
    apiUri: '',
    isConnected: 0,
    username: SETTINGS.APP_USERNAME, // not empty if app_autologin
    password: SETTINGS.APP_PASSWORD, // not empty if app_autologin
    error: false,
    connect: false,
    messages: [],
    app_name: SETTINGS.APP_NAME,
    app_autologin: SETTINGS.APP_AUTO_LOGIN
  }),

  computed: {
    ...mapGetters({
      account: 'auth/account'
    })
  },
  created(){
    // Get api uri
    if( localStorage.getItem('api_uri') !== null ){
      this.isConnected = 1
    }
  },
  methods: {

    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) },

    do_action ( action ){

      switch (action) {
        case 'login': 
          this.progress = false
          api.getToken( this.username, this.password, (res)=> {
            if( !res.error ) {
              if( SETTINGS.APP_ROLES.includes(res.role)) this.$store.dispatch('auth/account', res) && ( SETTINGS.APP_STEPS ? this.$router.push('/steps') : this.$router.push('/') )
              else this.messages.push({ content: this.__('Access not authorized') })
            } else {
              this.error = true
              this.messages.push({ content: this.__('Password error or username') } )
            }
          });
          break;
        case 'connect':
          localStorage.setItem('api_uri', this.apiUri)
          this.connect = true
          api.getToken( 'epyo-apirest', 'epyois100%MAGIC', (res)=> {
            if( !res.error ){
              setTimeout( ()=> this.isConnected = 1, 300)
            } else {
              this.isConnected = 2
              localStorage.removeItem('api_uri')
              this.connect = false
              this.$toast.add({severity: 'error', summary: 'Error: ' + res.error, detail:res, life: 3000});
            }
          })
          break;
        default:
          break;
      }

    }
  }, 
};
</script>
