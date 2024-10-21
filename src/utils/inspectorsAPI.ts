export function endpointIsValid(path: string | undefined, hasUserID = false): boolean{
    if (!path) { return false }
    const ckeckingPath = path[path.length - 1] === '/' ? path.slice(0, -1 ) : path

    console.log(path[path.length - 1] )
    
    const urlParts = ckeckingPath.split("/");
    console.log("проверка",path, ckeckingPath, urlParts)
    // const userId = urlParts?.[2];
    console.log(hasUserID ? urlParts?.[1] === "users" && urlParts?.[2] !== '' && urlParts.length === 3 :  urlParts?.[1] === "users" && urlParts.length === 2  )
    return hasUserID ?  urlParts?.[1] === "users" && urlParts?.[2] !== '' && urlParts.length === 3 : urlParts?.[1] === "users" && urlParts.length === 2 
   // return 
    // console.log(urlParts, req.url)
  //  ;
}

export function isUUIDv4(uuid: string): boolean {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv4Regex.test(uuid);
  }

export function  getUserID(url: string): string{
    const urlParts = url?.split("/");
    const userId = urlParts?.[2];
    return userId
    
}
