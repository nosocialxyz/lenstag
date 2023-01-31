import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Logo from '../../components/logo';
import './style.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useContextLoginUser } from 'src/lib/hooks';
import Header from 'src/components/header';
import { Search } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';

interface AutoDivPros {
  width?: string;
  fontSize?: string;
}

const AutoDiv = styled(`div`)(({ width = '59px', fontSize = '12px' }: AutoDivPros) => ({
    height: '32px',
    width: width,
    display: 'flex',
    fontSize: fontSize,
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #FFC130',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    borderRadius: '8px',
}))

// max width = 105 px
const calWidth = (tag: string) => {
  const res = tag.length * 8;
  return res > 105 ? 105 : res < 59 ? 59 : res;
}

const calFontSize = (tag: string, width: number) => {
  const res = (width / tag.length) * 0.1
  return res;
}

function Home() {
  const [open, setOpen] = useState(false);
  const [isInSearching, setIsInSearching] = useState(false);
  const homeContainer = document.getElementsByClassName('home-container');
  const describe = document.getElementsByClassName('home_header_desc');
  const mission = document.getElementsByClassName('result_mission');
  const tip = document.getElementsByClassName('tip');
  const loading = document.getElementsByClassName('mission_loading');
  const processing = document.getElementsByClassName('mission_processing');
  const complete = document.getElementsByClassName('mission_complete');
  const location = useLocation();
  const user = useContextLoginUser();

  const search = () => {
    complete[0].classList.remove('block')
    setIsInSearching(true);
    const homeContainer = document.getElementsByClassName('home-container');
    describe[0].classList.add('none');
    homeContainer[0].classList.add('home-container-search');
    loading[0].classList.add('block')
    tip[0].classList.add('block')
    processing[0].classList.add('block')

    setTimeout(() => {
      mission[0].classList.add('rowup');
    }, 3000);
    
    setTimeout(() => {
      loading[0].classList.remove('block')
    }, 5000);

    setTimeout(() => {
      mission[0].classList.remove('rowup');
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
          <div className='search_container' >
            <FormControl className='search_input'>
              <InputLabel htmlFor="outlined-adornment-amount">Handle</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Amount"
              />
            </FormControl>
            <SearchIcon className='search_button' sx={{
              fontSize: '36px'
            }} onClick={search} />
            {/* <Button startIcon={<Search />} onClick={search} >
              SEARCH
            </Button> */}
          </div>
        </div>
        <div className='search_result'>
          <div className='result_mission'>
            <div className='mission_loading'>Explore the user's social network on lens...</div>
            <div className='mission_processing'>Use AI to analyze user's publications, 50 left ...</div>
            <div className='mission_complete'>Mission completed</div>
          </div>
          <div className='tool_tip'>
            <Tooltip className='tip' title="1111111111111"><HelpOutlineIcon /></Tooltip>
          </div>
        </div>
        <div className='result_container'>
          {isInSearching && <div className='result_card'>
            <div className='result_tags'>
              <div className='avatar'><img src='https://data.nosocial.xyz/ai-tags/0x0e7b-0xffffffff-1675064761.png' /></div>
              <div className='profile'>abcbby.len</div>
              <div className='tags'>
                <AutoDiv width={calWidth('BTC') + 'px'} fontSize={calFontSize('BTC', calWidth('BTC')) + 'px'}>BTC</AutoDiv>
                <AutoDiv width={calWidth('Price') + 'px'} fontSize={calFontSize('Price', calWidth('Price')) + 'px'}>Price</AutoDiv>
                <AutoDiv width={calWidth('Community') + 'px'} fontSize={calFontSize('Community', calWidth('Community')) + 'px'}>Community</AutoDiv>
                <AutoDiv width={calWidth('Arteriosclerosis ') + 'px'} fontSize={calFontSize('Arteriosclerosis ', calWidth('Arteriosclerosis ')) + 'px'} >Arteriosclerosis </AutoDiv>
              </div>
              <div className='follow'><AddIcon /> FOLLOW</div>
            </div>
            <img className='result_pic' src='https://data.nosocial.xyz/ai-tags/0x0e7b-0xffffffff-1675064761.png' />
          </div>}
        </div>
      </div>
      {/* <Grid container justifyContent="center">
      </Grid> */}

      <div className="home-copyright">© 2023 Build with 💛 by NoSocial Labs</div>
    </div>
  );
}

export default Home;