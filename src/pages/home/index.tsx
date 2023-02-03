import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Logo from '../../components/logo';
import './style.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from 'src/components/header';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import { SearchResult, TriggerResult } from 'src/lib/types';
import { tags, trigger } from 'src/api';
import { useInterval } from 'src/utils/useInterval';
import { lintParam } from 'src/utils/lintParam';
import { ProfileFragment  } from '@lens-protocol/react';
import { FollowProfile } from 'src/components/follow';
import ErrorBoundary from 'src/components/error';

// interface AutoDivPros {
//   width?: string;
//   fontSize?: string;
// }

const AutoDiv = styled(`div`)(() => ({
  height: '32px',
  // width: width,
  // minWidth: '60px',
  display: 'flex',
  // fontSize: '12px',
  alignItems: 'center',
  textAlign:'justify',
  justifyContent: 'center',
  border: '1px solid #fff',
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  borderRadius: '8px',
  overflow: 'hidden'
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
  const homeContainer = document.getElementsByClassName('home_container');
  const describe = document.getElementsByClassName('home_header_desc');
  const mission = document.getElementsByClassName('result_mission');
  const tip = document.getElementsByClassName('tip');
  const loading = document.getElementsByClassName('mission_loading');
  const processing = document.getElementsByClassName('mission_processing');
  const complete = document.getElementsByClassName('mission_complete');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [triggerResult, setTriggerResult] = useState<TriggerResult | null>(null);
  const [handle, setHandle] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [isNotRequirement, setIsNotRequirement] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  // const { data: profile } = useProfile({ handle });
  // const { follow } = useMemo();

  useEffect(() => {
    if (searchResult && searchResult.status === 'Finished' && searchResult.tags === undefined) {
      setIsNotRequirement(true)
    } else {
      setIsNotRequirement(false)
    }
  }, [searchResult, query])

  const uiRowUp = () => {
    complete[0].classList.remove('block')
    homeContainer[0].classList.add('home_container_search');
    describe[0].classList.add('none');
  }

  useEffect(() => {
    if (handle.length) {
      uiRowUp();
    }
  }, [handle])

  useInterval(() => {
    if (!isInvalid && searchResult?.status !== 'Finished') {
      tags(query).then(res => {
        loading[0].classList.remove('block');
        // mission[0].classList.remove('rowUp');
        if (res && res.status === 'Finished') {
          processing[0].classList.remove('block')
          complete[0].classList.add('block')
        }
        setSearchResult(res)
      })
    } else {
      
    }
  }, 5000)

  const search = useCallback(async () => {
    setQuery(lintParam(handle));
    setSearchResult(null)
    setIsInSearching(true);
    uiRowUp();
    loading[0].classList.add('rowUp');
    const triggerRes = await trigger(lintParam(handle));
    setTriggerResult(triggerRes);
    if (triggerRes && triggerRes.statusCode !== 200) {
      setIsInvalid(true)
      setIsInSearching(false)
      loading[0].classList.remove('block')
      processing[0].classList.remove('block')
      complete[0].classList.remove('block')
    } else {
      setIsInvalid(false)
    }
    if (triggerRes && triggerRes.statusCode === 200) {
      loading[0].classList.add('block')
      tip[0].classList.add('block')
      processing[0].classList.add('block');
      processing[0].classList.add('flashing')
    }

  }, [handle])

  return (
    <ErrorBoundary>
      <div className="home">
        <div className="home-logo"><Logo /></div>
        <Header onOpenNav={() => setOpen(true)} />
        <div className="home_container">
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
            </div>
          </div>
          <div className='search_result'>
            <div className='result_mission'>
              <div className='mission_loading'>Explore the user's social network on lens...</div>
              <div className='mission_processing'>Use AI to analyze user's publications, {searchResult?.unprocessed ? searchResult?.unprocessed : '0'} left ...</div>
              <div className='mission_complete'>Mission completed</div>
              <div className='tool_tip'>
                <Tooltip className='tip' title="Lenstag is an internal version currently. In public version, the speed of AI analysis will be greatly accelerated"><HelpOutlineIcon /></Tooltip>
              </div>
            </div>
          </div>
          <div className='result_container'>
            <ErrorBoundary>
              {
                !isInvalid ? (isInSearching && <div className='result_card'>
                  <div className='result_tags'>
                    {searchResult?.picture ? <div className='avatar'><img src={searchResult?.picture} /></div> : <div className='avatar loading'></div>}
                    {searchResult?.handle ? <a className='profile' href={'https://lenster.xyz/u/' + query } target='_blank' >{searchResult?.handle}</a> : <div className='profile loading'></div>}
                    {isNotRequirement ? <div className='tags'></div> : searchResult?.tags?.length ? <div className='tags'>
                      {
                        searchResult?.tags?.length && searchResult?.tags?.slice(0, 4).map((e, index) => {
                          return <AutoDiv key={index}>{e}</AutoDiv>
                        })
                      }
                    </div> : <div className='tags loading'></div>}
                    {(searchResult && triggerResult && triggerResult.statusCode === 200) ? <FollowProfile searchRes={searchResult}></FollowProfile> : <div className='follow loading'></div>}
                  </div>
                  {isNotRequirement ? <div> data does not meet calculation requirements </div> 
                  : searchResult?.aiPicture ? <img className='result_pic' src={searchResult?.aiPicture} /> : <div className='result_pic loading'>
                  </div>}
                </div>) : <div>Invalid handle</div>
              }
            </ErrorBoundary>
          </div>
        </div>
        <div className="home-copyright">© 2023 Build with 💛 by NoSocial Labs</div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;