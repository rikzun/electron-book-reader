<template>
  <div id="container">
    <div id="left" v-bind:style="style.stripes" @click="pageMove('left')"></div>
    <div id="book" v-bind:style="style.book"></div>
    <div id="right" v-bind:style="style.stripes" @click="pageMove('right')"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import { Book, NodeContent } from '../definition'

@Component
export default class App extends Vue {
  // ipc = ipcRenderer
  // bookBody!: HTMLElement
  // pressed = false
  // page = 0
  // left = 0

  settings = {
    style: {
      inlineSpace: 80,
      blockSpace: 60
    },
    right: ['ArrowRight'],
    left: ['ArrowLeft']
  }

  style = {
    book: {
      columnGap: this.settings.style.inlineSpace + 'px',
      paddingBlock: this.settings.style.blockSpace + 'px',
      left: '0px'
    },
    stripes: {
      width: this.settings.style.inlineSpace + 'px'
    }
  }

  mounted() {
    // this.bookBody = document.getElementById('book') as HTMLElement

    // window.addEventListener('wheel', (event: WheelEvent) => this.keyHandler(event))
    // window.addEventListener('keydown', (event: KeyboardEvent) => {
    //   if (this.pressed) return

    //   this.keyHandler(event)
    //   this.pressed = true
    // })
    // window.addEventListener('keyup', () => this.pressed = false)
  }

  // async openBook() {
  //   this.bookBody.innerHTML = ''
  //   const file = new Book(await this.ipc.invoke('openFileDialog'))

  //   const buildNode = (array: NodeContent[]) => {
  //     for (const nodeContent of array) {
  //       const mainElement = document.createElement('div')
  //       mainElement.classList.add(...nodeContent.classList)

  //       for (const child of nodeContent.children) {
  //         let childElement!: HTMLElement
  //         let lastChildElement!: HTMLElement

  //         for (const tag of child.tagName) {
  //           const newElement = document.createElement(tag)
            
  //           if (!childElement) {
  //             childElement = newElement as HTMLElement
  //             lastChildElement = childElement
  //             continue
  //           }

  //           lastChildElement.appendChild(newElement)
  //         }

  //         lastChildElement.textContent = child.textContent
  //         mainElement.appendChild(childElement)
  //       }

  //       this.bookBody.appendChild(mainElement)
  //     }
  //   }

  //   if (file.body.title) buildNode(file.body.title)
  //   if (file.titleInfo.annotation) buildNode(file.titleInfo.annotation)
  //   for (const chapter of file.body.chapters) {
  //     if (chapter.title.length) buildNode(chapter.title)
  //     if (chapter.content.length) buildNode(chapter.content)
  //     if (chapter.parts.length) {
  //       for (const part of chapter.parts) {
  //         if (part.title.length) buildNode(part.title)
  //         if (part.content.length) buildNode(part.content)
  //       }
  //     }
      
  //   }
  // }

  // keyHandler(event: WheelEvent | KeyboardEvent): void {
  //   let direction!: 0 | 1

  //   if (event instanceof WheelEvent) {
  //     if (event.deltaY > 0) direction = 1
  //     else direction = 0
  //   } else {
  //     if (this.settings.left.includes(event.key)) direction = 0
  //     if (this.settings.right.includes(event.key)) direction = 1
  //   }

  //   if (direction == undefined) return
  //   this.pageMove(direction)
  // }

  // pageMove(direction: 0 | 1): void {
  //   switch (direction) {
  //     case 0: {
  //       this.page--
  //       this.left = (window.outerWidth + this.settings.style.inlineSpace) * -this.page
  //       break
  //     }
  //     case 1: {
  //       this.page++
  //       this.left = (window.outerWidth - this.settings.style.inlineSpace) * -this.page
  //       break
  //     }
  //   }
  // }
}

</script>
<style lang="sass">
$fontSize: calc( (100vh + 100vw) / 120)

#container
  display: flex
  height: inherit

#book
  position: relative
  column-width: 40vw
  column-fill: auto
  font-size: $fontSize
  line-height: calc( (100vh + 100vw) / 90)
  height: 100%
  width: 100%

#left, #right
  height: 100%
  cursor: pointer

p
  margin: 0

.bookTitle
  text-align: center
  font-weight: bold

  > *
    display: block

.title
  text-align: center
  font-weight: bold

  > *
    display: block

.annotation
  @extend .intent

  > *
    display: block

.intent
  text-indent: 40px

.emptyLine
  padding-bottom: $fontSize

</style>