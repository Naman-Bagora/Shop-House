function launchProductView(id)
{
    
    var div=document.getElementById(id).children;
    localStorage.setItem("id",id);
    localStorage.setItem("imagepath", div[0].firstChild.currentSrc);
    localStorage.setItem("productName", div[1].innerHTML);
    localStorage.setItem("price", div[2].innerHTML);
    localStorage.setItem("desc", div[3].innerHTML);
    window.location.href="ProductView.html"
}

function LoadProductView()
{

    var Opdiv=document.getElementById("ImageContainer");
    document.getElementById("Product Name").innerHTML=localStorage.getItem("productName");
    document.getElementById("Product Description").innerHTML=localStorage.getItem("desc");
    var elem = document.createElement("img");
    elem.setAttribute("src", localStorage.getItem("imagepath"));
    Opdiv.appendChild(elem);
    document.getElementById("Price").innerHTML=localStorage.getItem("price");
}

function addRow(id,imgSrc,pname,price) {  
    if(id=="null")
    return;
    var table=document.getElementById("Items");
    rowCount=table.rows.length; 
    var row = table.insertRow(rowCount); 
    row.setAttribute("style","border:2px solid;border-color:#D291BC");
    //Column 1  
    var x=row.insertCell(-1);
    var img = document.createElement('img');
    img.src = imgSrc;
    img.height=200;
    img.width= 200;
    img.setAttribute("style","border:2px solid;color:white");
    x.appendChild(img);
    //Column 2  
    var cell2 = row.insertCell(1);  
    cell2.innerHTML = '<b>'+pname+'</b>'; 
    cell2.setAttribute("style","text-align:center;color:white") ;
    cell2.setAttribute("span","3") ;
    //Column 3  
    var cell3 = row.insertCell(2);  
    cell3.innerHTML = '<b>'+price+'</b>';  
    cell3.setAttribute("style","text-align:center;color:white") ;
    cell3.setAttribute("span","3") ;
    //column 4
    var cell4= row.insertCell(3);
    var element1 = document.createElement("button");  
    element1.type = "button";  
    var btnName = id;  
    element1.name = btnName;  
    element1.innerHTML = "Remove";  
    element1.setAttribute("style","font-size:18px;background-color:#D291BC;border:none;color:white;margin:10px;text-align:center");
    element1.setAttribute("class","button1");
    element1.onclick = function() {  
        removeRow(btnName);  
    }  
    cell4.appendChild(element1);

}  
  
function removeRow(btnName) {  
    try {  
        var table = document.getElementById('Items');  
        var rowCount = table.rows.length;  
        for (var i = 0; i < rowCount; i++) {  
            var row = table.rows[i];  
            var rowObj = row.cells[3].childNodes[0];  
            if (rowObj.name == btnName) 
            {  
                RemoveItemFromLocalStorage(btnName)
                table.deleteRow(i);  
                rowCount--;  
            }  
        }  
        var sum=0;
        for (var i = 0; i < rowCount; i++) 
        {  
            var row = table.rows[i];  
            var rowObj = parseInt(row.cells[2].firstChild.innerHTML);  
            sum=sum+rowObj;
        }
        document.getElementById("total").innerHTML="TOTAL"+": Rs. "+sum +"/-  ";
    } catch (e) {  
        alert(e);  
    }  
}

function AddItemToCart(val=false)
{
    try
    {
    var id=localStorage.getItem("id");
    var imagepath=localStorage.getItem("imagepath");
    var pname=localStorage.getItem("productName");
    var price=localStorage.getItem("price");
    var stString=id+";"+imagepath+";"+pname+";"+price;
    var keys=localStorage.getItem("Keys");
    if(keys==null||keys=="null")
    {
        localStorage.setItem("Keys",stString);
    }
    else
    {
        var temp=keys.split(",");
        for(var i=0;i<temp.length;++i)
         {  var ids=temp[i].split(";");
             if(ids[0]==id)
             {
               alert("Item already added to cart");
               if(val)
                 window.location.href="cart.html";
               return;
             }
         }
        temp.push(stString);
        localStorage.setItem("Keys",temp);
    }
    if(!val)
      alert("Item Added Successfully");
    else
       window.location.href="cart.html";
   }
   catch(err){
       alert(err);
   }
}

function LoadCart()
{
    var Keys=localStorage.getItem("Keys").split(",");
    if(Keys==null)
     return;
    var sum=0;
    for(i=0;i<Keys.length;++i)
    {   var values=Keys[i].split(";");
        if(values!=undefined)
         {
             addRow(values[0],values[1],values[2],values[3]);
             sum=sum+parseInt(values[3].split("/")[0]);
         }
    }
    document.getElementById("total").innerHTML="TOTAL"+": Rs."+sum +"/-   ";
}

function RemoveItemFromLocalStorage(id)
{
    var Keys=localStorage.getItem("Keys").split(",");
    for(i=0;i<Keys.length;++i)
    {   var values=Keys[i].split(";");
        if(values[0]==id)
        {
            Keys.splice(i,1);
        }
    }
    if(Keys.length==0)
     localStorage.setItem("Keys",null);
    else
     localStorage.setItem("Keys",Keys);
}
function Paymentgateway()
{
    window.location.href="https://www.payu.in/payment-gateway?utm_source=google&utm_medium=cpc&campaign=Search-|-NB-|-Competitor-|-Phrase&keyword=paytm%20payment%20gateway&gclid=CjwKCAjw1JeJBhB9EiwAV612y3hrVW_IZPOQ5s0TJfSmBOOfxlh1Kzrf1P_O5XvdicOeKPNDd-eCuxoC_UUQAvD_BwE";
}