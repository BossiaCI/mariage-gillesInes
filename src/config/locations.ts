export type LocationConfig = {
  id: string;
  title: string;
  description: string;
  time: string;
  lat: number;
  lng: number;
};


export const locations: LocationConfig[] = [
  {
    id: "civil",
    title: "Mariage Civil",
    description: "Mairie d'Assinie, Mafia pk19, Adiaké, CI",
    time: "10H à 10H30",
    lat: 5.141180479689623,
    lng: -3.3004996748726705,
  },
  {
    id: "photo",
    title: "Séance photo",
    description: "Sur le lieu de réception",
    time: "10H50 à 12H10",
    lat: 5.1419110509153345,
    lng: -3.3273265469377145,
  },
  {
    id: "religious",
    title: "Mariage Religieux",
    description:
      "Église catholique sainte Thérèse de l'enfant Jésus d'Assinie",
    time: "13H à 14H",
    lat: 5.137503638097636,
    lng: -3.2921433767179527,
  },
  {
    id: "reception",
    title: "Réception",
    description: "Villa au KM17 et demi",
    time: "À partir de 14H",
    lat: 5.1419110509153345,
    lng: -3.3273265469377145,
  },
];
