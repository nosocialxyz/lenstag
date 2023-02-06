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
import { ProcessingStatus } from '../types';

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
    homeContainer[0].classList.add('home_container_search');
    describe[0].classList.add('none');
  }

  useEffect(() => {
    if (handle.length) {
      uiRowUp();
    }
  }, [handle])

  useInterval(() => {
    if (!isInvalid && searchResult?.status !== 'Finished' && query.length) {
      tags(query).then(res => {
        setSearchResult(res)
      })
    } else {
      // pass it 
    }
  }, 1000)

  const search = useCallback(async () => {
    setQuery(lintParam(handle));
    setSearchResult(null)
    setIsInSearching(true);
    uiRowUp();
    const triggerRes = await trigger(lintParam(handle));
    setTriggerResult(triggerRes);
    if (triggerRes && triggerRes.statusCode !== 200) {
      setIsInvalid(true)
      setIsInSearching(false)
    } else {
      setIsInvalid(false)
    }

  }, [handle])

  const missionProcessing = useMemo(() => {    
    if (searchResult) {
      if (searchResult.status === ProcessingStatus.Waiting || searchResult.status === ProcessingStatus.Collecting) {
        return <div className='mission_processing flashing'>Collect publications ...</div>
      } else if (searchResult.status === ProcessingStatus.Processing) {
        if (searchResult.unprocessed === 0) {
          return <div className='mission_processing flashing'>Generating new LensTag picture ...</div>
        } else {
          return <div className='mission_processing flashing'>Use AI to analyze user's publications, {searchResult.unprocessed} left (about {searchResult.unprocessed *3} s to finish) ...</div>
        }
      } else if (searchResult.status === ProcessingStatus.Generating || searchResult.status === ProcessingStatus.AITagNotStarted) {
        return <div className='mission_processing flashing'>Generating new LensTag picture ...</div>
      } else if (searchResult.status === ProcessingStatus.Finished) {
        return <div className='mission_processing'>AI analysis complete</div>
      } else {
        return <></>
      }
    } else {
      if (isInSearching) {
        return <div className='mission_processing'>Explore the user's social network on lens...</div>
      } else {
        return <></>
      }
    }
  }, [searchResult, isInSearching])

  return (
    <ErrorBoundary>
      <div className="home">
        <div className="home-logo"><Logo /></div>
        <Header onOpenNav={() => setOpen(true)} />
        <div className="home_container">
          <div className='home_header'>
            <div className='home_header_title'>Find your friends!</div>
            <div className='home_header_desc'>
            LensTag analyzes a Lens user's social content with OpenAI, and generates 4 tags to describe the user. Users can quickly find people they're interested in without checking out every publication a user has created.</div>
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
                  placeholder={'for example littlethings or littlethings.lens'}
                />
                <SearchIcon className='search_button' sx={{
                  fontSize: '36px'
                }} onClick={search} />
              </FormControl>
            </div>
          </div>
          <div className='search_result'>
            <div className='result_mission'>
              {/* <div className='mission_loading'>Explore the user's social network on lens...</div> */}
              {/* <div className='mission_processing'>
                {searchResult?.unprocessed !== null 
                ? (searchResult?.unprocessed === 0 && (searchResult?.status === 'Generating' || searchResult?.status === 'Processing' || searchResult?.status === 'AITagNotStarted')) 
                ? `Generating new LensTag picture ...` 
                : `Use AI to analyze user's publications, ${searchResult?.unprocessed} left ...`
                : `Collecting ...`}  
              </div> */}
              {missionProcessing}
              {/* <div className='mission_complete'>Mission completed</div> */}
              <div className='tool_tip'>
                <Tooltip className='tip' title="Lenstag is in the internal version currently. In the public version, the speed of AI analysis will accelerate greatly"><HelpOutlineIcon /></Tooltip>
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