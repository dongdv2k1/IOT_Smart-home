var socket = io("http://localhost:6060")

socket.on("server-update-data", function (data) {

    $("#currentTemp").html(data.temp)      
    $("#currentHumi").html(data.humi)
    $("#currentLight").html(data.light)
    console.log(data)
})

function ledOn1() {
    const note = confirm('Bạn có muốn bật đèn không')
    if(note) {
        $(".element-icon-control1").attr("src","bongdensang.jpg")
        $(".turn-off1").css({"background-image": "linear-gradient(180deg, rgb(248, 228, 5), rgb(252, 244, 96), rgb(244, 251, 195))"})
        $(".turn-off1").css({"border-radius" : "10px"})
        $("#on1").css({"background-color":"rgb(180, 233, 87)"})
        $("#off1").css({"background-color":"white"})
        // $(".livingroom-control").css({"background-color" : ""})

        console.log('livinglight on')
        socket.emit("livingroomLightChange", "on")
    }
}


socket.on("server-update-data", function (data) {

    if(data.light>2000){
        // alert(" Ánh sáng xuống thấp quá"); 
        socket.emit("livingroomLightChange", "on")
        socket.emit("airVentChange", "on")
        $(".element-icon-control1").attr("src","bongdensang.jpg")
        $(".img-bulb2").attr("src","bongdensang.jpg")   
        $(".lightt").css({"background-image": "linear-gradient(180deg, green,  rgb(139, 203, 29)"})
        $(".turn-off1").css({"background-image": "linear-gradient(180deg, rgb(248, 228, 5), rgb(252, 244, 96), rgb(244, 251, 195))"})
        $(".bedroom-control").css({"background-image": "linear-gradient(0deg, rgb(248, 228, 5), rgb(252, 244, 96), rgb(244, 251, 195))"})
    }
    else if(data.light<2000 && data.light>130){
        // alert(" Ánh sáng ổn"); 
        socket.emit("livingroomLightChange", "off")
        socket.emit("airVentChange", "off")
        $(".element-icon-control1").attr("src","bongden.jpg")
        $(".img-bulb2").attr("src","bongden.jpg")
        $(".lightt").css({"background-image": "linear-gradient(180deg,yellow, rgb(227, 243, 106)"})
        $(".turn-off1").css({"background-image": "linear-gradient(90deg,  #f7c58d,rgb(249, 237, 185),rgb(253, 187, 255), rgb(230, 154, 233),rgb(253, 156, 210),rgb(240, 186, 203)"})
        $(".bedroom-control").css({"background-image": "linear-gradient(90deg,  #cbffaf,#93f263,#a4d5ff, rgb(70, 250, 250)"})
        
    }else if(data.light<130){
        // alert(" Ánh sáng cao");
        socket.emit("livingroomLightChange", "off")
        socket.emit("airVentChange", "off")
        $(".element-icon-control1").attr("src","bongden.jpg")
        $(".img-bulb2").attr("src","bongden.jpg")
        $(".lightt").css({"background-image": "linear-gradient(180deg,gray, rgb(89, 90, 79)"})
        $(".turn-off1").css({"background-image": "linear-gradient(0deg, rgb(100, 46, 46),rgb(96, 63, 63), rgb(186, 184, 184), rgb(91, 88, 88), rgb(51, 50, 50))"})
        $(".bedroom-control").css({"background-image": "linear-gradient(0deg, rgb(100, 46, 46),rgb(96, 63, 63), rgb(186, 184, 184), rgb(91, 88, 88), rgb(51, 50, 50))"})
    }
    
})

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
function ledOff1() {
    const note = confirm('Bạn có muốn tắt đèn không')
    if(note) {
        $(".element-icon-control1").attr("src","bongden.jpg")
        $(".turn-off1").css({"background-image": "linear-gradient(0deg, rgb(100, 46, 46),rgb(96, 63, 63), rgb(186, 184, 184), rgb(91, 88, 88), rgb(51, 50, 50))"})
        $(".turn-off1").css({"border-radius" : "10px"})
        $("#on1").css({"background-color":"white"})
        $("#off1").css({"background-color":"rgb(223, 74, 74)"})
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
            $(".bedroom-control").css({"background-image": "linear-gradient(0deg, rgb(100, 46, 46),rgb(96, 63, 63), rgb(186, 184, 184), rgb(91, 88, 88), rgb(51, 50, 50))"})
            
            socket.emit("airVentChange", "off")
        }
    }