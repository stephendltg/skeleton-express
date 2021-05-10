<template>
  <div @test="mqtt">
    <footer class="p-d-flex p-p-2 p-jc-between layout-footer">
      <div class="p-as-center">
        <span style="font-size:0.7em;">EPYO@2021 - {{version}}</span>
      </div>
	    <div>
        <Button type="Button" icon="pi pi-wifi" class="p-mr-2 p-button-rounded p-button-lg" :class="[network ? 'p-button-info' : 'p-button-danger']"/>
        <Button v-show="app_broker_connect" type="Button" icon="pi pi-share-alt" class="p-mr-2 p-button-rounded p-button-lg" :class="[mqtt ? 'p-button-info' : 'p-button-danger']" @click="displayMqtt = !displayMqtt"/>
        <Button v-show="app_scanless" type="Button" icon="pi pi-android" class="p-mr-2 p-button-rounded p-button-lg" :class="[scanless ? 'p-button-info' : 'p-button-danger']" @click="displayScanless = !displayScanless"/>
      </div>
    </footer>

    <Dialog header="MQTT" v-model:visible="displayMqtt" style="width: 100vw;"  position="bottomright" :modal="true">
      <Message v-if="alarms" severity="error">{{__(alarms)}}</Message>
      <TabView>
        <TabPanel header="Messages" >
          <DataTable :value="messages" class="p-datatable-responsive-demo" :paginator="true" :rows="10">
              <Column field="topic" header="Topic"></Column>
              <Column field="subTopic" header="Emitter"></Column>
              <Column field="message" header="Message"></Column>
          </DataTable>
        </TabPanel>
      </TabView>
      <template #footer>
          <Button :label="__('Test')"  @click="$store.dispatch('mqtt/publish', ['invite/test', {message: 'hello guy!'}])" class="p-button-text"/>
          <Button :label="__('Reset')" icon="pi pi-check" @click="messages = [];$store.dispatch('mqtt/alarms')" autofocus />
      </template>
    </Dialog>

    <Dialog header="SCANLESS" v-model:visible="displayScanless" style="width: 100vw;"  position="bottomright" :modal="true">
      <Message v-if="scanlessAlarms" severity="error">{{__(scanlessAlarms)}}</Message>
      <TabView>
        <TabPanel header="Messages" >
          <DataTable :value="scanlessMessages" class="p-datatable-responsive-demo" :paginator="true" :rows="10">
              <Column field="topic" header="Topic"></Column>
              <Column field="message" header="Message"></Column>
          </DataTable>
        </TabPanel>
      </TabView>
      <template #footer>
          <Button :label="__('Test')"  @click="$store.dispatch('scanless/publish', { method: 'getVersion' })" class="p-button-text"/>
          <Button :label="__('Reset')" icon="pi pi-check" @click="scanlessMessages = [];$store.dispatch('scanless/alarms')" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.layout-footer {
  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  height: 4rem;
  z-index: 50;
}


</style>

<script>

import translate from '../plugins/i18n'
import { mapGetters } from 'vuex'
import SETTINGS from '../settings'


export default {
  name: 'Footer',
  components: {
  },
  data: () => ({
    app_name: SETTINGS.APP_NAME,
    app_broker_connect: SETTINGS.APP_BROKER_CONNECT,
    app_broker_store: SETTINGS.APP_BROKER_STORE_MESSAGES,
    app_scanless: SETTINGS.APP_SCANLESS,
    app_scanless_store: SETTINGS.APP_SCANLESS_STORE_MESSAGES,
    network: navigator.onLine ? true : false,
    datenow: Date.now(),
    timer: null,
    displayMqtt: false,
    displayScanless: false,
    version: SETTINGS.VERSION,
    messages: [],
    scanlessMessages: []
  }),
  computed: {
     ...mapGetters({
      mqtt: 'mqtt/status',
      alarms: 'mqtt/alarms',
      scanless: 'scanless/status',
      scanlessAlarms: 'scanless/alarms',
    })
  },
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) },
    loop () {
      if (Date.now() - this.datenow > 3000) {
        this.datenow = Date.now()
        this.network = navigator.onLine ? true : false
      }
      this.timer = requestAnimationFrame(this.loop)
    }
  },
  mounted(){
    window.mitt.on('mqtt:#', (data) => this.messages.unshift(data) )
    window.mitt.on('scanless:#', (data) => this.scanlessMessages.unshift(data) )
  },
  created(){
    this.timer = requestAnimationFrame(this.loop);
    // Connect to mqtt
    this.$store.dispatch('mqtt/connect')
    this.$store.dispatch('scanless/connect')
  },
  beforeUnmount(){
    cancelAnimationFrame(this.timer)
    // unscribe mitt
    window.mitt.off('mqtt:#')
    window.mitt.off('scanless:#')
    // disconnect mqtt
    this.$store.dispatch('mqtt/disconnect')
    this.$store.dispatch('scanless/disconnect')
  }
}
</script>
