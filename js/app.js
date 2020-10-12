/**
 * Get the take-photo-id button ...
 * and fire the click event 
 *
 * 
 */

(function(){
const takePhotoButton = document.getElementById('px-take-photo-id');

takePhotoButton.addEventListener('click', function(){

	//open the bootstrap modal 
	$("#takePhotoModal").modal('show');

	//since the modal is now showing...
	//now show the video stream ..
	const video = document.getElementById("stream-video");


	//Use the getUserMedia() method 
	navigator.mediaDevices.getUserMedia({

				'audio': false,
				'video': true

			})
			 .then(function(stream){
			 	this.globalStream = stream;
			 	video.srcObject = stream;
			 	video.onloadedmetadata = function(){

			 		video.play();
			 	}


			 })
			 .catch();


	document.getElementById("take-snap-id").addEventListener("click", function(){
	const canvas = document.getElementById("photos-canvas");

	const context = canvas.getContext("2d");

	context.drawImage(video, 0, 0, 400, 300);

	const photo = document.getElementById("placeholder-photo");

	photo.setAttribute("src", canvas.toDataURL('image/png'));


});



//Close the modal
//And end the camera session
document.getElementById('close-modal-id').addEventListener('click', function(){

		tracks = globalStream.getTracks();
		tracks.forEach((track) =>{
			track.stop();
		})


})


//If the modal was closed by clicking outside the modal..
$('#takePhotoModal').on('hidden.bs.modal', function (e) {
  // do something...
  tracks = globalStream.getTracks();
  tracks.forEach((track) =>{
  	track.stop();
  })


})

});



})();