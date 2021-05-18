<template>
  <div id="window">
    <div id="titlebar">
      <span id="title">Reader - Book name</span>
      <div id="buttons">
        <div id="settings"></div>
        <div id="minimize" @click="ipc.send('minimize')"></div>
        <div id="maxrest" @click="ipc.send('maxrest')"></div>
        <div id="close" @click="ipc.send('close')"></div>
      </div>
    </div>
    <div id="content">
      <Book ref="bookBody"/>
    </div>
    <div id="footer">
      <button @click="$refs.bookBody.openBook()">Открыть</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import Book from './components/Book.vue'

@Component({components: {Book}})
export default class App extends Vue {
  ipc = ipcRenderer
}
</script>

<style lang="sass">
body
  margin: 0
  color: black

*
  box-sizing: border-box

#window
  width: 100vw
  height: 100vh
  display: flex
  flex-direction: column
  border: 1px solid #2B2B2B

  >#titlebar
    position: relative
    height: 30px
    display: flex
    justify-content: space-between
    align-items: center
    background-color: #2B2B2B
    border-bottom: 1px solid #2B2B2B
    -webkit-app-region: drag
    -webkit-user-select: none

    >#title
      font-size: 12px
      color: white
      margin-left: 7px

#buttons
  height: 100%
  display: flex
  -webkit-app-region: no-drag

  >div
    width: 45px
    height: 29px
    background: center
    background-repeat: no-repeat
    margin-right: 1px

    &:hover
      background-color: #414141

    &:active
      background-color: #565656

  >#settings
    background-image: url("assets/settings.png")

  >#minimize
    background-image: url("assets/minimize.png")

  >#maxrest
    background-image: url("assets/Maximize.png")

  >#close
    background-image: url("assets/close.png")
    margin: 0

    &:hover
      background-color: #E81123

    &:active
      background-color: #9F1F29

#content
  height: 100%
  overflow: hidden

#footer
  height: 26px
  background-color: #333333
</style>