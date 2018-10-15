export default interface Sighting {
  id: number,
  celebrity: string,
  stalker: string,
  location: string,
  date: Date,
  comment?: string
};
