<template>
  <div id="container">
    <div id="left" 
      @click="pageMove(0)" 
      v-bind:style="{width: settings.style.inlineSpace + 'px'}">
    </div>

    <div id="book" v-bind:style="{
      columnGap: this.settings.style.inlineSpace + 'px',
      paddingBlock: this.settings.style.blockSpace + 'px'}">
    </div>
    
    <div id="right" 
      @click="pageMove(1)"
      v-bind:style="{width: settings.style.inlineSpace + 'px'}">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'
import { Chapter, NodeContent, Content } from '../definition'

class Book {
  titleInfo: {
    title: string
    author: {
      firstName?: string
      middleName?: string
      lastName?: string
      nickname?: string,
      homePage?: string,
      email?: string
    }[]
    genre?: string[]
    annotation?: NodeContent[]
    lang: string
    srcLang?: string
  }
  
  body: {
    title?: NodeContent[],
    chapters: Chapter[]
  }

  document: Document

  constructor(file: string) {
    this.titleInfo = {
      title: undefined!,
      author: [],
      lang: undefined!
    }

    this.body = {
      chapters: []
    }

    this.document = new DOMParser().parseFromString(file, 'application/xml')
    document.book = this

    for (const segment of this.document.getElementsByTagName('FictionBook')[0].children) {
      switch (segment.nodeName) {

        case 'description': {
          for (const descriptionChild of segment.children) {
            switch (descriptionChild.nodeName) {

              case 'title-info': {
                for (const titleChild of descriptionChild.children) {
                  switch (titleChild.nodeName) {

                    case 'book-title': {
                      this.titleInfo.title = titleChild.textContent as string
                      break
                    }

                    case 'author': {
                      const index = this.titleInfo.author.push({}) - 1

                      for (const authorChild of titleChild.children) {
                        switch (authorChild.nodeName) {

                          case 'first-name': {
                            this.titleInfo.author[index].firstName = authorChild.textContent as string
                            break
                          }

                          case 'middle-name': {
                            this.titleInfo.author[index].middleName = authorChild.textContent as string
                            break
                          }

                          case 'last-name': {
                            this.titleInfo.author[index].lastName = authorChild.textContent as string
                            break
                          }

                          case 'home-page': {
                            this.titleInfo.author[index].homePage = authorChild.textContent as string
                            break
                          }

                          case 'email': {
                            this.titleInfo.author[index].email = authorChild.textContent as string
                            break
                          }

                        }
                      }
                      break
                    }

                    case 'genre': {
                      if (!this.titleInfo.genre) this.titleInfo.genre = []
                      this.titleInfo.genre.push(titleChild.textContent as string)
                      break
                    }

                    case 'annotation': {
                      if (!this.titleInfo.annotation) this.titleInfo.annotation = []
                      this.titleInfo.annotation.push(
                        this.nodeFormat(titleChild.children, 'annotation')
                      )
                      break
                    }

                    case 'lang': {
                      this.titleInfo.lang = titleChild.textContent as string
                      break
                    }

                    case 'src-lang': {
                      this.titleInfo.srcLang = titleChild.textContent as string
                      break
                    }

                  }
                }
                break
              }

            }
          }
          break
        }

        case 'body': {
          for (const bodyChild of segment.children) {
            switch (bodyChild.nodeName) {

              case 'title': {
                if (!this.body.title) this.body.title = []
                this.body.title.push(
                  this.nodeFormat(bodyChild.children, 'bookTitle')
                )
                break
              }

              case 'section': {
                const chapterIndex = this.body.chapters.push(new Chapter()) - 1

                for (const sectionChild of bodyChild.children) {
                  switch (sectionChild.nodeName) {

                    case 'title': {

                      this.body.chapters[chapterIndex].title.push(
                        this.nodeFormat(sectionChild.children, 'title')
                      )
                      break
                    }
                    
                    case 'p': {
                      this.body.chapters[chapterIndex].content.push(
                        this.nodeFormat(sectionChild.childNodes, 'intent')
                      )
                      break
                    }

                    case 'empty-line':{
                      this.body.chapters[chapterIndex].content.push({
                        classList: ['emptyLine'],
                        children: []
                      })
                      break
                    }

                    case 'section': {
                      const partIndex = this.body.chapters[chapterIndex].parts.push(new Chapter()) - 1
                      
                      for (const sectionPartChild of sectionChild.children) {
                        switch (sectionPartChild.nodeName) {

                          case 'title': {
                            this.body.chapters[chapterIndex].parts[partIndex].title.push(
                              this.nodeFormat(sectionPartChild.children, 'title')
                            )
                            break
                          }
                          
                          case 'p': {
                            this.body.chapters[chapterIndex].parts[partIndex].content.push(
                              this.nodeFormat(sectionPartChild.childNodes, 'intent')
                            )
                            break
                          }

                          case 'empty-line':{
                            this.body.chapters[chapterIndex].parts[partIndex].content.push({
                              classList: ['emptyLine'],
                              children: []
                            })
                            break
                          }

                        }

                      }
                      break
                    }

                  }
                }
              }

            }
          }
          break
        }

      }
    }
  }

