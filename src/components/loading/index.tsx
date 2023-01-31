import { styled } from '@mui/material';
import './style.css';

interface Props {
    width?: string;
    height?: string;
}


const BoxWrap = styled(`div`)(({ width = '100px' }: Props) => ({
    width: width,
    background: 'repeating-linear-gradient(135deg, transparent, transparent 3px, #fff 3px, #fff 8px)',
    animation: 'shine 1s infinite linear',
    overflow: 'hidden'
}))

const ContentWrap = styled(`div`)(({ height = '100px' }: Props) => ({
    height: height,
    margin: '2px; padding: 10px',
    backgroundColor: '#605972'
}))

function Loading ({ width, height }: Props) {
    return <BoxWrap className='box' width={width} >
            <ContentWrap height={height} className="content"></ContentWrap>
        </BoxWrap>
}

export default Loading;