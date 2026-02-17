import Logo from './Logo.png'
import search_icon from './search_icon.png'
import menu_icon from './menu_icon.png'
import hero_section from './hero_section.png'
import edit_icon from './edit_icon.svg'
import check_icon from "./check_icon.svg"
import user_profile from './user_profile.png'
import dashboardIcon from './dashboardIcon.svg'
import dashboardIconColored from './dashboardIconColored.svg'
import addIcon from "./addIcon.svg"
import addIconColored from "./addIconColored.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"


export const assets={
    Logo,
    search_icon,
    menu_icon,
    hero_section,
    edit_icon,
    check_icon,
    user_profile,
    dashboardIcon,
    dashboardIconColored,
    addIcon,
    addIconColored,
    carIcon,
    carIconColored,
    listIcon,
    listIconColored

}

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "Vansh",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile
}

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add Items", path: "/owner/add-items", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Items", path: "/owner/manage-items", icon: carIcon, coloredIcon: carIconColored },
    { name: "My Listings", path: "/owner/my-listings", icon: listIcon, coloredIcon: listIconColored },
]