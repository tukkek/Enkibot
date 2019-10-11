import {Expandable} from './expandable.js'
import {nodeviewer} from '../nodeviewer.js'

const ELEMENT=document.querySelector('#map')
const MAP=ELEMENT.querySelector('img')
const MARKERS=[]

class MapView extends Expandable{
  constructor(){
    super(MAP,ELEMENT.querySelector('button'),false)
  }
  
  addmarkers(){
    if(!nodeviewer||ELEMENT.classList.contains('hidden')||
      MAP.classList.contains('hidden'))
        return
    let coordinates=nodeviewer.metadata['coordinates']
    if(coordinates) for(let c of coordinates){
      let m=document.createElement('div')
      m.classList.add('marker')
      let image=MAP.getBoundingClientRect()
      m.style.left=image.left+c[0]-25+'px'
      m.style.top=image.top+c[1]-25+'px'
      document.body.appendChild(m)
      MARKERS.push(m)
    }
  }
  
  clearmarkers(){
    for(let m of MARKERS) m.parentNode.removeChild(m)
    MARKERS.splice(0,MARKERS.length)
  }
  
  refresh(){
    this.clearmarkers()
    let map=nodeviewer.metadata['map']
    if(!map){
      ELEMENT.classList.add('hidden')
      return
    }
    ELEMENT.classList.remove('hidden')
    MAP.src=`maps/${map}`
  }
  
  show(){
    super.show()
    this.addmarkers()
  }
  
  hide(){
    super.hide()
    this.clearmarkers()
  }
}

export var mapview=new MapView()
MAP.addEventListener('load',()=>mapview.addmarkers())
