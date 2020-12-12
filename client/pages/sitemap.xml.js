import { Component } from 'react'

import httpGet from '../http-get'

const createSitemap = (pages, posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
        .map((page) => {
          return `
                  <url>
                      <loc>${`https://pokemoem.com/${page}`}</loc>
                  </url>
              `;
        })
        .join('')}
        ${posts
          .map(({ name_en }) => {
            return `
                    <url>
                        <loc>${`https://pokemoem.com/pokedex/${name_en}`}</loc>
                    </url>
                `;
          })
          .join('')}
    </urlset>
    `;

class Sitemap extends Component {
  static async getInitialProps({ res }) {
    const pages = [
        '',
        'pokedex',
        'articles',
        'utility',
        'utility/nouthuca',
        'utility/trainer',
        'utility/tours',
        'login',
    ]

    const pokedexResponse = await httpGet.get(`/pokedex`);
    const pokedexPosts = pokedexResponse.data;

    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(pages, pokedexPosts));
    res.end();
  }
}

export default Sitemap;