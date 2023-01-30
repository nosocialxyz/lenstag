import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Logo from '../../components/logo';
import './style.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useContextLoginUser } from 'src/lib/hooks';
import Header from 'src/components/header';
import { Search } from '@mui/icons-material';

function Home() {
  const [open, setOpen] = useState(false);
  // const [isInSearching, setIsInSearching] = useState(false);


  const location = useLocation();
  const user = useContextLoginUser();

  const search = () => {
    const homeContainer = document.getElementsByClassName('home-container');
    const describe = document.getElementsByClassName('home_header_desc');
    describe[0].classList.add('none');
    homeContainer[0].classList.add('home-container-search');
    // setIsInSearching(true);
    const tips = document.getElementsByClassName('result_mission');
    const loading = document.getElementsByClassName('mission_loading');
    const processing = document.getElementsByClassName('mission_processing');
    const complete = document.getElementsByClassName('mission_complete');
    loading[0].classList.add('block')
    setTimeout(() => {
      tips[0].classList.add('rowup');
    }, 3000);
    setTimeout(() => {
      loading[0].classList.remove('block')
      processing[0].classList.add('block')
    }, 4000);

    setTimeout(() => {
      tips[0].classList.remove('rowup');
      processing[0].classList.remove('block')
      complete[0].classList.add('block')
    }, 10000);
  }

  return (
    <div className="home">
      <div className="home-logo"><Logo /></div>
      <Header onOpenNav={() => setOpen(true)} />
      <div className="home-container">
        <div className='home_header'>
          <div className='home_header_title'>Find people you like</div>
          <div className='home_header_desc'>
LensTag analyzes Lens user's social content with OpenAI, and generate 4 tag to describe the user. Users can quickly find people you're interested without checking out their publications.</div>
        </div>
        <div className='search'>
          <FormControl className='search_input'>
            <InputLabel htmlFor="outlined-adornment-amount">Handle</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Amount"
            />
          </FormControl>
          <Button startIcon={<Search />} onClick={search} >
            SEARCH
          </Button>
        </div>
        <div className='search_result'>
            <div className='result_mission'>
              <div className='mission_loading'>Explore the user's social network on lens...</div>
              <div className='mission_processing'>Use AI to analyze user's publications, 50 left ...</div>
              <div className='mission_complete'>Mission completed</div>
            </div>
        </div>
      </div>
      {/* <Grid container justifyContent="center">
      </Grid> */}

      <div className="home-copyright">© 2023 Build with 💛 by NoSocial Labs</div>
    </div>
  );
}

export default Home;