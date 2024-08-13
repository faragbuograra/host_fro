import * as React from 'react';
import Box from '@mui/material/Box';
import FaceIcon from '@mui/icons-material/Face';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';

import { Color } from "../../Theme/Color";
import { Icon, Link } from '@mui/material';
import { ChangeColor,C } from "../../features/theme";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DomainIcon from '@mui/icons-material/Domain';
import { useTranslation } from 'react-i18next';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import UpcomingIcon from '@mui/icons-material/Upcoming';import StoreIcon from '@mui/icons-material/Store';
// import PublicIcon from '@mui/icons-material/Public';
import InboxIcon from '@mui/icons-material/Inbox';
// import ArchiveIcon from '@mui/icons-material/Archive';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import { decryptData } from '../../helpers/helpers';
const drawerWidth = '20vw'
function Index(props) {
  const { window } = props;
  const location = useLocation()
 let a =location.pathname.split('/')[1]
 const {t,i18n} = useTranslation();
 let language =i18n.language
 //Theme 
 const dispatch = useDispatch();

 const windowSize = React.useRef([window?.innerWidth, window?.innerHeight]);
  const themeColor = useSelector((state) => state.theme.value)

  
const linksAdmin =[
  {
    name:t('DashBoard'),
    icon:<HomeIcon  style={{ color: a ==  'DashBoard' ? themeColor.active:themeColor.main}} />,
    href:'DashBoard',
    list:null
  },
  {
    name:t('Users'),
    icon:<GroupIcon style={{ color: a ==  'Users' ? themeColor.active:themeColor.main}}/>,
    href:'Users',
    list:null,
    list1:[t('NewUser')],
    list:['NewUser'],
  },
  

  {
    name:t('patients'),
    icon:<ReduceCapacityIcon  style={{ color: a ==  'patients' ? themeColor.active:themeColor.main}}/>,
    href:'patients',
    list:null,
    list1:[t('New patient'),],
    list:['Newpatient'],
  },
  {
    name:t('reservations'),
    icon:<ReduceCapacityIcon  style={{ color: a ==  'reservations' ? themeColor.active:themeColor.main}}/>,
    href:'reservations',
    list:null,
    list1:[t('New reservation'),],
    list:['Newreservation'],
  },
  
  
  {
    name:t('الانواع'),
    icon:<DomainIcon  style={{ color: a ==  'types' ? themeColor.active:themeColor.main}}/>,
    href:'types',
    list:null,
    list1:[t('New type')],
    list:['Newtype'],
  },

]
const linksdoctor =[
  {
    name:t('DashBoard'),
    icon:<HomeIcon  style={{ color: a ==  'DashBoard' ? themeColor.active:themeColor.main}} />,
    href:'DashBoard',
    list:null
  },
 
  

  {
    name:t('patients'),
    icon:<ReduceCapacityIcon  style={{ color: a ==  'patients' ? themeColor.active:themeColor.main}}/>,
    href:'patients',
    list:null,
    list:null
  },

  
  
  

]
const linksPatient =[
  {
    name:t('home'),
    icon:<HomeIcon  style={{ color: a ==  'home' ? themeColor.active:themeColor.main}} />,
    href:'home',
    list:null
  },
]

  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
  };
  var originalData = null;
  let mkLocalData = localStorage.getItem("role");
  if (!mkLocalData) {
  } else {
    originalData = decryptData(
      mkLocalData,
      "6d090796-ecdf-11ea-adc1-0242ac112345"
    );
    if (!originalData) {
    }
  }


  const drawer = (
    <div style={{backgroundColor:themeColor.mood,height:'100vh'}}>
       <br />
      <Link
    // href={`${process.env.PUBLIC_URL}/#`}

      
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      className="center" 
      style={{ textDecoration: 'none',
      '&:hover': {
        background: "#f00",
     }, }}
      >
     
      <h1 className="center" style={{color:themeColor.active}} onClick={
        ()=>{
          if(
            themeColor.drawer == true
          ){
            localStorage.setItem('drawer',false)
            dispatch(ChangeColor ({ main: Color.Primary, Hover: Color.Hover, active: Color.active,BackGround:themeColor.BackGround,mood: themeColor.mood,text:themeColor.text,drawer:false }))
          }else{
            localStorage.setItem('drawer',true)
            dispatch(ChangeColor ({ main: Color.Primary, Hover: Color.Hover, active: Color.active,BackGround:themeColor.BackGround,mood: themeColor.mood,text:themeColor.text,drawer:true }))
          }
        }
      } >
        <div style={{width:'250px',height:'100px', 
          backgroundColor:themeColor.text,
  }}>
  <img src='LogoCBL.png' style={{width:'250px',height:'100px', 
          backgroundColor:themeColor.mood,
  }} />
</div>

      </h1>
     
    </Link>
    <br /> <br />
     <Divider />
      <List dir={`${language == 'ar'?'rtl':''}`} >
     { originalData == 'admin'   && linksAdmin.map((text, index) => (
          <>
          
          <NavLink to={'/'+text.href} key={text.name} replace={false}   style={{ textDecoration: 'none'}}>
             <ListItem    sx={{ 
            color:themeColor.primary,
            }}  >
            <ListItemButton style={{textAlign:`${language == 'ar'?'right':'left'}`}} >
              <ListItemIcon style={{color:themeColor.main}}>
              {text.icon}
              </ListItemIcon>

              <ListItemText  primary={text.name} style={{ color: a ==  text.href ? themeColor.active:themeColor.main}} />

            
              {a ==  text.href && text.list != null ? <ArrowDropDownIcon />: null}
              {a ==  text.href && text.list == null  ?<div className='line' style={{background:themeColor.active}} >
              
              </div> : null}
            </ListItemButton>
          </ListItem>
        </NavLink>
      
 
          {a ==  text.href && text.list != null && text.list.map((text1, index) => (
    <NavLink to={text.href+'/'+text.list} key={text1} replace={false}   style={{ textDecoration: 'none'}}>
    <ListItem className='sub'   sx={{ 
   color:themeColor.primary,
   }}  >
   <ListItemButton style={{textAlign:`${language == 'ar'?'center':'left'}`}} >


     <ListItemText primary={text.list1} style={{ color:  location.pathname.split('/')[2] ==  text1 ? themeColor.active:themeColor.main}} />

     { location.pathname.split('/')[2] ==  text.href ?<div className='line' style={{background:themeColor.active}}>
     
     </div> : null}
   
   </ListItemButton>
 </ListItem>
 </NavLink>
             ))}
          </>
       
         
        ))}
            { originalData == 'patient'  && linksPatient.map((text, index) => (
          <>
          
          <NavLink to={'/'+text.href} key={text.name} replace={false}   style={{ textDecoration: 'none'}}>
             <ListItem    sx={{ 
            color:themeColor.primary,
            }}  >
            <ListItemButton style={{textAlign:`${language == 'ar'?'right':'left'}`}} >
              <ListItemIcon style={{color:themeColor.main}}>
              {text.icon}
              </ListItemIcon>

              <ListItemText  primary={text.name} style={{ color: a ==  text.href ? themeColor.active:themeColor.main}} />

            
              {a ==  text.href && text.list != null ? <ArrowDropDownIcon />: null}
              {a ==  text.href && text.list == null  ?<div className='line' style={{background:themeColor.active}} >
              
              </div> : null}
            </ListItemButton>
          </ListItem>
        </NavLink>
      
 
          {a ==  text.href && text.list != null && text.list.map((text1, index) => (
    <NavLink to={text.href+'/'+text.list} key={text1} replace={false}   style={{ textDecoration: 'none'}}>
    <ListItem className='sub'   sx={{ 
   color:themeColor.primary,
   }}  >
   <ListItemButton style={{textAlign:`${language == 'ar'?'center':'left'}`}} >


     <ListItemText primary={text.list1} style={{ color:  location.pathname.split('/')[2] ==  text1 ? themeColor.active:themeColor.main}} />

     { location.pathname.split('/')[2] ==  text.href ?<div className='line' style={{background:themeColor.active}}>
     
     </div> : null}
   
   </ListItemButton>
 </ListItem>
 </NavLink>
             ))}
          </>
       
         
        ))} 
           { originalData == 'doctor'   && linksdoctor.map((text, index) => (
          <>
          
          <NavLink to={'/'+text.href} key={text.name} replace={false}   style={{ textDecoration: 'none'}}>
             <ListItem    sx={{ 
            color:themeColor.primary,
            }}  >
            <ListItemButton style={{textAlign:`${language == 'ar'?'right':'left'}`}} >
              <ListItemIcon style={{color:themeColor.main}}>
              {text.icon}
              </ListItemIcon>

              <ListItemText  primary={text.name} style={{ color: a ==  text.href ? themeColor.active:themeColor.main}} />

            
              {a ==  text.href && text.list != null ? <ArrowDropDownIcon />: null}
              {a ==  text.href && text.list == null  ?<div className='line' style={{background:themeColor.active}} >
              
              </div> : null}
            </ListItemButton>
          </ListItem>
        </NavLink>
      
 
          {a ==  text.href && text.list != null && text.list.map((text1, index) => (
    <NavLink to={text.href+'/'+text.list} key={text1} replace={false}   style={{ textDecoration: 'none'}}>
    <ListItem className='sub'   sx={{ 
   color:themeColor.primary,
   }}  >
   <ListItemButton style={{textAlign:`${language == 'ar'?'center':'left'}`}} >


     <ListItemText primary={text.list1} style={{ color:  location.pathname.split('/')[2] ==  text1 ? themeColor.active:themeColor.main}} />

     { location.pathname.split('/')[2] ==  text.href ?<div className='line' style={{background:themeColor.active}}>
     
     </div> : null}
   
   </ListItemButton>
 </ListItem>
 </NavLink>
             ))}
          </>
       
         
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }} dir={`${language == 'ar'?'ltr':''}`} style={{backgroundColor:themeColor.mood}}     >
    
  
      <Box
        component="nav"
      
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }  }}
        aria-label="mailbox folders"
      >
       
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
       
          container={container}
          variant="temporary"
          open={
            themeColor.drawer
          }
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: windowSize.current[0] },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
 
        variant="permanent"
        
        anchor= {language == 'ar'?'right':'left'}
          sx={{
        
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,  },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
    </Box>
  );
}



export default Index;