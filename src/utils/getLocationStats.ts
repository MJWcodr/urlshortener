import axios from "axios"

interface ipInfoResponse {
    ip?: string | undefined
    city?: string | undefined
    country?: string | undefined
    region?: string | undefined
    postal?: string | undefined
}

export async function getLocationStats(url: string) {
    let queryURL = `https://ipinfo.io/${url}`
    return new Promise((resolve, reject) => {
        axios.request<ipInfoResponse>({
            method: "get",
            url: queryURL,
        })
            .catch(err => {
                if (err) {
                    reject(err)
                }
            })
            .then(data => {
                if (data) {
                    let outData: ipInfoResponse = {
                        ip: data.data.ip,
                        city: data.data.city,
                        country: data.data.country,
                        postal: data.data.region,
                        region: data.data.region
                    }
                    resolve(outData)
                }
            })
    })
}

