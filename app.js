//캔버스 기본 셋팅
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') //붓(brush)
canvas.width=800
canvas.height=800

//선 두께 변경하기
const lineWidth = document.querySelector('#line-width')
ctx.lineWidth = 5 //초기 value
lineWidth.addEventListener('change',changeLineWidth)
function changeLineWidth(e){
  ctx.lineWidth =e.target.value
}

//색상 변경하기 - picker
const colorPicker = document.querySelector('#color-picker')
colorPicker.addEventListener('change',changeColor)
function changeColor(e){
  ctx.strokeStyle = e.target.value
  ctx.fillStyle = e.target.value
}
//색상 변경하기 - palette
const palette = document.querySelectorAll('.palette')
palette.forEach(color=>color.addEventListener('click',pickColor))
function pickColor(e){
  const pickedColor = e.target.dataset.color 
  ctx.strokeStyle = pickedColor
  ctx.fillStyle = pickedColor
  colorPicker.value = pickedColor
}
//색상 변경하기 - mode
const modeBtn = document.querySelector('#mode-btn')
console.log(modeBtn)
let isFilling = false //false = draw mode, true = fill mode
modeBtn.addEventListener('click',changeMode)
function changeMode(){
  if(isFilling){
    isFilling = false
    modeBtn.innerText = 'Change to Fill'
  }
  else{
    isFilling = true
    modeBtn.innerText = 'Change to Draw'
  }
}


//캔버스에 라인그리기
canvas.addEventListener('mousemove',onMove)//마우스 움직일 때 ctx도 따라서 움직이도록
canvas.addEventListener('mousedown',startPainting)//마우스 누르고 있을 때->그림그리기
canvas.addEventListener('mouseup',stopPainting)//마우스 뗐을 때 때->stop
canvas.addEventListener('mouseleave',stopPainting)//마우스가 캔버스 밖으로 나갔을 때->stop
let isPainting = false //페인팅중인지 확인용
function onMove(e){
  if(isPainting){
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.stroke()
    return
  }
  ctx.moveTo(e.offsetX,e.offsetY) 
}
function startPainting(){
  isPainting = true
  if(isFilling){ //fill모드일때 캔버스 채우기
    ctx.fillRect(0,0,canvas.width,canvas.height)
  }
  
}
function stopPainting(){
  isPainting=false
  ctx.beginPath()
}
