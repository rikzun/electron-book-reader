export interface NodeContent {
  classList: string[]
  children: Content[]
}
  
export interface Content {
  textContent: string
  tagName: string[]
}

export class Chapter {
  constructor(
    public title: NodeContent[] = [],
    public content: NodeContent[] = [],
    public parts: {
      title: NodeContent[]
      content: NodeContent[]
    }[] = []
  ) {}
}

export class Book {
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