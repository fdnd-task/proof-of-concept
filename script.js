

<<<<<<< HEAD
import * as prismic from 'https://cdn.skypack.dev/@prismicio/client';

const repositoryName = 'projectink'
const accessToken = 'MC5aSTNldEJVQUFDb0FCNFFt.dSHvv71CND8t77-977-977-9Mzp377-9fjTvv73vv73vv73vv73vv73vv73vv71G77-977-9GO-_ve-_vWrvv718' // Set an access token


const client = prismic.createClient(repositoryName, { accessToken })

const init = async () => {
  const players = await client.getAllByType('spelers')
  
  players.forEach(player => {
    

    console.log(player.data)

    
  });

 
}

init()


//card carousel buttons functionality. als er op de knop geklikt wordt schuift de scrollbar met 500 pixels
nextBtn.onclick = () => {
    cardSection.scrollLeft += 500;
  };
  prevBtn.onclick = () => {
    cardSection.scrollLeft -= 500;
  };

=======
>>>>>>> 8d651b43472f3983208dc5475e6ef8fad5e9b522
