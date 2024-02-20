LAYOUT 

Usually, 

Layout renders Header, {childen} and Footer 

{children} is the PAGE.tsx of that URL, like:

localhost:3000/profile
localhost:3000/about 


---------------------------------------------------------










---------------------------------------------
Private Folder - for storing stuff like utils

*page.tsx won't be a viewable page like others 

_lib
  format_date.ts 

--------------------------------------------

(Invisible) Group Routing for Sign-In, Register etc 

  adding () like (auth) will be removed from URL access.

Example: 1. Go to localhost:3000/login 

Login.tsx 

export default function Login() {
  return <h1>Log in</h1>;
}

------------------------------------------------------------





