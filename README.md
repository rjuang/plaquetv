# Thank you, all the devs of projects below that make this work possible
Create-React-app
react-grid-gallery
react-responsive-carousel
react-redux, @reduxjs/toolkit
react-bootstrap
pillow
reactjs-popup
react-use-keypress
fuse.js

# todo
https://mui.com/material-ui/react-autocomplete/#multiple-values

# Deployed location
https://plaquetv.z5.web.core.windows.net/

# Development
all the plaque images are removed from this repo, first need to copy these photos to the "images" folder.


# deployment
```
az storage azcopy blob upload -c "\$web" --account-name plaquetv -s "build/*" --recursive
```