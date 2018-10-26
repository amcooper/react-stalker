interface ISighting {
    id: number,
    celebrity: string,
    stalker: string,
    location: string,
    date: Date,
    comment: string
}

interface IAppState {
    isEditForm: boolean,
    id: number,
    sightings: ISighting[]
}

interface IStalkListProps {
    sightings: ISighting[],
    onClick(id: number): void
}

interface IStalkListItemProps {
    item: ISighting,
    onClick(): void
}

interface IStalkProps {
    item: ISighting,
    onEdit(id: number): void,
    onDelete(id: number): void
}