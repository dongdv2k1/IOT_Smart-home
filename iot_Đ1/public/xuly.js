var socket = io("http://localhost:6060")

socket.on("server-update-data", function (data) {

   
    $("#currentTemp").html(data.temp)      
    $("#currentHumi").html(data.humi)
    $("#currentLight").html(data.light)
})

socket.on("server-update-data", function (data) {

        if(data.light>3000){
            $(".lightt").css({"background-image": "linear-gradient(180deg, rgb(129, 251, 54),rgb(202, 252, 133))"}) 
        }
        if(data.light<3000&& data.light>2000){
            $(".lightt").css({"background-image": "linear-gradient(180deg, rgb(205, 199, 253),rgb(134, 132, 246))"}) 
        }
        if(data.light<2000&& data.light>1000){
            $(".lightt").css({"background-image": "linear-gradient(180deg,rgb(240, 184, 55),rgb(234, 170, 61))"}) 
        }
        if(data.light<1000&& data.light>500){
            $(".lightt").css({"background-image": "linear-gradient(180deg,  crimson, lightsalmon)"}) 
        }
        if(data.light<500&& data.light>0){
            $(".lightt").css({"background-image": "linear-gradient(180deg, midnightblue, indigoCP)"}) 
        }
   
    
})


function ledOn1() {
    const note = confirm('Bạn có muốn bật đèn không')
    if(note) {
        $(".element-icon-control1").attr("src","bongdensang.jpg")
        $(".turn-off1").css({"background-image": "linear-gradient(180deg, rgb(55, 61, 240),rgb(55, 61, 240))"})
        $(".ct1").css({"background-image": "linear-gradient(180deg, rgb(55, 61, 240),rgb(55, 61, 240))"})
        $(".ct2").css({"background-image": "linear-gradient(180deg, white,rgb(243, 218, 218))"})
        $(".turn-off1").css({"border-radius" : "10px"})
        // $(".livingroom-control").css({"background-color" : ""})

        console.log('livinglight on')
        socket.emit("livingroomLightChange", "on")
    }
}

function ledOff1() {
    const note = confirm('Bạn có muốn tắt đèn không')
    if(note) {
        $(".element-icon-control1").attr("src","bongden.jpg")
        $(".turn-off1").css({"background-image": "linear-gradient(0deg,  rgb(240, 184, 55),rgb(234, 170, 61))"})
        $(".ct2").css({"background-image": "linear-gradient(0deg,  rgb(240, 184, 55),rgb(234, 170, 61))"})
        $(".ct1").css({"background-image": "linear-gradient(0deg,   white,rgb(243, 218, 218))"})
        $(".turn-off1").css({"border-radius" : "10px"})
        console.log('livinglight off')
        socket.emit("livingroomLightChange", "off")
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