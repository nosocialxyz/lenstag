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
import { SearchResult, TriggerResult } from 'src/lib/types';
import result from 'src/_mock/search_result';
import { tags, trigger } from 'src/api';

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
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [handle, setHandle] = useState<string>('');
  const [triggerResult, setTriggerResult] = useState<TriggerResult | null>(null);

  const search = () => {
    console.log('handle:::', handle)
    setSearchResult(null)
    complete[0].classList.remove('block')
    setIsInSearching(true);
    describe[0].classList.add('none');
    homeContainer[0].classList.add('home-container-search');
    loading[0].classList.add('block')
    tip[0].classList.add('block')
    processing[0].classList.add('block');
    trigger(handle).then(res => {
      console.log('trigger res:::', res)
    })

    processing[0].classList.add('flashing')

    const timer = setInterval(() => {
      tags(handle).then(res => {
        console.log('tags res:::', res)
        setSearchResult(res)
        if (res && res.unprocessed === 0) {
          processing[0].classList.remove('block')
          complete[0].classList.add('block')
          setTimeout(() => {
            clearInterval(timer)
            // setSearchResult(result)
          }, 6000);
        }
      })
    }, 5000);

    setTimeout(() => {
      mission[0].classList.add('rowup');
    }, 3000);
    
    setTimeout(() => {
      loading[0].classList.remove('block')
      mission[0].classList.remove('rowup');
    }, 5000);

    setTimeout(() => {
      
      // setSearchResult(result)
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
              <InputLabel htmlFor="outlined-adornment-handle">Handle</InputLabel>
              <OutlinedInput
                id="outlined-adornment-handle"
                label="Handle"
                value={handle}
                onChange={(event) => {
                  setHandle(event.target.value)
                }}
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
            <div className='mission_processing'>Use AI to analyze user's publications, {searchResult?.unprocessed ? searchResult?.unprocessed : '99+'} left ...</div>
            <div className='mission_complete'>Mission completed</div>
          </div>
          <div className='tool_tip'>
            <Tooltip className='tip' title="Lenstag is an internal version currently. In public version, the speed of AI analysis will be greatly accelerated"><HelpOutlineIcon /></Tooltip>
          </div>
        </div>
        <div className='result_container'>
          {isInSearching && <div className='result_card'>
            <div className='result_tags'>
              { searchResult?.picture && <div className='avatar'><img src={searchResult?.picture} /></div>}
              { searchResult?.handle && <div className='profile'>{searchResult?.handle}</div>}
              <div className='tags'>
                {
                  searchResult?.tags?.length && searchResult?.tags?.slice(0, 4).map((e, index) => {
                    return <AutoDiv key={index} width={calWidth(e) + 'px'} fontSize={calFontSize(e, calWidth(e)) + 'px'}>{e}</AutoDiv>
                  })
                }
              </div>
              {searchResult && <div className='follow'><AddIcon /> FOLLOW</div>}
            </div>
            { searchResult?.aiPicture && <img className='result_pic' src={searchResult?.aiPicture} />}
          </div>}
        </div>
      </div>
      <div className="home-copyright">© 2023 Build with 💛 by NoSocial Labs</div>
    </div>
  );
}

export default Home;