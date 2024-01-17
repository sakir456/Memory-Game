document.addEventListener('DOMContentLoaded', function () {
       let firstclicked = null;
        let timer;
        let seconds=0
       let flipcount = 0;
       const cards = document.querySelectorAll('.card');
       const noOfFlips = document.querySelector('.flips');
       const container=document.querySelector('.container');
       const wonmessage=document.querySelector('.won-message')
       const timeDisplay=document.querySelector('.time')
   
       cards.forEach(card => {
            shufflecards()
           card.addEventListener('click', function () {
               cardfunction(card);
           });
       });
   
       function cardfunction(card) {
        if(!timer){
            timer=setInterval(updatetimer,1000)
        }

        if (!card.classList.contains('flipped')) {
            // Check if the card is not already flipped
            flipcount++;
            noOfFlips.innerText = `Flips:${flipcount}`;
            card.classList.add('flipped');

            if (!firstclicked) {
                firstclicked = card;
            } else {
                cardcheck(firstclicked, card);
            }
        }
    }

function cardcheck(firstcard, secondcard) {
            const firstImageSrc = firstcard.querySelector('.front-view img').src;
            const secondImageSrc = secondcard.querySelector('.front-view img').src;
        
            if (firstImageSrc !== secondImageSrc) {
                setTimeout(() => {
                    firstcard.classList.remove('flipped');
                    secondcard.classList.remove('flipped');
                }, 1000);
            } else {
                setTimeout(() => {
                 firstcard.classList.add('flipped');
                    secondcard.classList.add('flipped');
                    checkgamewon()
                }, 500);
        
               
                
            }
        
            firstclicked = null; 
            
        }

        function checkgamewon(){
            const allflippedcards=document.querySelectorAll('.card.flipped')
            const flipinfo=document.querySelector('.flip-info')
            flipinfo.innerText=`It takes you ${flipcount} flips and ${seconds}s to won`
            if(allflippedcards.length===cards.length){
                clearInterval(timer)
                timer=null
                setTimeout(()=>{
                    container.style.display='none';
                    wonmessage.style.display='block';

                 setTimeout(()=>{
                    wonmessage.style.display='none';
                    shufflecards()
                    resetgame()
                    container.style.display='flex'
                    resettimer()


                 },10000)   
                },500)
        };
    }

    function shufflecards(){
        cards.forEach(card => {
            card.style.order = Math.floor(Math.random() * cards.length);
        });
    }

    function resetgame(){
        flipcount=0
        noOfFlips.innerText=`Flips:${flipcount}`
        cards.forEach(card=>{
            card.classList.remove('flipped')
            
        })
    }

    function updatetimer(){
        seconds++
        timeDisplay.innerText=`Time:${seconds}s`
    }

    function resettimer(){
        seconds=0
        timeDisplay.innerText=`Time:0s`
    }
        
   });
   