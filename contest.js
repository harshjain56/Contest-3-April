let menu =document.getElementById("menu")
let order=document.getElementById("order")
let status=document.getElementById("status")
let orderlist={}




function displayMenu(menuitems){


    let h1=document.createElement("h1")
    h1.innerText="Restaurant Menu"
    menu.appendChild(h1)


    let menuContainer=document.createElement("div")
     menuContainer.className="menu-container"


    menuitems.forEach((item)=>{
        const div= document.createElement("div")
        div.className="menu-item"
        const img=document.createElement("img")
        img.src=item.imgSrc
        const p1=document.createElement("p")
        p1.innerText=`item name:${item.name}`
        const p2=document.createElement("p")
        p2.innerText=`item price:${item.price}`

        div.appendChild(img)
        div.appendChild(p1)
        div.appendChild(p2)

        menuContainer.appendChild(div)
        menu.appendChild(menuContainer)

    })
}

async function getMenu(){

   const url=`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`
   let response= await fetch(url)
   let data=await response.json()
   displayMenu(data)
  const orderdata= takeOrder(data)
   await orderdata

   displayOrder(orderlist)

   const orderstatus=orderprep()
   await orderstatus

   const ordestatus=payorder()
   await ordestatus

   setTimeout(thankyou,4000)

}
getMenu()







function takeOrder(data){
    const promise=new Promise((resolve)=>{
           setTimeout(()=>{
            resolve(data)
           },7000)  
    })

    function finalorder(data){
       orderlist.item1=data[0]
     
       orderlist.item2=data[1]

       orderlist.item3=data[2]
    }


    promise.then(finalorder)

    return promise
}


function displayOrder(orderlist){
    menu.innerHTML=""
    let h1=document.createElement("h1")
    h1.innerText="Your Order:"
    order.appendChild(h1)
    

    let orderContainer=document.createElement("div")
    orderContainer.className="order-container"
      

     let arr=[]
     for(let i in orderlist){
        arr.push(orderlist[i])
     }
     console.log(arr)
     arr.forEach((item)=>{

        const div= document.createElement("div")
        div.className="order-item"
        const img=document.createElement("img")
        img.src=item.imgSrc
        const p1=document.createElement("p")
        p1.innerText=`item name:${item.name}`
        const p2=document.createElement("p")
        p2.innerText=`item price:${item.price}`

        div.appendChild(img)
        div.appendChild(p1)
        div.appendChild(p2)

        orderContainer.appendChild(div)
        order.appendChild(orderContainer)
      


     })
}


function orderprep(){
    const promise= new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({order_status:true, paid:false})
        } ,1000)
    
    })

    function displayStatus(obj){
        let p=document.createElement("p")
        p.innerText=`Order Status:${obj.order_status} , paid:${obj.paid}`
        status.appendChild(p)
    }

    promise.then(displayStatus)

}


function payorder(){
    const promise= new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({order_status:true, paid:true})
        } ,3000)
    
    })

    function displayStatus(obj){
        status.innerHTML=""
        let p=document.createElement("p")
        p.innerText=`Order Status:${obj.order_status} , paid:${obj.paid}`
        status.appendChild(p)
    }

    promise.then(displayStatus)

}

function thankyou(){
    alert("saying thankyou for eating with us today!")
}