  nodeFormat(children: NodeListOf<ChildNode> | HTMLCollection, ...classList: string[]): NodeContent {
      const rt: NodeContent = {
        classList: classList,
        children: []
      }

      for (const child of children) {
        switch(child.nodeName) {

          case 'p':
          case '#text': {
            rt.children.push({
              textContent: child.textContent as string,
              tagName: ['span']
            })
            break
          }

          case 'strong': {
            rt.children.push({
              textContent: child.textContent as string,
              tagName: [child.nodeName]
            })
            break
          }

          case 'emphasis': {
            rt.children.push({
              textContent: child.textContent as string,
              tagName: ['em']
            })
            break
          }

        }
      }

      return rt
    }
}

@Component
export default class App extends Vue {
  ipc = ipcRenderer
  bookBody!: HTMLElement
  pressed = false

  settings = {
    style: {
      inlineSpace: 80,
      blockSpace: 60
    },
    right: ['ArrowRight'],
    left: ['ArrowLeft']
  }

  mounted() {
    this.bookBody = document.getElementById('book') as HTMLElement

    window.addEventListener('wheel', (event: WheelEvent) => this.keyHandler(event))
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (this.pressed) return

      this.keyHandler(event)
      this.pressed = true
    })
    window.addEventListener('keyup', () => this.pressed = false)
  }

  async openBook() {
    this.bookBody.innerHTML = ''
    const file = new Book(await this.ipc.invoke('openFileDialog'))

    const buildNode = (array: NodeContent[]) => {
      for (const nodeContent of array) {
        const mainElement = document.createElement('div')
        mainElement.classList.add(...nodeContent.classList)

        for (const child of nodeContent.children) {
          let childElement!: HTMLElement
          let lastChildElement!: HTMLElement

          for (const tag of child.tagName) {
            const newElement = document.createElement(tag)
            
            if (!childElement) {
              childElement = newElement as HTMLElement
              lastChildElement = childElement
              continue
            }

            lastChildElement.appendChild(newElement)
          }

          lastChildElement.textContent = child.textContent
          mainElement.appendChild(childElement)
        }

        this.bookBody.appendChild(mainElement)
      }
    }

    if (file.body.title) buildNode(file.body.title)
    if (file.titleInfo.annotation) buildNode(file.titleInfo.annotation)
    for (const chapter of file.body.chapters) {
      if (chapter.title.length) buildNode(chapter.title)
      if (chapter.content.length) buildNode(chapter.content)
      if (chapter.parts.length) {
        for (const part of chapter.parts) {
          if (part.title.length) buildNode(part.title)
          if (part.content.length) buildNode(part.content)
        }
      }
      
    }
  }

  pageMove(direction: 0 | 1): void {
    switch (direction) {
      case 0: {
        this.bookBody.style.left = (parseFloat(this.bookBody.style.left) || 0) + this.bookBody.getBoundingClientRect().width + 80 + 'px'
        break
      }
      case 1: {
        this.bookBody.style.left = (parseFloat(this.bookBody.style.left) || 0) - this.bookBody.getBoundingClientRect().width - 80 + 'px'
        break
      }
    }
  }

  keyHandler(event: WheelEvent | KeyboardEvent): void {
    let direction!: 0 | 1

    if (event instanceof WheelEvent) {
      if (event.deltaY > 0) direction = 1
      else direction = 0
    } else {
      if (this.settings.left.includes(event.key)) direction = 0
      if (this.settings.right.includes(event.key)) direction = 1
    }

    if (direction == undefined) return
    this.pageMove(direction)
  }
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