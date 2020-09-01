const twilio = () => {

  const btn = document.getElementById("connect-button")
  const shareScreen = document.getElementById("share-button")
  const endCall = document.getElementById("end-button")
  const user_token = document.getElementById("user-token")
  const remoteDiv = document.getElementById('remote-media-div')

  if (btn) {
  const token_1 = user_token.innerHTML
  const { connect, LocalVideoTrack, createLocalTracks} = require('twilio-video');

  btn.addEventListener('click', event => {
    event.preventDefault
    VideoCall()
      async function VideoCall(){

      const room = await connect(token_1, {
        audio: true,
        name: 'my-room-name',
        video: { width: 640}
      });

     // Add Call option buttons
     shareScreen.classList.add("show");
     endCall.classList.add("show");
     btn.classList.add("hide");

     // Connecting Participant
      room.on('participantConnected', participant => {
      console.log(`Participant "${participant.identity}" connected`);

        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            const track = publication.track;
            document.getElementById('remote-media-div').appendChild(track.attach());
          }
        });

        participant.on('trackSubscribed', track => {
          document.getElementById('remote-media-div').appendChild(track.attach());
        });
      });

      room.participants.forEach(participant => {
      participant.tracks.forEach(publication => {
         publication.on('unsubscribed', () => {
           /* Hide the associated <video> element and show an avatar image. */
           console.log(document.getElementById('remote-media-div'));

         });
      });
    });

      // Remote Participant

      room.participants.forEach(participant => {
        participant.tracks.forEach(publication => {
          if (publication.track) {
            document.getElementById('remote-media-div').appendChild(publication.track.attach());
          }
        });

      const identity = participant.identity;
      participant.on('trackSubscribed', track => {
        const div = document.createElement("div");
        div.id = identity;
        div.appendChild(track.attach());
        remoteDiv.appendChild(div);
      });
    });


          var Video = require('twilio-video');
            // Request audio and video tracks
          Video.createLocalTracks().then(function(localTracks) {
              var localMediaContainer = document.getElementById('local-media-container-id');
              localTracks.forEach(function(track) {
              localMediaContainer.appendChild(track.attach());
            });
        });



        shareScreen.addEventListener('click', event => {
          async function startCapture() {
          const stream = await navigator.mediaDevices.getDisplayMedia();
          const screenTrack = new LocalVideoTrack(stream.getTracks()[0]);
          room.localParticipant.publishTrack(screenTrack);
          room.localParticipant.videoTracks.forEach(publication => {
            publication.track.stop();
            publication.unpublish();
          });
        }
          startCapture();
        });

        endCall.addEventListener('click', event => {
          room.localParticipant.tracks.forEach(publication => {
            const attachedElements = publication.track.detach();
            attachedElements.forEach(element => element.remove());
          });

          room.disconnect();
          window.location.replace("/");
        });
      }
    });


}



}
export { twilio }
