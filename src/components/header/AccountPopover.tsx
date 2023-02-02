import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import { useContextLoginUser } from 'src/lib/hooks';
import { useNavigate } from 'react-router-dom';
import useMetaMask from 'src/components/wallets/metamask';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    key: 1,
    label: 'Switch profile',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { connect, account, isConnected, disconnect } = useMetaMask();
  const user = useContextLoginUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = async (option: number) => {
    if (option === 0) {
      await disconnect();
      navigate('/home')
    } else if (option === 1) {
      navigate('/home', { state: { address: user.address } });
    }
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          // @ts-ignore
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={'/assets/images/avatar.png'} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.basicInfo?.info?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.basicInfo?.info?.handle}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClose(option.key)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />
        {!isConnected &&<MenuItem onClick={connect} sx={{ m: 1 }}>
          Connect to MetaMask
        </MenuItem>}
        {isConnected &&<MenuItem onClick={() => handleClose(0)} sx={{ m: 1 }}>
          Logout
        </MenuItem>}
      </Popover>
    </>
  );
}
