// make sure website is not running in a frame:
try{
    if (top!=window)
    {
        top.location.replace(location.href)
    }
}
catch(ignore){}