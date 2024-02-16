var socket = io("http://localhost:6060")

socket.on("server-update-data", function (data) {

    $("#currentTemp").html(data.temp) // nhiet do     
    $("#currentHumi").html(data.humi) // do am
    $("#currentLight").html(data.light) // anh sang
    $("#currentTemp1").html(data.temp1) // nhiet do     
    $("#currentHumi1").html(data.humi1) // do am
    $("#currentLight1").html(data.light1) // anh sang
    console.log("currentTemp")
})


// socket.on("server-update-data", function (data) {

//     if(data.light>200){
//         alert(" Ánh sáng xuống thấp quá"); 
//         socket.emit("livingroomLightChange", "on")
//         $(".element-icon-control1").attr("src","bongdensang.jpg")
//     }
//     else if(data.light<130){
//         alert(" Ánh sáng ổn"); 
//         socket.emit("livingroomLightChange", "off")
//         $(".element-icon-control1").attr("src","bongden.jpg")
//     }
    
// })

// socket.on("server-update-data", function (data) {

//     if(data.temp>20){
//         alert("nóng"); 
//         socket.emit("livingroomLightChange", "on")
//         $(".element-icon-control1").attr("src","bongdensang.jpg")
//         $(".tempp").css({"background-image": "linear-gradient(180deg, green, black"})
//     }
//     else if(data.temp<20){
//         alert("nhiệt độ ổn"); 
//         socket.emit("livingroomLightChange", "off")
//         $(".element-icon-control1").attr("src","bongden.jpg")
//         $(".tempp").css({"background-image": "linear-gradient(180deg, pink,violet"})
//     }
    
// })

function ledOn1() {
    const note = confirm('Bạn có muốn bật đèn không')
    if(note) {
        $(".element-icon-control1").attr("src","bongdensang.jpg")
        $(".turn-off1").css({"background-image": "linear-gradient(180deg, rgb(248, 228, 5), rgb(252, 244, 96), rgb(244, 251, 195))"})
        $(".turn-off1").css({"border-radius" : "10px"})
        console.log('livinglight on')
        socket.emit("livingroomLightChange", "on")
    }
}

function ledOff1() {
    const note = confirm('Bạn có muốn tắt đèn không')
    if(note) {
        $(".element-icon-control1").attr("src","bongden.jpg")
        $(".turn-off1").css({"background-image": "linear-gradient(0deg,  rgb(186, 184, 184), rgb(91, 88, 88), rgb(51, 50, 50))"})
        $(".turn-off1").css({"border-radius" : "10px"})
        console.log('livinglight off')
        socket.emit("livingroomLightChange", "off")
    }
}


function ledOn2() {
    const note = confirm('Bạn có muốn bật đèn không')
    if(note) {
        $(".element-icon-control").attr("src","bongdensang.jpg")
        $(".turn-off2").css({"background-image": "linear-gradient(180deg, rgb(248, 228, 5), rgb(252, 244, 96), rgb(244, 251, 195))"})
        $(".turn-off2").css({"border-radius" : "10px"})

        console.log('bedroom on')
        socket.emit("bedroomLightChange", "on")
    }
}

function ledOff2() {
    const note = confirm('Bạn có muốn tắt đèn không')
    if(note) {
        $(".element-icon-control").attr("src","bongden.jpg")
        $(".turn-off2").css({"background-image": "linear-gradient(0deg,  rgb(186, 184, 184), rgb(91, 88, 88), rgb(51, 50, 50))"})
        $(".turn-off2").css({"border-radius" : "10px"})
        console.log('bedroom off')
        socket.emit("bedroomLightChange", "off")
    }
}



function ledOn() {
    const note = confirm('Bạn có muốn bật đèn không')
    if(note) {
        $(".btn1").css({"left" : "0"})
        $(".img-bulb2").attr("src","bongdensang.jpg")
        $(".btn1").css({"background-color" : "green"})
        $(".bedroom-control").css({"background-image": "linear-gradient(0deg, rgb(248, 228, 5), rgb(252, 244, 96), rgb(244, 251, 195))"})
        socket.emit("airVentChange", "on")
    }
}

function ledOff() {
    const note = confirm('Bạn có muốn tắt đèn không')
    if(note) {
        $(".btn1").css({"left" : "70px"})
        $(".img-bulb2").attr("src","bongden.jpg")
        $(".btn1").css({"background-color" : "green"})
        $(".bedroom-control").css({"background-image": "linear-gradient(180deg,  rgb(186, 184, 184), rgb(91, 88, 88), rgb(51, 50, 50))"})
    
        socket.emit("airVentChange", "off")
    }
}
