const animesQuery = (page = 1, additionalQuery: string) => `{
  animes(limit: 50, page: ${page}, ${additionalQuery}) {
    id
    name
    russian
    licenseNameRu
    english
    japanese
    synonyms
    kind
    rating
    score
    status
    episodes
    episodesAired
    franchise
    nextEpisodeAt
    duration
    airedOn {
      date
    }
    releasedOn {
      date
    }
    url

    poster {
      originalUrl
    }

    createdAt

    genres {
      name
    }
    studios {
      name
      imageUrl
    }

    # externalLinks {
    #   kind
    #   url
    # }

    related {
      anime {
        id
      }
      relationRu
      relationEn
    }

    videos {
      url
      name
    }
    screenshots {
      originalUrl
    }

    description
  }
}`;

export { animesQuery };
