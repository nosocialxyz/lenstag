import { Button, Grid } from '@mui/material';
import Logo from '../../components/logo';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfiles } from 'src/api';
import { useContextLoginUser } from 'src/lib/hooks';
import Header from 'src/components/header';

function Home() {
    const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const user = useContextLoginUser();

  const { state } = location;

//   const [profiles, setProfiles] = useState<Profile[]>([]);

//   const onClick = (profileId: string) => {
//     user.setLoginUser({
//       address,
//       profileId
//     })
//     navigate('/dashboard/profile')
//   }

//   useEffect(() => {
//     if (state.address) {
//       // TODO: change address to state.address
//       getProfiles(address).then(res => {
//         setProfiles(res)
//       })
//     }
//   }, [])

  return (
    <div className="pselect">
      <div className="pselect-logo"><Logo /></div>
      <Header onOpenNav={() => setOpen(true)} />
      <Grid container className="pselect-profiles" justifyContent="center" spacing={5}>
        {/* {profiles.map((value) => (
          <Grid key={value.id} item>
            <Button className="pselect-profile-button" variant="outlined" onClick={() => onClick(value.id)}>
              {value.name}
            </Button>
          </Grid>
        ))} */}
        {/* <Grid item>
            <Button className="pselect-profile-button" variant="outlined">
              NoSocial Labs
            </Button>
        </Grid> */}
      </Grid>

      <div className="pselect-copyright">© 2023 Build with 💛 by NoSocial Labs</div>
    </div>
  );
}

export default Home;