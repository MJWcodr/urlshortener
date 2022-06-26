export namespace tracking {
    export interface Point {
        ShortURL: string
        ip: ipPart | string //TODO: implement proper v6 checking
        xhr?: boolean | undefined
        browser?: string | undefined
        origin?: string | undefined
        platform?: string | undefined
        version?: string | undefined
        source?: string | undefined
    }
    export interface Stats {
        numberOfAccesses: number,
        daysOfAccesses?: trackedDays[],
        Locations?: trackedLocations[]
    }
    export interface LocationStats {
        ip: string,
        country?: string | undefined
        city?: string | undefined,
        region?: string | undefined,
        postal?: string | undefined
    }
}




type trackedLocations = [location, number]
type location  = string

type trackedDays = [day, number]
type day = Date

type ipPart = `${number}.${number}.${number}.${number}`

