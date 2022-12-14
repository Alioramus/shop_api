import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AddShoppingCart, Login, Logout } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useBucket from '../contexts/useBucket'
import { Badge } from '@mui/material'
import useUser from '../contexts/useUser'
import { Config } from '../setup'

const pages = [
  {name: 'Produkty', route: 'products'},
  {name: 'Kategorie', route: 'categories'},
  {name: 'Promocje', route: 'promotions'},
  {name: 'Zamówienia', route: 'orders'}
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const {bucket} = useBucket();
  const {user} = useUser();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Sklep
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.route}
                key={page.route}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Koszyk">
              <Badge badgeContent={Object.keys(bucket).length} color="primary">
                <IconButton
                  sx={{ p: 0 }}
                  component={Link}
                  to="bucket"
                >
                  <AddShoppingCart />
                </IconButton>
              </Badge>
            </Tooltip>
          </Box>
          {user.isLoggedIn ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Logout">
                <IconButton
                  sx={{ p: 0 }}
                  href={Config.api_url + "/logout"}
                >
                  <Logout />
                </IconButton>
              </Tooltip>
            </Box>
            :
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Login">
                <IconButton
                  sx={{ p: 0 }}
                  href={Config.api_url + "/login"}
                >
                  <Login />
                </IconButton>
              </Tooltip>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;