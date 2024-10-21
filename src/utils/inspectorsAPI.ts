export function endpointIsValid(path: string | undefined, hasUserID = false): boolean{
    if (!path) { return false }
    const ckeckingPath = path[path.length - 1] === '/' ? path.slice(0, -1 ) : path
    const urlParts = ckeckingPath.split("/");
    const isUsersPathValid =  urlParts?.[1] === "api" && urlParts?.[2] === "users"
    return hasUserID ?  isUsersPathValid && urlParts?.[3] !== '' && urlParts.length === 4 : isUsersPathValid && urlParts.length === 3 
}

export function isUUIDv4(uuid: string): boolean {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv4Regex.test(uuid);
  }

export function  getUserID(url: string): string{
    const urlParts = url?.split("/");
    const userId = urlParts?.[3];
    return userId
    
}
