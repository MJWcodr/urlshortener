export interface urlShort {
    ShortURL?: string
    LongURL: properURL
}

type properURLPrefix = `https://` | `http://`
type properURLSuffix = 
|"." 

export type properURL = 
`${properURLPrefix}${string}${properURLSuffix}${string}`