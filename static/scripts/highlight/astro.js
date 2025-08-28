// astro.js

export default function(hljs) {
  const frontmatter = {
    begin: '---',
    end: '---',
    subLanguage: 'yaml',
    contains: [{
      begin: '\\s*//',
      end: '$',
      contains: [{
        scope: 'comment',
        begin: '//'
      }]
    }],
    relevance: 10
  };

  return {
    name: 'Astro',
    contains: [
      frontmatter,
      {
        begin: '<style.*?>',
        end: '</style>',
        subLanguage: 'css',
        relevance: 0
      },
      {
        begin: '<script.*?>',
        end: '</script>',
        subLanguage: 'javascript',
        relevance: 0
      },
      {
        begin: '<',
        end: '>',
        subLanguage: 'xml',
        contains: [{
          begin: '{',
          end: '}',
          subLanguage: 'javascript',
        }],
        relevance: 0
      }
    ]
  };
}
