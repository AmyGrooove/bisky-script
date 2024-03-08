interface IGenresShiki {
  data: {
    genres: {
      entryType: "Anime" | "Mange";
      id: string;
      kind: "demographic" | "genre" | "theme";
      name: string;
      russian: string;
    }[];
  };
}

export type { IGenresShiki };
