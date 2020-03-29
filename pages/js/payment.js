const modalRadio = document.getElementById('modal-radio-button')
const upiModal = document.getElementById('upiModal')
$('#upiModal').modal({ show: false})
modalRadio.addEventListener('click', ()=>{
    //alert('clicked')
    $('#upiModal').modal('show')
})