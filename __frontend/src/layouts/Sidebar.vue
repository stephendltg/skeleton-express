<template>
  <div class="layout-sidebar">
    <aside class="view-aside p-m-1 p-text-center">
        <h3 class="p-d-flex p-jc-center">
            <Avatar v-show="account.status['icon-32x32']" :image="account.status['icon-32x32']" class="p-mr-2" shape="circle" />
            <span class="p-pt-1">{{account.status.name}}</span>
        </h3>
        <Divider/>
        <div class="card">
			    <Avatar :label="account.user_nicename.charAt(0).toUpperCase()" class="p-mr-2" size="xlarge" shape="circle" style="background-color: var(--header-color,#fff); color: var(--aside-text-color,#fff)"/>
          <Badge value="2" style="margin-left: -1.8em" severity="warning"></Badge>
          <div>
            <Button :label="account.user_nicename" class="p-button-link" style="color:var(--aside-text-color,#fff)"/>
            <p>{{__(account.role)}}</p>
          </div>
          <!-- <Button :label="__('Logout')" class="p-button-link" style="color:var(--aside-text-color,#fff)" @click="$router.push('/login')"/> -->
		    </div>
        <Divider/>
        <!-- <hr> -->
        <PanelMenu :model="items"/>
    </aside>
  </div>
</template>

<style scoped lang="scss">

.layout-sidebar{
    position: fixed;
    top: 0;
    width: 250px;
    background-color: var(--aside-color,#4d505b);
    height: 100%;
    color: var(--aside-text-color,#fff);
    z-index: 100;
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      width: 0px;
      display: none;
    } 
  }


::v-deep(.p-component ) {
  .p-panelmenu-header > * {
    background-color: var(--aside-menu-color, #fff);
  }
  .p-panelmenu-header-link {
    color: var(--primary-color-text, #ffffff);
  }
  
  img {
    border-radius: 50%;
  }
}
</style>

<script>
import translate from '../plugins/i18n'
import { mapGetters } from 'vuex'
import SETTINGS from '../settings'
import PanelMenu from '../controller/panelMenu.js'


export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    app_name: SETTINGS.APP_NAME,
    items: PanelMenu.items
  }),
  computed: {
    ...mapGetters({
      account: 'auth/account',
    })
  },
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) }
  },
  mounted(){
  },
  created(){
  }
}
</script>
