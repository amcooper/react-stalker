interface ISighting {
    id: number,
    celebrity: string,
    stalker: string,
    location: string,
    date: string
    comment: string
}

interface IAppState {
    isEditForm: boolean,
    id: number,
    sightings: ISighting[]
}