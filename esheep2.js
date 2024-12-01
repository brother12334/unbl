
var bFirst = true;
var bMovingLeft = false;
var draggingElement = null;
var currentZIndex = 100;

function drag(ev) 
{
  draggingElement = ev.target;
  ev.dataTransfer.setData("text", ev.clientX + "," + ev.clientY);
  draggingElement.style.zIndex = parseInt(currentZIndex++);
}

function allowDrop(ev) 
{
  if(draggingElement != null && draggingElement.className && (draggingElement.className == "window"))
  {
    ev.preventDefault();
  }
}

function drop(ev) 
{
  ev.preventDefault();
  if(draggingElement != null && draggingElement.className)
  {
    if(draggingElement.className == "window")
    {
      var data = ev.dataTransfer.getData("text").split(",");
      
      if(draggingElement.style.left)
        draggingElement.style.left = (parseInt(draggingElement.style.left) + (parseInt(ev.clientX) - parseInt(data[0]))) + "px";
      else if(draggingElement.style.right)
        draggingElement.style.right = (parseInt(draggingElement.style.right) - (parseInt(ev.clientX) - parseInt(data[0]))) + "px";
      draggingElement.style.top = (parseInt(draggingElement.style.top) + (parseInt(ev.clientY) - parseInt(data[1]))) + "px";
    }
  }
  draggingElement = null;
}

function resizeWindow(element)
{
  if(element.title && parseInt(element.title)>20)
  {
    if(element.parentNode.style.height.indexOf("vh")>0)
      element.parentNode.style.height = parseInt(element.title) + "vh";
    else
      element.parentNode.style.height = parseInt(element.title) + "px";
    element.title = "";
  }
  else
  {
    element.title = parseInt(element.parentNode.style.height);
    if(element.parentNode.style.height.indexOf("vh")>0)
      element.parentNode.style.height="0vh";
    else
      element.parentNode.style.height="0px";
  }
}

function maximizeWindow(element)
{
  if(element.parentNode.style.zIndex=="" || parseInt(element.parentNode.style.zIndex) < 100)
  {
    element.parentNode.style.left = "5px";
    element.parentNode.style.maxWidth = "100vw";
    element.parentNode.style.width = "95vw";
    element.parentNode.style.height = "80vh";
    element.parentNode.style.zIndex = "1001";
    element.parentNode.style.backgroundColor = "rgba(170,200,255,0.9)";
  }
  else
  {
    element.parentNode.style.left = "320px";
    element.parentNode.style.maxWidth = "800px";
    element.parentNode.style.width = "";
    element.parentNode.style.height = "70vh";
    element.parentNode.style.zIndex = "90";
    element.parentNode.style.backgroundColor = "rgba(170,200,255,0.9)";
  }
}

